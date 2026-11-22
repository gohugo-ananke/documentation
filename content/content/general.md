---
title: Authors and read more links
description: "Show the author of a page, and find the settings for read more links and reading time."
date: 2026-01-16T08:00:00.000+0700
weight: 200
---

## Author

Add an author to a page by setting the `author` key in its front matter. The author is shown below the title on single pages and on image summary cards.

```yaml
---
title: My First Post
author: Jane Doe
---
```

To set a default author for the whole site, add `author` to your site parameters. Page front matter overrides the site default.

```toml
[params]
author = "Jane Doe"
```

You can credit more than one author by providing a list. On single pages, the names are joined with commas.

```yaml
---
title: A Collaborative Post
author:
  - Jane Doe
  - John Smith
---
```

On single pages, author names are rendered as Markdown, so you can link to a profile:

```yaml
author: "[Jane Doe](https://example.com/jane)"
```

> [!WARNING]
> In Ananke v2.23.0, image summary cards show the author as plain text after the fixed English word "By". Markdown is not rendered there, and a list appears in brackets without commas, for example `By [Jane Doe John Smith]`. On single pages, the translated word "by" is not shown. Use a single plain name if your homepage shows image cards.

A publication date is added with Hugo's standard `date` front matter key. See [Show or hide dates on pages](/configuration/general/#show-or-hide-dates-on-pages) for controlling whether dates appear, and [Localize date format](/configuration/general/#localize-date-format) for changing the format.

## Read more link

To change the text of the "read more" link on summary cards, for all pages, one language, one section, or one page, see [The read more link](/content/summaries-and-reading-time/#the-read-more-link).

## Reading time and word count

To show the reading time and word count on single pages, see [Summaries and reading time](/content/summaries-and-reading-time/#reading-time-and-word-count).
