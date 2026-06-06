---
title: Configuration Reference
date: 2026-06-06T08:00:00.000+0700
weight: 100
---

* [Where configuration lives](#where-configuration-lives)
* [How Hugo merges configuration](#how-hugo-merges-configuration)
* [How theme defaults work](#how-theme-defaults-work)
* [What belongs in your site, not the theme](#what-belongs-in-your-site-not-the-theme)
* [Installing the theme: Hugo Module](#installing-the-theme-hugo-module)
* [Installing the theme: Git submodule](#installing-the-theme-git-submodule)
* [How to override defaults safely](#how-to-override-defaults-safely)
* [Where each example goes](#where-each-example-goes)

This page is the central reference for configuring an Ananke site. It explains
where configuration files live, how Hugo combines them, and how the theme's
defaults interact with your own settings. Individual options are documented on
their own pages (for example [General Configuration](/configuration/general/),
[Social Media Networks](/configuration/social-media-networks/), and
[SEO](/configuration/seo/)); this page explains the structure those options sit
inside.

> [!IMPORTANT]
> Ananke reads its own options from the `ananke` parameter namespace, for
> example `params.ananke.show_recent_posts`. Older versions of the theme (when
> it lived under `theNewDynamic`) used flat parameters such as
> `recent_posts_number` or `custom_css`. If you are migrating an old site, move
> those values under the `[ananke]` table. Deprecated flat parameters still emit
> a warning in the build log.

## Where configuration lives

Hugo can be configured with a single file or a configuration directory. Ananke's
sample repositories use a configuration directory, and we recommend it because
it keeps related settings in separate, readable files.

A typical project looks like this:

```text
my-site/
└── config/
    └── _default/
        ├── hugo.toml      # core Hugo settings (baseURL, title, taxonomies, …)
        ├── module.toml    # Hugo Module imports (Module installs only)
        ├── menus.toml      # navigation menus
        └── params.toml    # site parameters, including the [ananke] table
```

A single-file setup is also valid. In that case all settings live in one
`hugo.toml` (or `hugo.yaml` / `hugo.json`) in the project root.

> [!NOTE]
> Whenever this documentation refers to "the configuration file", it means any
> of these locations. See Hugo's documentation on
> [configuration files](https://gohugo.io/configuration/introduction/#configuration-file)
> and
> [configuration directories](https://gohugo.io/configuration/introduction/#configuration-directory).

A minimal `hugo.toml` for a site using the theme as a classic theme (Git
submodule) looks like this:

```toml
# config/_default/hugo.toml

baseURL = "https://example.com/"
languageCode = "en-gb"
title = "Example site"
theme = "ananke"
```

Hugo Module users do **not** set `theme = "ananke"`. They import the theme in
`module.toml` instead — see [below](#installing-the-theme-hugo-module).

## How Hugo merges configuration

Hugo builds the final configuration by merging several sources, in order of
increasing precedence:

1. **Theme defaults** — the configuration Ananke ships with (the `[ananke]`
   table in the theme's `params.toml`).
2. **Your `config/_default/`** — your project's base configuration.
3. **Environment overrides** — files in `config/<environment>/`, for example
   `config/production/`, merged on top when you build for that environment.
4. **Operating-system environment variables** — `HUGO_`-prefixed variables, the
   highest precedence.

Later sources win. This means you never need to copy the whole theme
configuration into your project: you only set the values you want to change, and
they override the matching theme defaults. Maps (tables) are merged key by key;
your keys are added to or replace the theme's keys at the same path.

To see the fully merged result, run:

```bash
hugo config
```

## How theme defaults work

Ananke ships sensible defaults in its own `config/_default/params.toml`, all
under the `ananke` namespace. For example, the theme enables recent posts on the
homepage and category links on single pages by default:

```toml
# shipped by the theme — you do not need to copy this

[ananke]
show_recent_posts = true
show_categories = true
```

Because Hugo merges theme configuration underneath your own, these defaults are
active automatically. To change one, set just that key in your site's
`params.toml`:

```toml
# config/_default/params.toml (your site)

[ananke]
show_recent_posts = false
```

Everything else the theme provides stays at its default value.

## What belongs in your site, not the theme

Some settings are always yours and should live in your project configuration,
never in the theme:

* `baseURL`, `title`, `languageCode` — identify your site.
* `theme` or the `module.toml` imports — declare how the theme is installed.
* `[menus]` — your navigation.
* `[params.ananke]` overrides — your customisations of theme behaviour.
* `[taxonomies]`, `[outputs]`, and other Hugo-level settings — your content
  model.

The theme's own files exist only to provide defaults and templates. Treat them
as read-only (see [the warning below](#how-to-override-defaults-safely)).

## Installing the theme: Hugo Module

Hugo Modules are the recommended installation method. Initialise a module for
your site once, then import the theme:

```bash
hugo mod init github.com/you/my-site
```

```toml
# config/_default/module.toml

[[imports]]
path = "github.com/gohugo-ananke/ananke/v2"
```

Then fetch and tidy the module:

```bash
hugo mod get github.com/gohugo-ananke/ananke/v2
hugo mod tidy
```

Note the `/v2` suffix in the module path — it is required. For a full
walk-through, see [Install as Hugo Module](/installation/gohugo-module/).

## Installing the theme: Git submodule

If you prefer Git submodules, add the theme under `themes/ananke` and point
`theme` at it:

```bash
git submodule add https://github.com/gohugo-ananke/ananke.git themes/ananke
```

```toml
# config/_default/hugo.toml

theme = "ananke"
```

For a full walk-through, see [Install as Git Submodule](/installation/git-submodule/).

## How to override defaults safely

> [!WARNING]
> Do not edit files inside `themes/ananke` (Git submodule) or inside the module
> cache (Hugo Module). Those files are replaced on the next theme update, and
> your changes will be lost. The only exception is if you intentionally maintain
> your own fork of the theme.

To change the theme's behaviour, override it from your own project:

* **Configuration** — set the matching key under `[ananke]` in your
  `params.toml`. Your value wins over the theme default.
* **Templates and partials** — copy the single file you want to change from the
  theme into the same path under your project's `layouts/` directory. Hugo's
  lookup order uses your copy first. (A dedicated partial-override guide is
  planned; until then see Hugo's
  [template lookup order](https://gohugo.io/templates/lookup-order/).)
* **Assets and CSS** — add your own files rather than editing the theme's. Use
  `params.ananke.custom_css` for extra stylesheets; see
  [Styles and CSS](/customisation/styles/).

## Where each example goes

Every example in this documentation shows its target path in a comment on the
first line, so you always know where the code belongs:

* `# config/_default/hugo.toml` — core Hugo settings.
* `# config/_default/params.toml` — site parameters, including `[ananke]`.
* `# config/_default/menus.toml` — navigation menus.
* `# config/_default/module.toml` — Hugo Module imports.
* `+++` / `---` blocks at the top of a content file — front matter for that
  single page.

If your site uses a single configuration file instead of a directory, place the
contents of any `config/_default/*.toml` example into your root `hugo.toml`
under the appropriate table heading.
