---
title: Build your first Ananke site
description: "Use either installation method, then create a homepage, a first post, navigation, and a local build."
date: 2026-11-21T00:00:00+07:00
weight: 100
---

In this exercise, you will create a small Ananke site with a homepage introduction, one post, and navigation. You will preview the site and build its production files locally.

## Choose your starting point

If you are also new to Hugo, follow [Hugo's quick start](https://gohugo.io/getting-started/quick-start/). It already uses Ananke, installed as a Git submodule, and teaches project creation, content, configuration, and a local build. Check [Ananke's Hugo compatibility](/get-started/compatibility/) before starting, because the theme release you install can have a different requirement from the tutorial's minimum. After that lesson, use our [how-to guides](/how-to/) to customise your site.

To use our installation guides instead, complete one of these methods, then continue below:

* [Install as a Hugo Module](/get-started/hugo-module/), the recommended method. This requires Go as well as Hugo and Git.
* [Install as a Git submodule](/get-started/git-submodule/). This requires Hugo and Git.

Both guides create a project named `quickstart`. Use a new directory for the exercise, keep the project open in your editor, and run commands from that project's root. If the installation guide left the development server running, stop it with `Ctrl + C`.

## Give the site a name

Open the project's `hugo.toml`. Set the existing `title` value to `My first Ananke site` and the existing `baseURL` value to `https://example.org/`. Keep the theme or module configuration added by your installation guide.

The title will identify your site in the header. The example address is sufficient for this local exercise; use your real site address before deployment.

## Write the homepage

Create `content/_index.md` with this complete content:

```markdown
+++
title = "Welcome to my site"
+++

I am learning to build a site with Hugo and Ananke. My first post appears below.
```

This file supplies the homepage introduction. The block between the `+++` markers is front matter: information about the page.

## Add a first post

Create the post:

```bash
hugo new content posts/my-first-post.md
```

Replace the contents of `content/posts/my-first-post.md` with:

```markdown
+++
title = "My first post"
date = 2026-01-01T12:00:00+07:00
draft = false
description = "A first post on my Ananke site."
+++

## What I built

My site has a homepage and a post. Next, I will add navigation between them.
```

The fixed date keeps this exercise reproducible. `draft = false` includes the post in a normal build; a draft is normally excluded. The description provides a short description for metadata.

## Add navigation

Create `config/_default/menus.toml`. If Hugo created a `config` directory, use that directory. Add this complete menu configuration:

```toml
# config/_default/menus.toml
[[main]]
name = "Home"
pageRef = "/"
weight = 10

[[main]]
name = "Posts"
pageRef = "/posts/"
weight = 20
```

The `pageRef` values identify the homepage and the posts section. Lower weights appear first. You do not need to copy the rest of `hugo.toml` into this file.

## Preview what you built

Start the development server:

```bash
hugo server
```

Open the address printed in your terminal. Check these results:

* The header shows `My first Ananke site`.
* The homepage shows your introduction and a link to `My first post`.
* The post opens and shows the text you wrote.
* The Home and Posts menu links take you to the expected pages.

Edit a sentence in the homepage file and save it. Watch the preview update. You have now changed the site's content without editing the theme.

If a result is missing, check that you saved the files and that the terminal command runs inside `quickstart`. See [Troubleshooting](/help/troubleshooting/) for further checks.

## Build the production files

Stop the server with `Ctrl + C`, then run:

```bash
hugo
```

Hugo writes the site into `public/`. Confirm that `public/index.html` and `public/posts/my-first-post/index.html` exist. This builds files on your computer; it does not deploy them to a host.

## Continue with your own site

You have practised installation, front matter, content, navigation, previewing, and building. Use [How-to guides](/how-to/) for your next task, [Explanation](/explanation/) for configuration concepts, and [Reference](/reference/) for exact settings. The [minimal blog recipe](/examples/minimal-blog/) provides a fuller configuration to compare with your exercise.
