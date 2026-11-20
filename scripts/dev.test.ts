import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { once } from "node:events";
import {
  chmodSync,
  copyFileSync,
  mkdirSync,
  mkdtempSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, test } from "node:test";

const roots: string[] = [];
afterEach(() => {
  for (const root of roots.splice(0))
    rmSync(root, { recursive: true, force: true });
});

function git(directory: string, ...args: string[]): string {
  return execFileSync("git", ["-C", directory, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  }).trim();
}

function fixture(anankeBranch: string, documentationBranch: string) {
  const root = mkdtempSync(join(tmpdir(), "ananke-dev-test-"));
  roots.push(root);
  const ananke = join(root, "ananke");
  const documentation = join(root, "documentation");
  for (const directory of [ananke, documentation]) {
    mkdirSync(directory);
    git(directory, "init", "-b", "main");
    git(
      directory,
      "-c",
      "user.name=Dev test",
      "-c",
      "user.email=dev@example.org",
      "commit",
      "--allow-empty",
      "-m",
      "Initial commit",
    );
    git(directory, "branch", "development");
    git(directory, "branch", "feat/example");
  }
  mkdirSync(join(documentation, "scripts"));
  copyFileSync(
    new URL("./dev.ts", import.meta.url),
    join(documentation, "scripts/dev.ts"),
  );
  for (const [directory, command] of [
    [ananke, "node ../documentation/scripts/dev.ts"],
    [documentation, "node scripts/dev.ts"],
  ]) {
    writeFileSync(
      join(directory, "package.json"),
      JSON.stringify({ type: "module", scripts: { dev: command } }),
    );
    git(directory, "add", ".");
    git(
      directory,
      "-c",
      "user.name=Dev test",
      "-c",
      "user.email=dev@example.org",
      "commit",
      "-m",
      "Add dev command",
    );
    // All fixture branches contain the launcher, as they will after integration.
    git(directory, "branch", "-f", "development", "HEAD");
    git(directory, "branch", "-f", "feat/example", "HEAD");
  }
  git(ananke, "switch", anankeBranch);
  git(documentation, "switch", documentationBranch);
  const bin = join(root, "bin");
  mkdirSync(bin);
  const hugo = join(bin, "hugo");
  writeFileSync(
    hugo,
    '#!/usr/bin/env node\nconsole.log("HUGO_CALL=" + JSON.stringify({cwd: process.cwd(), args: process.argv.slice(2), replacement: process.env.HUGO_MODULE_REPLACEMENTS}));\n',
  );
  chmodSync(hugo, 0o755);
  return {
    ananke,
    documentation,
    run(caller: string) {
      return spawnSync("npm", ["run", "dev"], {
        cwd: caller,
        encoding: "utf8",
        env: { ...process.env, PATH: `${bin}:${process.env.PATH}` },
      });
    },
  };
}

for (const callerName of ["ananke", "documentation"] as const) {
  for (const branch of ["main", "development", "feat/example"]) {
    test(`${callerName}/${branch} controls the companion and serves documentation`, () => {
      const target = branch;
      const other = target === "main" ? "development" : "main";
      const f = fixture(
        callerName === "ananke" ? branch : other,
        callerName === "documentation" ? branch : other,
      );
      const companionName =
        callerName === "ananke" ? "documentation" : "ananke";
      const result = f.run(f[callerName]);
      assert.equal(result.status, 0, result.stderr);
      assert.equal(git(f[callerName], "branch", "--show-current"), branch);
      assert.equal(git(f[companionName], "branch", "--show-current"), target);
      assert.match(
        result.stdout,
        new RegExp(`Switched ${companionName}: ${other} -> ${target}`),
      );
      assert.match(
        result.stdout,
        /Starting branches: ananke=.*; documentation=.*/,
      );
      assert.match(
        result.stdout,
        /Serving branches: ananke=.*; documentation=.*/,
      );
      const call = JSON.parse(result.stdout.split("HUGO_CALL=")[1].trim());
      assert.equal(call.cwd, f.documentation);
      assert.equal(
        call.replacement,
        `github.com/gohugo-ananke/ananke/v2 -> ${f.ananke}`,
      );
      assert.deepEqual(call.args, [
        "server",
        "--environment",
        "development",
        "--disableFastRender",
        "--bind",
        "127.0.0.1",
        "--port",
        "1313",
      ]);
    });
  }
}

for (const callerName of ["ananke", "documentation"] as const) {
  test(`${callerName}: a feature branch missing from the companion falls back to development`, () => {
    const f = fixture(
      callerName === "ananke" ? "feat/example" : "main",
      callerName === "documentation" ? "feat/example" : "main",
    );
    const companionName = callerName === "ananke" ? "documentation" : "ananke";
    git(f[companionName], "branch", "-D", "feat/example");
    const result = f.run(f[callerName]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(
      git(f[callerName], "branch", "--show-current"),
      "feat/example",
    );
    assert.equal(
      git(f[companionName], "branch", "--show-current"),
      "development",
    );
    assert.match(result.stdout, /falling back to .*\/development/);
    assert.match(
      result.stdout,
      new RegExp(`Switched ${companionName}: main -> development`),
    );
  });

  test(`${callerName}: matching feature branches allow local edits without a switch`, () => {
    const f = fixture("feat/example", "feat/example");
    writeFileSync(join(f.ananke, "draft.txt"), "Theme edit");
    writeFileSync(join(f.documentation, "draft.txt"), "Docs edit");
    const result = f.run(f[callerName]);
    assert.equal(result.status, 0, result.stderr);
    assert.equal(git(f.ananke, "branch", "--show-current"), "feat/example");
    assert.equal(
      git(f.documentation, "branch", "--show-current"),
      "feat/example",
    );
    assert.match(
      result.stdout,
      /Matching local branch: selecting .*\/feat\/example/,
    );
    assert.match(
      result.stdout,
      /No branch switch: .* is already on feat\/example/,
    );
    assert.doesNotMatch(result.stdout, /Switched /);
  });
}

test("refuses to switch a dirty companion and preserves its file", () => {
  const f = fixture("main", "development");
  const draft = join(f.documentation, "draft.txt");
  writeFileSync(draft, "Keep this draft");
  const result = f.run(f.ananke);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /uncommitted or untracked changes/);
  assert.equal(git(f.documentation, "branch", "--show-current"), "development");
  assert.equal(git(f.documentation, "status", "--porcelain"), "?? draft.txt");
  assert.doesNotMatch(result.stdout, /HUGO_CALL=/);
});

test("allows uncommitted edits when both branches already match", () => {
  const f = fixture("development", "development");
  writeFileSync(join(f.ananke, "draft.txt"), "Theme edit");
  writeFileSync(join(f.documentation, "draft.txt"), "Docs edit");
  const result = f.run(f.documentation);
  assert.equal(result.status, 0, result.stderr);
  assert.match(
    result.stdout,
    /No branch switch: ananke is already on development/,
  );
});

for (const staged of [false, true]) {
  test(`refuses to switch a companion with ${staged ? "staged" : "unstaged"} tracked edits`, () => {
    const f = fixture("main", "development");
    writeFileSync(join(f.documentation, "package.json"), '{"private":true}\n');
    if (staged) git(f.documentation, "add", "package.json");
    const before = git(
      f.documentation,
      "diff",
      staged ? "--cached" : "--",
      "package.json",
    );
    const result = f.run(f.ananke);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /uncommitted or untracked changes/);
    assert.equal(
      git(f.documentation, "branch", "--show-current"),
      "development",
    );
    assert.equal(
      git(f.documentation, "diff", staged ? "--cached" : "--", "package.json"),
      before,
    );
  });
}

test("refuses a detached caller", () => {
  const f = fixture("main", "development");
  git(f.ananke, "switch", "--detach");
  const result = f.run(f.ananke);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /calling repository has a detached HEAD/);
  assert.equal(git(f.documentation, "branch", "--show-current"), "development");
});

test("does not create or fetch a missing companion branch", () => {
  const f = fixture("main", "development");
  git(f.documentation, "branch", "-D", "main");
  const result = f.run(f.ananke);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /local branch main is missing/);
  assert.equal(git(f.documentation, "branch", "--show-current"), "development");
  assert.doesNotMatch(result.stdout, /HUGO_CALL=/);
});

test("an occupied server port prevents a branch switch", async () => {
  const f = fixture("main", "development");
  const server = createServer();
  server.listen(1313, "127.0.0.1");
  await once(server, "listening");
  try {
    const result = f.run(f.ananke);
    assert.equal(result.status, 1);
    assert.match(result.stderr, /Port 1313 is already in use/);
    assert.equal(
      git(f.documentation, "branch", "--show-current"),
      "development",
    );
  } finally {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  }
});
