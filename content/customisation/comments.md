---
title: Comments
description: "Add Disqus or Commento comments to your pages."
date: 2026-01-16T08:00:00.000+0700
weight: 500
---

Ananke supports Disqus and [Commento](https://commento.io/). You can also add Commento through a content hook, with a script URL for either the hosted service or your own instance.

## Disqus

Using [Disqus](https://disqus.com/) as a comment system for your website is an internal feature of Hugo. For more information see the official [Hugo documentation](http://gohugo.io/content-management/comments/).

```toml
[services.disqus]
shortname = 'YOURSHORTNAME'
```

Note that the setup for Disqus is *NOT* done inside of the `params` section, but with in the `services` section of your config file. To turn off Disqus, remove, or comment out the preceding lines.

## Commento.io

### Add Commento with a hook

The [content-after hook](/customisation/hooks-and-filters/all/#content-hooks) lets you add Commento without changing the theme templates. Hooks are available from Ananke 2.17.0. This example enables comments on regular pages and lets each page turn them off.

Add these settings to your site's parameters file:

```toml
# config/_default/params.toml
commentoEnable = false

[comments]
enabled = true
script_url = "https://cdn.commento.io/js/commento.js"
```

For a self-hosted instance, replace `script_url` with the full URL of its JavaScript file, for example `https://comments.example.com/js/commento.js`. Use the script URL supplied by your Commento installation, including any deployment subdirectory.

Create this partial in your site:

```go-html-template
{{/* layouts/_partials/hooks/content-after.html */}}
{{- if and .IsPage site.Params.comments.enabled -}}
  {{- if ne .Params.comments false -}}
    {{- $url := site.Params.comments.script_url | default "https://cdn.commento.io/js/commento.js" -}}
    <div class="mt6 instapaper_ignoref">
      <div id="commento"></div>
      <script defer src="{{ $url }}"></script>
    </div>
  {{- end -}}
{{- end -}}
```

If you already have a `content-after.html` hook, add this block to it so that you keep its existing output. The hook runs after the page content, before tags and built-in comments. It also runs in the theme's `page` layout.

These parameters belong to this recipe; the theme does not read them without the hook:

| Parameter | Type | Default in the hook | Required |
| --- | --- | --- | --- |
| `comments.enabled` | Boolean | Unset (disabled) | Yes, set to `true` to enable the hook |
| `comments.script_url` | String | `https://cdn.commento.io/js/commento.js` | No; set for self-hosting |
| Page front matter `comments` | Boolean | Unset (comments allowed) | No; set to `false` to hide comments on that page |

To hide comments on one page, add `comments: false` to its existing YAML front matter:

```yaml
---
title: About
comments: false
---
```

Keep `commentoEnable = false` when using the hook, and remove `services.disqus.shortname` if Disqus was configured. This prevents duplicate comment widgets. Register your site's domain with Commento before testing the integration.

### Built-in Commento settings

Ananke v2.23.0 still includes a Commento partial. If you use that integration instead of the hook, configure it as follows:

```toml
# config/_default/params.toml
commentoEnable = true
commentoPath = "https://comments.example.com/js/commento.js"
```

| Parameter | Type | Default | Required |
| --- | --- | --- | --- |
| `commentoEnable` | Boolean | Unset (disabled) | Yes, set to `true` to enable built-in Commento |
| `commentoPath` | String | `https://cdn.commento.io/js/commento.js` | No; set for self-hosting |

The `commento.html` partial uses `commentoPath` directly as the script's `src`. Set the full JavaScript URL, not just the instance's base URL. Omit `commentoPath` for the hosted service. These are top-level site parameters, outside `[ananke]`. In a single `hugo.toml`, put them under `[params]`; the hook recipe's `[comments]` table becomes `[params.comments]`.

## Disabling comments

Comments are controlled globally:

* **Disqus** is enabled only while `services.disqus.shortname` is set. Remove or
  comment out that setting to turn Disqus off everywhere.
* **Built-in Commento** is enabled only while `commentoEnable = true`. Set it to `false` (or remove it) to turn built-in Commento off everywhere.
* **Commento hook** is enabled only while `comments.enabled = true`. Set it to `false` to turn the hook off everywhere, or set `comments: false` in a page's front matter to hide it on that page.

> [!NOTE]
> The built-in integrations do not include a per-page front matter switch to hide comments on a single page. The Commento hook above adds one. For built-in comments, override the single template (see
> [Overriding partials](/customisation/overriding-partials/)) and gate the
> comment block on a front matter value of your own.

## Privacy

Both systems load third-party JavaScript and may set cookies or collect visitor
data, so mention them in your privacy policy. For Disqus, Hugo's
[privacy configuration](https://gohugo.io/configuration/privacy/) can further
restrict its behaviour. Only enable a comment system in production if your
privacy notices cover it.
