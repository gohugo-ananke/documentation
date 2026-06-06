---
title: Header and Hero
date: 2026-06-06T08:00:00.000+0700
---

* [The two kinds of header](#the-two-kinds-of-header)
* [Set a featured image](#set-a-featured-image)
* [How the featured image is found](#how-the-featured-image-is-found)
* [Image paths and static assets](#image-paths-and-static-assets)
* [Show or hide the header text](#show-or-hide-the-header-text)
* [Fallback when there is no image](#fallback-when-there-is-no-image)
* [Accessibility](#accessibility)

The header (or "hero") is the large area at the top of every page. It shows the
page title and, optionally, a background image. This page explains how the
header behaves and which front matter and configuration values control it. For
fine styling — image fitting, dimming overlay, header height, transparent
images — see [Hero Section](/customisation/hero-section/).

## The two kinds of header

Ananke renders headers with two different partials, and they have different
defaults:

* **Home page and list pages** use the *site header*. This is the tall hero at
  the top of the homepage and of section list pages (for example `/posts/`).
* **Single pages** (individual posts and pages) use the *page header*.

Both read the same front matter and parameters described below, so you configure
them the same way. They differ only in their default spacing, which is why the
homepage hero looks taller than a single page's header out of the box.

## Set a featured image

Add a featured image to any page or post by setting `featured_image` in its
front matter:

```toml
+++
title = "About"
featured_image = "/images/about-header.jpg"
omit_header_text = false
+++
```

To give the **homepage** a hero image, set `featured_image` in the front matter
of your homepage content file, `content/_index.md`:

```toml
+++
title = "Welcome"
featured_image = "/images/home.jpg"
+++
```

## How the featured image is found

For each page, Ananke looks for an image in this order and uses the first one it
finds:

1. The `featured_image` value from front matter.
2. The first entry in the page's `images` front matter array:

   ```toml
   images = ["/images/gohugo-default-sample-hero-image.jpg"]
   ```

3. For [page bundles](https://gohugo.io/content-management/page-resources/), a
   page resource of type image whose filename contains `feature` or `cover`.

If none of these is found, the page has no hero image and the
[colour fallback](#fallback-when-there-is-no-image) is used instead.

When the value matches a page resource in a bundle, that resource is used;
otherwise the value is treated as a path under your site (see below).

## Image paths and static assets

A `featured_image` that starts with `/` is resolved relative to your site root.
Place the file in your project's `static/` directory and reference it without
the `static` prefix:

```text
my-site/
└── static/
    └── images/
        └── home.jpg     # referenced as "/images/home.jpg"
```

For a page bundle, put the image next to the page's `index.md` and reference it
by filename:

```text
content/posts/my-post/
├── index.md
└── header.jpg           # featured_image = "header.jpg"
```

## Show or hide the header text

By default the page title is shown over the image. To keep the image but remove
the overlaid title, set `omit_header_text` to `true`:

```toml
+++
title = "Landing page"
featured_image = "/images/landing.jpg"
omit_header_text = true
+++
```

This is useful when the image already contains text, or for a clean landing
page.

## Fallback when there is no image

If a page has no featured image, Ananke does not show an empty hero. Instead it
fills the header with a background colour. The default is black; change it
site-wide with `background_color_class`, using any
[Tachyons](https://tachyons.io/docs/themes/skins/) skin prefixed with `bg-`:

```toml
# config/_default/params.toml

[params]
background_color_class = "bg-blue"
```

This same colour is also used for the footer, so the page stays visually
consistent.

## Accessibility

The hero image is rendered as a CSS background, so it is treated as decorative
and is correctly hidden from screen readers — appropriate when the image is
purely visual and the page title conveys the meaning.

If an image carries information a reader needs (a chart, a photo with a caption,
text inside the image), do not rely on the hero alone. Put that content in the
page body with a descriptive `alt` text instead, so it is available to everyone.
See [Images](/content/images/) for alt-text guidance.

When you use `omit_header_text = true`, make sure the page still has a clear
heading or title elsewhere, so the page's purpose is not conveyed by the image
alone.
