import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, rmSync, symlinkSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const theme = "github.com/gohugo-ananke/ananke/v2";
const repository = "https://github.com/gohugo-ananke/ananke.git";

function run(
  command: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv,
): void {
  const result = spawnSync(command, args, { cwd, env, stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0)
    throw new Error(`${command} failed (${result.status ?? result.signal}).`);
}

function output(
  command: string,
  args: string[],
  cwd: string,
  env: NodeJS.ProcessEnv,
): string {
  return execFileSync(command, args, { cwd, env, encoding: "utf8" }).trim();
}

function main(): void {
  const { values } = parseArgs({
    options: {
      production: { type: "boolean", default: false },
      deploy: { type: "boolean", default: false },
      "theme-ref": { type: "string" },
      "expect-theme-version": { type: "string" },
      destination: { type: "string" },
      baseURL: { type: "string" },
      buildFuture: { type: "boolean", default: false },
    },
  });
  if (values.production && values["theme-ref"]) {
    throw new Error(
      "Production always selects the latest stable release. Use a preview build for --theme-ref.",
    );
  }
  if (values.deploy && values.destination) {
    throw new Error(
      "Deploy builds always use public/. Use --destination for build-only checks.",
    );
  }
  const ref = values.production
    ? "latest"
    : (values["theme-ref"] ??
      (process.env["ANANKE_THEME_REF"] || "development"));
  if (!ref.trim()) throw new Error("The theme ref must not be empty.");
  const destination = resolve(root, values.destination || "public");
  const cache = resolve(
    process.env["HUGO_CACHEDIR"] ||
      join(tmpdir(), "ananke-documentation-hugo-cache"),
  );
  const env: NodeJS.ProcessEnv = {
    ...process.env,
    HUGO_ENV: "production",
    HUGO_ENVIRONMENT: "production",
    GOWORK: "off",
    GOMODCACHE: join(cache, "modules", "filecache", "modules", "pkg", "mod"),
  };
  // A development shell must not replace the selected release or preview ref.
  delete env["HUGO_MODULE_REPLACEMENTS"];
  delete env["HUGO_MODULE_WORKSPACE"];
  const source = mkdtempSync(join(tmpdir(), "ananke-documentation-build-"));
  try {
    for (const name of [
      "config",
      "content",
      "layouts",
      "assets",
      "static",
      "data",
      "i18n",
      "archetypes",
      "go.mod",
      "go.sum",
    ]) {
      const path = join(root, name);
      if (existsSync(path))
        cpSync(path, join(source, name), { recursive: true });
    }
    symlinkSync(
      join(root, "node_modules"),
      join(source, "node_modules"),
      "dir",
    );
    run("go", ["mod", "edit", `-dropreplace=${theme}`], source, env);
    // Go version queries cannot use branch names containing a slash.
    const revision = ref.includes("/")
      ? output(
          "git",
          ["ls-remote", "--exit-code", repository, `refs/heads/${ref}`],
          root,
          env,
        ).split(/\s+/)[0]
      : ref;
    if (!revision) throw new Error(`Cannot resolve theme ref ${ref}.`);
    console.log(
      `Theme selection: ${values.production ? "production" : "preview"}, ${ref}`,
    );
    run("go", ["get", `${theme}@${revision}`], source, env);
    const selected = JSON.parse(
      output("go", ["list", "-m", "-json", theme], source, env),
    ) as { Version?: string; Replace?: unknown };
    if (!selected.Version || selected.Replace)
      throw new Error(
        "Expected a remote, versioned Ananke module without a Go replacement.",
      );
    if (values.production && selected.Version.includes("-"))
      throw new Error("Production requires a stable Ananke release.");
    if (
      values["expect-theme-version"] &&
      selected.Version !== values["expect-theme-version"]
    ) {
      throw new Error(
        `Expected ${values["expect-theme-version"]}, but resolved ${selected.Version}. Wait for the release to become available, then rebuild.`,
      );
    }
    console.log(`Resolved theme: ${theme}@${selected.Version}`);
    console.log(output("hugo", ["version"], source, env));
    const args = [
      "--source",
      source,
      "--destination",
      destination,
      "--cacheDir",
      cache,
      "--environment",
      "production",
      "--gc",
      "--minify",
    ];
    const baseURL =
      values.baseURL ||
      (values.production ? undefined : process.env["DEPLOY_PRIME_URL"]) ||
      process.env["HUGO_BASE_URL"];
    if (baseURL) args.push("--baseURL", baseURL);
    if (values.buildFuture) args.push("--buildFuture");
    run("hugo", args, source, env);
    run(
      join(root, "node_modules", ".bin", "pagefind"),
      ["--site", destination],
      root,
      env,
    );
    if (values.deploy) {
      const deployArgs = ["deploy", "--no-build", "--dir", destination];
      if (values.production) deployArgs.push("--prod");
      run("netlify", deployArgs, root, env);
    }
  } finally {
    rmSync(source, { recursive: true, force: true });
  }
}

try {
  main();
} catch (error) {
  console.error(
    `Documentation build: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
}
