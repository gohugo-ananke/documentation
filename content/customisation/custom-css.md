---
title: Custom CSS
description: "Add your own CSS files on top of the theme styles."
date: 2026-06-06T08:00:00.000+0700
weight: 300
---

You can add your own CSS on top of the theme's styles without editing the theme. To learn how the theme builds the published stylesheet, read [How Ananke builds its stylesheet](/explanation/stylesheet-pipeline/).

## Where custom CSS goes

Put your CSS files in your project's `assets/ananke/css/` directory:

```text
my-site/
└── assets/
    └── ananke/
        └── css/
            └── custom.css
```

```css
/* assets/ananke/css/custom.css */

.site-title {
  letter-spacing: 0.02em;
}
```

## Register your CSS

Register each file with the `ananke.custom_css` parameter. Paths are relative to `assets/ananke/css/`. The theme adds the files after its own CSS, in the order that you list them, so later files can override earlier ones:

```toml
# config/_default/params.toml

[ananke]
custom_css = ["custom.css", "special.css"]
```

If you use a single `hugo.toml`, put the list under `[params.ananke]`.

> [!NOTE]
> The current parameter is `ananke.custom_css`. The old top-level `params.custom_css` still works but is deprecated and prints a build warning. Move it under `[params.ananke]`.

## Override a theme class

To change a class that the theme defines, redefine it in your custom CSS file. Use the same selector, so that your rule wins because it comes later. For example, to turn off the automatic [hyphenation](/customisation/styles/#hyphenation) of post content:

```css
/* assets/ananke/css/custom.css */

.hyphenate {
  hyphens: manual;
}
```

<!-- markdownlint-disable-next-line MD033 -->
<span id="asset-pipeline-limitations"></span>

## Use paths in your CSS

The theme joins all files into one bundle before Hugo processes it. Paths in your files therefore resolve from `assets/ananke/css/`, not from your file's directory:

* For a file in `assets/`, use a bare path, for example `url(images/background.png)`. Hugo looks in `assets/ananke/css/` first, and then in `assets/`.
* Write `./` and `../` paths relative to `assets/ananke/css/`.
* Do not use `@import`. Register each file in `custom_css` instead.

See [Paths inside the bundle](/explanation/stylesheet-pipeline/#paths-inside-the-bundle) for the reasons.

## Use Sass, SCSS, or another preprocessor

Ananke does not compile Sass or SCSS. Do one of these:

* Compile the stylesheet with your own tool. Put the CSS output in `assets/ananke/css/` and register the `.css` file in `custom_css`.
* Compile the stylesheet in a partial and register the partial in `custom_css`.

For example, to compile `assets/sass/main.scss` with Hugo, add this partial:

```go-html-template
{{- /* layouts/_partials/sass-styles.html */ -}}
{{- $css := resources.Get "sass/main.scss" | css.Sass (dict "transpiler" "dartsass") -}}
{{- return $css.Content -}}
```

Then register the partial:

```toml
# config/_default/params.toml

[ananke]
custom_css = ["sass-styles.html"]
```

The theme calls the partial with the site as context. The partial must return the CSS as text, for example with `.Content`. If the partial returns the resource, the theme does not add your rules and does not show a warning.

`css.Sass` needs [Dart Sass](https://gohugo.io/functions/css/sass/#dart-sass). Hugo removed the LibSass transpiler in v0.170.0.

## Static files and external stylesheets

If a registered file is not in `assets/ananke/css/`, the theme treats the value as a path relative to your `static/` directory, or as an external address. It loads the file with a separate `<link>` element instead of bundling it:

```toml
# config/_default/params.toml

[ananke]
custom_css = ["css/custom.css"] # loaded from static/css/custom.css
```

Hugo does not process these files. They are not minified, and paths in them resolve as in any static file.

## Upgrade from Ananke 2.15 or earlier

If your site used custom CSS or Sass before Ananke 2.16.0, read [Upgrade from Ananke 2.15 or earlier](/customisation/styles/#upgrade-from-ananke-215-or-earlier).

## Troubleshooting checklist

If your custom CSS does not show up:

* **File not found?** Confirm that the path is relative to `assets/ananke/css/` for bundled files, and that the filename matches exactly, including case.
* **Not registered?** Make sure that the file is listed in `ananke.custom_css` under `[params.ananke]`, not in the deprecated top-level `custom_css`.
* **Loaded as a separate link unexpectedly?** The theme did not find the file in `assets/ananke/css/` and treated it as a static file. Check the location.
* **Rules overridden by the theme?** List your file later in `custom_css`, or increase selector specificity. Inspect the generated `ananke/css/main.css` in your build to confirm that your rules are present.
* **Sass file skipped?** The build log shows `has type "x-scss" and was skipped`. Use one of the [preprocessor methods](#use-sass-scss-or-another-preprocessor).
* **Old version cached?** Hard-refresh the browser, or run `hugo --gc` to clear generated resources, then rebuild.
