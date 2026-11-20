import { execFileSync, spawn } from "node:child_process";
import { once } from "node:events";
import { realpathSync } from "node:fs";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const documentation = realpathSync(
  join(dirname(fileURLToPath(import.meta.url)), ".."),
);
const address = "http://127.0.0.1:1313/";

function git(directory: string, ...args: string[]): string {
  return execFileSync("git", ["-C", directory, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function hasLocalBranch(directory: string, branch: string): boolean {
  try {
    git(directory, "show-ref", "--verify", "--quiet", `refs/heads/${branch}`);
    return true;
  } catch (error) {
    if ((error as { status?: number }).status === 1) return false;
    throw error;
  }
}

async function checkPort(): Promise<void> {
  const probe = createServer();
  try {
    probe.listen({ host: "127.0.0.1", port: 1313, exclusive: true });
    await once(probe, "listening");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "EADDRINUSE") {
      throw new Error(
        `Port 1313 is already in use (${address}). Stop the existing server and rerun npm run dev to apply branch selection.`,
      );
    }
    throw error;
  } finally {
    if (probe.listening) {
      await new Promise<void>((resolve, reject) =>
        probe.close((error) => (error ? reject(error) : resolve())),
      );
    }
  }
}

async function main(): Promise<void> {
  const ananke = realpathSync(join(documentation, "..", "ananke"));
  if (process.argv.length > 2) {
    throw new Error(
      "npm run dev takes no arguments; the documentation server always uses port 1313.",
    );
  }
  const caller = realpathSync(process.cwd());
  if (caller !== ananke && caller !== documentation) {
    throw new Error(
      "Run npm run dev from the Ananke or documentation repository root.",
    );
  }
  for (const directory of [ananke, documentation]) {
    if (
      realpathSync(git(directory, "rev-parse", "--show-toplevel")) !== directory
    ) {
      throw new Error(`Expected a separate Git repository at ${directory}.`);
    }
  }

  const branches = new Map(
    [ananke, documentation].map((directory) => [
      directory,
      git(directory, "branch", "--show-current"),
    ]),
  );
  console.log(
    `Calling repository: ${caller === ananke ? "ananke" : "documentation"}`,
  );
  console.log(
    `Starting branches: ananke=${branches.get(ananke) || "(detached HEAD)"}; documentation=${branches.get(documentation) || "(detached HEAD)"}`,
  );
  const branch = branches.get(caller);
  if (!branch) {
    throw new Error(
      "The calling repository has a detached HEAD. Check out a branch first.",
    );
  }
  const companion = caller === ananke ? documentation : ananke;
  const companionName = caller === ananke ? "documentation" : "ananke";
  const sharedBranch = hasLocalBranch(companion, branch);
  const target =
    sharedBranch || branch === "main" || branch === "development"
      ? branch
      : "development";
  if (sharedBranch) {
    console.log(`Matching local branch: selecting ${companionName}/${branch}.`);
  } else if (target !== branch) {
    console.log(
      `No local ${branch} branch in ${companionName}: falling back to ${companionName}/development.`,
    );
  }

  // Check before switching branches: an existing preview must be stopped first.
  await checkPort();
  if (branches.get(companion) !== target) {
    if (!hasLocalBranch(companion, target)) {
      throw new Error(
        `Cannot switch ${companionName}: local branch ${target} is missing. No branches were switched.`,
      );
    }
    const changes = git(
      companion,
      "status",
      "--porcelain",
      "--untracked-files=all",
      "--",
      ".",
      ":(exclude)scratch",
      ":(exclude)scratch/**",
    );
    if (changes) {
      throw new Error(
        `Cannot switch ${companionName} to ${target}: it has uncommitted or untracked changes. Commit or move them, then rerun npm run dev. No branches were switched.`,
      );
    }
    git(companion, "switch", "--no-guess", target);
    console.log(
      `Switched ${companionName}: ${branches.get(companion) || "(detached HEAD)"} -> ${target}`,
    );
  } else {
    console.log(`No branch switch: ${companionName} is already on ${target}.`);
  }
  console.log(
    `Serving branches: ananke=${git(ananke, "branch", "--show-current")}; documentation=${git(documentation, "branch", "--show-current")}`,
  );
  console.log(
    `Serving documentation at ${address} with local Ananke (${ananke}).`,
  );

  const child = spawn(
    "hugo",
    [
      "server",
      "--environment",
      "development",
      "--disableFastRender",
      "--bind",
      "127.0.0.1",
      "--port",
      "1313",
    ],
    {
      cwd: documentation,
      stdio: "inherit",
      env: {
        ...process.env,
        HUGO_MODULE_REPLACEMENTS: `github.com/gohugo-ananke/ananke/v2 -> ${ananke}`,
      },
    },
  );
  const interrupt = () => child.kill("SIGINT");
  const terminate = () => child.kill("SIGTERM");
  process.on("SIGINT", interrupt);
  process.on("SIGTERM", terminate);
  try {
    const [code, signal] = await once(child, "exit");
    process.exitCode = code ?? (signal === "SIGINT" ? 130 : 1);
  } finally {
    process.off("SIGINT", interrupt);
    process.off("SIGTERM", terminate);
  }
}

main().catch((error: unknown) => {
  console.error(
    `Dev server: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
