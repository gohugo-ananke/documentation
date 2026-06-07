---
title: Edit page
date: 2026-06-07T08:00:00.000+0700
since: "2.19.0"
---

{{< since >}}

## Quick summary

The `edit-page` shortcode renders a link that takes readers straight to the
GitHub editor for the current page's source file. It is the "Improve this page
on GitHub" link that documentation sites commonly place at the foot of a page.

Because the link uses GitHub's `/edit/` URL, readers who do **not** have write
access to the repository are automatically offered GitHub's standard
"fork this repository and propose changes" flow — no extra configuration is
needed to support outside contributors.

The same behaviour is also available as the shared `edit-page` partial, which is
what this documentation site uses to show the link automatically below every
page (see [How it works](#how-it-works)).

## Syntax overview

The shortcode takes no required arguments — it reads everything else from site
configuration. You may optionally override the branch to edit.

### Without arguments

```go-html-template
{{</* edit-page */>}}
```

### Positional options

```go-html-template
{{</* edit-page "development" */>}}
```

### Named options

```go-html-template
{{</* edit-page branch="development" */>}}
```

Do not mix positional and named options in the same call.

## Parameter overview

| Title | Positional option | Named option | Required | Type | Default | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Branch | `1` | `branch` | No | String | `main` (or the configured branch) | Overrides, for this page only, the branch the edit link targets. |

The repository URL, default branch, content directory, and link target are not
shortcode arguments — they are set in site configuration (see
[Configuration notes](#configuration-notes)).

## Usage rules

* Use either positional options or named options. Do not mix both styles in the
  same shortcode call.
* Set `params.ananke.shortcodes.edit_page.repo_url`. Without it the shortcode
  renders nothing and prints a build-time warning.
* Prefer configuring the branch site-wide; only pass the `branch` argument when a
  single page must point somewhere different.

## How it works

The link is built as `{repo_url}/edit/{branch}/{content_dir}/{file path}`, where
the file path is the page's source file relative to the content directory. For
example, this page becomes:

```text
https://github.com/gohugo-ananke/documentation/edit/development/content/shortcodes/edit-page.md
```

GitHub's `/edit/` URL does the rest:

* Readers with write access open the file directly in GitHub's editor.
* Readers without write access are prompted to create a fork; when they save,
  GitHub commits to their fork and opens a pull request for them. This is
  GitHub's built-in behaviour, so contributors never have to fork manually first.

When `repo_url` is not configured, nothing is rendered and a build-time warning
names the page so the missing setting is easy to find.

### Showing the link automatically

The link logic lives in a shared `edit-page` partial. Besides calling it through
the shortcode, you can render it automatically below the content of every page by
adding a `content-after` hook to your project:

```go-html-template
{{/* layouts/_partials/hooks/content-after.html */}}
{{- with .File -}}
  <footer class="mt4 pt3 bt b--moon-gray">
    {{- partials.Include "edit-page.html" $ -}}
  </footer>
{{- end -}}
```

This documentation site uses exactly this approach, which is why every page shows
the link without anyone adding the shortcode by hand.

## Intended use

Use this shortcode (or the partial) when:

* you host your content on GitHub and want to invite contributions
* you want a consistent "improve this page" affordance at the foot of pages
* you want outside contributors to be able to propose changes without manual
  forking

Avoid it when:

* your content is not stored in a public GitHub repository
* the page has no source file (for example a fully generated page)

## Basic examples

### Use the configured branch

```go-html-template
{{</* edit-page */>}}
```

Renders a link to edit this page on the branch configured in
`params.ananke.shortcodes.edit_page.branch`.

### Override the branch for one page

```go-html-template
{{</* edit-page branch="main" */>}}
```

Renders a link that targets the `main` branch instead of the configured default.

## Example catalogue

### Minimal usage

```go-html-template
{{</* edit-page */>}}
```

Result:

A badge-styled "Improve this page on GitHub" link to the page's source file on
the configured branch.

### Override the branch for one page

```go-html-template
{{</* edit-page branch="main" */>}}
```

Result:

The same link, but targeting the `main` branch instead of the configured
default.

### Show the link automatically below every page

Instead of placing the shortcode in content, render the shared partial from a
`content-after` hook:

```go-html-template
{{/* layouts/_partials/hooks/content-after.html */}}
{{- with .File -}}
  <footer class="mt4 pt3 bt b--moon-gray">
    {{- partials.Include "edit-page.html" $ -}}
  </footer>
{{- end -}}
```

Result:

Every single page shows the link below its content, with no per-page shortcode.
This is how this documentation site renders the link.

### Common mistake: mixing positional and named options

Do not use this:

```go-html-template
{{</* edit-page "main" branch="main" */>}}
```

Use positional options:

```go-html-template
{{</* edit-page "main" */>}}
```

Or use named options:

```go-html-template
{{</* edit-page branch="main" */>}}
```

## Output explanation

This shortcode renders a single anchor styled as a badge, with the translatable
label `editPage` ("Improve this page on GitHub" by default). The link opens in a
new tab (`target="_blank"`, with `rel="noopener"`) unless you change
`params.ananke.shortcodes.edit_page.target`.

## Accessibility notes

* The link is a real anchor with descriptive text, so it is announced
  meaningfully by assistive technology.
* By default the link opens in a new tab; the visible text makes its destination
  clear. Set `target = false` if you prefer to keep readers in the same window.

## Configuration notes

| Configuration location | Key | Description |
| --- | --- | --- |
| `hugo.toml` | `params.ananke.shortcodes.edit_page.repo_url` | Base URL of the GitHub repository, e.g. `https://github.com/owner/repo`. Required; without it nothing renders. |
| `hugo.toml` | `params.ananke.shortcodes.edit_page.branch` | Branch the edit link targets. Defaults to `main`. |
| `hugo.toml` | `params.ananke.shortcodes.edit_page.content_dir` | Directory the content lives in inside the repository. Defaults to `content`. |
| `hugo.toml` | `params.ananke.shortcodes.edit_page.target` | Link target. Defaults to `_blank` (new tab). Set to a custom value such as `"_top"`, or to `false` to open in the same window. |

The label ("Improve this page on GitHub") is a translatable interface string
(`editPage`). Override it in your project's `i18n/<language>.toml` rather than
editing the theme — see
[Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings).

## i18n strings

| Key | Default English value | Used for | Notes |
| --- | --- | --- | --- |
| `editPage` | `Improve this page on GitHub` | Visible link text. | The only string the shortcode renders; supplied via `T` from the theme's `i18n/en.toml`. |

## Related shortcodes

| Shortcode | Use when |
| --- | --- |
| [`since`](/shortcodes/since/) | You want to mark which release introduced a feature. It also reads its settings from `params.ananke.shortcodes`. |

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| Nothing renders and a warning is printed. | `params.ananke.shortcodes.edit_page.repo_url` is not set. | Set `repo_url` to your repository's base URL. |
| The link returns a 404. | The configured branch, content directory, or repository URL does not match the real layout. | Check `branch`, `content_dir`, and `repo_url`. |
| The link points at the wrong branch. | The site-wide `branch` is not what you want for this page. | Set the site-wide `branch`, or pass a `branch` argument on the page. |
| The link opens in a new tab unexpectedly. | `target` defaults to `_blank`. | Set `params.ananke.shortcodes.edit_page.target` to `false` for the same window. |
| The shortcode fails with a build error. | Positional and named options were mixed in one call. | Use only one option style per shortcode call. |
