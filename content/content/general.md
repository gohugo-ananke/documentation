---
title: General
date: 2026-01-16T08:00:00.000+0700
---

* [Author](#author)
* [Read more link](#read-more-link)
* [Show Reading Time and Word Count](#show-reading-time-and-word-count)

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

You can credit more than one author by providing a list. The names are joined with commas.

```yaml
---
title: A Collaborative Post
author:
  - Jane Doe
  - John Smith
---
```

Author names are rendered as Markdown, so you can link to a profile:

```yaml
author: "[Jane Doe](https://example.com/jane)"
```

A publication date is added with Hugo's standard `date` front matter key. See [Show or hide dates on pages](/configuration/general/#show-or-hide-dates-on-pages) for controlling whether dates appear, and [Localize date format](/configuration/general/#localize-date-format) for changing the format.

## Read more link

The homepage and other areas of the site use a `read more` link on the element. You can customize the copy of this link to make it more descriptive with the parameter `read_more_copy` available as a site and front matter parameter.

```toml
# config.toml
# Globally for all pages:
[params]
read_more_copy = "Read more about this entry"

# Just for french
[languages.fr]
name = "Français"
weight = 2

[languages.fr.params]
read_more_copy = "En savoir plus à ce sujet"
```

Using front matter and cascade, this can be customized for a whole section, or just for one page.

```yaml
# content/posts/tower-bridge-london
  title: The Tower Bridge of London
  read_more_copy: Read more about this bridge
```

## Show Reading Time and Word Count

If you add a key of `show_reading_time` true to either the Config Params, a page or section's front matter, articles will show the reading time and word count.
