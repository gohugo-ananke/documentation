---
title: Styles
description: "Change fonts and body classes, control hyphenation, and upgrade stylesheets from Ananke 2.15 or earlier."
date: 2026-01-16T08:00:00.000+0700
weight: 200
---

This page covers the body classes, hyphenation, and the stylesheet changes in Ananke 2.16.0 and 2.17.0. To add your own CSS, follow [Custom CSS](/customisation/custom-css/). To learn how the theme builds its stylesheet, read [How Ananke builds its stylesheet](/explanation/stylesheet-pipeline/).

## Update font or body classes

The theme is set, by default, to use a near-white background color and the "Avenir" or serif typeface. You can change these in your config file with the `body_classes` parameter, like this:

```toml
[params]
  body_classes = "avenir bg-near-white"
```

which will give you a body class like this:

```html
<body class="avenir bg-near-white">
```

note: The `body_classes` parameter will not change the font used in post content. To do this, you must use the `post_content_classes` parameter.

You can find [a list of available typefaces here](https://github.com/tachyons-css/tachyons/blob/v4.7.0/src/_font-family.css).

And [a list of background colors here](https://github.com/tachyons-css/tachyons/blob/v4.7.0/src/_skins.css#L96).

## Stylesheet generation

<!-- markdownlint-disable-next-line MD033 -->
<span id="custom-css"></span><span id="paths-in-custom-css"></span><span id="sass-scss-and-other-preprocessors"></span><span id="built-in-css-order"></span><span id="social-hover-colours"></span><span id="output"></span>

Ananke builds one stylesheet for your site from Tachyons, its own CSS, generated social icon colours, and your custom CSS. These topics now have their own pages:

* To add, register, and troubleshoot your own CSS files, including Sass through a partial, follow [Custom CSS](/customisation/custom-css/).
* For the bundle order, paths in custom CSS, social hover colours, and the development and production output, read [How Ananke builds its stylesheet](/explanation/stylesheet-pipeline/).

## Upgrade from Ananke 2.15 or earlier

Ananke 2.16.0 replaced the stylesheet pipeline, and Ananke 2.17.0 renamed the internal bundle. If your site adds or changes styles, read this section before you update.

### What changed

* **`css.Build` replaces Sass processing (2.16.0).** Before 2.16.0, the theme sent the whole bundle through `css.Sass` and `resources.Minify`. Now it uses `css.Build`, which Hugo added in v0.158.0. The theme requires Hugo v0.160.0 or later. The theme's own CSS no longer needs Hugo Extended or a Sass compiler.
* **Sass and SCSS files are no longer compiled (2.16.0).** If `custom_css` lists a `.scss` or `.sass` file, the theme skips the file and prints a warning, for example `Stylesheet "/ananke/css/legacy.scss" has type "x-scss" and was skipped.` Compile the file to CSS first, or use a [stylesheet partial](/customisation/custom-css/#use-sass-scss-or-another-preprocessor).
* **The parameter moved to `params.ananke.custom_css` (2.16.0).** The top-level `params.custom_css` parameter still works, but it prints a deprecation warning.
* **Stylesheet partials (2.16.0).** A `custom_css` entry that ends in `.html` is a partial that returns CSS. The theme adds the returned CSS to the bundle.
* **Development and production builds are different (2.16.0).** Development builds are not minified and have a linked source map. Production builds are minified and fingerprinted, and the `<link>` element has an `integrity` attribute. See [Development and production output](/explanation/stylesheet-pipeline/#development-and-production-output).
* **The internal bundle is named `theme.css` (2.17.0).** Before `css.Build` runs, the theme joins all files into the resource `ananke/css/theme.css`. The published file is still `ananke/css/main.css`. Links and scripts that refer to the published file do not need changes.

Build errors from `css.Build` therefore name `/ananke/css/theme.css`, not your file. See [Paths inside the bundle](/explanation/stylesheet-pipeline/#paths-inside-the-bundle) for an example.

### Upgrade checklist

1. Make sure that `hugo version` shows v0.160.0 or later.
2. Move `custom_css` from `[params]` to `[params.ananke]`.
3. Replace `.scss` and `.sass` entries in `custom_css` with compiled `.css` files or with a [stylesheet partial](/customisation/custom-css/#use-sass-scss-or-another-preprocessor).
4. Check the `url()` and `@import` paths in your custom CSS files. See [Use paths in your CSS](/customisation/custom-css/#use-paths-in-your-css).
5. Run `hugo --gc` and read all lines in the build log that start with `WARN  [ananke]`.

## Hyphenation

{{< since "2.23.0" >}}

Tachyons has no hyphenation class, so Ananke adds the `hyphenate` utility class in `_styles.css`. The theme puts this class on the content of single pages. Browsers then break long words at the end of a line and add a hyphen. This gives a more regular right edge, particularly on narrow screens.

The theme defines the class like this:

```css
.hyphenate {
  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
}

.hyphenate :where(h1, h2, h3, h4, h5, h6, code, kbd, samp) {
  hyphens: manual;
}
```

* Browsers hyphenate only text in a language that they have a hyphenation dictionary for. Ananke sets the `lang` attribute of the `<html>` element from the locale of the site language. Set `locale` (or the older `languageCode`) to the language of your content, for example `locale = "de-de"`. On a [multilingual site](/configuration/multilingual/), set it for each language.
* Only words with six or more letters are hyphenated, with at least three letters before and after the break. Browsers that do not support `hyphenate-limit-chars` use their own limits.
* Headings, inline code, keyboard input, and sample output keep their words whole. Code blocks are not hyphenated.

### Change or disable hyphenation

Redefine the class in a [custom CSS file](/customisation/custom-css/#override-a-theme-class). The theme adds your files after its own CSS, so your rules win.

To disable automatic hyphenation:

```css
.hyphenate {
  hyphens: manual;
}
```

With `manual`, browsers break words only at soft hyphens (`&shy;`) that you add to the text. Use `none` to prevent these breaks too.

To hyphenate shorter words:

```css
.hyphenate {
  hyphenate-limit-chars: 5 2 2;
}
```

To hyphenate text in other places, add the `hyphenate` class to an element in your own layouts.
