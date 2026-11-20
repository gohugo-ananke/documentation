---
title: "All hooks & filters"
description: "The list of all hook points in the theme templates."
date: 2026-05-17T08:00:00.000+0700
weight: 300
since: "2.17.0"
aliases:
  - /hooks-and-filters/all/
---

{{< since >}}

This page lists every hook point the theme wires into its templates. Each entry is the value you
pass as the `hook` key (see the [introduction](../introduction/) for how to call hooks and
filters).

A hook point does **nothing** until your site provides a matching partial at
`layouts/_partials/hooks/<name>.html`. Until then the hook is "unused" — the theme prints an
optional debug notice and renders nothing.

Document, layout, content, and article hooks receive the current **page** as their context. Header component hooks receive a dictionary with the page in `.page`; see [Header hook context](/customisation/header/#header-hook-context).

## Document hooks

These fire in the document shell (`layouts/baseof.html`) and are available on every page.

| Hook | Where it fires | Typical use |
| --- | --- | --- |
| `head-end` | At the end of `<head>` (via `head-additions.html`) | Preloads, meta tags, third-party `<link>`/`<script>` tags, verification tags |
| `body-start` | First element inside `<body>` | Skip-links, no-JS banners, `<noscript>` pixels, top-of-page banners |
| `body-end` | Last element before `</body>` | Deferred analytics, chat widgets, scripts that must load last |

## Layout hooks

These wrap the main structural regions of the page (`layouts/baseof.html`).

| Hook | Where it fires | Typical use |
| --- | --- | --- |
| `header-before` | Immediately before the site header | Announcement bars, cookie notices |
| `header-after` | Immediately after the site header | Secondary navigation, breadcrumbs |
| `main-before` | Start of `<main>`, before the page content block | Hero add-ons, page-level notices |
| `main-after` | End of `<main>`, after the page content block | Related-content blocks, calls to action |
| `footer-before` | Immediately before the site footer | Newsletter sign-up, sponsor strip |
| `footer-after` | Immediately after the site footer | Back-to-top button, legal line |

## Content hooks

These fire around the rendered Markdown content (`.Content`) in `layouts/single.html` and
`layouts/page/single.html`.

| Hook | Where it fires | Typical use |
| --- | --- | --- |
| `content-before` | Just before `.Content` inside the article body | Lead-in notices, reading aids |
| `content-after` | Just after `.Content`, before tags and comments | Author bio, share prompts, "edit this page" links |

## Article hooks

These fire inside the article header of a single post (`layouts/single.html`).

| Hook | Where it fires | Default | Typical use |
| --- | --- | --- | --- |
| `article/section-link` | Top of the article header, above the title | **Shipped** — the theme prints the current section name as a link to a page within the section | Override to change or remove the section label |

> [!NOTE]
> `article/section-link` and the built-in header components ship default partials. Providing a partial of the same name in your site replaces that default. Surrounding hooks remain empty until your site supplies them.

### Choosing where the section link points

The shipped `article/section-link` partial renders the section label as a link. The destination is
controlled by the `ananke.section_link` parameter. The visible label is always the section title;
only the link target changes.

Set it in a page's front matter for a single page, or under `[params.ananke]` in your site
configuration for a site-wide default.

| Value | Link target |
| --- | --- |
| *unset* (default) | The section index page (its `_index.md`) |
| `first` | The first page of the section, honouring its sort order |
| `"<path>"` | A specific page, resolved relative to the section (e.g. `introduction` or `/about`) |

An unresolvable path falls back to the section index page.

```yaml
# content/installation/upgrading-from-thenewdynamic.md
---
title: Upgrading from theNewDynamic to gohugo-ananke
ananke:
  section_link: introduction
---
```

## Header component hooks

Each component named `name` calls `header/name-before`, `header/name`, and `header/name-after`. The middle hook supplies the component; the other two add markup around it. The built-in names are `logo`, `languages`, `menu`, `social`, `title`, and `description`.

Their partials live in `layouts/_partials/hooks/header/`. The configured `ananke.header.navigation` and `ananke.header.content` lists select their order. Unlike page hooks, they receive a dictionary, with the current page in `.page`.

See [Header layout and hooks](/customisation/header/) for complete configuration, context fields, styling options, custom components, and migration from header partial overrides.

## How to use a hook

Pick a hook name from the tables above, create the matching partial, and put your markup in it.
For example, to add a snippet at the end of `<head>`:

```go-html-template
{{/* layouts/_partials/hooks/head-end.html */}}
<link rel="preconnect" href="https://fonts.example.com">
```

That is all that is required — the theme already calls the `head-end` hook on every page, so the
partial is picked up automatically.

For worked, in-depth examples (analytics, footer content, navigation, content wrappers, and using
the page context), see [Hook examples](../examples/).
