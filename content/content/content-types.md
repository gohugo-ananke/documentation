---
title: Content Types and Archetypes
date: 2026-06-06T08:00:00.000+0700
---

* [Pages](#pages)
* [Posts](#posts)
* [List pages](#list-pages)
* [Taxonomy pages](#taxonomy-pages)
* [Archetypes](#archetypes)
* [Front matter](#front-matter)

Ananke builds on Hugo's standard content model. This page explains the kinds of
content you will create and the front matter each one needs. For the full list
of front matter keys, see [Frontmatter](/content/frontmatter/).

## Pages

A page is a single standalone document, such as an About or Contact page. Create
one as a file directly under `content/`:

```bash
hugo new content about.md
```

```toml
+++
title = "About"
description = "Who we are and what we do."
+++

We build small, fast websites.
```

The page is published at `/about/`. Add `featured_image` to give it a hero image
(see [Header and Hero](/configuration/header-and-hero/)).

## Posts

A post is a dated article in a content section. By convention these live under
`content/posts/`:

```bash
hugo new content posts/my-first-post.md
```

```toml
+++
title = "My first post"
date = 2026-06-06T10:00:00+07:00
description = "A short description used for summaries and metadata."
tags = ["hugo", "ananke"]
featured_image = "/images/posts/my-first-post.jpg"
+++

The body of the post goes here.
```

> [!IMPORTANT]
> Ananke's homepage shows recent posts from the `post` section by default. If
> you name your section `posts` (as above) or anything else, tell the theme
> where to look:
>
> ```toml
> # config/_default/params.toml
>
> [params]
> mainSections = ["posts"]
> ```
>
> See [Homepage](/configuration/homepage/) for details.

## List pages

A list page shows the contents of a section — for example `/posts/` lists every
post. Hugo generates list pages automatically. To add an introduction or change
the title of a section's list page, create an `_index.md` in that section:

```toml
+++
title = "Posts"
description = "Articles and updates."
+++

Browse all our posts below.
```

The body text appears above the list of entries.

## Taxonomy pages

Taxonomies group content by terms such as tags and categories. When you add
`tags` or `categories` to a post's front matter, Hugo creates:

* a **terms page** listing all terms (for example `/tags/`), and
* a **list page** for each term (for example `/tags/hugo/`) showing the content
  using that term.

For configuring and customising taxonomies, see
[Taxonomies](/content/taxonomies/).

## Archetypes

Archetypes are templates for the front matter of new content. When you run
`hugo new content`, Hugo fills the new file from the matching archetype.

Ananke ships a default archetype that pre-fills the fields most pages need:

```toml
+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = '{{ .Date }}'
tags = []
featured_image = ""
description = ""
+++
```

To customise it, copy it into your own project at `archetypes/default.md` and
edit it there. You can also add per-section archetypes, for example
`archetypes/posts.md`, which Hugo uses for `hugo new content posts/...`.

## Front matter

Every content file starts with a front matter block. Required and common fields:

* `title` — **required**; the page title.
* `date` — publication date; needed for ordering posts.
* `description` — used for summaries and SEO metadata.
* `tags` / `categories` — taxonomy terms.
* `featured_image` — hero image for the page.

All optional fields and theme-specific keys are documented in
[Frontmatter](/content/frontmatter/).
