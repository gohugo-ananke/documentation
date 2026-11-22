---
title: How Ananke configuration works
description: "Where settings live, how Hugo combines your settings with the theme defaults, and how page values override site values."
date: 2026-11-22T00:00:00+07:00
weight: 200
---

An Ananke site gets its behaviour from three sources: the defaults that the theme ships, your site configuration, and the front matter of your pages. This page explains how these sources fit together. For the name, type, and default of each setting, see the [configuration reference](/configuration/reference/).

## Two places for settings

Site configuration applies to the whole site. It contains Hugo settings such as `baseURL` and `title`, your menus, and the `params` table, where Ananke reads its own options.

Front matter applies to one page. Some Ananke options can also be set in front matter. Then the page value replaces the site value for that page. The configuration reference shows, for each setting, whether a page can override it.

## Configuration files and directories

Hugo accepts a single configuration file or a configuration directory. A single file is `hugo.toml`, `hugo.yaml`, or `hugo.json` in the project root. A configuration directory splits the same settings into files by topic:

```text
my-site/
└── config/
    └── _default/
        ├── hugo.toml      # core Hugo settings (baseURL, title, taxonomies, …)
        ├── module.toml    # Hugo Module imports (Hugo Module installations only)
        ├── menus.toml     # navigation menus
        └── params.toml    # site parameters, including the [ananke] table
```

Ananke's sample repositories use a configuration directory, because related settings stay together in small files. Both forms produce the same result. When this documentation refers to "the configuration file", it means either form. See Hugo's documentation on [configuration files](https://gohugo.io/configuration/introduction/#configuration-file) and [configuration directories](https://gohugo.io/configuration/introduction/#configuration-directory).

### How to read the examples

Each configuration example starts with a comment that names its file, for example `# config/_default/params.toml`. A file in a configuration directory holds one top-level table, so `params.toml` contains `[ananke]` where a single `hugo.toml` would contain `[params.ananke]`. If you use a single file, put the example under the matching table heading. Blocks between `+++` or `---` markers at the top of a content file are front matter for that page.

## How Hugo combines configuration

Hugo builds the final configuration from several sources. In order of increasing precedence, these are:

1. The theme defaults: the configuration that Ananke ships in its own `config/_default/`.
2. Your `config/_default/` directory or your single configuration file.
3. Environment files: `config/<environment>/`, for example `config/production/`, when you build for that environment.
4. Operating system environment variables with the `HUGO_` prefix.

A later source wins. Thus you do not copy the theme configuration into your site. You set only the values that you want to change.

Hugo merges tables (maps) key by key. If you set `show_categories = false` under `[ananke]`, the other theme defaults under `[ananke]` stay active. Lists are not merged: your list replaces the theme's list completely. For example, if you set `responsive_image_widths = [800]`, Ananke uses only that width, and if you change `ananke.header.navigation`, you must give the complete layout.

To see the result of the merge, run:

```bash
hugo config
```

> [!NOTE]
> The output of `hugo config` does not show keys whose value is `false`. A missing key in the output can therefore mean that your `false` value is active.

## The `ananke` namespace and older parameters

Ananke reads most of its options from the `ananke` table, for example `params.ananke.show_recent_posts`. The namespace keeps theme options apart from the parameters of your site and of other modules.

Some older options are still read directly from `params`, for example `recent_posts_number`, `date_format`, `site_logo`, and the colour class options. These are current options, not deprecated ones; copy each example to the table that its comment shows. One flat option is deprecated: `params.custom_css` still works, but the build log shows a warning. Use `params.ananke.custom_css` instead. The [configuration reference](/configuration/reference/) lists the table for each option.

If you migrate a site from the theNewDynamic version of the theme, see [Upgrade from theNewDynamic](/get-started/upgrade-from-thenewdynamic/).

## Site, section, and page values

Many Ananke options use Hugo's [`Param` method](https://gohugo.io/methods/page/param/). This method first looks for the key in the front matter of the current page, then in the site parameters. A page value therefore replaces the site value for that page only.

To give all pages of a section the same value, set it with `cascade` in the section's `_index.md`. A cascaded value counts as a page value. Hugo does not merge a page's own `ananke` map with a cascaded `ananke` map: if a page sets its own `ananke` values, it replaces the cascaded map and must repeat every cascaded value that it needs. The [date and section title settings](/configuration/general/#set-dates-and-section-titles-for-one-section) show an example.

Some options apply only to the whole site, and a front matter value has no effect. Other options apply only to one page. The configuration reference marks the scope of each option.

## Your site, not the theme

Some settings always belong to your site:

* `baseURL`, `title`, and `locale`, which identify the site.
* `theme`, or the imports in `module.toml`, which declare how the theme is installed.
* Menus, which describe your navigation.
* Taxonomies, output formats, and other Hugo settings, which describe your content model.
* Your values under `[params.ananke]`, which change the theme behaviour.

The theme files supply defaults and templates. Do not edit files in `themes/ananke` or in the Hugo module cache. A theme update replaces those files, and your changes are lost. The only exception is a fork of the theme that you maintain yourself.

Change the theme behaviour from your own project instead:

* For configuration, set the key in your site configuration. Your value replaces the theme default.
* For templates, copy one file to the same path in your project's `layouts/` directory. Hugo's [template lookup order](https://gohugo.io/templates/lookup-order/) uses your copy first. See [Overriding partials](/customisation/overriding-partials/), and use [hooks and filters](/customisation/hooks-and-filters/introduction/) where a hook exists, because a hook does not replace a complete theme template.
* For styles, add your own stylesheets with `params.ananke.custom_css`. See [Custom CSS](/customisation/custom-css/).

## Related pages

* [Configuration reference](/configuration/reference/): every option, with its type, default, and scope.
* [Install as a Hugo Module](/get-started/hugo-module/) and [Install as a Git submodule](/get-started/git-submodule/): installation procedures and the matching configuration.
* [Choose an installation method](/get-started/installation/): a comparison of both methods.
