---
title: Layout Map
date: 2026-06-06T08:00:00.000+0700
---

* [Which template renders which page](#which-template-renders-which-page)
* [The base template](#the-base-template)
* [Important partials](#important-partials)
* [Shortcodes](#shortcodes)
* [Overriding any of these](#overriding-any-of-these)

This page maps Ananke's templates to the pages they render. It is aimed at
contributors and advanced users who want to find the right file quickly.

## Which template renders which page

| Page type | Template | Example URL |
| --- | --- | --- |
| Homepage | `layouts/home.html` | `/` |
| Section list | `layouts/list.html` | `/posts/` |
| Single page or post | `layouts/single.html` | `/about/`, `/posts/my-post/` |
| Taxonomy list (a term) | `layouts/taxonomy.html` | `/tags/hugo/` |
| Taxonomy terms index | `layouts/terms.html` | `/tags/` |
| Not found | `layouts/404.html` | any missing URL |

Summaries on list pages and the homepage are rendered by
`layouts/summary-with-image.html` (and `layouts/summary.html`).

These follow [Hugo's template lookup order](https://gohugo.io/templates/lookup-order/),
so a more specific template in your own project takes precedence.

## The base template

`layouts/baseof.html` is the shell every page is built on. It defines the
`<head>` (title, meta description, robots meta, canonical link, Open Graph /
Twitter / schema metadata, styles, and scripts) and wraps the page in blocks —
`title`, `header`, `main`, `footer`, and `head` — that the other templates fill
in.

## Important partials

Partials live in `layouts/_partials/`:

* `site-header.html` — the hero/header on the homepage and list pages.
* `page-header.html` — the header on single pages.
* `site-navigation.html` — the main menu, logo, and follow links.
* `site-footer.html` — the footer.
* `social/follow.html` and `social/share.html` — social follow and share links.
* `categories.html` and `tags.html` — taxonomy links on single pages.
* `hook.html` — renders [layout hooks](/hooks-and-filters/) at defined points.
* `site-style.html` and `site-scripts.html` — the CSS and JS pipelines.

## Shortcodes

Shortcodes live in `layouts/_shortcodes/`:

* `form-contact.html` — the [contact form](/shortcodes/contact-form/).
* `page-index.html` — lists a section's child pages.

See the [Shortcodes reference](/shortcodes/) for usage.

## Overriding any of these

You can replace any template or partial from your own project without editing
the theme. See [Overriding partials](/customisation/overriding-partials/) for
the safe pattern and Hugo's
[template lookup order](https://gohugo.io/templates/lookup-order/) for the rules
Hugo follows.
