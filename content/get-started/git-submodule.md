---
title: Install as a Git submodule
description: "Create a Hugo site and install Ananke as a Git submodule in the themes directory."
date: 2026-01-16T08:00:00.000+0700
weight: 300
aliases:
  - /installation/git-submodule/
---

This guide creates a new Hugo site named `quickstart` and adds the [Ananke theme](https://github.com/gohugo-ananke/ananke) as a Git submodule in `themes/ananke`. Your repository then records the exact theme commit. To compare this method with a Hugo Module, read [Choose an installation method](/get-started/installation/).

<!-- markdownlint-disable-next-line MD033 -->
<span id="installation-methods"></span>

## Requirements

* [Hugo](https://gohugo.io/installation/), in a version that the current Ananke release supports. See [Hugo version compatibility](/get-started/compatibility/). We recommend the latest Hugo release.
* [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).

Check the installed versions:

```bash
hugo version
git --version
```

## Installation

1. Create the site and change into its directory:

   ```bash
   hugo new site quickstart
   cd quickstart
   git init
   ```

2. Add the theme as a [Git submodule](https://git-scm.com/book/en/v2/Git-Tools-Submodules):

   ```bash
   git submodule add https://github.com/gohugo-ananke/ananke.git themes/ananke
   ```

   Git clones the theme's default branch, `main`, which contains the latest release.

3. Optional: select a specific release instead, for example v2.23.0:

   ```bash
   git -C themes/ananke checkout v2.23.0
   ```

4. Select the theme in the site configuration:

   ```bash
   echo "theme = 'ananke'" >> hugo.toml
   ```

5. Commit the submodule:

   ```bash
   git add .gitmodules themes/ananke hugo.toml
   git commit -m "Add the Ananke theme"
   ```

6. Start the development server:

   ```bash
   hugo server
   ```

## Check the result

* `git -C themes/ananke describe --tags` shows the theme release, for example `v2.23.0`.
* [http://localhost:1313/](http://localhost:1313/) shows the site with a dark header bar and the site title. The new site has no content yet.

Stop the server with `Ctrl + C`.

If the build fails, compare your Hugo version with [Hugo version compatibility](/get-started/compatibility/), and see [Troubleshooting](/help/troubleshooting/).

## Clone a site that uses the submodule

A normal `git clone` leaves `themes/ananke` empty. Clone with the submodule:

```bash
git clone --recurse-submodules https://github.com/username/reponame.git
```

In an existing clone, run `git submodule update --init`.

## Next steps

* Add a homepage, a post, and a menu: [Build your first Ananke site](/tutorials/first-site/#give-the-site-a-name).
* Set your site's options: [Configuration](/configuration/).
* Update the theme later: [Update Ananke](/get-started/update-ananke/#update-a-git-submodule).
