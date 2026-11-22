---
title: Install as a Hugo Module (recommended)
description: "Create a Hugo site and install Ananke as a Hugo Module, the recommended method."
date: 2026-01-16T08:00:00.000+0700
weight: 200
aliases:
  - /installation/gohugo-module/
---

This guide creates a new Hugo site named `quickstart` and installs the [Ananke theme](https://github.com/gohugo-ananke/ananke) as a Hugo Module. Hugo then downloads the theme and records its exact version in your project. To compare this method with a Git submodule, read [Choose an installation method](/get-started/installation/).

<!-- markdownlint-disable-next-line MD033 -->
<span id="installation-methods"></span>

## Requirements

* [Hugo](https://gohugo.io/installation/), in a version that the current Ananke release supports. See [Hugo version compatibility](/get-started/compatibility/). We recommend the latest Hugo release.
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
* [Go](https://go.dev/doc/install). Hugo uses Go to download modules.

Check the installed versions:

```bash
hugo version
git --version
go version
```

## Installation

1. Create the site and change into its directory:

   ```bash
   hugo new site quickstart
   cd quickstart
   git init
   ```

2. Make the site a Hugo Module. Replace the path with the address of your own repository, for example `github.com/username/reponame`. Hugo does not check the path, but your repository address makes it unique:

   ```bash
   hugo mod init github.com/username/reponame
   ```

   Hugo creates a `go.mod` file.

3. Add the theme import to the end of `hugo.toml`:

   ```toml
   # hugo.toml

   [[module.imports]]
   path = "github.com/gohugo-ananke/ananke/v2"
   ```

   The `/v2` at the end of the path is required. If your site uses a configuration directory, put the import in `config/_default/module.toml` as `[[imports]]` instead.

4. Download the theme:

   ```bash
   hugo mod get github.com/gohugo-ananke/ananke/v2
   hugo mod tidy
   ```

   Hugo adds the latest Ananke release to `go.mod` and records checksums in `go.sum`. Commit both files.

5. Start the development server:

   ```bash
   hugo server
   ```

## Check the result

* `hugo mod graph` lists `github.com/gohugo-ananke/ananke/v2@` followed by the installed version.
* [http://localhost:1313/](http://localhost:1313/) shows the site with a dark header bar and the site title. The new site has no content yet.

Stop the server with `Ctrl + C`.

If the build fails, compare your Hugo version with [Hugo version compatibility](/get-started/compatibility/), and see [Troubleshooting](/help/troubleshooting/).

## Next steps

* Add a homepage, a post, and a menu: [Build your first Ananke site](/tutorials/first-site/#give-the-site-a-name).
* Set your site's options: [Configuration](/configuration/).
* Update the theme later: [Update Ananke](/get-started/update-ananke/#update-a-hugo-module).
