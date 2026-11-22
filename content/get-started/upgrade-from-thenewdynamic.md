---
title: Upgrade from theNewDynamic to gohugo-ananke
description: "Move an existing site from the old theNewDynamic repository to github.com/gohugo-ananke/ananke."
date: 2026-06-06T08:00:00.000+0700
weight: 400
aliases:
  - /installation/upgrading-from-thenewdynamic/
  - /installation/migration-from-thenewdynamic/
---

Ananke moved to its own organisation in April 2026. The repository changed from: `github.com/theNewDynamic/gohugo-theme-ananke` to `github.com/gohugo-ananke/ananke`.

Existing sites keep building with the release that they use now. To update to a current release, change your references to the new location:

* **Hugo Module:** Ananke v2.13.0 and later declare the module path `github.com/gohugo-ananke/ananke/v2`. With the old path, Hugo can still download v2.12.1 and earlier, but it cannot update the theme: `hugo mod get` fails with `module declares its path as: github.com/gohugo-ananke/ananke/v2`.
* **Git submodule:** GitHub redirects the old repository address, so `git fetch` still works. Change the address anyway, because a redirect can stop working.

## What changed

* **Organisation and repository name** changed as shown above.
* **Module path** changed from
  `github.com/theNewDynamic/gohugo-theme-ananke/v2` to
  `github.com/gohugo-ananke/ananke/v2`, starting with Ananke v2.13.0. The `/v2` suffix is unchanged and still
  required.
* **Installation methods are unchanged.** If you are installing fresh rather than migrating, follow [Install as a Hugo Module](/get-started/hugo-module/) or [Install as a Git submodule](/get-started/git-submodule/) instead of this page.

## Migrate a Hugo Module install

1. In your site configuration, replace the import path `github.com/theNewDynamic/gohugo-theme-ananke/v2` with `github.com/gohugo-ananke/ananke/v2`. The import is usually in `config/_default/module.toml` or in your root configuration file.
2. In `go.mod`, delete the line that requires `github.com/theNewDynamic/gohugo-theme-ananke/v2`. Do not only replace the path there: the old version number does not exist under the new path, and Hugo stops with `module declares its path as: github.com/theNewDynamic/gohugo-theme-ananke/v2`.
3. Download the theme under the new path:

   ```bash
   hugo mod get github.com/gohugo-ananke/ananke/v2
   hugo mod tidy
   ```

   Hugo adds the latest release to `go.mod`. To select a release, add it to the path, for example `github.com/gohugo-ananke/ananke/v2@v2.23.0`.

Commit the updated `go.mod` and `go.sum`.

## Migrate a Git submodule install

Point the existing submodule at the new address. From your site root:

```bash
git submodule set-url themes/ananke https://github.com/gohugo-ananke/ananke.git
git submodule sync
```

`set-url` changes the address in `.gitmodules`; `sync` copies it to the submodule's Git configuration. Do not only run `git remote set-url` in `themes/ananke`: the next `git submodule sync` replaces that address with the old one from `.gitmodules`.

Commit the changed `.gitmodules`. To update the theme to a newer release afterwards, see [Update Ananke](/get-started/update-ananke/#update-a-git-submodule).

## Confirm the theme is loaded

After migrating with either method, verify the new path is in use and the site still builds.

For Hugo Modules, inspect the module graph — it should list `github.com/gohugo-ananke/ananke/v2` and no longer mention `theNewDynamic`:

```bash
hugo mod graph
```

For both methods, build and serve the site locally:

```bash
hugo server
```

Open [http://localhost:1313/](http://localhost:1313/). If the homepage renders
with the hero header and styling, the theme is loaded correctly.

For a Git submodule, check the remote address. It should be `https://github.com/gohugo-ananke/ananke.git`:

```bash
git -C themes/ananke remote get-url origin
```

## Common failure cases

* **`module declares its path as: github.com/gohugo-ananke/ananke/v2 but was required as: github.com/theNewDynamic/gohugo-theme-ananke/v2`.** The old path is still referenced
  somewhere. Search the whole project (including `go.mod` and `go.sum`) for
  `theNewDynamic` and replace it, then run `hugo mod tidy` again.
* **Submodule still points at the old remote.** Run `git submodule set-url` and `git submodule sync` as shown above, and check with
  `git config --file .gitmodules --get-regexp url`.
* **Styling missing after migration.** Clear Hugo's caches and rebuild:
  `hugo --gc` (Modules) or delete `resources/_gen` and rebuild. See
  [Troubleshooting](/help/troubleshooting/).
* **Build still uses the old version.** See [Update Ananke](/get-started/update-ananke/).

For anything else, ask in
[GitHub Discussions](https://github.com/orgs/gohugo-ananke/discussions).
