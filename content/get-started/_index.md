---
title: Get started
date: 2026-01-16T08:00:00.000+0700
weight: 100
aliases:
  - /getting-started/
---

This section takes you from an empty Hugo site to a working site with Ananke. Follow the steps below in order. If you already use Ananke from the old `theNewDynamic` repository, read [Upgrade from theNewDynamic to gohugo-ananke](/get-started/upgrade-from-thenewdynamic/) first.

## 1) Install the theme

Choose one installation method. To compare the two methods, read [Choose an installation method](/get-started/installation/).

* [Install as a Hugo Module (recommended)](/get-started/hugo-module/)
* [Install as a Git submodule](/get-started/git-submodule/)

## 2) Confirm Hugo version compatibility

Ananke requires Hugo v0.160.0 or later. The theme declares this minimum in its own `config/_default/module.toml` file. We recommend the latest Hugo version, because we test Ananke against the latest Hugo release.

Check which Hugo version you have installed:

```bash
hugo version
```

Use the standard edition of Hugo, or the deploy edition if you deploy your site directly from Hugo. Since Hugo v0.170.0, the extended editions are no longer available or needed: the standard and deploy editions encode WebP images, and Hugo uses Dart Sass for Sass. If you use a Hugo version from v0.160.0 to v0.169.x, you need the extended edition only to process WebP images. For details, see [Hugo editions](https://gohugo.io/installation/linux/#editions).

## 3) Configure required basics

At minimum, configure:

* Site `title`
* `baseURL`
* Theme/module setup
* `params` values you want to customise

See:

* [General configuration](/configuration/general/)
* [Menus](/configuration/menus/)
* [SEO](/configuration/seo/)
* [Social media networks](/configuration/social-media-networks/)

All configuration topics are in the [Configuration](/configuration/) section.

## 4) Add content and front matter

Start adding content and use front matter options supported by Ananke:

* [Front matter](/content/frontmatter/)
* [Content types and archetypes](/content/content-types/)
* [Images](/content/images/)
* [Shortcodes](/content/shortcodes/)

All content topics are in the [Content](/content/) section.

## 5) Customise the visual style

For design and UI adjustments:

* [Colours](/customisation/colours/)
* [Styles](/customisation/styles/)
* [Custom CSS](/customisation/custom-css/)
* [Page headers](/customisation/hero-section/)

All customisation topics are in the [Customisation](/customisation/) section. For complete site configurations, see [Examples and recipes](/examples/).

## 6) Run and verify locally

Run Hugo locally and verify pages, menus, metadata, and social links:

```bash
hugo server
```

If you hit issues, see [Troubleshooting](/help/troubleshooting/).
