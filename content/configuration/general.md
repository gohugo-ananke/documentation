---
title: General Configuration
date: 2026-01-16T08:00:00.000+0700
---

* [Activate the contact form](#activate-the-contact-form)
* [Logo](#logo)
* [Main navigation menu](#main-navigation-menu)
* [Localize date format](#localize-date-format)
* [Show taxonomies on pages](#show-taxonomies-on-pages)
* [Show or hide dates on pages](#show-or-hide-dates-on-pages)
* [Show images on list page cards](#show-images-on-list-page-cards)

> [!IMPORTANT]
> Please note that Hugo is extensible configurable with more generic or more specific configuration. Please read the documentation about [configuration files](https://gohugo.io/configuration/introduction/#configuration-file) and [configuration directories](https://gohugo.io/configuration/introduction/#configuration-directory) to learn more about this topic. Whenever Ananke's documentation refers to the configuration file it refers to any of these possible locations.
>
> Ananke's sample repositories are using configuration directories and you can find all referred configuration parameters in `config/_default/hugo.toml` and `config/_default/params.toml`.

## Activate the contact form

This theme includes a shortcode for a contact form that you can add to any page (there is an example on the contact page in the exampleSite folder). One option is to use [formspree.io](//formspree.io/) as proxy to send the actual email. Each month, visitors can send you up to fifty emails without incurring extra charges. Visit the Formspree site to get the "action" link and add it to your shortcode like this:

```go-html-template
{{</* form-contact action="https://formspree.io/your@email.com" */>}}
```

## Logo

You can replace the title of your site in the top left corner of each page with your own logo. To do that put your own logo into the `static` directory of your website, and add the `site_logo` parameter to the site params in your config file. For example:

```toml
[params]
site_logo = "img/logo.svg"
```

## Main navigation menu

The navigation shown in the header (the hero area at the top of every page) is built from Hugo's `main` menu. Define entries for it in your site configuration and they appear next to the social links.

```toml
[menus]
[[menus.main]]
name = "About"
url = "/about/"
weight = 10

[[menus.main]]
name = "Posts"
url = "/posts/"
weight = 20
```

Entries are ordered by their `weight`, lowest first. `url` can point to an internal section or page (for example `/about/`) or to an external address.

You can also add a single page to the menu from its own front matter instead of listing it in the configuration:

```yaml
---
title: About
menus: main
---
```

For nested entries, menu parameters, and other options, see Hugo's [menu templates documentation](https://gohugo.io/templates/menu-templates/).

## Localize date format

Dates of blog posts and single pages are rendered with the default date format commonly used in the USA and Canada. It is possible to specify a different format.

```toml
[params]
date_format = "2. January 2006"
```

With hugo 0.87.0 and above, you can also use predefined date layouts, like `:date_full`, and it will output localized dates or times. See hugo's documentation of the [`time.Format` function](https://gohugo.io/functions/dateformat/) for more details.

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

See [Hero section](/customisation/hero-section/) for information about configuring featured images.
