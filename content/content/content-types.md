---
title: Content types and archetypes
description: "The types of content in an Ananke site and the front matter each type needs."
date: 2026-06-06T08:00:00.000+0700
weight: 300
---

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
(see [Page headers](/customisation/hero-section/)).

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
description = "A short description for metadata and the page header."
tags = ["hugo", "ananke"]
featured_image = "/images/posts/my-first-post.jpg"
+++

The body of the post goes here.
```

The homepage lists recent posts from your main sections. If you do not set `mainSections`, Hugo uses the section with the most pages; see [Which section recent posts come from](/configuration/homepage/#which-section-recent-posts-come-from).

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

`hugo new site` creates `archetypes/default.md` in your project. Its files start with `draft = true`, so remove that line or set it to `false` before you publish the page. Your project's archetypes take precedence over the theme's.

Ananke ships an archetype too. Hugo uses it only when your project has no matching archetype, for example after you delete `archetypes/default.md`:

```yaml
---
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
date: '{{ .Date }}'
tags: []
featured_image: ""
description: ""
---
```

You can also add per-section archetypes, for example `archetypes/posts.md`, which Hugo uses for `hugo new content posts/...`.

## Front matter

Every content file starts with a front matter block. Required and common fields:

* `title` — **required**; the page title.
* `date` — publication date; orders posts, after `weight`.
* `draft` — `true` excludes the page from normal builds.
* `description` — the meta description and the text below the title in the header.
* `tags` / `categories` — taxonomy terms.
* `featured_image` — hero image for the page.

All optional fields and theme-specific keys are documented in
[Frontmatter](/content/frontmatter/).
