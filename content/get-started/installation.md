---
title: Choose an installation method
description: "Compare the two ways to install Ananke: as a Hugo Module or as a Git submodule."
date: 2026-01-16T08:00:00.000+0700
weight: 100
aliases:
  - /installation/
  - /installation/installation/
---

There are two ways to install Ananke:

1. **Hugo Module**: Hugo uses its built-in Go module system to get and manage the theme as a package.
2. **Git submodule**: Git links the theme repository as a submodule inside your Hugo project.

The [Hugo quick start guide](https://gohugo.io/getting-started/quick-start/) installs Ananke as a **Git submodule**. This method works, but Hugo Modules use Go's module system and give you better dependency management.

**We recommend the Hugo Module method**, because it makes it easier to manage and update the theme version.

> [!NOTE]
> Do you already use Ananke from the old `theNewDynamic` repository? Read [Upgrade from theNewDynamic to gohugo-ananke](/get-started/upgrade-from-thenewdynamic/) to update your references to `github.com/gohugo-ananke/ananke`.

## Compare Hugo Module and Git submodule

| Method | Advantages | Disadvantages | Sample repository |
| --- | --- | --- | --- |
| [Hugo Module](/get-started/hugo-module/) *(recommended)* | Easier version management, automatic updates, better integration | Requires Go and an initial setup | [Hugo Module template](https://github.com/gohugo-ananke/template-hugo-mod) |
| [Git submodule](/get-started/git-submodule/) | Simple if you already use Git | Requires manual updates, can be difficult with some Git workflows | [Git submodule template](https://github.com/gohugo-ananke/template-git-submod) |
