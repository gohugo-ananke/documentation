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
* Add recipes to the `cookbook/` section.
* Improve the docs site itself (display, navigation, accessibility).

If you are documenting a feature that does not behave as described, please open an issue on the
[theme repository](https://github.com/gohugo-ananke/ananke/issues) — the fix may belong in the
theme rather than the docs.

## Setting up

```bash
git clone git@github.com:gohugo-ananke/documentation.git
cd documentation
npm install            # installs linters and git hooks
hugo server            # builds against the published theme module
```

To preview your content against a **local** theme checkout (sibling `../ananke` directory), use
the development environment, which replaces the published module with your working tree:

```bash
hugo server --environment development
```

See the [README](README.md) for the full explanation of both build modes.

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

New feature pages should follow this structure so the docs stay consistent:

1. **Summary** — one or two sentences on what the feature does and why you would use it.
2. **Quick start** — the smallest copy-paste example that works.
3. **Options reference** — a table of every parameter with type, default, and required/optional.
4. **How it works** — the internals: which partial/template implements it, resolution order, etc.
5. **Gotchas** — common mistakes and edge cases.
6. **See also** — links to related pages and the relevant Hugo documentation.

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

This repository uses a simple, rebase-based model with a single long-lived branch, `main`.

1. Create a short-lived, focused branch off `main`. Use a descriptive prefix, for example
   `docs/document-shortcodes` or `fix/broken-installation-links`.
2. Make your changes and ensure the linters pass.
3. Open a pull request targeting `main`. Keep it focused on one topic.
4. Netlify builds a deploy preview for every pull request — check that your pages render correctly
   there before requesting review.

Keep history linear; avoid merge commits. Rebase on `main` if your branch falls behind.

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
[contributors page](https://ananke-documentation.netlify.app/information/contributors/) is
generated from `data/contributors/` by `scripts/merge-all-contributors.mjs`
(`npm run contributors:merge`). Do not edit the generated list by hand.

## License

By contributing, you agree that your contributions are licensed under the terms in
[LICENSE.md](LICENSE.md).
