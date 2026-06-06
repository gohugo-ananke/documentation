---
title: Documentation Style
date: 2026-06-06T08:00:00.000+0700
---

* [Principles](#principles)
* [Examples](#examples)
* [Configuration paths](#configuration-paths)
* [Parameter names](#parameter-names)
* [Defaults before overrides](#defaults-before-overrides)

These rules keep Ananke's documentation beginner-friendly and consistent. Follow
them when adding or editing pages.

## Principles

* **Use simple language.** Write for someone new to Hugo. Avoid jargon, or
  explain it the first time.
* **Do not assume Hugo knowledge.** Do not rely on the reader knowing Hugo's
  template lookup order, configuration merging, or section rules — link to the
  relevant explanation instead.
* **Avoid undocumented magic values.** If a value matters (a class name, a slug,
  a path), say where it comes from and what valid values look like.

## Examples

* **Prefer full examples over fragments.** A reader should be able to copy an
  example and have it work, not assemble it from pieces.
* **Always say where a file goes.** Start every code block that represents a
  file with a comment naming its path, for example
  `# config/_default/params.toml` or a `+++` front matter block.
* **Use TOML first.** TOML is the default example format. YAML and JSON are
  optional follow-up examples, not required.
* **State the expected result.** After an example, briefly describe what the
  reader should see once they apply it.

## Configuration paths

* Say whether an example is site configuration or page front matter.
* When installation method matters, say whether the example is for Hugo Modules
  or Git submodules.
* Use the current module path `github.com/gohugo-ananke/ananke/v2` in
  installation examples.

## Parameter names

* Use the current `[ananke]` parameter namespace (for example
  `ananke.show_recent_posts`). Document any legacy flat parameter only as a
  deprecation note, never as the recommended form.
* Verify a parameter against the theme before documenting it, rather than
  copying it from an older page.

## Defaults before overrides

* Explain a feature's **default** behaviour first, then how to override it.
* Make clear when a setting is optional and what happens if it is omitted.
* Keep guidance consistent across pages — if two pages mention the same setting,
  they should agree and, where useful, link to one canonical explanation.
