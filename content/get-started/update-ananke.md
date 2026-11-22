---
title: Update Ananke
description: "Update the theme in an existing site to a newer Ananke release, as a Hugo Module or as a Git submodule."
date: 2026-11-22T00:00:00+07:00
weight: 350
---

Your site uses one exact Ananke release until you update it. This guide updates the theme to the latest release or to a release that you select, and checks the result.

## Before you update

1. Find your current release. For a Hugo Module, run `hugo mod graph`. For a Git submodule, run `git -C themes/ananke describe --tags`.
2. Read the [release notes](https://github.com/gohugo-ananke/ananke/releases) of every release after yours. They name new features, changed defaults, and deprecations.
3. Check that your Hugo version supports the new release: see [Hugo version compatibility](/get-started/compatibility/).
4. Commit or back up your site, so that you can return to the current state.

## Update a Hugo Module

To update to the latest release:

```bash
hugo mod get -u github.com/gohugo-ananke/ananke/v2
hugo mod tidy
```

To select a release, add its version:

```bash
hugo mod get github.com/gohugo-ananke/ananke/v2@v2.23.0
hugo mod tidy
```

The same command with an older version returns to that release. Commit the changed `go.mod` and `go.sum`.

If the module path in your configuration starts with `github.com/theNewDynamic/`, these commands fail. Follow [Upgrade from theNewDynamic to gohugo-ananke](/get-started/upgrade-from-thenewdynamic/) first.

## Update a Git submodule

Fetch the releases and check out the one that you want, for example v2.23.0:

```bash
git -C themes/ananke fetch --tags
git -C themes/ananke checkout v2.23.0
```

Then commit the new theme commit in your site:

```bash
git add themes/ananke
git commit -m "Update Ananke to v2.23.0"
```

On other computers and in deployments, run `git submodule update --init` after you pull this commit.

## Check the result

1. Confirm the version: `hugo mod graph`, or `git -C themes/ananke describe --tags`.
2. Build the site and read every warning line that starts with `WARN` and contains `[ananke]`:

   ```bash
   hugo --gc
   ```

3. Open the site with `hugo server` and check the pages that use your customisations: overridden partials, hooks, custom CSS, and menus.

## Changes that need action

Some releases need changes in your site. The release notes link to the guide:

* Ananke 2.16.0 changed the stylesheet pipeline: see [Upgrade from Ananke 2.15 or earlier](/customisation/styles/#upgrade-from-ananke-215-or-earlier).
* Ananke 2.21.0 deprecated overrides of the header partials: see [Migrate existing header overrides](/customisation/header/#migrate-existing-header-overrides).
* Ananke 2.13.0 and later use the module path `github.com/gohugo-ananke/ananke/v2`: see [Upgrade from theNewDynamic to gohugo-ananke](/get-started/upgrade-from-thenewdynamic/).
