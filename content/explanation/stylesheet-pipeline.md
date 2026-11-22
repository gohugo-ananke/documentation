---
title: How Ananke builds its stylesheet
description: "How the theme joins Tachyons, its own CSS, generated rules, and your custom CSS into one published stylesheet."
date: 2026-11-22T00:00:00+07:00
weight: 400
---

Ananke publishes one stylesheet for your site. The theme joins its own CSS, generated rules, and your custom CSS into one bundle. Then Hugo's [`css.Build`](https://gohugo.io/functions/css/build/) function processes the bundle. This page explains the steps of this stylesheet pipeline, so that you can predict where your rules go and how paths in your files resolve. To add your own CSS, follow [Custom CSS](/customisation/custom-css/).

## Tachyons and the theme CSS

Ananke uses the [Tachyons](https://tachyons.io/) utility class library. Most of the theme's layout and colour comes from Tachyons classes in the templates, for example `bg-black` or `pv3`. Many theme options are lists of these classes; see [Colours and typefaces](/customisation/colours/). The theme adds a few files of its own CSS for code blocks, Hugo's embedded templates, social icons, and general styles.

## The bundle order

The theme puts the parts of the bundle in a fixed order:

```text
1. Tachyons (_tachyons.css)
2. Theme CSS (_code.css, _hugo-internal-templates.css, _social-icons.css, _styles.css)
3. Generated colours for social media icons
4. Entries from params.ananke.custom_css, in the order that you list them
```

A later rule with the same selector replaces an earlier rule through the normal CSS cascade. Your custom CSS therefore wins over a theme rule with the same selector, and a later entry in `custom_css` wins over an earlier entry.

The theme generates the social icon colours from `params.ananke.social`. It writes a hover rule for each network in `follow.networks` or `share.networks` that has a `color` value:

```css
.ananke-socials a.github:hover {
  color: #333333 !important;
  fill: #333333 !important;
}
```

Networks without a `color` value get no rule. See [Social media networks](/configuration/social-media-networks/).

## Three kinds of custom CSS entry

The theme reads each entry in `params.ananke.custom_css` in one of three ways:

* A file in `assets/ananke/css/`: the theme adds the file to the bundle. The entry is a path relative to that directory.
* An entry that ends in `.html`: the theme calls the partial with that name, with the site as context, and adds the CSS text that the partial returns. A partial can use Hugo functions, for example `css.Sass`, to make CSS from another format.
* Any other entry: the theme does not find a file in `assets/ananke/css/`, so it assumes a path relative to `static/` or an external address. It adds a separate `<link>` element after the bundle. This file does not go through `css.Build`.

The theme does not compile Sass or SCSS files. If an entry is a `.scss` or `.sass` file in `assets/ananke/css/`, the theme skips it and writes a warning in the build log.

## Paths inside the bundle

The theme joins all files into the resource `ananke/css/theme.css` before `css.Build` processes it. For `css.Build`, all rules thus come from one file in `assets/ananke/css/`, not from their original directories. This explains how paths behave:

* `url()` with a bare path, for example `url(images/background.png)`: Hugo looks in `assets/ananke/css/` first, and then in `assets/`.
* `url()` with `./` or `../`: Hugo looks only relative to `assets/ananke/css/`. If `assets/ananke/css/vendor/library.css` contains `url(./font.woff2)`, the build fails with `Could not resolve "./font.woff2"`.
* `@import`: the theme's CSS is always first in the bundle, so an `@import` rule in your file is never at the start of the stylesheet. `css.Build` does not include the imported file, and browsers ignore an `@import` rule that comes after other rules.

Hugo copies the files that `url()` refers to into `public/ananke/css/` and adds a hash to their names.

Build errors show the internal name of the bundle, not the name of your file:

```text
CSSBUILD: failed to transform "/ananke/css/theme.css" (text/css): Could not resolve "./local.png"
```

The problem is in one of the files in the bundle, usually in one of your custom CSS files.

## Development and production output

The published file is `ananke/css/main.css`. The `css.Build` options depend on the Hugo environment:

| Environment | Minified | Source map | Fingerprint and `integrity` |
| --- | --- | --- | --- |
| `development`, for example `hugo server` | No | Linked: `ananke/css/main.css.map` | No |
| `production`, for example `hugo` | Yes | None | Yes |
| Other environments | Yes | None | No |

In development, the stylesheet stays readable, and browser tools can show the original file of each rule through the source map. In production, Hugo adds a fingerprint to the file name, for example `ananke/css/main.<hash>.css`, so browsers load the new file after each change. The `<link>` element also gets an `integrity` attribute.

## Related pages

* [Custom CSS](/customisation/custom-css/): add, register, and troubleshoot your own stylesheets.
* [Styles](/customisation/styles/): body classes, hyphenation, and the upgrade from Ananke 2.15 or earlier.
* [Configuration reference](/configuration/reference/#general-options): the `custom_css` option.
