---
title: Getting Started
date: 2026-01-16T08:00:00.000+0700
---

This guide summarizes the first configuration steps after installing Ananke.

## 1) Install the theme

Choose one installation method:

* [Installation as Hugo Module (recommended)](/installation/gohugo-module/)
* [Installation as Git Submodule](/installation/git-submodule/)

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
* `params` values you want to customize

See:

* [General Configuration](/configuration/general/)
* [SEO Configuration](/configuration/seo/)
* [Social Media Networks](/configuration/social-media-networks/)

## 4) Add content and front matter

Start adding content and use front matter options supported by Ananke:

* [Front Matter Options](/content/frontmatter/)
* [General Content Features](/content/general/)
* [Reading Time](/content/reading-time/)
* [Shortcodes](/shortcodes/)

## 5) Customize visual style

For design and UI adjustments:

* [Hero section](/customisation/hero-section/)
* [Colors](/customisation/colours/)
* [Styles and CSS](/customisation/styles/)
* [Comments setup](/customisation/comments/)

## 6) Run and verify locally

Run Hugo locally and verify pages, menus, metadata, and social links:

```bash
hugo server
```

If you hit issues, see [Troubleshooting](/troubleshooting/).
