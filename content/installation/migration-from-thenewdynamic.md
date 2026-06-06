---
title: Migration from theNewDynamic
date: 2026-06-06T08:00:00.000+0700
---

* [What changed](#what-changed)
* [Migrate a Hugo Module install](#migrate-a-hugo-module-install)
* [Migrate a Git submodule install](#migrate-a-git-submodule-install)
* [Confirm the theme is loaded](#confirm-the-theme-is-loaded)
* [Common failure cases](#common-failure-cases)

Ananke moved to its own organisation on 23 April 2026. The repository changed
from:

```text
github.com/theNewDynamic/gohugo-theme-ananke
```

to:

```text
github.com/gohugo-ananke/ananke
```

Both URLs still resolve for now, so existing sites keep building, but you should
update your references so future updates come from the new location.

## What changed

* **Organisation and repository name** changed as shown above.
* **Module path** changed from
  `github.com/theNewDynamic/gohugo-theme-ananke/v2` to
  `github.com/gohugo-ananke/ananke/v2`. The `/v2` suffix is unchanged and still
  required.
* **Installation methods are unchanged.** If you are installing fresh rather
  than migrating, follow [Install as Hugo Module](/installation/gohugo-module/)
  or [Install as Git Submodule](/installation/git-submodule/) instead of this
  page.

## Migrate a Hugo Module install

Search your site configuration for the old module path and replace every
instance of:

```text
github.com/theNewDynamic/gohugo-theme-ananke/v2
```

with:

```text
github.com/gohugo-ananke/ananke/v2
```

This usually appears in `config/_default/module.toml` (or your root
configuration file) and in `go.mod`. After replacing it, update the module
graph:

```bash
hugo mod get github.com/gohugo-ananke/ananke/v2
hugo mod tidy
```

Commit the updated `go.mod` and `go.sum`.

## Migrate a Git submodule install

Point the existing submodule at the new remote. From your site root:

```bash
cd themes/ananke
git remote set-url origin https://github.com/gohugo-ananke/ananke.git
cd ../..
git submodule sync
```

Then update the URL in the `.gitmodules` file at the root of your repository,
replacing `theNewDynamic/gohugo-theme-ananke` with `gohugo-ananke/ananke`.
Commit both `.gitmodules` and the updated submodule reference.

## Confirm the theme is loaded

After migrating with either method, verify the new path is in use and the site
still builds.

For Hugo Modules, inspect the module graph — it should list
`github.com/gohugo-ananke/ananke/v2` and no longer mention `theNewDynamic`:

```bash
hugo mod graph
```

For both methods, build and serve the site locally:

```bash
hugo server
```

Open [http://localhost:1313/](http://localhost:1313/). If the homepage renders
with the hero header and styling, the theme is loaded correctly.

You can also confirm the merged configuration sees the theme:

```bash
hugo config | grep -i theme
```

## Common failure cases

* **`module ... not found` after migrating.** The old path is still referenced
  somewhere. Search the whole project (including `go.mod` and `go.sum`) for
  `theNewDynamic` and replace it, then run `hugo mod tidy` again.
* **Submodule still points at the old remote.** Run `git submodule sync` after
  editing `.gitmodules`, and check with
  `git config --file .gitmodules --get-regexp url`.
* **Styling missing after migration.** Clear Hugo's caches and rebuild:
  `hugo --gc` (Modules) or delete `resources/_gen` and rebuild. See
  [Troubleshooting](/troubleshooting/).
* **Build still uses the old version.** For Modules, run
  `hugo mod get -u github.com/gohugo-ananke/ananke/v2` to force an update, then
  `hugo mod tidy`.

For anything else, ask in
[GitHub Discussions](https://github.com/orgs/gohugo-ananke/discussions).
