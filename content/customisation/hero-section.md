---
title: Hero section styling
description: "Change the background colour, image fitting, dimming overlay, and height of the header."
date: 2026-01-16T08:00:00.000+0700
weight: 400
---

This page explains how to change the look of the header (or "hero") at the top of a page: the background colour, image fitting, dimming overlay, and height. To set a featured image and learn how Ananke finds it, see [Header and hero](/configuration/header-and-hero/).

## Hero settings

If you would like to hide the header text on the featured image on a page, set `omit_header_text` to `true`. See `exampleSite/content/en/contact` for an example.

You don't need an image though. The default background color is black, but you can change the color, by changing the default color class in the config.toml file. Choose a background color from any on the [Tachyons](https://tachyons.io/docs/themes/skins/) library site, and preface it with "bg-"

example: `background_color_class = "bg-blue"` or `background_color_class = "bg-gray"`

The default fitting and alignment for the featured image is `cover bg-top`, but can be changed using the `featured_image_class`.  Choose a fitting and alignment style for the featured image using Tachyons classes such as "cover|contain" for fitting and "bg-top|bg-center|bg-bottom" for alignment.

example: `featured_image_class = "cover bg-center"` or `featured_image_class = "contain bg-top"`

The default cover backdrop for the featured image is `bg-black-60`, but can be changed using the `cover_dimming_class`.  Choose a color dimming class for the page or site header from any on the [Tachyons](https://tachyons.io/docs/themes/skins/) library site, preface it with "bg-" and add the value such as "-X0" where X is in [1,9]

example: `cover_dimming_class = "bg-black-20"` or `cover_dimming_class = "bg-white-40"`

The height of the header is driven by the vertical padding of the text block inside it. You can change it with the `header_section_class` parameter. The value is a list of [Tachyons](https://tachyons.io/docs/layout/spacing/) spacing classes; keep the text alignment (`tc-l`) and horizontal padding (`ph3 ph4-ns`) classes unless you also want to change those, and adjust the vertical padding classes (`pv*`) to make the header taller or shorter.

example: `header_section_class = "tc-l pv3 ph3 ph4-ns"` (shorter) or `header_section_class = "tc-l pv7 ph3 ph4-ns"` (taller)

Set it site-wide under `[params]` in your configuration, or per page in front matter to override a single page. Because the headers are different by design, the defaults differ depending on the header:

* Home and list pages with a featured image: `tc-l pv4 pv6-l ph3 ph4-ns`
* Home and list pages without a featured image: `tc-l pv3 ph3 ph4-ns`
* Single pages with a featured image: `tc-l pv6 ph3 ph4-ns`

Setting `header_section_class` replaces the default for every header that uses it, so include the alignment and horizontal padding classes you want to keep.

## Set a background color behind transparent hero images

If your featured image has transparency, add a Tachyons background color class to `featured_image_class`. This places the color behind the image while keeping the existing fitting and alignment classes.

For the home page hero, set the value in your site configuration:

```toml
[params]
featured_image_class = "cover bg-center bg-red"
```

For a single page or post hero, set the value in that page's front matter:

```toml
featured_image_class = "cover bg-center bg-yellow"
```

You can combine this with `cover_dimming_class` to control the overlay opacity. For transparent images, reduce or remove the dimming class if the background color should appear more strongly.

```toml
cover_dimming_class = "bg-black-20"
```
