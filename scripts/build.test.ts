import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import {
  chmodSync,
  copyFileSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true });
});

function fixture() {
  const root = mkdtempSync(join(tmpdir(), "ananke-build-test-"));
  roots.push(root);
  for (const directory of [
    "scripts",
    "bin",
    "config/_default",
    "content",
    "node_modules/.bin",
  ])
    mkdirSync(join(root, directory), { recursive: true });
  copyFileSync(
    new URL("./build.ts", import.meta.url),
    join(root, "scripts/build.ts"),
  );
  writeFileSync(join(root, "package.json"), '{"type":"module"}');
  const original =
    "module example.org/docs\nrequire github.com/gohugo-ananke/ananke/v2 v2.19.1\n";
  writeFileSync(join(root, "go.mod"), original);
  writeFileSync(join(root, "go.sum"), "original checksums\n");
  writeFileSync(join(root, "content/_index.md"), "Build fixture\n");
  const log = join(root, "calls.jsonl");
  const recorder = `import fs from 'node:fs'; import {basename} from 'node:path'; const args=process.argv.slice(2); fs.appendFileSync(process.env.TEST_BUILD_LOG,JSON.stringify({tool:basename(process.argv[1]),args,cwd:process.cwd(),replacement:process.env.HUGO_MODULE_REPLACEMENTS||null,environment:process.env.HUGO_ENVIRONMENT})+'\\n');`;
  for (const [name, body] of [
    [
      "go",
      "if(args[0]==='get')fs.appendFileSync('go.mod','// resolved in isolation\\n'); if(args[0]==='list')console.log(JSON.stringify({Version:process.env.TEST_THEME_VERSION||'v2.20.0'}));",
    ],
    [
      "git",
      "if(process.env.TEST_MISSING_BRANCH)process.exit(2);console.log('0123456789012345678901234567890123456789\\trefs/heads/rework/header');",
    ],
    ["hugo", "if(args[0]==='version')console.log('hugo v0.170.1');"],
    ["netlify", ""],
  ] as const) {
    const path = join(root, "bin", name);
    writeFileSync(path, `#!/usr/bin/env node\n${recorder}\n${body}\n`);
    chmodSync(path, 0o755);
  }
  const pagefind = join(root, "node_modules/.bin/pagefind");
  writeFileSync(pagefind, `#!/usr/bin/env node\n${recorder}\n`);
  chmodSync(pagefind, 0o755);
  return {
    root,
    run(args: string[], extraEnv: NodeJS.ProcessEnv = {}) {
      const result = spawnSync(
        process.execPath,
        [join(root, "scripts/build.ts"), ...args],
        {
          cwd: root,
          encoding: "utf8",
          env: {
            ...process.env,
            PATH: `${join(root, "bin")}:${process.env["PATH"]}`,
            HUGO_CACHEDIR: join(root, "cache"),
            HUGO_MODULE_REPLACEMENTS:
              "github.com/gohugo-ananke/ananke/v2 -> /unwanted/local/checkout",
            HUGO_ENVIRONMENT: "development",
            ANANKE_THEME_REF: "unwanted-production-branch",
            TEST_BUILD_LOG: log,
            ...extraEnv,
          },
        },
      );
      const calls = existsSync(log)
        ? readFileSync(log, "utf8")
            .trim()
            .split("\n")
            .map(
              (line) =>
                JSON.parse(line) as {
                  tool: string;
                  args: string[];
                  cwd: string;
                  replacement: string | null;
                  environment: string;
                },
            )
        : [];
      assert.equal(readFileSync(join(root, "go.mod"), "utf8"), original);
      assert.equal(
        readFileSync(join(root, "go.sum"), "utf8"),
        "original checksums\n",
      );
      return { ...result, calls };
    },
  };
}

test("production selects latest and clears inherited local replacements without modifying dependency files", () => {
  const f = fixture();
  const r = f.run(["--production", "--destination", join(f.root, "output")]);
  assert.equal(r.status, 0, r.stderr);
  assert.deepEqual(
    r.calls.find((c) => c.tool === "go" && c.args[0] === "get")?.args,
    ["get", "github.com/gohugo-ananke/ananke/v2@latest"],
  );
  const build = r.calls.find(
    (c) => c.tool === "hugo" && c.args[0] === "--source",
  );
  assert.ok(build);
  assert.equal(build.replacement, null);
  assert.equal(build.environment, "production");
  assert.notEqual(build.cwd, f.root);
  assert.equal(existsSync(build.cwd), false, "temporary source is removed");
  assert.ok(r.calls.some((c) => c.tool === "pagefind"));
  assert.ok(!r.calls.some((c) => c.tool === "netlify"));
});

test("preview resolves slash-containing branch names to a commit and uses the preview URL", () => {
  const f = fixture();
  const r = f.run(["--theme-ref", "rework/header"], {
    DEPLOY_PRIME_URL: "https://preview.example.org/",
  });
  assert.equal(r.status, 0, r.stderr);
  assert.ok(
    r.calls.some(
      (c) => c.tool === "git" && c.args.includes("refs/heads/rework/header"),
    ),
  );
  assert.ok(
    r.calls.some(
      (c) =>
        c.tool === "go" &&
        c.args.includes(
          "github.com/gohugo-ananke/ananke/v2@0123456789012345678901234567890123456789",
        ),
    ),
  );
  assert.ok(
    r.calls.some(
      (c) =>
        c.tool === "hugo" && c.args.includes("https://preview.example.org/"),
    ),
  );
});

test("preview defaults to development when no theme ref is set", () => {
  const r = fixture().run([], { ANANKE_THEME_REF: "" });
  assert.equal(r.status, 0, r.stderr);
  assert.ok(
    r.calls.some(
      (c) =>
        c.tool === "go" &&
        c.args.includes("github.com/gohugo-ananke/ananke/v2@development"),
    ),
  );
});

test("removed deployment option fails before running external commands", () => {
  const r = fixture().run(["--deploy"]);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Unknown option.*--deploy/);
  assert.equal(r.calls.length, 0);
});

test("a release version mismatch prevents building", () => {
  const r = fixture().run([
    "--production",
    "--expect-theme-version",
    "v2.21.0",
  ]);
  assert.notEqual(r.status, 0);
  assert.match(r.stderr, /Expected v2.21.0, but resolved v2.20.0/);
  assert.ok(!r.calls.some((c) => c.tool === "hugo" || c.tool === "netlify"));
});

test("production rejects prereleases and explicit preview refs", () => {
  const prerelease = fixture().run(["--production"], {
    TEST_THEME_VERSION: "v2.21.0-prerelease.0",
  });
  assert.notEqual(prerelease.status, 0);
  assert.match(prerelease.stderr, /requires a stable/);
  const explicit = fixture().run([
    "--production",
    "--theme-ref",
    "development",
  ]);
  assert.notEqual(explicit.status, 0);
  assert.match(explicit.stderr, /Use a preview build/);
});

test("an unavailable preview branch fails without selecting a different theme", () => {
  const r = fixture().run(["--theme-ref", "missing/branch"], {
    TEST_MISSING_BRANCH: "1",
  });
  assert.notEqual(r.status, 0);
  assert.ok(!r.calls.some((c) => c.tool === "go" && c.args[0] === "get"));
  assert.ok(!r.calls.some((c) => c.tool === "hugo" || c.tool === "netlify"));
});

test("preview accepts an environment-selected revision but rejects an empty explicit ref", () => {
  const selected = fixture().run([], { ANANKE_THEME_REF: "main" });
  assert.equal(selected.status, 0, selected.stderr);
  assert.ok(
    selected.calls.some(
      (c) =>
        c.tool === "go" &&
        c.args.includes("github.com/gohugo-ananke/ananke/v2@main"),
    ),
  );
  const empty = fixture().run(["--theme-ref", ""]);
  assert.notEqual(empty.status, 0);
  assert.match(empty.stderr, /must not be empty/);
});
