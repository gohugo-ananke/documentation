---
title: Header layout and hooks
description: "Arrange header components, replace their content, style navigation, and migrate header overrides."
date: 2026-11-20T08:00:00.000+0700
weight: 450
---

Ananke builds the header from small components. Configure their order, add markup through hooks, or replace one component without copying the complete header template. For submenu behaviour and mobile navigation, see [Menus](/configuration/menus/).

## Configure the layout

These optional settings show the theme defaults:

```toml
# config/_default/params.toml

[ananke.header]
navigation = [["logo"], ["languages", "menu", "social"]]
content = ["title", "description"]
```

In a single `hugo.toml` or `config.toml`, use `[params.ananke.header]` instead.

| Option | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `ananke.header.navigation` | array of groups | `[["logo"], ["languages", "menu", "social"]]` | Optional | Orders navigation components. Each group is an array of names, or one name. |
| `ananke.header.content` | array of strings | `["title", "description"]` | Optional | Orders the components in the header text area below navigation. |

The built-in navigation components are `logo`, `languages`, `menu`, and `social`. The built-in content components are `title` and `description`. Names can also refer to your own [component hooks](#add-or-replace-a-component).

Below 60em, the first group containing `menu` becomes the hamburger panel. Keep `logo` in a different group. Other groups, such as a custom search component, get their own rows. From 60em, the groups share the navigation row when space permits.

Content components appear where the default header has a text area: on home and list pages, and on individual pages with a featured image. They do not add a banner to individual pages without a featured image. `omit_header_text = true` still hides the text in image-bearing individual-page headers. See [Page headers](/customisation/hero-section/).

Settings follow page front matter, cascade, and then site configuration. For example, a page can show only its title in the header text area:

```yaml
---
title: Our services
params:
  ananke:
    header:
      content: ["title"]
---
```

An empty list uses the theme default. To remove one component, omit its name from a non-empty list, or provide an empty hook partial for that component.

## Add or replace a component

Each component named `name` calls these hooks in order:

1. `header/name-before`
2. `header/name`
3. `header/name-after`

Their files live in `layouts/_partials/hooks/header/`. The middle hook supplies the component itself. For built-in names, your file replaces the theme's default component. The before and after hooks add markup around it. They are empty unless your site supplies them.

For example, create a notice component:

```go-html-template
{{/* layouts/_partials/hooks/header/notice.html */}}
{{ with .page.Params.header_notice }}
  <p class="f5 white-90 measure-wide center">{{ . }}</p>
{{ end }}
```

Then include it in the layout:

```toml
# config/_default/params.toml

[ananke.header]
content = ["title", "notice", "description"]
```

Set `params.header_notice` in page front matter to provide the notice text. If a configured component has no matching partial, Hugo prints a warning.

### Header hook context

Header component hooks receive a dictionary. Use `.page.Title`, rather than `.Title`, to access the current page. This differs from the page context passed to document and layout hooks.

| Field | Available in | Meaning |
| --- | --- | --- |
| `.page` | Both regions | Current Hugo page. |
| `.region` | Both regions | `navigation` or `content`. |
| `.featured_image` | Both regions | Resolved featured image URL, or an empty string. |
| `.variant` | Content region | `site` for home/list headers, or `page` for individual-page headers. |
| `.classes` | Navigation region | Resolved navigation class map. |
| `.submenu_mode` | Navigation region | Resolved menu mode. A [per-call menu override](/configuration/menus/#override-the-mode-for-one-menu) can replace it. |

The default title component uses an `h1` in the `site` variant and a `div` in the `page` variant, where the article supplies the `h1`. Preserve that distinction when replacing it.

## Style navigation

Use Tachyons classes through `ananke.navigation.classes`. For example:

```toml
# config/_default/params.toml

[ananke.navigation.classes]
link = "white hover-gold no-underline"
item = "list f5 fw4 dib pr3"
```

Each optional string replaces the complete default class list for that element. Empty values use the default. The stable `ananke-nav-*` and `ananke-submenu*` classes remain. Class settings follow page front matter, cascade, and then site configuration, independently for each element.

| Option | Type | Default | Required | Description |
| --- | --- | --- | --- | --- |
| `nav` | string | `pv3 ph3 ph4-ns` | Optional | Outer navigation element. |
| `inner` | string | `flex flex-wrap items-center justify-between center` | Optional | Row containing the navigation groups. |
| `brand` | string | `f3 fw2 hover-white white-90 dib no-underline` | Optional | Logo or site title link. |
| `toggle` | string | `f5 white-90 hover-white` | Optional | Mobile hamburger button. |
| `group` | string | `flex-l items-center` | Optional | Navigation groups outside the collapsible panel. |
| `panel` | string | `flex-l items-center` | Optional | Collapsible group containing `menu`. |
| `menu` | string | `pl0 mr3` | Optional | Main menu list. |
| `item` | string | `list f5 f4-ns fw4 dib pr3` | Optional | Top-level menu item. |
| `link` | string | `hover-white white-90 no-underline` | Optional | Top-level link or label. |
| `submenu_toggle` | string | `hover-white white-90` | Optional | Desktop submenu button. |
| `submenu` | string | `list ma0 pv2 ph0 br2 ba b--white-20 bg-black` | Optional | Submenu list. Its background follows `background_color_class` when configured. |
| `submenu_link` | string | `db pv2 ph3 f5 white-90 hover-white hover-bg-white-10 no-underline` | Optional | Link or label inside a submenu. |

These names belong under `[ananke.navigation.classes]`. The defaults shown are for left-to-right sites. Right-to-left sites use `pr0 ml3` for `menu` and `list f5 f4-ns fw4 dib pl3` for `item`.

For more specific styling, copy `assets/ananke/css/navigation-classes.css` from the theme to `assets/ananke/css/navigation.css` in your site. This scaffold lists the stable selectors and states; it is not loaded automatically. Fill in the rules you need, remove the rest, and add it to your existing CSS list:

```toml
# config/_default/params.toml

[ananke]
custom_css = ["navigation.css"]
```

Preserve existing `custom_css` entries. See [Custom CSS](/customisation/custom-css/) for the asset lookup rules.

## Migrate existing header overrides

Overrides of `site-header.html`, `page-header.html`, and `site-navigation.html` still render in this release, but now produce deprecation warnings. The warning announces their removal as extension points in Ananke v3. Migrate custom markup to component hooks and use the layout and class settings above.

Compare your override with the current theme before removing it. Move each custom part to the appropriate component or surrounding hook, then check home, list, and individual pages with and without featured images. Recheck CSS selectors that depend on the old header structure.

A build using `--panicOnWarning` stops on these warnings. If migration must wait, temporarily suppress the relevant warning IDs at the root of your site configuration:

```toml
# hugo.toml
ignoreLogs = [
  "ananke-deprecated-site-header",
  "ananke-deprecated-page-header",
  "ananke-deprecated-site-navigation",
]
```

This suppresses the warnings; it does not migrate the override or remove the v3 upgrade requirement.

If you override `site-scripts.html`, retain the theme's navigation script or move your additional scripts to `layouts/_partials/hooks/body-end.html` and remove the obsolete override. Without the theme script, links remain visible, but the hamburger and desktop submenu controls are not enabled.

Existing `main` menu entries with `parent` now appear as child lists. Choose `submenu_mode = "toplevel"` to retain top-level-only output. See [Menu modes](/configuration/menus/#choose-how-submenus-open) before changing the menu hierarchy.
