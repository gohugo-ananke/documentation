import { promises as fs } from "node:fs";
import path from "node:path";

const inputDirectory = path.resolve(process.cwd(), "data/contributors");
const outputFile = path.resolve(
  process.cwd(),
  "content/information/contributors.md",
);

/**
 * Escape markdown table content.
 *
 * @param {string} value
 * @returns {string}
 */
function escapeMarkdown(value) {
  return value.replace(/\|/gu, "\\|").trim();
}

/**
 * Read contributor JSON files.
 *
 * @returns {Promise<Array<object>>}
 */
async function loadContributorFiles() {
  const entries = await fs.readdir(inputDirectory, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => name.endsWith(".json"))
    .sort((left, right) => left.localeCompare(right));

  const merged = new Map();

  for (const fileName of files) {
    const repoName = fileName.replace(/\.json$/u, "");
    const filePath = path.join(inputDirectory, fileName);

    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);

    for (const contributor of parsed.contributors ?? []) {
      const login = contributor.login?.trim();

      if (!login) {
        console.warn(`Skipping contributor without login in ${fileName}`);
        continue;
      }

      const existing = merged.get(login);

      const contributions = Array.from(
        new Set(contributor.contributions ?? []),
      ).sort((left, right) => left.localeCompare(right));

      if (!existing) {
        merged.set(login, {
          login,
          name: contributor.name ?? login,
          profile:
            contributor.profile ?? `https://github.com/${login}`,
          avatar_url: contributor.avatar_url ?? "",
          contributions,
          repos: [repoName],
        });

        continue;
      }

      existing.contributions = Array.from(
        new Set([...existing.contributions, ...contributions]),
      ).sort((left, right) => left.localeCompare(right));

      if (!existing.repos.includes(repoName)) {
        existing.repos.push(repoName);
        existing.repos.sort((left, right) => left.localeCompare(right));
      }
    }
  }

  return Array.from(merged.values()).sort((left, right) => {
    return left.login.localeCompare(right.login);
  });
}

/**
 * Render contributor markdown.
 *
 * @param {Array<object>} contributors
 * @returns {string}
 */
function renderMarkdown(contributors) {
  const lines = [
    "---",
    "title: Contributors",
    "date: 2026-04-15T08:00:00.000+0700",
    "---",
    "",
    "* [Contributors](#contributors)",
    "",
    "Ananke lives from the work of its contributors.",
    "",
    "## Contributors",
    "",
    `Total contributors: **${contributors.length}**`,
    "",
    "| Contributor | Contributions | Repositories |",
    "|---|---|---|",
  ];

  for (const contributor of contributors) {
    const name = `[${escapeMarkdown(contributor.name)}](${contributor.profile})`;

    const contributionList = contributor.contributions
      .map((item) => `\`${escapeMarkdown(item)}\``)
      .join(", ");

    const repos = contributor.repos
      .map((repo) => `\`${escapeMarkdown(repo)}\``)
      .join(", ");

    lines.push(`| ${name} | ${contributionList} | ${repos} |`);
  }

  lines.push("");

  return `${lines.join("\n")}\n`;
}

async function main() {
  const contributors = await loadContributorFiles();
  const markdown = renderMarkdown(contributors);

  await fs.writeFile(outputFile, markdown, "utf8");

  console.log(
    `Generated contributor page with ${contributors.length} contributors.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
