---
title: Introduction
date: 2026-01-16T08:00:00.000+0700
aliases:
 - /installation/installation/
---

* [Installing the Ananke Theme for Hugo](#installing-the-ananke-theme-for-hugo)
* [Comparison: Hugo Module vs. Git Submodule](#comparison-hugo-module-vs-git-submodule)

## Installing the Ananke Theme for Hugo

There are two primary ways to install Ananke:

1. **Hugo Module** --- Uses Hugo's built-in Go module system to fetch and manage the theme as a package.
2. **Git Submodule** --- Links the theme repository as a submodule inside your Hugo project.

If you're following the [Hugo Quickstart guide](https://gohugo.io/getting-started/quick-start/), you'll notice that it currently recommends installing the Ananke theme as a **Git submodule**. While this is a valid approach, Hugo also offers a more powerful alternative: **Hugo Modules**, which leverage Go's module system for better dependency management.

**We prefer the Hugo Module approach**, as it provides a more flexible and future-proof way to manage themes.

> [!NOTE]
> Already using Ananke from the old `theNewDynamic` repository? See
> [Migration from theNewDynamic](/installation/migration-from-thenewdynamic/) to
> update your references to `github.com/gohugo-ananke/ananke`.

## Comparison: Hugo Module vs. Git Submodule

| Method                                         | Pros                                                             | Cons                                                      | Sample Repo                                                         |
| ---------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------- |
| [Hugo Module](../gohugo-module/) *(Preferred)* | Easier version management, automatic updates, better integration | Requires Go installed and initial setup                   | [Sample Repo](https://github.com/gohugo-ananke/template-hugo-mod)   |
| [Git Submodule](../git-submodule/)             | Simple if you are used to working with Git                       | Requires manual updates, can be tricky with Git workflows | [Sample Repo](https://github.com/gohugo-ananke/template-git-submod) |
