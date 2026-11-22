---
title: Since
description: "Reference for the since shortcode, which shows a badge with the release that introduced a feature."
date: 2026-06-07T08:00:00.000+0700
weight: 300
since: "2.18.0"
aliases:
  - /shortcodes/since/
---

{{< since >}}

The `since` shortcode renders a small badge with the release that introduced a feature, for example "since 2.17.0". Use it on documentation and changelog pages. The badge is plain text unless you configure a release address; then it is a link to the release.

<!-- markdownlint-disable-next-line MD033 -->
<span id="quick-summary"></span><span id="syntax-overview"></span><span id="positional-options"></span><span id="named-options"></span><span id="usage-rules"></span><span id="intended-use"></span><span id="basic-examples"></span><span id="basic-positional-example"></span><span id="basic-named-example"></span><span id="example-catalogue"></span><span id="minimal-usage"></span><span id="with-page-front-matter"></span><span id="common-mistake-mixing-positional-and-named-options"></span>

## Syntax

```go-html-template
{{</* since "2.17.0" */>}}
{{</* since version="2.17.0" */>}}
{{</* since */>}}
```

Without an argument, the shortcode uses the page's `since` front matter value. Use positional or named arguments; Hugo stops the build if one call mixes both.

<!-- markdownlint-disable-next-line MD033 -->
<span id="parameter-overview"></span><span id="with-fallback-behaviour"></span>

## Arguments

| Argument | Position | Required | Type | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `version` | `0` | No | String | The page's `since` value | The release to show, without a `v` prefix, for example `2.17.0`. |

The argument takes precedence over the front matter value. If neither exists, nothing renders and the build log shows a warning.

<!-- markdownlint-disable-next-line MD033 -->
<span id="configuration-notes"></span><span id="link-the-badge-to-releases"></span><span id="open-the-link-in-the-same-window"></span>

## Configuration

The release address and the link target are site parameters under `[params.ananke.shortcodes.since]`. Both are optional.

| Parameter | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `repo_url` | No | String | None: a badge without a link | A format string for the release address. `%s` receives the version. |
| `target` | No | String or `false` | `"_blank"` | Link target. Use `false` to open the link in the same window. |

```toml
# config/_default/params.toml

[ananke.shortcodes.since]
repo_url = "https://github.com/gohugo-ananke/ananke/releases/tag/v%s"
```

With this configuration, `{{</* since "2.17.0" */>}}` links to `https://github.com/gohugo-ananke/ananke/releases/tag/v2.17.0`.

<!-- markdownlint-disable-next-line MD033 -->
<span id="how-it-works"></span><span id="output-explanation"></span>

## Output

Without `repo_url`, the shortcode renders a `<span>` in a badge style. With `repo_url`, it renders an `<a>` element in the same style. The default target is `_blank`; when the target is not `_self` or `false`, the link also has `rel="noopener"`.

The text is the `since` translation string followed by the version.

## Translation strings

| Key | Default English value | Used for |
| --- | --- | --- |
| `since` | `since` | The word before the version. |

To change the text, override the string in your project's `i18n/<language>.toml`. See [Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings).

<!-- markdownlint-disable-next-line MD033 -->
<span id="troubleshooting"></span>

## Build messages

| Message | Cause |
| --- | --- |
| `the 'since' shortcode in "<path>" needs a version argument or a 'since' front matter value` | No argument and no `since` front matter. Nothing renders. |

<!-- markdownlint-disable-next-line MD033 -->
<span id="accessibility-notes"></span>

## Accessibility

The badge text names the release, so it is meaningful without its style. As a link, it opens in a new tab by default; set `target = false` to keep readers in the same window.

<!-- markdownlint-disable-next-line MD033 -->
<span id="related-shortcodes"></span>

## Related pages

* [Edit page](/content/shortcodes/edit-page/): links to the GitHub editor. It also reads its settings from `params.ananke.shortcodes`.
* [Configuration reference](/configuration/reference/#shortcodes): all shortcode parameters.
