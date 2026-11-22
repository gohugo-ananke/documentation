# Contributing to the Ananke Documentation

Thank you for helping improve the documentation for
[Ananke](https://github.com/gohugo-ananke/ananke)! This guide covers how the docs are written,
built, and reviewed.

This repository holds **only** the documentation site. Changes to the theme itself (layouts,
partials, assets, i18n) belong in the
[theme repository](https://github.com/gohugo-ananke/ananke).

* [Ways to contribute](#ways-to-contribute)
* [Setting up](#setting-up)
* [Writing style guide](#writing-style-guide)
* [Page skeleton](#page-skeleton)
* [Linting](#linting)
* [Branch and pull request workflow](#branch-and-pull-request-workflow)
* [Commit messages](#commit-messages)
* [Contributors list](#contributors-list)
* [License](#license)

## Ways to contribute

* Fix typos, broken links, or outdated instructions.
* Expand thin pages or add missing feature documentation.
* Add recipes to the `examples/` section.
* Improve the docs site itself (display, navigation, accessibility).

If you are documenting a feature that does not behave as described, please open an issue on the
[theme repository](https://github.com/gohugo-ananke/ananke/issues) — the fix may belong in the
theme rather than the docs.

## Setting up

Keep the theme and documentation repositories next to each other. With Node.js 22.18 or later, install the documentation dependencies and start the shared preview:

```bash
cd documentation
npm install
npm run dev
```

You can also run `npm run dev` from the sibling `ananke` repository. Both commands serve the documentation site with your local theme edits. The calling repository keeps its branch and selects the companion's branch: `main` selects `main`, `development` selects `development`, and other named branches select the same local branch in the companion when it exists. Otherwise, they select `development`. The launcher prints both branches and any switch it makes. It refuses to switch a companion with uncommitted or untracked changes, excluding `scratch/`.

Stop the server before selecting another branch pair. See the [README](README.md#running-locally) for manual previews, branch checks, and launcher tests.

For production and preview theme selection, see [Build and deploy selection](README.md#build-and-deploy-selection). Builds resolve their theme in an isolated source tree and preserve the checked-in dependency files. Publish the stable theme release before the matching production documentation build.

## Writing style guide

The documentation aims to be **beginner-safe**. A reader should be able to copy an example and get
a working result without prior knowledge of the theme internals.

* Write in plain language; expand acronyms on first use.
* Show **complete, copy-paste** examples. Always include the full configuration context (for
  example `[ananke.social.follow]` in `config/_default/params.toml`), never a bare key.
* State each option's **default** and whether it is required or optional.
* Use British English (`en-GB`), matching the site `locale` and the cspell dictionary.
* Mark the release a feature first appeared in with the `since` shortcode:

  ```go-html-template
  {{</* since */>}}
  ```

  It reads the page's `since` front-matter value and links to the matching theme release.
* Prefer descriptive link text. Generic text such as "click here" or "read more" is rejected by
  the linter.
* Use Markdown autolinks sparingly — the linter requires inline link syntax
  (`[text](url)`) rather than bare `<url>` links.

## Page skeleton

Each page serves one reader need. Choose the document type first, then use its structure. Put the page under the topic section where readers look for it, and link it from the matching entry page: [Tutorials](https://gohugo-ananke.github.io/documentation/tutorials/), [How-to guides](https://gohugo-ananke.github.io/documentation/how-to/), [Explanation](https://gohugo-ananke.github.io/documentation/explanation/), or [Reference](https://gohugo-ananke.github.io/documentation/reference/).

* **Tutorial**: the reader learns by doing.
  1. What the reader builds and what they need before they start.
  2. Numbered steps, each with a visible result.
  3. A check of the final result and links to the next tasks.
* **How-to guide**: the reader completes one task on their own site.
  1. The result and the prerequisites, in one or two sentences.
  2. Numbered steps with complete, copy-paste examples.
  3. How to check the result, and the most common problems.
* **Reference**: the reader looks up an exact fact.
  1. One sentence on what the page lists and for which release.
  2. Tables with name, type, default, required or optional, and scope.
  3. Short examples only where they make a value clear.
* **Explanation**: the reader wants to understand a concept or a choice.
  1. The question that the page answers.
  2. How the parts fit together, and the trade-offs.
  3. Links to the tasks and the reference material.

Do not repeat a fact on several pages. Give each fact one owner page and link to it. If a page starts to serve two reader needs, split it, keep the old address for the main part, and keep its important fragment links working.

Front matter every page should set:

```yaml
---
title: Human Readable Title
date: 2026-01-16T08:00:00.000+0700
weight: 100        # controls ordering within a section
since: "2.17.0"    # optional; the theme release the feature landed in
---
```

## Linting

Markdown is linted with
[markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) using the rules in
[`.markdownlint.jsonc`](.markdownlint.jsonc), plus several custom rules (relative-link validation,
generic-link-text prohibition, British spelling via cspell). Links are checked with
[lychee](https://github.com/lycheeverse/lychee).

```bash
npm run lint:markdown       # check Markdown
npm run lint:markdown:fix   # auto-fix what can be fixed
npm run lint:links          # check links (start `hugo server` first)
```

A git pre-commit hook runs `lint-staged` on staged Markdown automatically. To bypass hooks in an
emergency, add `--no-verify` to your `git commit` or `git push` command.

## Branch and pull request workflow

This repository uses a rebase-based model with two long-lived branches. `development` collects reviewed changes; `main` holds the published documentation.

1. Create a short-lived, focused branch off `development`. Use a descriptive prefix, for example `docs/document-shortcodes` or `fix/broken-installation-links`.
2. Make your changes and ensure the linters pass.
3. Open a pull request targeting `development`. Keep it focused on one topic.
4. Netlify builds a deploy preview for every pull request. Check that your pages render correctly there before requesting review.

Only a promotion pull request from `development` targets `main`. Keep history linear; avoid merge commits. Rebase on `development` if your branch falls behind. The site's "Improve this page on GitHub" links open files on `development`.

## Commit messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification, matching the
theme repository. Examples:

```text
docs: add shortcodes reference page
fix: correct relative links in getting-started
chore: bump pinned hugo version
```

Structure commits logically — do not dump unrelated changes into a single commit.

## Contributors list

The contributors table on the
[contributors page](https://gohugo-ananke.github.io/documentation/help/contributors/) is
generated from `data/contributors/` by `scripts/merge-all-contributors.mjs`
(`npm run contributors:merge`). Do not edit the generated list by hand.

## License

By contributing, you agree that your contributions are licensed under the terms in
[LICENSE.md](LICENSE.md).
