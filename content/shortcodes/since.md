---
title: Since
date: 2026-06-07T08:00:00.000+0700
since: "2.18.0"
---

{{< since >}}

## Quick summary

The `since` shortcode is used to render a small badge marking the release a
feature was introduced in (for example "since 2.17.0"). It is intended for
documentation and changelog-style pages. Use it when you need to mark, at a
glance, which version of a project a feature first shipped in. By default the
badge is plain text; configure a release URL to turn it into a link.

## Syntax overview

Use either positional options or named options in a single shortcode call. Do
not mix both styles in the same call.

### Positional options

```go-html-template
{{</* since "2.17.0" */>}}
```

### Named options

```go-html-template
{{</* since version="2.17.0" */>}}
```

The version can also be omitted entirely, in which case it is read from the
page's `since` front matter:

```go-html-template
{{</* since */>}}
```

## Parameter overview

| Title | Positional option | Named option | Required | Type | Default | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Version | `1` | `version` | No\* | String | `-` | The version the feature was introduced in. Used as the badge text and, when a release URL is configured, to build the link. |

\* The version is required *somewhere*: as the positional argument, as the named
`version` argument, or as the page's `since` front matter value. If none is
provided, nothing is rendered.

Linking and link target are not shortcode arguments — they are set in site
configuration (see [Configuration notes](#configuration-notes)).

## Usage rules

* Use either positional options or named options. Do not mix both styles in the
  same shortcode call.
* Prefer the page `since` front matter when a whole page documents one release —
  then call `{{</* since */>}}` with no argument.
* Prefer an explicit argument when a single page mentions several versions.
* Keep the version value quoted.

## How it works

The `since` shortcode resolves the version in this order of precedence: the
first positional argument, the named `version` argument, then the page's `since`
front matter. It renders a badge whose text reads `since <version>`.

By default the badge is plain text (a `<span>`). If you set a release URL in
`params.ananke.shortcodes.since.repo_url`, the badge becomes a link (an `<a>`)
to that release. The URL is a printf format string with `%s` replaced by the
version. The link opens in a new tab (`target="_blank"`) unless you change
`params.ananke.shortcodes.since.target`.

When no version can be resolved, the shortcode renders nothing and prints a
build-time warning naming the page so the missing value is easy to find.

## Intended use

Use this shortcode when:

* you document a feature and want to show which release introduced it
* you maintain a changelog or "what's new" page
* you annotate a whole page with a single "available since" badge

Avoid this shortcode when:

* plain Markdown already communicates the version clearly enough
* the version information belongs in a structured data file or table instead
* you want a link but cannot point it at a valid release URL

## Basic examples

### Basic positional example

```go-html-template
{{</* since "2.17.0" */>}}
```

This renders a badge reading "since 2.17.0".

### Basic named example

```go-html-template
{{</* since version="2.17.0" */>}}
```

This renders the same badge as the positional example.

## Example catalogue

### Minimal usage

```go-html-template
{{</* since "2.17.0" */>}}
```

Result:

A plain-text "since 2.17.0" badge. With no release URL configured it is not a
link.

### Link the badge to releases

Set a release URL in your site configuration:

```toml
[params.ananke.shortcodes.since]
repo_url = "https://github.com/your-org/your-project/releases/tag/v%s"
```

```go-html-template
{{</* since "2.17.0" */>}}
```

Result:

The badge becomes a link to `https://github.com/your-org/your-project/releases/tag/v2.17.0`,
opening in a new tab.

### Open the link in the same window

```toml
[params.ananke.shortcodes.since]
repo_url = "https://github.com/your-org/your-project/releases/tag/v%s"
target = false
```

Result:

The link opens in the same window instead of a new tab. Set `target` to a custom
value such as `"_top"` to use a specific browsing context.

### With page front matter

```markdown
---
title: Hooks & Filters
since: "2.17.0"
---

{{</* since */>}}
```

Result:

The badge reads "since 2.17.0", taking the version from the page's `since` front
matter. This is the recommended pattern when one page documents one release.

### With fallback behaviour

```go-html-template
{{</* since */>}}
```

Result:

When the page has no `since` front matter and no argument is given, nothing is
rendered and a build-time warning naming the page is printed.

### Common mistake: mixing positional and named options

Do not use this:

```go-html-template
{{</* since "2.17.0" version="2.17.0" */>}}
```

Use positional options:

```go-html-template
{{</* since "2.17.0" */>}}
```

Or use named options:

```go-html-template
{{</* since version="2.17.0" */>}}
```

## Output explanation

This shortcode renders a single badge with the text `since <version>`. When no
release URL is configured it is a `<span>` (plain text). When
`params.ananke.shortcodes.since.repo_url` is set it is an `<a>` linking to the
release; the link opens in a new tab with `rel="noopener"` unless `target` is
changed.

The generated output is intended to give readers a quick indication of when a
feature became available. It is styled by the theme and should not require
custom HTML in the Markdown content.

## Accessibility notes

* When linking is enabled the badge is a real link with descriptive text
  (`since <version>`), so it is announced meaningfully by assistive technology.
* By default the link opens in a new tab; the visible text makes its destination
  clear. Set `target = false` if you prefer to keep readers in the same window.
* The badge relies on text, not colour alone, to convey its meaning.

## Configuration notes

| Configuration location | Key | Description |
| --- | --- | --- |
| `hugo.toml` | `params.ananke.shortcodes.since.repo_url` | A printf format string for the release link. `%s` is replaced with the version. Not set by default, so the badge is plain text; set it to enable linking. |
| `hugo.toml` | `params.ananke.shortcodes.since.target` | Link target. Defaults to `_blank` (new tab). Set to a custom value such as `"_top"`, or to `false` to open in the same window. |
| Page front matter | `since` | Supplies the version when the shortcode is called with no argument. |

The badge label ("since") is a translatable interface string (`since`). Override
it in your project's `i18n/<language>.toml` rather than editing the shortcode —
see [Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings).

## Related shortcodes

There are no closely related shortcodes.

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| The shortcode does not render. | The shortcode name is misspelled or the theme version is too old to ship it. | Check the shortcode name and theme version. |
| Nothing renders and a warning is printed. | No version was supplied as an argument or as `since` front matter. | Add a version argument or a `since` front-matter value. |
| The badge is plain text, not a link. | `params.ananke.shortcodes.since.repo_url` is not set. | Set `repo_url` to your project's release URL pattern. |
| The link returns a 404. | The configured URL pattern or the version does not match an existing release. | Check the URL format string (it needs `%s`) and that the release tag exists. |
| The link opens in a new tab unexpectedly. | `target` defaults to `_blank`. | Set `params.ananke.shortcodes.since.target` to `false` for the same window. |
| The shortcode fails with a build error. | Positional and named options were mixed in one call. | Use only one option style per shortcode call. |
