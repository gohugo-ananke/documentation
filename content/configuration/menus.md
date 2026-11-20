---
title: Menus
description: "Define the main navigation menu in the header, with optional submenus."
date: 2026-06-06T08:00:00.000+0700
weight: 400
---

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

## Responsive navigation

Below 60em (the Tachyons large breakpoint), the menu button opens and closes the navigation panel. The logo stays visible. Escape closes the panel and returns focus to its button when focus was inside the panel. Without JavaScript, the menu stays visible and the button stays hidden.

All submenu modes use the same mobile layout. The hamburger opens one list, with every included child level expanded and indented. There are no submenu arrows, hover interactions, or separate submenu toggles. Parent entries with a target remain normal links; entries without a target are plain labels. In `click` mode, the extra overview link is hidden on mobile because the parent link is available again. `toplevel` still omits all child levels. Resizing between mobile and desktop resets the submenu state and moves keyboard focus to a visible control when needed.

The header groups control which components go into the panel. This optional configuration shows the theme defaults:

```toml
# config/_default/params.toml

[ananke.header]
navigation = [["logo"], ["languages", "menu", "social"]]
```

| Option | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ananke.header.navigation` | array of component groups | `[["logo"], ["languages", "menu", "social"]]` | Optional | Orders the header components. The first group with `menu` becomes the collapsible panel. Keep `logo` in a separate group. |

Each group is an array of component names. The built-in navigation components are `logo`, `languages`, `menu`, and `social`. A group without `menu` or `logo`, such as a custom search component, gets its own row below 60em. From 60em, the groups share a row when space permits. Page front matter can override `ananke.header.navigation`; the order of priority is page front matter, cascade, and then site configuration.

To add a component, create `layouts/_partials/hooks/header/<name>.html` and add its name to a group. Header hooks receive a dictionary; use `.page` for the current page. For example, the documentation site adds a `search` hook and uses `navigation = [["logo"], ["search"], ["languages", "menu", "social"]]`. Use [hooks and filters](/customisation/hooks-and-filters/) to extend the header without replacing the navigation partial.

## Submenus

The documentation site uses this feature: each top-level link opens its section overview, and the submenu shows links to the topics in that section.

Ananke shows child entries of the `main` menu as a submenu under their parent entry. On a site with JavaScript, the submenu opens when the reader selects the toggle button next to the parent entry. Below 60em, all child lists are already visible when the hamburger panel opens; from 60em, submenus open as dropdowns. Use submenus to group related pages and keep the top level of the menu short.

### Choose how submenus open

Set the optional `submenu_mode` parameter to choose how parent entries behave. In a single `config.toml` or `hugo.toml`, use:

```toml
[params.ananke.navigation]
submenu_mode = "hover"
```

If you use a configuration directory, put the same option in `config/_default/params.toml` without the `params` prefix:

```toml
# config/_default/params.toml

[ananke.navigation]
submenu_mode = "hover"
```

The following table describes the desktop layout, from 60em. Mobile always uses the hamburger and expanded lists described above.

| Value | Opens the submenu | Click on the parent | Parent page inside the submenu |
| --- | --- | --- | --- |
| `hover` | Hover with a mouse from 60em, or use the toggle button | Goes to the parent page | No additional link |
| `click` | Click the parent label or its arrow; they form one button | Opens or closes the submenu | First link, labelled with the page's explicit `linkTitle`, or "Overview" |
| `split` (default) | Use the separate toggle button | Goes to the parent page | No additional link |
| `toplevel` | No submenu is rendered | Goes to the parent page | No child list |

`submenu_mode` is an optional string. The default is `split`, which retains the existing behaviour. Invalid values produce a build warning and use `split`. An explicit partial argument overrides page front matter, page front matter overrides cascade, and cascade overrides site configuration.

Use `click` when selecting the parent should always reveal its children. The overview link is added only when the parent has a target URL. For a parent defined with `pageRef`, set `linkTitle` on that page to change the overview label. A parent defined only with `url` uses "Overview". If the label has no translation in the site language or its fallback language, the entry name is used. Translate the label with the `menuOverview` key in `i18n/<language>.toml`:

```toml
# i18n/en.toml

[menuOverview]
other = "Overview"
```

Use `hover` when the parent should remain a direct link. Hover opening applies only to a mouse on a device that supports hover and has a fine pointer, from 60em. From 60em, touch and keyboard users can use the separate toggle button; Enter or Space activates it. Below 60em, only the hamburger opens and closes the list, and all included child levels remain expanded. Moving the pointer into an open dropdown keeps it open. Leaving the entry closes it after a short delay, unless keyboard focus is still inside. Escape dismisses it without requiring pointer movement.

The documentation site's development configuration selects `hover` so that local previews exercise this mode. Without JavaScript, `split`, `hover`, and `click` show the parent links and nested child lists, with no toggle buttons. `toplevel` always omits child lists. A top-level entry without a target URL remains a plain text label.

### Override the mode for one menu

Use the `navigation/menu.html` partial to render the `main` menu in a template or hook. The header's `hooks/header/menu.html` delegates to this same renderer. An omitted `submenu_mode` inherits the current page's setting, including cascade and site configuration:

```go-html-template
{{ partials.Include "navigation/menu.html" (dict "page" .) }}
```

To render only top-level entries for one call, pass `toplevel` explicitly:

```go-html-template
{{ partials.Include "navigation/menu.html" (dict
  "page" .
  "submenu_mode" "toplevel"
  "id" "footer-menu"
) }}
```

This does not change the mode of the header menu or any other menu on the page. The same argument accepts `split`, `hover`, and `click`. In a header component hook, the current page is `.page`, so use `"page" .page` instead of `"page" .`.

| Argument | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `page` | Hugo page | none | Required | The current page, used for configuration and current-page markers. |
| `submenu_mode` | string | Page, cascade, or site setting, then `split` | Optional | Overrides the mode for this call only. Valid values are `split`, `hover`, `click`, and `toplevel`. |
| `id` | string | Generated unique ID for this page | Optional | ID of the menu list; also prefixes its submenu control IDs. Use a different value for each call if you supply IDs. |
| `classes` | map of class strings | Navigation classes from site configuration and theme defaults | Optional | Complete class map for the renderer. Normally omit it and configure `[ananke.navigation.classes]` instead. |

The partial renders the menu list only. Add a `nav` element with a descriptive `aria-label` when the list forms a separate navigation region. Use normal partial inclusion for each instance so that each menu receives its own IDs.

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

* **Parent entry with a page:** below 60em, the parent remains a normal link in every mode. From 60em, in `split` and `hover` modes, the parent stays a link to its page, with a separate toggle button. In `click` mode, the parent is one button and its page is the first submenu link.
* **Parent entry without a page:** below 60em, it is a plain label. From 60em, a parent with children and without `pageRef` or `url` shows as a toggle button with the entry name, except in `toplevel` mode.
* **Depth:** below 60em, all included child levels are expanded and indented. From 60em, only the first level of children opens as a dropdown. Entries below the second level show as indented lists inside the open dropdown, without their own toggle button.
* **Keyboard and pointer:** Tab moves through the entries in reading order. Below 60em, the hamburger controls the whole list and Escape closes that panel. From 60em, Enter or Space on a submenu button opens and closes a submenu. Escape closes it and moves focus back to its toggle button. A click outside the submenu, or moving keyboard focus out of the entry, also closes it. Only one submenu is open at a time. Hovering opens a submenu only in `hover` mode, with a mouse from 60em.
* **Without JavaScript:** all child links show as a nested list under their parent entry, and the toggle buttons do not show. Readers can reach every page.
* **Layout:** below 60em (the Tachyons large breakpoint), a hamburger button opens and closes the navigation panel. All included sublevels are visible as indented lists, without their own open or close controls. From 60em, the menu stays visible and submenus open as dropdowns. The dropdown follows the text direction of right-to-left languages. If it would go past the edge of the screen, it aligns to the other side of its parent entry.

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

In `split` and `hover` modes, the toggle button next to a parent link has a hidden text label for screen readers. The label comes from the `submenuToggle` translation string. In English, it is the entry name followed by "submenu", for example "Posts submenu":

```toml
# i18n/en.toml

[submenuToggle]
other = "{{ .Name }} submenu"
```

The theme has this string only in English. If a language has no translation, Hugo uses the translation of the site's default content language. If that language has no translation either, the label is the entry name only. To add or change the label for your languages, see [Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings). Translations for the theme are welcome in the [theme repository](https://github.com/gohugo-ananke/ananke).

### Common mistakes

* **Existing child entries now show.** Older Ananke versions ignored child entries of the `main` menu. If your configuration already has entries with `parent`, they now show as submenus. Remove `parent` from these entries if you do not want submenus.
* **Overridden `site-scripts.html`.** The submenu script is part of `layouts/_partials/site-scripts.html`. The theme adds the navigation script whenever the site has a `main` menu, and it does not depend on the `copy_code` setting. If your project overrides this partial, the menu still works, but it uses the version without JavaScript: the submenus are always open as nested lists. Remove an obsolete override to use the theme script, and put additional scripts in a `layouts/_partials/hooks/body-end.html` hook. If you must keep the override, include the current navigation script from the theme.
* **Overridden `site-navigation.html`.** If your project overrides `layouts/_partials/site-navigation.html`, your version controls the menu markup. Compare it with the theme's current version to get submenus.

## What the theme does and does not render

* The theme renders the `main` menu with one level of [submenus](#submenus), except in `toplevel` mode, which omits child lists. Entries below the second level show inside the submenu of their top-level entry.
* The theme does **not** use a separate footer menu. Footer links come from the
  social follow links and the site footer partial, not from a Hugo `footer`
  menu. To change the footer, override
  [`layouts/_partials/site-footer.html`](https://gohugo.io/templates/lookup-order/)
  in your project.

For the general Hugo reference on menus, see
[Hugo's menu documentation](https://gohugo.io/content-management/menus/).
