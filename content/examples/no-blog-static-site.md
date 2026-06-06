---
title: No-blog Static Site
date: 2026-06-06T08:00:00.000+0700
---

A simple brochure site with a homepage and a few standalone pages — no blog or
post list.

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
    └── services.md
```

## Configuration

```toml
# config/_default/hugo.toml

baseURL = "https://example.com/"
languageCode = "en-gb"
title = "Example Studio"
enableRobotsTXT = true
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
name = "Services"
pageRef = "/services/"
weight = 20

[[main]]
name = "About"
pageRef = "/about/"
weight = 30
```

```toml
# config/_default/params.toml

[ananke]
show_recent_posts = false
```

## Sample content

```markdown
+++
title = "Example Studio"
featured_image = "/images/studio.jpg"
+++

We design and build small, fast websites. Get in touch to start a project.
```

```markdown
+++
title = "Services"
+++

What we offer and how we work.
```

```markdown
+++
title = "About"
+++

Who we are.
```

## What it looks like

The homepage shows only the introduction and hero image — no post list, because
`show_recent_posts` is `false`. The menu links the standalone pages.

## Common adjustments

* Add a [contact form](/shortcodes/contact-form/) to a `contact.md` page.
* Set a brand colour with `background_color_class` (see [Colours](/customisation/colours/)).
* Add a hero image per page with `featured_image`.
