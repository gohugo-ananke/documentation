# Ananke Documentation

The official documentation site for [Ananke](https://github.com/gohugo-ananke/ananke), the
flexible, production-ready starter theme for [Hugo](https://gohugo.io/).

This site is itself **built with Ananke**, so it doubles as a living example of the theme in use.

[![All Contributors](https://img.shields.io/github/all-contributors/davidsneighbour/gohugo-theme-ananke-documentation?color=ee8449&style=flat-square)](https://ananke-documentation.netlify.app/help/contributors/)

* **Live site:** [ananke-documentation.netlify.app](https://ananke-documentation.netlify.app/)
* **Theme repository:** [github.com/gohugo-ananke/ananke](https://github.com/gohugo-ananke/ananke)
* **Theme demo:** [ananke-theme.netlify.app](https://ananke-theme.netlify.app/)

## What lives here

This repository contains only the documentation content and the site that renders it. The theme
source (layouts, partials, assets, i18n) lives in the separate
[`gohugo-ananke/ananke`](https://github.com/gohugo-ananke/ananke) repository and is pulled in as a
Hugo Module.

```text
content/            # all documentation pages (Markdown); one section per main menu entry
  get-started/      # first steps, installation (Hugo Module, Git submodule), upgrading
  configuration/    # site/params configuration (general, menus, SEO, social…)
  content/          # content & front-matter features
    shortcodes/     # the theme's shortcodes
  customisation/    # colours, styles, hero, comments, partials
    hooks-and-filters/ # the theme's hooks & filters system
  examples/         # complete example sites and copy-paste recipes
  help/             # troubleshooting, contributing, contributors
config/             # Hugo configuration
  _default/         # production config (uses the published ananke module; menus.toml holds the main menu)
  development/      # local config (replaces the module with ../ananke)
assets/             # docs-only CSS, fonts (the theme provides its own)
layouts/            # docs-only overrides (e.g. the `since` shortcode)
data/contributors/  # all-contributors source data
scripts/            # maintenance scripts
```

## Documentation colours

The documentation uses a fixed dark palette built from Tailwind CSS's yellow and olive colour ranges. These are plain CSS custom properties; Tailwind is not a dependency. The shared Ananke theme keeps its own default colours.

Edit the palette and semantic roles in [`docs-colors.css`](assets/ananke/css/docs-colors.css). Components use roles such as `--docs-background`, `--docs-text`, and `--docs-accent`. [`docs-theme.css`](assets/ananke/css/docs-theme.css) maps inherited colour utilities to these roles, while [`highlighting.css`](assets/ananke/css/highlighting.css) styles code examples and their controls. Check text contrast, focus indicators, search results, and mobile rendering when changing these colours.

## Prerequisites

* **Hugo** — use the standard binary, currently v0.170.1 in [`netlify.toml`](netlify.toml) and the GitHub Pages workflow. The theme continues to support Hugo v0.160.0 or later. Check the installed version with `hugo version`.
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

The tests use temporary repositories and a substitute Hugo command. Stop a running port 1313 preview before running this suite; the launcher tests currently require that port.

### Manual previews

Use `hugo server --environment production` to preview the published module pinned in `go.mod`. Use `hugo server --environment development` to preview the sibling Ananke working tree without branch selection. The existing `npm run server` command provides the latter preview with local TLS through Wireit. These manual commands do not pair the repository branches.

## Build and deploy selection

The shared development server and published builds deliberately select the theme differently:

| Command | Theme source | Publishes anything? |
| --- | --- | --- |
| `npm run dev` | Branch-paired sibling working tree through `HUGO_MODULE_REPLACEMENTS` | No |
| `npm run build` | Latest stable released Ananke module | No |
| `npm run build:preview` | Remote `development`, or an explicit theme ref | No |
| `npm run deploy` | Same selection as a preview build | Draft Netlify deploy |
| `npm run deploy:production` | Latest stable released Ananke module | Production Netlify deploy |

Builds use `scripts/build.ts`. It resolves the theme in a temporary source tree, clears inherited local module replacements, forces the production Hugo environment, runs Hugo and Pagefind, and removes the temporary tree afterwards. The checked-in `go.mod` and `go.sum` stay unchanged. The build log records the selected theme revision and Hugo version. A plain `hugo` command still uses the checked-in dependency pin.

Production uses the latest stable release tag, not an unreleased commit on `main`. The theme's stable release process runs from `main`; publish that release before building the matching live documentation. Pass `--expect-theme-version` with the just-published tag to stop the build if the module resolver still returns an older version. Allow the release to become available, then rebuild; do not silently publish the older result.

Preview builds default to `development`. Select another remote branch, tag, or commit with `--theme-ref` or `ANANKE_THEME_REF`:

```bash
npm run build:preview -- --theme-ref rework/header
npm run build:preview -- --theme-ref main --destination /tmp/ananke-main-preview
```

Slash-containing branch names are resolved to a commit before querying Go. Production ignores `ANANKE_THEME_REF` and rejects `--theme-ref`; use a preview for unreleased work. Netlify deploy previews and branch deploys use the preview command and their preview URL. GitHub Pages and the Netlify production context use the stable production command. Both platforms build the Pagefind search assets.

With Netlify CLI installed, authenticated, and linked to this project:

```bash
npm run deploy -- --theme-ref development
npm run deploy:production
```

The commands build and index the site before invoking Netlify with `--no-build`. Only `deploy:production` passes `--prod`. Neither command changes the theme checkout or Git branches. Do not run these commands when you only want local validation.

To preview a complete build with search:

```bash
npm run build
npm run search:serve
```

For a complete build against the local theme working tree, use `hugo --environment development --minify`, then `npm run search:index`. Setting `HUGO_ENV=development` on `npm run build` does not enable a local replacement: production builds deliberately ignore it. A regular `hugo server` does not run Pagefind; rebuild the index after changing content.

Test the selection and deployment arguments without downloading themes or publishing:

```bash
npm run test:build
node --test scripts/dev.test.ts
```

The tests use temporary fixtures and substitute commands. See [the release and publication guide](content/help/development.md#release-and-publication-order) for release ordering and follow-up checks.

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
