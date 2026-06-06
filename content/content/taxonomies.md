---
title: Taxonomies
date: 2026-06-06T08:00:00.000+0700
---

* [Default taxonomies](#default-taxonomies)
* [Adding terms to content](#adding-terms-to-content)
* [Term list and terms pages](#term-list-and-terms-pages)
* [Where taxonomy links appear](#where-taxonomy-links-appear)
* [Changing or adding taxonomies](#changing-or-adding-taxonomies)

Taxonomies group your content by shared terms. Ananke supports Hugo's two
default taxonomies — tags and categories — out of the box.

## Default taxonomies

Hugo enables `tags` and `categories` by default, so you do not need to configure
anything to use them. If you want to declare them explicitly (for example to add
or rename taxonomies), set them in your configuration:

```toml
# config/_default/hugo.toml

[taxonomies]
tag = "tags"
category = "categories"
```

The key on the left is the singular name; the value on the right is the plural
used in URLs.

## Adding terms to content

Add taxonomy terms in a page's front matter:

```toml
+++
title = "Taxonomy example"
tags = ["hugo", "theme"]
categories = ["documentation"]
+++
```

Each value becomes a term. Hugo automatically collects every page that uses a
term.

## Term list and terms pages

For each taxonomy Hugo generates two kinds of page:

* a **terms page** that lists every term — for example `/tags/` lists all tags
  and `/categories/` lists all categories;
* a **list page** for each individual term — for example `/tags/hugo/` lists
  every page tagged `hugo`.

Ananke renders these with its `terms` and `taxonomy` templates, so they are
styled like the rest of the site without extra setup.

## Where taxonomy links appear

* **Categories** are shown on single pages, below the content, linking to each
  category's list page. You can turn this off site-wide:

  ```toml
  # config/_default/params.toml

  [ananke]
  show_categories = false
  ```

* **Tags** appear on the term and list pages described above and link content
  together by topic.

## Changing or adding taxonomies

To add a custom taxonomy — for example `authors` — declare it alongside the
defaults. Remember that declaring `[taxonomies]` replaces Hugo's defaults, so
include `tag` and `category` if you still want them:

```toml
# config/_default/hugo.toml

[taxonomies]
tag = "tags"
category = "categories"
author = "authors"
```

Then use it in front matter:

```toml
+++
title = "A post"
authors = ["jane-doe"]
+++
```

For the full reference, see
[Hugo's taxonomy documentation](https://gohugo.io/content-management/taxonomies/).
