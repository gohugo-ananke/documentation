---
title: "External Links"
date: 2026-01-16T08:00:00.000+0700
---
```css
a.ananke-social-link[target="_blank"]::after {
  content: "↗";
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