---
title: Edit page
description: "Reference for the edit-page shortcode, which links to the GitHub editor for the source file of the current page."
date: 2026-06-07T08:00:00.000+0700
weight: 200
since: "2.19.0"
aliases:
  - /shortcodes/edit-page/
---

{{< since >}}

The `edit-page` shortcode renders a link to the GitHub editor for the source file of the current page. It is the "Improve this page on GitHub" link that documentation sites often put at the foot of a page.

The link uses GitHub's `/edit/` address. Readers with write access open the file in the editor. GitHub offers all other readers its "fork this repository and propose changes" flow, so outside contributors need no extra setup.

To show the link below every page without the shortcode, see [Add an edit link below every page](/customisation/hooks-and-filters/examples/#add-an-edit-link-below-every-page).

<!-- markdownlint-disable-next-line MD033 -->
<span id="quick-summary"></span><span id="syntax-overview"></span><span id="without-arguments"></span><span id="positional-options"></span><span id="named-options"></span><span id="usage-rules"></span><span id="intended-use"></span><span id="basic-examples"></span><span id="use-the-configured-branch"></span><span id="example-catalogue"></span><span id="minimal-usage"></span><span id="common-mistake-mixing-positional-and-named-options"></span>

## Syntax

```go-html-template
{{</* edit-page */>}}
{{</* edit-page "development" */>}}
{{</* edit-page branch="development" */>}}
```

Use positional or named arguments. Hugo stops the build if one call mixes both.

<!-- markdownlint-disable-next-line MD033 -->
<span id="parameter-overview"></span><span id="override-the-branch-for-one-page"></span>

## Arguments

| Argument | Position | Required | Type | Default | Description |
| --- | --- | --- | --- | --- | --- |
| `branch` | `0` | No | String | The configured branch | Branch of the edit link, for this call only. |

<!-- markdownlint-disable-next-line MD033 -->
<span id="configuration-notes"></span>

## Configuration

The repository and the defaults are site parameters under `[params.ananke.shortcodes.edit_page]`. The [`edit-page` partial](#output) uses the same settings.

| Parameter | Required | Type | Default | Description |
| --- | --- | --- | --- | --- |
| `repo_url` | Yes | String | None | Address of the GitHub repository, for example `https://github.com/owner/repo`. Without it, nothing renders and the build log shows a warning. |
| `branch` | No | String | `"main"` | Branch of the edit link. |
| `content_dir` | No | String | `"content"` | Content directory, relative to the repository root. |
| `target` | No | String or `false` | `"_blank"` | Link target. Use `false` to open the link in the same window. |

```toml
# config/_default/params.toml

[ananke.shortcodes.edit_page]
repo_url = "https://github.com/owner/repo"
branch = "main"
content_dir = "content"
```

<!-- markdownlint-disable-next-line MD033 -->
<span id="how-it-works"></span>

## Link address

The shortcode builds the address from the configuration and the source file of the page:

```text
{repo_url}/edit/{branch}/{content_dir}/{path of the file in the content directory}
```

With the configuration above, the file `content/posts/my-first-post.md` gets this address:

```text
https://github.com/owner/repo/edit/main/content/posts/my-first-post.md
```

<!-- markdownlint-disable-next-line MD033 -->
<span id="output-explanation"></span><span id="showing-the-link-automatically"></span><span id="show-the-link-automatically-below-every-page"></span>

## Output

The shortcode renders one `<a>` element in a badge style. The link text is the `editPage` translation string. The default target is `_blank`; when the target is not `_self` or `false`, the link also has `rel="noopener"`.

The shortcode calls the shared partial `edit-page.html`. You can call this partial from your own templates and hooks with a page, or with a map that contains `page` and, optionally, `branch`:

```go-html-template
{{ partials.Include "edit-page.html" . }}
{{ partials.Include "edit-page.html" (dict "page" . "branch" "development") }}
```

<!-- markdownlint-disable-next-line MD033 -->
<span id="i18n-strings"></span>

## Translation strings

| Key | Default English value | Used for |
| --- | --- | --- |
| `editPage` | `Improve this page on GitHub` | The link text. |

To change the text, override the string in your project's `i18n/<language>.toml`. See [Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings).

<!-- markdownlint-disable-next-line MD033 -->
<span id="troubleshooting"></span>

## Build messages

| Message | Cause |
| --- | --- |
| `the 'edit-page' partial in "<path>" needs params.ananke.shortcodes.edit_page.repo_url to be set` | `repo_url` is not set. Nothing renders. |
| `the 'edit-page' shortcode was used on a page without a source file` | The page has no file, for example a generated page. Nothing renders. |

If the link returns "404 Not Found", check that `repo_url`, `branch`, and `content_dir` match the repository.

<!-- markdownlint-disable-next-line MD033 -->
<span id="accessibility-notes"></span>

## Accessibility

The link is a real anchor with descriptive text. It opens in a new tab by default; set `target = false` to keep readers in the same window.

<!-- markdownlint-disable-next-line MD033 -->
<span id="related-shortcodes"></span>

## Related pages

* [Since](/content/shortcodes/since/): marks the release that introduced a feature. It also reads its settings from `params.ananke.shortcodes`.
* [Configuration reference](/configuration/reference/#shortcodes): all shortcode parameters.
