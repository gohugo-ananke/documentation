---
title: Front matter
description: "Reference of the front matter keys that Ananke v2.23.0 reads, and the Hugo keys that change Ananke pages."
date: 2026-01-16T08:00:00.000+0700
weight: 100
---

This page lists the front matter keys that change how Ananke v2.23.0 renders a page. Front matter is the block between `+++` (TOML) or `---` (YAML) markers at the top of a content file. To set a value for all pages of a section, use [`cascade`](https://gohugo.io/content-management/front-matter/#cascade) in the section's `_index.md`.

<!-- markdownlint-disable-next-line MD033 -->
<span id="common-options"></span><span id="defaults--fallbacks"></span><span id="notes"></span>

## Hugo keys

Hugo reads these keys itself; the table says how Ananke uses them. Hugo's [front matter documentation](https://gohugo.io/content-management/front-matter/) lists all Hugo keys.

| Key | Type | Effect in Ananke |
| --- | --- | --- |
| `title` | String | The page heading, the header title, and the first part of the `<title>` element. |
| `linktitle` | String | A shorter title for menu entries from front matter and for the overview link of a submenu. |
| `description` | String | The meta description and the text below the title in the header. |
| `summary` | String | The text on summary cards. A `<!--more-->` divider in the content takes precedence. See [Summaries and reading time](/content/summaries-and-reading-time/). |
| `date` | Date | The date on the page and on cards. See [dates](/configuration/general/#show-or-hide-dates-on-pages). |
| `weight` | Integer | The order in lists and in recent posts, before the date. |
| `categories`, `tags` | List of strings | Linked terms below the content. See [Taxonomies](/content/taxonomies/). |
| `menus` | String or table | Adds the page to a menu, for example `menus: main`. See [Menus](/configuration/menus/). |

## Ananke keys

| Key | Type | Default | Effect |
| --- | --- | --- | --- |
| `featured_image` | String | None | The header image: a page resource, a file in `assets/`, or a URL. See [Page headers](/customisation/hero-section/). |
| `images` | List of strings | None | Social preview images. The first one is also the header image when `featured_image` is not set. See [SEO](/configuration/seo/). |
| `featured_image_class` | String | `"cover bg-center"` | Classes of the header with an image, on single pages. |
| `cover_dimming_class` | String | `"bg-black-60"` | The overlay on the header image, on single pages. |
| `omit_header_text` | Boolean | `false` | Hides the title and description in a header with an image, on single pages. |
| `toc` | Boolean | `false` | Shows Hugo's table of contents next to the content of a single page. |
| `disable_share` | Boolean | None | Hides the share links. In v2.23.0, any value hides them, also `false`; see [ananke#1140](https://github.com/gohugo-ananke/ananke/issues/1140). |
| `private` | Boolean | `false` | Sets `noindex, nofollow` for this page. See [SEO](/configuration/seo/#content-indexing). |
| `canonicalUrl` | String | The page's own address | The canonical address, for content first published elsewhere. |
| `author` | String or list of strings | `params.author` | The author in metadata, below the title, and on image cards. See [Author](/content/general/#author) for the display rules. |
| `since` | String | None | The release that the [`since` shortcode](/content/shortcodes/since/) shows when it has no argument. |

Single pages also show related pages next to the content when Hugo's [related content](https://gohugo.io/content-management/related/) finds any.

## Page values of site options

Many site options can also be set for one page. In front matter, use the same key path without `params`, for example `text_color` or `ananke.header.content`. The [configuration reference](/configuration/reference/) marks these options with "Site, page".

## Examples

<!-- markdownlint-disable-next-line MD033 -->
<span id="using-a-canonical-url"></span><span id="example-using-linktitle"></span>

A post first published elsewhere, with a short menu title:

```toml
+++
title = "My long page title"
linktitle = "Short name"
date = 2026-01-01T12:00:00+07:00
canonicalUrl = "https://example.com/path-to-the-original-content/"
toc = true
+++
```

A page with a header image and no text over it:

```yaml
---
title: Gallery
featured_image: header.jpg
omit_header_text: true
---
```

<!-- markdownlint-disable-next-line MD033 -->
<span id="example-disabling-breadcrumbs"></span><span id="example-custom-layout"></span>

## Other keys

* `disableBreadcrumbs`: an earlier version of this page listed this key. Ananke shows no breadcrumbs, so the key has no effect.
* `layout`: a Hugo key that selects another template for the page, for example `layout = "project"` for your own `layouts/project.html`. See [Hugo's template lookup order](https://gohugo.io/templates/lookup-order/).
