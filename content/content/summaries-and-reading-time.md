---
title: Summaries and Reading Time
date: 2026-06-06T08:00:00.000+0700
---

* [Automatic summaries](#automatic-summaries)
* [The manual summary divider](#the-manual-summary-divider)
* [A custom summary in front matter](#a-custom-summary-in-front-matter)
* [The read more link](#the-read-more-link)
* [Reading time and word count](#reading-time-and-word-count)
* [How list pages use summaries](#how-list-pages-use-summaries)

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

Enable the reading time and word count display with `show_reading_time`:

```toml
# config/_default/params.toml

[params]
show_reading_time = true
```

You can also tune the words-per-minute used for the estimate with
`reading_speed`. Both are covered in detail, including multilingual setup, on the
[Reading Time](/content/reading-time/) page.

## How list pages use summaries

On list pages and the homepage:

* each entry shows its summary (manual divider, front matter `summary`, or the
  automatic excerpt — in that order of preference);
* a "read more" link points to the full page;
* if reading time is enabled, it appears with the entry.

Posts that have a [featured image](/configuration/header-and-hero/) show it
alongside the summary as a card.
