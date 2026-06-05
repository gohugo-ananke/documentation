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
hugo --gc --minify
```

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
