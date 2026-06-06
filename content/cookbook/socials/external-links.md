---
title: "External Links"
date: 2026-01-16T08:00:00.000+0700
---
```css
a.ananke-social-link[target="_blank"]::after {
  content: "↗" / "Open in new window";
  display: inline-block;
  margin-inline-start: 0.25em;
  font-size: 0.85em;
  line-height: 1;
  vertical-align: 0.1em;
}
```

```css
.new-window {
  opacity: 0;
  display: inline-block;
  vertical-align: top;
}
.link-transition:hover .new-window{
  opacity: 1;
}
```

```css
@supports (content: "x" / "y") {
  .new-item::before {
    content: "★" / "Highlighted Text:";
  }
}

@supports not (content: "x" / "y") {
  .new-item::before {
    content: "★";
    alt: "Highlighted Text:";
  }
}
```

## Revealing URLs in print styles sheets

```css
@media print {
  a[href^="http://"]:after,
  a[href^="https://"]:after
  {
    content: ' (' attr(href) ')';
  }
}
```

## custom counters

```css
ol {
  list-style-type: none;
  counter-reset: mylist;
}

li {
  counter-increment: mylist;
}

li::before {
  content: '🤤 ' counter(mylist) ': ';
}
```
