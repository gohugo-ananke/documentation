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

## Submenus

Ananke shows child entries of the `main` menu as a submenu under their parent entry. On a site with JavaScript, the submenu opens as a dropdown when the reader selects the toggle button next to the parent entry. Use submenus to group related pages and keep the top level of the menu short.

### Add a submenu

Give the parent entry an `identifier`. Then set `parent` on each child entry to the identifier of its parent:

```toml
# config/_default/menus.toml

[[main]]
name = "Posts"
pageRef = "/posts/"
identifier = "posts"
weight = 10

[[main]]
name = "Second post"
pageRef = "/posts/second/"
parent = "posts"
weight = 20

[[main]]
name = "Topics"
identifier = "topics"
weight = 15

[[main]]
name = "Tags"
pageRef = "/tags/"
identifier = "tags"
parent = "topics"
weight = 20

[[main]]
name = "About"
pageRef = "/about/"
weight = 20
```

In this example, "Posts" is a parent entry with its own page, "Topics" is a parent entry without a page, and "About" is an entry without children.

You can also add a page to a submenu from its own front matter:

```yaml
---
title: Second post
menus:
  main:
    parent: posts
    weight: 10
---
```

Submenus use Hugo's standard menu model. There is no Ananke-specific format and no `[ananke]` parameter to turn them on.

| Field | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `identifier` | string | the value of `name` | Optional | A unique name for the entry. Set it on parent entries so that children can refer to them. |
| `parent` | string | none | Required for child entries | The `identifier` of the parent entry. If the parent has no `identifier`, use its `name`. |
| `weight` | integer | `0` | Optional | Sorts the entries in a submenu, lowest first, in the same way as the top level. |

For all menu entry fields, see [Hugo's menu documentation](https://gohugo.io/content-management/menus/).

### How submenus work

* **Parent entry with a page:** the parent stays a link to its page. A separate toggle button next to it opens and closes the submenu.
* **Parent entry without a page:** a parent without `pageRef` or `url` shows as a toggle button with the entry name.
* **Depth:** only the first level of children opens as a dropdown. Entries below the second level show as indented lists inside the open dropdown, without their own toggle button.
* **Keyboard and pointer:** Tab moves through the entries in reading order. Enter or Space opens and closes a submenu. Escape closes it and moves focus back to its toggle button. A click outside the submenu, or moving keyboard focus out of the entry, also closes it. Only one submenu is open at a time. Hovering over an entry does not open its submenu.
* **Without JavaScript:** all child links show as a nested list under their parent entry, and the toggle buttons do not show. Readers can reach every page.
* **Layout:** the dropdown follows the text direction of right-to-left languages. On screens narrower than 30em, it spans the width of the screen, with a small margin on each side. If a dropdown would go past the edge of the screen, it aligns to the other side of its parent entry.

### Current page

Every entry of the `main` menu gets an `aria-current` attribute when it is related to the page that the reader is on:

* `aria-current="page"` when the entry links to the current page;
* `aria-current="true"` when the current page is below the entry. This uses Hugo's `.HasMenuCurrent` method, so it is also true for an entry that links to a section when the reader is on any page in that section.

Screen readers announce this attribute. You can also use it in [custom CSS](/customisation/custom-css/) to mark the current section, for example:

```css
/* assets/ananke/css/custom.css */

nav a[aria-current] {
  text-decoration: underline;
}
```

### Toggle button label

The toggle button next to a parent link has a hidden text label for screen readers. The label comes from the `submenuToggle` translation string. In English, it is the entry name followed by "submenu", for example "Posts submenu":

```toml
# i18n/en.toml

[submenuToggle]
other = "{{ .Name }} submenu"
```

The theme has this string only in English. If a language has no translation, Hugo uses the translation of the site's default content language. If that language has no translation either, the label is the entry name only. To add or change the label for your languages, see [Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings). Translations for the theme are welcome in the [theme repository](https://github.com/gohugo-ananke/ananke).

### Common mistakes

* **Existing child entries now show.** Older Ananke versions ignored child entries of the `main` menu. If your configuration already has entries with `parent`, they now show as submenus. Remove `parent` from these entries if you do not want submenus.
* **Overridden `site-scripts.html`.** The submenu script is part of `layouts/_partials/site-scripts.html`. The theme adds it only when a `main` menu entry has children, and it does not depend on the `copy_code` setting. If your project overrides this partial, the menu still works, but it uses the version without JavaScript: the submenus are always open as nested lists. To get dropdowns, copy the submenu script block from the theme's version of the partial into your override.
* **Overridden `site-navigation.html`.** If your project overrides `layouts/_partials/site-navigation.html`, your version controls the menu markup. Compare it with the theme's current version to get submenus.

## What the theme does and does not render

* The theme renders the `main` menu with one level of [submenus](#submenus). Entries below the second level show inside the submenu of their top-level entry.
* The theme does **not** use a separate footer menu. Footer links come from the
  social follow links and the site footer partial, not from a Hugo `footer`
  menu. To change the footer, override
  [`layouts/_partials/site-footer.html`](https://gohugo.io/templates/lookup-order/)
  in your project.

For the general Hugo reference on menus, see
[Hugo's menu documentation](https://gohugo.io/content-management/menus/).
