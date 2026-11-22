---
title: Choose an installation method
description: "Compare the two ways to install Ananke: as a Hugo Module or as a Git submodule."
date: 2026-01-16T08:00:00.000+0700
weight: 100
aliases:
  - /installation/
  - /installation/installation/
---

You can add Ananke to a site in two ways. Both give the same theme and the same site; they differ in how the theme gets into your project and how you update it.

* **Hugo Module**: Hugo downloads the theme through Go's module system into a cache outside your project. Your project records the exact release in `go.mod` and `go.sum`.
* **Git submodule**: Git places the theme repository in `themes/ananke` inside your project. Your repository records the exact theme commit.

**We recommend the Hugo Module method.** One command updates the theme or selects a release, and the version is a readable line in `go.mod`.

[Hugo's quick start](https://gohugo.io/getting-started/quick-start/) installs Ananke as a Git submodule. That method works well too. You can change from one method to the other later.

> [!NOTE]
> Do you already use Ananke from the old `theNewDynamic` repository? Read [Upgrade from theNewDynamic to gohugo-ananke](/get-started/upgrade-from-thenewdynamic/) to update your references to `github.com/gohugo-ananke/ananke`.

## Compare Hugo Module and Git submodule

| Method | Advantages | Disadvantages | Sample repository |
| --- | --- | --- | --- |
| [Hugo Module](/get-started/hugo-module/) *(recommended)* | Update or select a release with one `hugo mod get` command. The version is visible in `go.mod`. No theme files in your repository. | Requires Go. The first build downloads the theme, so it needs network access. | [Hugo Module template](https://github.com/gohugo-ananke/template-hugo-mod) |
| [Git submodule](/get-started/git-submodule/) | Needs only Git. The theme files are in your project, so you can read them next to your site. | Every clone and deployment must fetch the submodule. Updates need Git commands in the submodule and a commit in your site. | [Git submodule template](https://github.com/gohugo-ananke/template-git-submod) |

Neither method updates the theme by itself. Your site keeps its release until you update it; see [Update Ananke](/get-started/update-ananke/).

With either method, do not edit the theme files. Change the theme behaviour from your own project instead; see [How Ananke configuration works](/explanation/configuration/#your-site-not-the-theme).
