---
title: SEO
date: 2026-01-16T08:00:00.000+0700
---

* [How the page title is built](#how-the-page-title-is-built)
* [Description](#description)
* [Social previews: Open Graph and Twitter cards](#social-previews-open-graph-and-twitter-cards)
* [Canonical URLs](#canonical-urls)
* [Content indexing](#content-indexing)
* [Author](#author)
* [Which front matter affects SEO](#which-front-matter-affects-seo)
* [Validating your metadata](#validating-your-metadata)

Ananke sets sensible SEO and social-sharing defaults using Hugo's embedded
metadata templates (Open Graph, Twitter cards, and schema.org). This page
explains what those defaults do and which front matter controls them.

## How the page title is built

The HTML `<title>` is built from the page title and the site title:

```text
Page Title | Site Title
```

On the homepage, only the site title is shown. Set the page title in front
matter and the site title in your configuration:

```toml
# config/_default/hugo.toml

title = "Example site"
```

```toml
+++
title = "About this site"
+++
```

## Description

The meta description uses the first value it finds, in this order:

1. the page's `description` front matter;
2. the page's summary (for content pages without a description);
3. the site-wide `params.description`.

Set a description per page for the best search-result snippets:

```toml
+++
title = "About this site"
description = "A concise description for search result snippets and social previews."
+++
```

## Social previews: Open Graph and Twitter cards

Ananke includes Hugo's embedded `opengraph`, `twitter_cards`, and `schema`
templates, so pages expose Open Graph and Twitter/X card metadata automatically.

> [!IMPORTANT]
> The **social preview image** comes from the `images` front matter array, not
> from `featured_image`. `featured_image` sets the on-page hero; to control the
> image used by Facebook, X, LinkedIn, and similar previews, set `images`:
>
> ```toml
> +++
> title = "About this site"
> description = "A concise description for search result snippets and social previews."
> images = ["/images/about-social.jpg"]
> +++
> ```
>
> If you want the same image as the hero and the social preview, set both
> `featured_image` and `images` (see [Header and Hero](/configuration/header-and-hero/)).

You can also set a site-wide default `images` list in `params` so pages without
their own image still get a social preview.

## Canonical URLs

By default each page's canonical URL is its own permalink. To point a page at
content published elsewhere, set `canonicalUrl` in front matter:

```toml
+++
title = "Reposted article"
canonicalUrl = "https://example.com/original-article/"
+++
```

## Content indexing

When the site is built for production, pages are marked `index, follow` so
search engines index them. To keep a single page out of search results, add
`private: true` to its front matter — the page is then marked
`noindex, nofollow`:

```toml
+++
title = "Internal note"
private = true
+++
```

In non-production builds (for example `hugo server` or deploy previews) every
page is marked `noindex, nofollow` automatically. See
[robots.txt and environments](/configuration/robots/) for the site-level
equivalent.

## Author

The author meta tag uses the page's `author`, falling back to the site-wide
`params.author`. A list of authors is joined with commas. See
[General content features](/content/general/#author) for examples.

## Which front matter affects SEO

| Front matter | Effect |
| --- | --- |
| `title` | Page title and `<title>` tag |
| `description` | Meta description and social preview text |
| `images` | Open Graph / Twitter card image |
| `featured_image` | On-page hero image (not the social image) |
| `canonicalUrl` | Canonical link |
| `private` | Excludes the page from indexing |
| `author` | Author meta tag |

## Validating your metadata

Build the site and inspect the generated `<head>`:

```bash
hugo --environment production
```

Open a built page in `public/` and check the `<title>`, `<meta name="description">`,
`og:*`, and `twitter:*` tags. For social previews, use each platform's debugger
(for example the Facebook Sharing Debugger or the LinkedIn Post Inspector) once
the site is live.
