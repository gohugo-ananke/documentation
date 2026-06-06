---
title: Menus
date: 2026-06-06T08:00:00.000+0700
---

* [The main menu](#the-main-menu)
* [Adding entries](#adding-entries)
* [External links](#external-links)
* [Controlling the order](#controlling-the-order)
* [Adding a page from its front matter](#adding-a-page-from-its-front-matter)
* [What the theme does and does not render](#what-the-theme-does-and-does-not-render)

Ananke shows a navigation menu in the header, next to the site title (or logo)
and the social follow links. It is built from Hugo's `main` menu.

## The main menu

Define the menu in your site configuration. Each entry needs a `name` and a
target — either a `pageRef` (a reference to a page in your site) or a `url`:

```toml
# config/_default/menus.toml

[[main]]
name = "Home"
pageRef = "/"
weight = 10

[[main]]
name = "Posts"
pageRef = "/posts/"
weight = 20

[[main]]
name = "About"
pageRef = "/about/"
weight = 30
```

> [!NOTE]
> If you keep all configuration in a single file instead of a configuration
> directory, the same entries go under a `[menus]` table, for example
> `[[menus.main]]` in `hugo.toml`.

The fields are:

* `name` — the link text shown in the menu.
* `pageRef` — a path to a page or section in your site (for example `/about/`).
  Hugo resolves it to the correct URL and keeps it valid if your `baseURL`
  changes.
* `url` — an explicit address, used for external links (see below). Use either
  `pageRef` or `url`, not both.
* `weight` — a number controlling order (see below).

## Adding entries

Each `[[main]]` block adds one entry. Add as many as you need; they appear in
the header in `weight` order.

## External links

To link somewhere outside your site, use `url` with a full address instead of
`pageRef`:

```toml
# config/_default/menus.toml

[[main]]
name = "GitHub"
url = "https://github.com/example"
weight = 40
```

## Controlling the order

Menu entries are sorted by `weight`, lowest first. Leave gaps (10, 20, 30…) so
you can insert new entries later without renumbering everything.

## Adding a page from its front matter

Instead of listing a page in the configuration, you can attach it to the main
menu from its own front matter:

```yaml
---
title: About
menus: main
---
```

This is handy for one-off pages. For a stable, ordered site navigation, prefer
defining the menu in `menus.toml`.

## What the theme does and does not render

* The theme renders a **single-level** `main` menu. Nested submenus and dropdown
  menus are **not** displayed — child entries will not appear, so keep the menu
  flat.
* The theme does **not** use a separate footer menu. Footer links come from the
  social follow links and the site footer partial, not from a Hugo `footer`
  menu. To change the footer, override
  [`layouts/_partials/site-footer.html`](https://gohugo.io/templates/lookup-order/)
  in your project.

For the general Hugo reference on menus, see
[Hugo's menu documentation](https://gohugo.io/content-management/menus/).
