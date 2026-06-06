---
title: Colours
date: 2026-01-16T08:00:00.000+0700
---

* [How the theme uses classes](#how-the-theme-uses-classes)
* [Background colour](#background-colour)
* [Body and font classes](#body-and-font-classes)
* [Content text colour](#content-text-colour)
* [Post content typeface](#post-content-typeface)
* [Header and hero classes](#header-and-hero-classes)
* [Accessibility and contrast](#accessibility-and-contrast)

Ananke styles colours and typography with [Tachyons](https://tachyons.io/)
utility classes. You choose a class name (for example `bg-blue` or `near-black`)
and the theme applies it. This page lists the class-based settings.

## How the theme uses classes

Each setting below takes a Tachyons class as its value. Background colours use
the `bg-` prefix (for example `bg-navy`); text colours use the colour name
directly (for example `near-white`). Browse the available values in the
[Tachyons skins reference](https://tachyons.io/docs/themes/skins/).

## Background colour

`background_color_class` sets the colour used for the header when there is no
featured image, and for the footer. The default is `bg-black`:

```toml
# config/_default/params.toml

[params]
background_color_class = "bg-blue"
```

See [Header and Hero → fallback](/configuration/header-and-hero/#fallback-when-there-is-no-image).

## Body and font classes

`body_classes` sets the classes on the `<body>` element — typically a typeface
and a page background. The default is a near-white background with the Avenir
typeface:

```toml
# config/_default/params.toml

[params]
body_classes = "avenir bg-near-white"
```

This produces `<body class="avenir bg-near-white">`. Pick a typeface from the
[Tachyons font-family list](https://github.com/tachyons-css/tachyons/blob/v4.7.0/src/_font-family.css)
and a background from the
[skins list](https://github.com/tachyons-css/tachyons/blob/v4.7.0/src/_skins.css#L96).

## Content text colour

`text_color` sets the colour of the main content text. Set it globally or per
page (front matter wins over the site value). The default is `mid-gray`:

```toml
# config/_default/params.toml

[params]
text_color = "near-black"
```

The value must be a valid Tachyons colour class.

## Post content typeface

`body_classes` does not change the font used inside post content. Use
`post_content_classes` for that (default `serif`):

```toml
# config/_default/params.toml

[params]
post_content_classes = "lato"
```

## Header and hero classes

The hero/header has its own class settings — `featured_image_class`,
`cover_dimming_class`, and `header_section_class`. These are documented with
examples in [Hero Section](/customisation/hero-section/).

## Accessibility and contrast

> [!WARNING]
> Always check colour contrast. Light text on a light background (or dark on
> dark) fails accessibility guidelines and is hard to read. When you change
> `background_color_class`, `body_classes`, or `text_color`, verify the
> combination meets at least
> [WCAG AA contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
> (4.5:1 for body text).

Safe starting points keep strong contrast, for example dark text on a light
background (`text_color = "near-black"` with `body_classes = "... bg-near-white"`)
or light text on a dark header (`background_color_class = "bg-black"`).
