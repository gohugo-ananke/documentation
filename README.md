# Ananke Documentation

The official documentation site for [Ananke](https://github.com/gohugo-ananke/ananke), the
flexible, production-ready starter theme for [Hugo](https://gohugo.io/).

This site is itself **built with Ananke**, so it doubles as a living example of the theme in use.

[![All Contributors](https://img.shields.io/github/all-contributors/davidsneighbour/gohugo-theme-ananke-documentation?color=ee8449&style=flat-square)](https://ananke-documentation.netlify.app/information/contributors/)

* **Live site:** [ananke-documentation.netlify.app](https://ananke-documentation.netlify.app/)
* **Theme repository:** [github.com/gohugo-ananke/ananke](https://github.com/gohugo-ananke/ananke)
* **Theme demo:** [ananke-theme.netlify.app](https://ananke-theme.netlify.app/)

## What lives here

This repository contains only the documentation content and the site that renders it. The theme
source (layouts, partials, assets, i18n) lives in the separate
[`gohugo-ananke/ananke`](https://github.com/gohugo-ananke/ananke) repository and is pulled in as a
Hugo Module.

```text
content/            # all documentation pages (Markdown)
  installation/     # install as Hugo Module or git submodule
  getting-started.md
  configuration/    # site/params configuration (general, SEO, social…)
  content/          # content & front-matter features
  customisation/    # colours, comments, hero, styles
  hooks-and-filters/# the theme's hooks & filters system
  cookbook/         # copy-paste recipes
  information/      # contributors, meta
config/             # Hugo configuration
  _default/         # production config (uses the published ananke module)
  development/      # local config (replaces the module with ../ananke)
assets/             # docs-only CSS, fonts (the theme provides its own)
layouts/            # docs-only overrides (e.g. the `since` shortcode)
data/contributors/  # all-contributors source data
scripts/            # maintenance scripts
```

## Prerequisites

* **Hugo (extended)** — the version pinned in [`netlify.toml`](netlify.toml) (`0.161.1` at time of
  writing). Check yours with `hugo version`. The theme requires at least the version in the
  theme's `config/_default/module.toml`.
* **Go** — required by Hugo Modules to resolve the theme dependency.
* **Node.js 22.18 or later** — required for the shared development launcher and npm tools.

## Running locally

### Shared development server

Keep `ananke/` and `documentation/` next to each other, install the documentation dependencies with `npm install`, and use Node.js 22.18 or later. Run this command from either repository root:

```bash
npm run dev
```

Both commands use the launcher in `documentation/scripts/dev.ts` and serve the documentation site at `http://127.0.0.1:1313/`. The launcher sets `HUGO_MODULE_REPLACEMENTS` to the absolute path of the sibling Ananke working tree. Edits in either repository are included in the preview.

The calling repository determines the companion branch:

| Calling branch | Companion branch |
| --- | --- |
| `main` | `main` |
| `development` | `development` |
| Any other named branch that also exists locally in the companion | The same branch |
| Any other named branch missing from the companion | `development` |

For example, if both repositories have `feat/shared-dev-server`, the launcher selects that branch in the companion. If both are already on it, no switch is needed, and uncommitted edits are allowed.

The caller stays on its current branch. The launcher prints both starting branches, states whether the companion was switched, and prints both branches used by the server. It uses existing local branches without fetching, pulling, or creating branches. Both repositories must contain the dev command and shared launcher after this change is integrated into their long-lived branches.

If a switch is needed, the companion must have no uncommitted or untracked changes. The launcher stops instead of stashing or discarding work. Edits are allowed when the companion is already on the required branch. A detached caller is rejected. Files under `scratch/` are excluded from the dirty-worktree check.

Port 1313 is fixed. If it is occupied, the launcher stops before switching branches and reports the server address. Stop the existing server and rerun the command to select a new branch pair. Restart after switching branches during a session; branch selection runs only at startup. Stopping the server leaves both repositories on the displayed branches.

To check the launcher without changing your real checkouts, run:

```bash
node --test scripts/dev.test.ts
```

The tests use temporary repositories and a substitute Hugo command.

### Manual previews

Use `hugo server --environment production` to preview the published module pinned in `go.mod`. Use `hugo server --environment development` to preview the sibling Ananke working tree without branch selection. The existing `npm run server` command provides the latter preview with local TLS through Wireit. These manual commands do not pair the repository branches.

## Building for production

Netlify builds the site with:

```bash
npm run build
```

This runs Hugo and then Pagefind, which creates the search index and browser assets under `public/pagefind/`. The inline search field in the top navigation displays matching pages and sections in a dropdown. It supports keyboard navigation and the Ctrl+K/Cmd+K shortcut. Netlify also indexes deploy previews and branch deploys after Hugo builds their pages.

With Netlify CLI installed, authenticated, and linked to this Netlify project, use these commands to build the site, update the Pagefind index, and deploy `public/`:

```bash
npm run deploy              # create a draft deploy
npm run deploy:production   # deploy to production and open the site
```

Both commands stop if the build or indexing fails. The production command passes `--prod --open` to Netlify CLI.

To preview the complete built site with working search:

```bash
npm run build
npm run search:serve
```

A regular `hugo server` preview does not run the post-build indexer. For a build against a local theme checkout, set `HUGO_ENV=development` when running `npm run build`. After changing content, rebuild before testing search. Search uses the generated index; it does not require a search service or API key.

`pagefind.yml` limits indexing to the page's main content and excludes code-block controls, heading links, and line numbers. Code examples remain searchable. The navigation uses Pagefind's searchbox component. Its browser assets load on all pages; the index is loaded when readers interact with search. Navigation, including search, is outside the indexed content.

See [`netlify.toml`](netlify.toml) for the per-context build commands (production, deploy preview,
branch deploy).

## Contributing

Documentation contributions are very welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for
the page style guide, branch/PR workflow, and linting requirements before opening a pull request.

Quick checks before pushing:

```bash
npm install            # first time only
npm run lint:markdown  # markdownlint
npm run lint:links     # lychee (run `hugo server` first; checks http://localhost:1313)
```

## License

Documentation content is licensed under the terms in [LICENSE.md](LICENSE.md).
