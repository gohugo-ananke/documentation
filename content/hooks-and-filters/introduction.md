---
title: Introduction to Hooks & Filters
date: 2026-05-17T08:00:00.000+0700
weight: 100
since: "2.17.0"
---

{{< since >}}

* [Hooks and filters](#hooks-and-filters)
* [Difference between hooks and filters](#difference-between-hooks-and-filters)
  * [Hooks](#hooks)
  * [Filters](#filters)
* [Terminology](#terminology)
* [Simple hook calls](#simple-hook-calls)
* [Extended hook calls](#extended-hook-calls)
* [Extended hook options](#extended-hook-options)
  * [hook](#hook)
  * [context](#context)
  * [cache](#cache)
* [Hook partial location](#hook-partial-location)
* [Disabling unused hook messages](#disabling-unused-hook-messages)
* [Recommended usage pattern](#recommended-usage-pattern)

## Hooks and filters

Ananke provides a small hooks system that lets site projects inject or transform markup without changing the theme templates directly.

There are two entry points:

* `hook.html`
* `filter.html`

Both entry points look for a matching partial in the `hooks/` partial namespace.

For example, this call:

```go-html-template
{{- partials.Include "hook.html" "site-header" -}}
```

looks for a partial in `layouts/_partials/hooks/site-header.html`. If the partial exists, it is loaded. If it does not exist, the hook is treated as unused and, if enabled, a CLI debug message is printed.

> [!IMPORTANT]
> For now keep an eye on the file extension. We only implemented and tested it with `.html` partials. Using a different extension or format might not work as expected yet.

## Difference between hooks and filters

### Hooks

A hook is used when the hook partial should render output directly into the page.

Use hooks for insertions such as:

* adding markup before or after a layout section
* injecting analytics snippets
* adding custom navigation items
* adding custom footer content
* extending a template without overriding the full template

Example:

```go-html-template
{{- partials.Include "hook.html" "site-footer" -}}
```

This renders the output of:

```text
layouts/_partials/hooks/site-footer.html
```

directly at the call position.

### Filters

A filter is used when the hook output should be returned and assigned to a variable.

Use filters when the result needs to be:

* inspected
* stored
* passed into another partial
* conditionally rendered
* combined with other output
* used as part of a transformation pipeline

Example:

```go-html-template
{{- $filteredOutput := partials.Include "filter.html" "content-after-title" -}}

{{- with $filteredOutput -}}
  <div class="custom-output">
    {{ . }}
  </div>
{{- end -}}
```

A filter still loads a partial from the same `hooks/` namespace:

```text
layouts/_partials/hooks/content-after-title.html
```

The difference is only how the result is used.

## Terminology

* A **hook** prints output immediately.
* A **filter** returns output for further processing.
* A **hook partial** is the user-provided partial in `layouts/_partials/hooks/`.
* A **hook point** is the location in the theme where `hook.html` or `filter.html` is called.

## Simple hook calls

A simple hook call only sends the hook name.

```go-html-template
{{- partials.Include "hook.html" "site-header" -}}
```

For filters:

```go-html-template
{{- $output := partials.Include "filter.html" "site-header" -}}
```

When using the simple form, the hook receives an empty context.

Internally, this is normalised to an extended hook call with an empty dictionary as the context:

```go-html-template
{{- collections.Dictionary
    "hook" "site-header"
    "context" collections.Dictionary
    "type" "simple"
-}}
```

The matching hook partial is still called with only the normalised `context` value. In the simple case, that context is an empty dictionary.

Example hook partial in `layouts/_partials/hooks/site-header.html` for the examples above:

```go-html-template
<div class="custom-site-header">
  Custom header content
</div>
```

As this is a simple plain Go template partial you can use all functions and methods you would normally use in any other partial, for instance `page` or `site`.

## Extended hook calls

An extended hook call sends a dictionary.

Use this when the hook needs more information, such as the current page, section, site data, or custom options.

Example:

```go-html-template
{{- partials.Include "hook.html" (collections.Dictionary
    "hook" "before-content"
    "context" .
) -}}
```

For filters:

```go-html-template
{{- $output := partials.Include "filter.html" (collections.Dictionary
    "hook" "before-content"
    "context" .
) -}}
```

The `hook` key defines which hook partial should be loaded.

The `context` key defines what is passed into the hook partial.

This example loads `layouts/_partials/hooks/before-content.html` and passes the current template context, `.`, into that partial. You could pass anything though ;]

Example hook partial in `layouts/_partials/hooks/before-content.html` for the example above:

```go-html-template
{{- with .Title -}}
  <p class="custom-before-content">
    This content appears before {{ . }}.
  </p>
{{- end -}}
```

## Extended hook options

Extended hooks support the following keys.

### hook

Required.

The name of the hook partial to load.

```go-html-template
"hook" "before-content"
```

This maps to:

```text
layouts/_partials/hooks/before-content.html
```

### context

Optional, but recommended for extended hooks.

The data passed into the hook partial.

```go-html-template
"context" .
```

The context can be any value supported by Hugo templates, but a page context or dictionary is usually the most useful option.

Example with a custom dictionary:

```go-html-template
{{- partials.Include "hook.html" (collections.Dictionary
    "hook" "custom-card"
    "context" (collections.Dictionary
        "title" "Example card"
        "description" "This content is passed into the hook partial."
    )
) -}}
```

Matching hook partial:

```go-html-template
{{/* layouts/_partials/hooks/custom-card.html */}}

<article class="custom-card">
  <h2>{{ .title }}</h2>
  <p>{{ .description }}</p>
</article>
```

### cache

Optional.

Set this to `true` if the hook partial should be loaded via `partials.IncludeCached`.

```go-html-template
{{- partials.Include "hook.html" (collections.Dictionary
    "hook" "site-footer"
    "context" site
    "cache" true
) -}}
```

Caching is useful for hook partials that render the same output across many pages.

Use caching for:

* static footer additions
* global navigation additions
* site-wide metadata snippets
* expensive partials with stable output

Avoid caching when the hook output depends on the current page unless the cache variant safely separates each result.

> [!IMPORTANT]
> **NEVER** cache the call to `hook.html` or `filter.html` itself. Always use the cache option to add caching to the partial.
>
> WRONG:
>
> ```go-html-template
> {{- partials.IncludeCached "hook.html" (collections.Dictionary
>     "hook" "site-footer"
>     "context" site
> ) $cacheIndex -}}
> ```
>
> RIGHT:
>
> ```go-html-template
> {{- partials.Include "hook.html" (collections.Dictionary
>     "hook" "site-footer"
>     "context" site
>     "cache" $cacheIndex
> ) -}}
> ```

## Hook partial location

All hook partials live in:

```text
layouts/_partials/hooks/
```

> [!NOTE]
> The directory is `_partials` (with a leading underscore), following Hugo's current template
> system. You still reference the partial without the underscore when calling it
> (`partials.Include "hooks/head-end.html"`), but the file on disk lives under `_partials/`.

The hook name maps directly to a partial name.

| Hook name | Loaded partial |
| --- | --- |
| `head-end` | `layouts/_partials/hooks/head-end.html` |
| `footer-before` | `layouts/_partials/hooks/footer-before.html` |
| `content-after` | `layouts/_partials/hooks/content-after.html` |

The names above are real hook points wired into the theme.
[See the full list of available hooks](../all/) for every hook point and where it fires. The
names used in the conceptual examples earlier on this page (such as `before-content` or
`custom-card`) are illustrative — only the hooks listed on that page are called by the theme.

## Disabling unused hook messages

By default, unused hooks can print CLI messages. This helps theme developers see which hook points exist and which ones have not been implemented by the site.

To disable unused hook messages, add `unused_hooks` to the hook configuration.

Example:

```toml
[params.ananke.hooks]
disable_messages = ["unused_hooks"]
```

This only disables the unused hook notice. It does not disable the hook itself.

## Recommended usage pattern

Use `hook.html` when you want to print optional markup immediately.

```go-template
{{- partials.Include "hook.html" (collections.Dictionary
    "hook" "content-before"
    "context" .
) -}}
```

Use `filter.html` when you need to capture the result.

```go-html-template
{{- $contentBefore := partials.Include "filter.html" (collections.Dictionary
    "hook" "content-before"
    "context" .
) -}}

{{- with $contentBefore -}}
  <aside class="content-extension">
    {{ . }}
  </aside>
{{- end -}}
```
