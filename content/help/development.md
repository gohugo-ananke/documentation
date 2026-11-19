---
title: Developing across the Ananke repositories
description: "Test theme changes with the documentation and starter sites, using a GitHub branch or a local checkout."
date: 2026-11-19T08:00:00.000+0700
weight: 300
---

Theme changes often need testing in the documentation and in sites that use different installation methods. You can select a theme branch on GitHub or use a local theme checkout. Prefer the GitHub option when sharing work or building a pull request preview. Use a local replacement when you need to test uncommitted theme changes.

**Be careful with temporary dependencies.** A theme revision or replacement committed in a pull request becomes part of the target branch when that pull request is merged. Remove temporary development settings, or replace them with an approved release dependency, before merging into the main branches.

## How the repositories fit together

The four repositories have separate roles:

* [ananke](https://github.com/gohugo-ananke/ananke) contains the shared theme: templates, styles, scripts, translations, and theme configuration.
* [documentation](https://github.com/gohugo-ananke/documentation) contains this documentation site and its site-specific overrides. It uses Ananke as a Hugo Module and provides a place to test and explain theme development.
* [template-hugo-mod](https://github.com/gohugo-ananke/template-hugo-mod) is a starter site that consumes Ananke as a Hugo Module.
* [template-git-submod](https://github.com/gohugo-ananke/template-git-submod) is a starter site that consumes Ananke through the Git submodule at `themes/ananke`.

There is no separate repository named `development` in this arrangement. A `development` branch belongs to its own repository. Switching the documentation branch does not switch the theme branch, update another site's module dependency, or move a Git submodule.

Keep the checkouts next to each other:

```text
workspace/
  ananke/
  documentation/
  template-hugo-mod/
  template-git-submod/
```

Make shared theme changes in `ananke`. Test them in the documentation and both starter sites. Keep documentation-specific overrides in `documentation`. Each site has its own dependency selection, configuration, and Git history; placing the directories next to each other does not connect them automatically.

## Option 1: select a remote theme branch

This is the preferred option for the documentation and the Hugo Module starter site. It lets another developer or a preview build download the same theme revision without a sibling checkout. Git, Go, and Hugo must be available.

From the root of the consuming site, select the theme's `development` branch:

```bash
# Run in documentation/ or template-hugo-mod/.
hugo mod get github.com/gohugo-ananke/ananke/v2@development
```

The part after `@` selects a branch in the **Ananke repository**. The consuming site can be on a branch with a different name. Replace `development` with the theme branch or commit you want to test; there is no automatic branch-name matching.

Hugo resolves the branch to a module revision and records the dependency in `go.mod`, with checksums in `go.sum`. A branch revision normally appears as a Go pseudo-version rather than the branch name. Later builds use that recorded revision; they do not automatically follow new commits on the theme branch. Run the same command again when you want to adopt its latest changes.

Use the production environment to test the remote dependency without this documentation site's development-only local replacement:

```bash
hugo mod graph --environment production
hugo server --environment production
```

Inspect the graph to confirm the theme revision. Check for other replacements in configuration, environment variables, or `go.mod` if the graph still points to a local directory. A replacement takes precedence over the remote dependency you intended to test.

When a shared preview needs this temporary theme revision, include the required `go.mod` and `go.sum` changes in the feature PR and explain the dependency at the start of its description. Do not leave that temporary selection in the final merge by accident.

The Git submodule starter does not use this module command for its theme. To test the same remote theme branch there, initialise the submodule and select the branch inside it:

```bash
# Run in template-git-submod/ with a clean theme submodule.
git submodule update --init --recursive
git -C themes/ananke fetch origin
git -C themes/ananke switch --detach origin/development
hugo server
```

The parent repository records a submodule commit, not a moving branch tip. Changing this checkout may show `themes/ananke` as modified in the parent repository. If committed, that pointer also reaches the target branch on merge. Repeat the fetch and checkout to adopt a later theme commit deliberately.

## Option 2: use a local replacement in configuration

A local module replacement reads the theme directly from disk, including uncommitted changes. It is useful when editing the theme and checking the result immediately in several sites.

First, check which branch and changes are present in the shared theme checkout:

```bash
# Run in documentation/ or either starter site.
git -C ../ananke status --short --branch
```

The replacement does not select a branch. Every site pointing to this directory sees its current working tree. Switching that theme checkout affects all of them. Use separate theme checkouts or Git worktrees if you need to test different theme branches at the same time.

For a module-based site, add the following setting to `config/development/module.toml`, preserving any existing imports, mounts, and other settings:

```toml
# config/development/module.toml
replacements = "github.com/gohugo-ananke/ananke/v2 -> ../../ananke"
```

This file is already inside the `module` configuration namespace, so do not wrap the setting in a `[module]` table. The documentation repository already provides this replacement; do not add a duplicate. The consuming site must still import `github.com/gohugo-ananke/ananke/v2` in its normal module configuration.

Hugo resolves relative replacement paths from `themesDir`, which defaults to the site's `themes` directory. With the sibling layout above, `../../ananke` therefore reaches the shared theme checkout. Adjust this path if you change `themesDir` or the directory layout.

Start each module-based site with that environment:

```bash
hugo mod graph --environment development
hugo server --environment development
```

The graph should identify a local replacement. The server uses the local theme files, so you can test changes before committing or pushing them.

The Git submodule starter uses `theme = 'ananke'` instead of importing the theme as a remote module. For the sibling layout above, create `config/development/hugo.toml` with this setting:

```toml
# config/development/hugo.toml
# Resolve the theme name 'ananke' from the parent directory.
themesDir = ".."
```

Then run `hugo server --environment development` from `template-git-submod/`. This selects `../ananke` instead of `themes/ananke`. It checks the shared local theme, but it does not test the Git submodule installation itself. Also test with the normal configuration and an initialised submodule before accepting changes to that installation method.

To run the sites together, start each server in a separate terminal with a different port, for example `--port 1313` for the documentation, `--port 1314` for the module starter, and `--port 1315` for the submodule starter. Each server still uses its own site's content and configuration.

## Before merging a pull request

**Be careful is the rule.** A development environment is a Hugo configuration choice, not protection against merging temporary files. Git merges committed dependency and configuration changes just like other changes.

* Inspect `go.mod`, `go.sum`, module replacements, environment configuration, and any changed submodule pointer in the PR diff.
* State any blocking theme PR and temporary dependency clearly in the PR description.
* Before merging into the main branches, select the approved theme release and review the resulting dependency changes. Do not guess a release version before it exists.
* Remove temporary local paths and test-only configuration added for the work. An established development-only configuration can remain if it is intentionally maintained and excluded from production builds.
* Check the actual preview and production build commands. A build using the development environment could use a local path that does not exist on the build server.
* Build again with the final dependency and normal production configuration. A successful local replacement test does not prove that the released module or submodule installation works.

If the work still needs an unreleased theme revision, keep the dependency explicit and the PR blocked until the release or an agreed integration plan is ready. Do not merge a temporary branch dependency into the main branches merely because its preview works.

See Hugo's [module management guide](https://gohugo.io/hugo-modules/use-modules/) and [module replacement configuration](https://gohugo.io/configuration/module/#top-level-settings) for the underlying behaviour.
