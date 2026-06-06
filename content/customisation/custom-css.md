---
title: Custom CSS
date: 2026-06-06T08:00:00.000+0700
---

* [Where custom CSS goes](#where-custom-css-goes)
* [Register your CSS](#register-your-css)
* [Static files and external stylesheets](#static-files-and-external-stylesheets)
* [Asset pipeline limitations](#asset-pipeline-limitations)
* [Troubleshooting checklist](#troubleshooting-checklist)

You can add your own CSS on top of the theme's styles without editing the theme.
This page covers the common path; for the full stylesheet pipeline (build order,
social hover colours, source maps) see [Styles](/customisation/styles/).

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

Register each file with the `ananke.custom_css` parameter. Paths are relative to
`assets/ananke/css/`, and files are added in the order you list them — later
files can override earlier ones:

```toml
# config/_default/params.toml

[params.ananke]
custom_css = ["custom.css"]
```

Your CSS is bundled into the theme's stylesheet after Tachyons and the theme's
own CSS, so your rules win through the normal cascade.

> [!NOTE]
> The current parameter is `ananke.custom_css`. The old top-level
> `params.custom_css` still works but is deprecated and prints a build warning —
> move it under `[params.ananke]`.

## Static files and external stylesheets

If a registered file is **not** found in `assets/ananke/css/`, the theme treats
the value as a path relative to your `static/` directory (or an external URL) and
loads it as a separate `<link>` instead of bundling it:

```toml
# config/_default/params.toml

[params.ananke]
custom_css = ["css/custom.css"]   # loaded from static/css/custom.css
```

## Asset pipeline limitations

* **Sass/SCSS is not compiled** by the theme. Precompile your Sass to CSS and
  reference the `.css` output, or process it in your own partial (see
  [Styles → SASS/SCSS](/customisation/styles/#sassscss-and-other-pre-processors)).
* The bundle is minified and fingerprinted in production builds only; in
  development it stays readable with a linked source map.

## Troubleshooting checklist

If your custom CSS does not show up:

* **File not found?** Confirm the path is relative to `assets/ananke/css/` (for
  bundled files) and that the filename matches exactly, including case.
* **Not registered?** Make sure the file is listed in `ananke.custom_css` under
  `[params.ananke]`, not the deprecated top-level `custom_css`.
* **Loaded as a separate link unexpectedly?** That means the file was not found
  in `assets/ananke/css/`; the theme fell back to `static/`. Check the location.
* **Rules overridden by the theme?** List your file later in `custom_css`, or
  increase selector specificity. Inspect the generated `ananke/css/main.css` in
  your build to confirm your rules are present.
* **Old version cached?** Hard-refresh the browser, or run `hugo --gc` to clear
  generated resources, then rebuild.
