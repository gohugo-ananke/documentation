---
title: All Hooks & Filters
date: 2026-05-17T08:00:00.000+0700
weight: 500
since: "2.17.0"
---

{{< since >}}

This page lists every hook point the theme wires into its templates. Each entry is the value you
pass as the `hook` key (see the [introduction](../introduction/) for how to call hooks and
filters).

A hook point does **nothing** until your site provides a matching partial at
`layouts/_partials/hooks/<name>.html`. Until then the hook is "unused" — the theme prints an
optional debug notice and renders nothing.

Every hook in this list is called by the theme with the current **page** as its `context`, so the
matching partial receives a page and can use `.Title`, `.Permalink`, `.Params`, `site`, and so on.

* [Document hooks](#document-hooks)
* [Layout hooks](#layout-hooks)
* [Content hooks](#content-hooks)
* [Article hooks](#article-hooks)
* [How to use a hook](#how-to-use-a-hook)

## Document hooks

These fire in the document shell (`layouts/baseof.html`) and are available on every page.

| Hook         | Where it fires                                     | Typical use                                                                  |
| ------------ | -------------------------------------------------- | ---------------------------------------------------------------------------- |
| `head-end`   | At the end of `<head>` (via `head-additions.html`) | Preloads, meta tags, third-party `<link>`/`<script>` tags, verification tags |
| `body-start` | First element inside `<body>`                      | Skip-links, no-JS banners, `<noscript>` pixels, top-of-page banners          |
| `body-end`   | Last element before `</body>`                      | Deferred analytics, chat widgets, scripts that must load last                |

## Layout hooks

These wrap the main structural regions of the page (`layouts/baseof.html`).

| Hook            | Where it fires                                   | Typical use                             |
| --------------- | ------------------------------------------------ | --------------------------------------- |
| `header-before` | Immediately before the site header               | Announcement bars, cookie notices       |
| `header-after`  | Immediately after the site header                | Secondary navigation, breadcrumbs       |
| `main-before`   | Start of `<main>`, before the page content block | Hero add-ons, page-level notices        |
| `main-after`    | End of `<main>`, after the page content block    | Related-content blocks, calls to action |
| `footer-before` | Immediately before the site footer               | Newsletter sign-up, sponsor strip       |
| `footer-after`  | Immediately after the site footer                | Back-to-top button, legal line          |

## Content hooks

These fire around the rendered Markdown content (`.Content`) in `layouts/single.html` and
`layouts/page/single.html`.

| Hook             | Where it fires                                  | Typical use                                       |
| ---------------- | ----------------------------------------------- | ------------------------------------------------- |
| `content-before` | Just before `.Content` inside the article body  | Lead-in notices, reading aids                     |
| `content-after`  | Just after `.Content`, before tags and comments | Author bio, share prompts, "edit this page" links |

## Article hooks

These fire inside the article header of a single post (`layouts/single.html`).

| Hook                   | Where it fires                             | Default                                                 | Typical use                                    |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------- | ---------------------------------------------- |
| `article/section-link` | Top of the article header, above the title | **Shipped** — the theme prints the current section name | Override to change or remove the section label |

> [!NOTE]
> `article/section-link` is the one hook the theme ships a default partial for
> (`layouts/_partials/hooks/article/section-link.html`). Providing your own partial of the same
> name in your site **replaces** the default. All other hooks in this list ship empty (unused) and
> render nothing until you add a partial.

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
