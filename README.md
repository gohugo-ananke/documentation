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

## Prerequisites

* **Hugo (extended)** — the version pinned in [`netlify.toml`](netlify.toml) (`0.161.1` at time of
  writing). Check yours with `hugo version`. The theme requires at least the version in the
  theme's `config/_default/module.toml`.
* **Go** — required by Hugo Modules to resolve the theme dependency.
* **Node.js** — only needed for the linting/maintenance scripts (`npm install`).

## Running locally

There are two modes, depending on whether you want to render against the **published** theme or
your **local** theme checkout.

### Against the published theme (default)

```bash
hugo server
```

This uses `config/_default/` and pulls the released `github.com/gohugo-ananke/ananke/v2` module.

### Against a local theme checkout (recommended when changing the theme)

If you have the theme checked out as a sibling directory (`../ananke`), build with the
`development` environment. [`config/development/module.toml`](config/development/module.toml)
replaces the published module with your local working tree:

```toml
replacements = "github.com/gohugo-ananke/ananke/v2 -> ../../ananke"
```

```bash
hugo server --environment development
```

Now any edit you make in `../ananke` is reflected live in the docs site — ideal for verifying a
theme change against real content.

> [!NOTE]
> The relative path `../../ananke` is resolved from the module config, so the theme repo must sit
> next to this one (`some-parent/ananke` and `some-parent/documentation`).

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
