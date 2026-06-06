---
title: Images
date: 2026-06-06T08:00:00.000+0700
---

* [Static images](#static-images)
* [Images in Markdown](#images-in-markdown)
* [Page bundle images](#page-bundle-images)
* [Featured images](#featured-images)
* [Social sharing images](#social-sharing-images)
* [Alt text](#alt-text)
* [Common path mistakes](#common-path-mistakes)

This page explains the ways to add images to an Ananke site and the paths each
one uses.

## Static images

Files in your project's `static/` directory are copied to the site root as-is.
A file at `static/images/example.jpg` is served at `/images/example.jpg`:

```text
my-site/
└── static/
    └── images/
        └── example.jpg     # available at /images/example.jpg
```

Reference static images with a leading `/` (note: no `static` in the URL).

## Images in Markdown

Add an image in content with standard Markdown. Always include descriptive alt
text:

```markdown
![A descriptive alt text for the image.](/images/example.jpg)
```

## Page bundle images

A [page bundle](https://gohugo.io/content-management/page-resources/) keeps a
page and its images together in one folder. Put the image next to the page's
`index.md`:

```text
content/posts/my-post/
├── index.md
└── header.jpg
```

Inside that page you can reference the image by its filename (`header.jpg`)
rather than an absolute path, and the theme's featured-image lookup can find it
automatically.

## Featured images

The `featured_image` front matter sets a page's hero image. It can point to a
static path or, in a page bundle, to a resource by filename:

```toml
+++
title = "Bundled image example"
featured_image = "header.jpg"
+++
```

The full lookup order (front matter `featured_image`, then the `images` array,
then a bundle resource named `cover`/`feature`) and the colour fallback are
described in [Header and Hero](/configuration/header-and-hero/).

## Social sharing images

> [!IMPORTANT]
> The image used in social previews (Open Graph / Twitter cards) comes from the
> `images` front matter array, **not** from `featured_image`:
>
> ```toml
> +++
> title = "A post"
> images = ["/images/posts/my-post-social.jpg"]
> +++
> ```
>
> Set `images` when you want a controlled preview image; set both
> `featured_image` and `images` to use the same picture for the hero and the
> share preview. See [SEO → Social previews](/configuration/seo/#social-previews-open-graph-and-twitter-cards).

## Alt text

Alt text describes an image for screen-reader users and when an image fails to
load.

* For **meaningful** images, write alt text that conveys the information the
  image carries.
* For **purely decorative** images, use empty alt text (`![](...)`) so screen
  readers skip them.
* The hero/featured image is a CSS background and is treated as decorative — do
  not rely on it to convey information (see
  [Header and Hero → Accessibility](/configuration/header-and-hero/#accessibility)).

## Common path mistakes

* **Including `static` in the URL.** A file at `static/images/x.jpg` is
  referenced as `/images/x.jpg`, never `/static/images/x.jpg`.
* **Missing leading slash.** For static images use `/images/x.jpg`; a relative
  `images/x.jpg` resolves against the current page URL and often breaks.
* **Wrong case.** File systems on deploy servers are case-sensitive — `Header.JPG`
  and `header.jpg` are different files.
* **Bundle image referenced with an absolute path.** Inside a page bundle,
  reference the resource by filename (`header.jpg`), not `/header.jpg`.
