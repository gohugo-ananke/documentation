---
title: General configuration
description: "Set the logo, the date format, taxonomy terms, dates, section titles, and list page images."
date: 2026-01-16T08:00:00.000+0700
weight: 100
---

This page covers site-wide display settings: the logo, dates, taxonomy terms, section titles, and list card images. To learn where configuration files go and how Hugo combines them with the theme defaults, read [How Ananke configuration works](/explanation/configuration/). Every option is listed in the [configuration reference](/configuration/reference/).

## Activate the contact form

To add a contact form to a page, see [Contact form](/content/shortcodes/contact-form/).

## Logo

You can replace the title of your site in the top left corner of each page with your own logo. To do that put your own logo into the `static` directory of your website, and add the `site_logo` parameter to the site params in your config file. For example:

```toml
[params]
site_logo = "img/logo.svg"
```

## Main navigation menu

To add entries to the header menu, from the configuration or from page front matter, see [Menus](/configuration/menus/).

## Localize date format

Dates of blog posts and single pages are rendered with the default date format commonly used in the USA and Canada. It is possible to specify a different format.

```toml
[params]
date_format = "2. January 2006"
```

You can also use predefined date layouts, like `:date_full`, and it will output localized dates or times. See hugo's documentation of the [`time.Format` function](https://gohugo.io/functions/dateformat/) for more details.

## Show taxonomies on pages

Ananke shows linked terms for the `categories` and `tags` taxonomies on single pages when they are set in page front matter. For example:

```yaml
categories:
  - Beginner
  - Server
tags:
  - cicd
  - docker
  - free
```

The terms use Hugo's taxonomy links, so the corresponding taxonomy must be enabled in your site configuration if you customise the default taxonomies.

Categories are shown by default. To hide the category terms on single pages site-wide, set `show_categories` to `false` in the `ananke` parameters:

```toml
[params.ananke]
show_categories = false
```

## Show or hide dates on pages

Ananke shows dates by default on single pages and summary cards, including recent posts on the home page. Use these settings in `[params.ananke.pages]` in your site configuration or under `ananke` in page front matter:

| Setting | Controls |
| --- | --- |
| `show_single_date` | The date on a single page. |
| `show_summary_date` | The date on summary cards, including recent posts on the home page. |
| `show_date` | The shared fallback for both settings. Existing configurations continue to work. |

For example, show dates on single pages and hide them on cards across the site:

```toml
[params.ananke.pages]
show_single_date = true
show_summary_date = false
```

Use front matter to set the same behaviour for one page:

```yaml
ananke:
  show_single_date: true
  show_summary_date: false
```

For each date, Ananke uses the first boolean setting in this order:

1. The specific page setting: `ananke.show_single_date` or `ananke.show_summary_date`.
2. The shared page setting: `ananke.show_date`.
3. The specific site setting: `params.ananke.pages.show_single_date` or `params.ananke.pages.show_summary_date`.
4. The shared site setting: `params.ananke.pages.show_date`.
5. The default: show the date.

Page settings include values inherited through `cascade`. A page's own `ananke` map takes priority over the cascaded map, as explained below. Pages without a date never show one, even when a setting is `true`.

## Show or hide section titles on summary cards

Ananke shows the title of the section above the post title on compact summary cards on list pages. You can hide the section title on all cards by setting `ananke.pages.show_section_title` to `false`.

```toml
[params.ananke.pages]
show_section_title = false
```

You can override this per page with front matter:

```yaml
ananke:
  show_section_title: true
```

The image summary cards, which the home page uses for recent posts, do not show a section title.

## Set dates and section titles for one section

To hide dates on cards and section titles for all pages in one section, use `cascade` in the `_index.md` file of the section:

```yaml
---
title: Posts
cascade:
  params:
    ananke:
      show_summary_date: false
      show_section_title: false
---
```

The example keeps dates on single pages. Use `show_single_date: false` to hide those dates too, or `show_date: false` to hide both through the shared fallback.

> [!NOTE]
> Hugo does not merge an `ananke` map in the front matter of a page with the `ananke` map from `cascade`. If a page sets its own `ananke` values, it must also set all the values from `cascade` that it needs.

## Show images on list page cards

By default, list pages render compact summary cards without images. You can opt in to image cards for list pages by enabling the `ananke.pages.show_list_images` parameter.

```toml
[params.ananke.pages]
show_list_images = true
```

When enabled, list pages use the same image summary card that is used for recent posts on the home page. Pages without a configured featured image still render without an image. Date display is controlled separately with `ananke.pages.show_summary_date`, with `ananke.pages.show_date` as its fallback.

See [Page headers](/customisation/hero-section/) for information about configuring featured images.
