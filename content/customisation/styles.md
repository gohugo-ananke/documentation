---
title: Styles
date: 2026-01-16T08:00:00.000+0700
---

* [Update font or body classes](#update-font-or-body-classes)
* [Stylesheet generation](#stylesheet-generation)
* [Upgrade from Ananke 2.15 or earlier](#upgrade-from-ananke-215-or-earlier)
  * [What changed](#what-changed)
  * [Upgrade checklist](#upgrade-checklist)
* [Custom CSS](#custom-css)
  * [Paths in custom CSS](#paths-in-custom-css)
  * [Sass, SCSS, and other preprocessors](#sass-scss-and-other-preprocessors)
* [Built-in CSS order](#built-in-css-order)
* [Social hover colours](#social-hover-colours)
* [Output](#output)

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

Ananke builds one stylesheet for your site. The theme joins its own CSS files and your custom CSS files into one file. Then Hugo's [`css.Build`](https://gohugo.io/functions/css/build/) function processes that file. The published file is `ananke/css/main.css`. In production builds, Hugo adds a fingerprint to the file name, for example `ananke/css/main.<hash>.css`.

Ananke uses the [Tachyons](https://tachyons.io/) utility class library.

## Upgrade from Ananke 2.15 or earlier

Ananke 2.16.0 replaced the stylesheet pipeline, and Ananke 2.17.0 renamed the internal bundle. If your site adds or changes styles, read this section before you update.

### What changed

* **`css.Build` replaces Sass processing (2.16.0).** Before 2.16.0, the theme sent the whole bundle through `css.Sass` and `resources.Minify`. Now it uses `css.Build`, which Hugo added in v0.158.0. The theme requires Hugo v0.160.0 or later. The theme's own CSS no longer needs Hugo Extended or a Sass compiler.
* **Sass and SCSS files are no longer compiled (2.16.0).** If `custom_css` lists a `.scss` or `.sass` file, the theme skips the file and prints a warning, for example `Stylesheet "/ananke/css/legacy.scss" has type "x-scss" and was skipped.` Compile the file to CSS first, or use a [stylesheet partial](#sass-scss-and-other-preprocessors).
* **The parameter moved to `params.ananke.custom_css` (2.16.0).** The top-level `params.custom_css` parameter still works, but it prints a deprecation warning.
* **Stylesheet partials (2.16.0).** A `custom_css` entry that ends in `.html` is a partial that returns CSS. The theme adds the returned CSS to the bundle.
* **Development and production builds are different (2.16.0).** Development builds are not minified and have a linked source map. Production builds are minified and fingerprinted, and the `<link>` element has an `integrity` attribute. See [Output](#output).
* **The internal bundle is named `theme.css` (2.17.0).** Before `css.Build` runs, the theme joins all files into the resource `ananke/css/theme.css`. The published file is still `ananke/css/main.css`. Links and scripts that refer to the published file do not need changes.

Build errors from `css.Build` show the internal name, for example:

```text
CSSBUILD: failed to transform "/ananke/css/theme.css" (text/css): Could not resolve "./local.png"
```

The problem is in one of the files in the bundle, usually in one of your custom CSS files.

### Upgrade checklist

1. Make sure that `hugo version` shows v0.160.0 or later.
2. Move `custom_css` from `[params]` to `[params.ananke]`.
3. Replace `.scss` and `.sass` entries in `custom_css` with compiled `.css` files or with a [stylesheet partial](#sass-scss-and-other-preprocessors).
4. Check the `url()` and `@import` paths in your custom CSS files. See [Paths in custom CSS](#paths-in-custom-css).
5. Run `hugo --gc` and read all lines in the build log that start with `WARN  [ananke]`.

## Custom CSS

You can add your own CSS files to the stylesheet:

1. Add an `assets/ananke/css` directory to your project and put the file(s) in it.
2. Register the files with the `ananke.custom_css` key in the parameter section of your site configuration. Each path is relative to the `assets/ananke/css` directory.

The theme adds the files to the published `main.css` file in the order that you register them.

For example, if your CSS files are `assets/ananke/css/custom.css` and `assets/ananke/css/special.css`, add this to your configuration:

```toml
[params.ananke]
custom_css = [
  "custom.css",
  "special.css"
]
```

If the theme does not find a registered file in `assets/ananke/css`, it expects the file at the given path relative to the `static` directory, or at an external URL. It loads that file with a separate `<link>` element.

### Paths in custom CSS

The theme joins all files into one resource in `assets/ananke/css/` before `css.Build` processes them. Thus, paths in your files resolve as if your files were in `assets/ananke/css/`, not in their own directories.

* **`url()` with a bare path,** for example `url(images/background.png)`: Hugo looks in `assets/ananke/css/` first, and then in `assets/`.
* **`url()` with `./` or `../`:** Hugo looks only relative to `assets/ananke/css/`. If a file in a subdirectory, for example `assets/ananke/css/vendor/library.css`, contains `url(./font.woff2)`, the build fails with `Could not resolve "./font.woff2"`.
* **`@import`:** the theme's CSS is always first in the bundle, so an `@import` rule in your file is never at the start of the stylesheet. `css.Build` does not include the imported file, and browsers ignore an `@import` rule that comes after other rules. Register each file in `custom_css` instead.

Hugo copies the files that `url()` refers to into `public/ananke/css/` and adds a hash to their names.

### Sass, SCSS, and other preprocessors

Ananke does not compile Sass or SCSS. You can use any CSS preprocessor. Do one of these:

* Put the compiled CSS output in `assets/ananke/css/` and register the `.css` file in `custom_css`.
* Compile the stylesheet in a partial and register the partial in `custom_css`.

For example, to compile `assets/sass/main.scss`, add this partial:

```go-html-template
{{- /* layouts/_partials/sass-styles.html */ -}}
{{- $css := resources.Get "sass/main.scss" | css.Sass (dict "transpiler" "dartsass") -}}
{{- return $css.Content -}}
```

Then register the partial:

```toml
[params.ananke]
custom_css = ["sass-styles.html"]
```

The theme calls the partial with the site as context. The partial must return the CSS as text, for example with `.Content`. If the partial returns the resource, the theme does not add your rules and does not show a warning.

`css.Sass` needs [Dart Sass](https://gohugo.io/functions/css/sass/#dart-sass). Hugo removed the LibSass transpiler in v0.170.0.

## Built-in CSS order

The bundle order is fixed:

```text
1. Tachyons (_tachyons.css)
2. Theme CSS (_code.css, _hugo-internal-templates.css, _social-icons.css, _styles.css)
3. Generated colours for social media icons
4. Entries from params.ananke.custom_css, in the order that you list them
```

Later files can override earlier files through normal CSS cascade rules. Files that the theme loads from `static` or from an external URL come after the bundle, in separate `<link>` elements.

## Social hover colours

The theme generates hover colours from `params.ananke.social`. It uses the networks in `params.ananke.social.follow.networks` and in `params.ananke.social.share.networks`. Networks without a `color` value get no rule.

Example TOML:

```toml
[params.ananke.social.follow]
networks = ["github"]

[params.ananke.social.share]
networks = ["mastodon"]

[params.ananke.social.networks.github]
color = "#333333"

[params.ananke.social.networks.mastodon]
color = "#6364ff"
```

This generates rules like:

```css
.ananke-socials a.github:hover {
  color: #333333 !important;
  fill: #333333 !important;
}

.ananke-socials a.mastodon:hover {
  color: #6364ff !important;
  fill: #6364ff !important;
}
```

For all network settings, see [Social media networks](/configuration/social-media-networks/).

## Output

Hugo builds the stylesheet with different [`css.Build`](https://gohugo.io/functions/css/build/) options in development and production.

In development:

```toml
minify = false
sourceMap = "linked"
fingerprint = false
```

The generated CSS stays readable, and Hugo writes a linked source map next to it (`ananke/css/main.css.map`).

In production:

```toml
minify = true
sourceMap = "none"
fingerprint = true
```

Hugo writes a minified stylesheet with a fingerprint in its file name, so browsers load the new file after each change. The `<link>` element also gets an `integrity` attribute.
