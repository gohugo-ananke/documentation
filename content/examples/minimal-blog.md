---
title: Minimal Blog
date: 2026-06-06T08:00:00.000+0700
---

A small blog: a homepage that lists recent posts, an about page, and a posts
section.

## File tree

```text
example-site/
├── config/
│   └── _default/
│       ├── hugo.toml
│       ├── module.toml
│       ├── menus.toml
│       └── params.toml
└── content/
    ├── _index.md
    ├── about.md
    └── posts/
        └── first-post.md
```

## Configuration

```toml
# config/_default/hugo.toml

baseURL = "https://example.com/"
languageCode = "en-gb"
title = "My Minimal Blog"
enableRobotsTXT = true

[taxonomies]
tag = "tags"
category = "categories"
```

```toml
# config/_default/module.toml

[[imports]]
path = "github.com/gohugo-ananke/ananke/v2"
```

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

[[main]]
name = "About"
pageRef = "/about/"
weight = 30
```

```toml
# config/_default/params.toml

[params]
mainSections = ["posts"]
read_more_copy = "Read more"
show_reading_time = true

[ananke]
show_recent_posts = true
```

## Sample content

```markdown
+++
title = "My Minimal Blog"
featured_image = "/images/home.jpg"
+++

Welcome — this is the homepage introduction. Recent posts appear below.
```

```markdown
+++
title = "About"
+++

A few words about me and this blog.
```

```markdown
+++
title = "First post"
date = 2026-06-06T10:00:00+07:00
description = "The very first post on this blog."
tags = ["hugo", "ananke"]
+++

Hello world — this is my first post.
```

## What it looks like

The homepage shows the introduction text and a list of recent posts (newest
first). The header uses `/images/home.jpg` as a hero, or a black background if
the image is absent. Each post shows its reading time.

## Common adjustments

* Change how many posts are listed with `recent_posts_number`.
* Hide the post list for a static landing page with
  `[ananke] show_recent_posts = false`.
* Add social links — see [Social Media Networks](/configuration/social-media-networks/).
