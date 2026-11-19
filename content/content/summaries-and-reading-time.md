---
title: Summaries and reading time
description: "Control the summaries on list pages and show the reading time and word count."
date: 2026-06-06T08:00:00.000+0700
weight: 500
aliases:
  - /content/reading-time/
---

On list pages and the homepage, Ananke shows a short summary of each post rather
than its full content. This page explains where that summary comes from and how
to control it.

## Automatic summaries

If you do nothing, Hugo generates the summary automatically from the start of the
content (by default the first 70 words). This needs no configuration and works
for every page.

## The manual summary divider

To choose exactly where the summary ends, add a divider in your content. Hugo
uses everything before it as the summary:

```markdown
This paragraph is the summary shown on list pages.

<!--more-->

This and everything after it is only shown on the full page.
```

## A custom summary in front matter

To write a summary that is independent of the body text, set `summary` in front
matter:

```toml
+++
title = "Summary example"
summary = "This is a custom summary shown on list pages."
+++

This is the full article body, shown only on the page itself.
```

This is useful when the first paragraph does not make a good preview.

## The read more link

List summaries are followed by a "read more" link. Customise its text with
`read_more_copy`, site-wide or per page:

```toml
# config/_default/params.toml

[params]
read_more_copy = "Read more about this entry"
```

See [General content features → Read more link](/content/general/#read-more-link)
for per-language and per-page examples.

## Reading time and word count

Ananke can show an estimated reading time and the word count below the title of a single page. The display is off by default. It shows when `show_reading_time` is `true` in one of these places:

* the site parameters, for all pages;
* the front matter of a section's `_index.md` file, for the pages in that section;
* the front matter of a page, for that page only.

```toml
# config/_default/params.toml

[params]
show_reading_time = true
```

### Reading speed

By default, Ananke shows Hugo's [`.ReadingTime`](https://gohugo.io/methods/page/readingtime/) value. Hugo calculates it with 212 words per minute, or 500 words per minute for CJK languages.

To use your own speed, set the optional `reading_speed` parameter to a number of words per minute. Ananke then divides the page's word count by this number and rounds the result up to a full minute.

```toml
# config/_default/params.toml

[params]
show_reading_time = true
reading_speed = 228
```

Reading speeds differ between languages. On a multilingual site, set `reading_speed` for each language:

```toml
# config/_default/languages.toml

[en.params]
reading_speed = 228

[de.params]
reading_speed = 179
```

The text around the numbers comes from the `readingTime` and `wordCount` translation strings. To change them, see [Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings).

## How list pages use summaries

On list pages and the homepage:

* each entry shows its summary (manual divider, front matter `summary`, or the
  automatic excerpt — in that order of preference);
* a "read more" link points to the full page.

Posts that have a [featured image](/configuration/header-and-hero/) show it
alongside the summary as a card.
