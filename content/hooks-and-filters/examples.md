---
title: Hook examples
date: 2026-05-17T08:00:00.000+0700
weight: 300
since: "2.17.0"
---

{{< since >}}

This page collects worked examples for the theme's hook points. Each one shows the partial you
create, where the output lands, and **why** you would reach for that particular hook.

If you have not read it yet, start with the [introduction](../introduction/) for the call
mechanics, and keep the [list of all hooks](../all/) handy for the available hook names.

* [Before you start](#before-you-start)
* [Add a third-party script in the head](#add-a-third-party-script-in-the-head)
* [Defer analytics to the end of the body](#defer-analytics-to-the-end-of-the-body)
* [Add a site-wide announcement bar](#add-a-site-wide-announcement-bar)
* [Extend the footer (and cache it)](#extend-the-footer-and-cache-it)
* [Add secondary navigation using the page context](#add-secondary-navigation-using-the-page-context)
* [Add an author bio after the content](#add-an-author-bio-after-the-content)
* [Override the article section link](#override-the-article-section-link)
* [Use a hook as a filter](#use-a-hook-as-a-filter)

## Before you start

Every example below is a file you create in **your site**, never in the theme:

```text
your-site/
└── layouts/
    └── _partials/
        └── hooks/
            └── <hook-name>.html
```

The theme already calls each hook on every page (or every single page, for the content and
article hooks). The moment a partial with the matching name exists, its output appears at the
hook's position. Delete the file and the hook goes quiet again. You never touch the theme
templates.

Because the theme passes the current **page** as the hook context, inside any of these partials
the dot (`.`) is the page. You can use `.Title`, `.Params`, `.Permalink`, `.RelPermalink`, and
the global `site` and `hugo` functions just like in any other partial.

## Add a third-party script in the head

**Hook:** `head-end` — renders at the end of `<head>`.

Use this for things that belong in the head: preconnect/preload hints, verification meta tags, or
a stylesheet for a third-party widget.

```go-html-template
{{/* layouts/_partials/hooks/head-end.html */}}
<link rel="preconnect" href="https://cdn.example.com" crossorigin>
<meta name="google-site-verification" content="abc123">
```

There is nothing else to wire up. The theme's `head-additions.html` partial calls the `head-end`
hook on every page, so this markup is emitted just before `</head>` everywhere.

## Defer analytics to the end of the body

**Hook:** `body-end` — renders as the last element before `</body>`.

Scripts that do not need to block rendering should load at the end of the body. The `body-end`
hook is the right place for analytics, chat widgets, or anything that should run after the page
content exists.

```go-html-template
{{/* layouts/_partials/hooks/body-end.html */}}
{{- if hugo.IsProduction -}}
  <script src="https://analytics.example.com/script.js"
          data-site="{{ site.Params.analyticsSiteID }}" defer></script>
{{- end -}}
```

**Why `body-end` and not `head-end`?** Putting analytics at the end of the body keeps it off the
critical rendering path, so it cannot delay first paint. The `hugo.IsProduction` guard means the
script is only added for production builds, keeping your local development and deploy previews
clean.

## Add a site-wide announcement bar

**Hook:** `body-start` — renders as the first element inside `<body>`, above the header.

```go-html-template
{{/* layouts/_partials/hooks/body-start.html */}}
{{- with site.Params.announcement -}}
  <div class="bg-yellow pa2 tc f6">
    {{ . | safeHTML }}
  </div>
{{- end -}}
```

```toml
# config/_default/params.toml
[params]
announcement = 'We are <a href="/launch/">launching something new</a>.'
```

The `with` block means the bar only renders when the `announcement` param is set, so you can turn
it on and off from configuration without editing the partial. Use `header-before` instead if you
want the bar to sit between the top of the page and the header rather than at the very top.

## Extend the footer (and cache it)

**Hook:** `footer-before` — renders immediately before the site footer.

```go-html-template
{{/* layouts/_partials/hooks/footer-before.html */}}
<section class="bg-near-white pa4 tc">
  <h2 class="f4 mb3">Subscribe to the newsletter</h2>
  <form action="https://example.com/subscribe" method="post">
    <input type="email" name="email" placeholder="you@example.com" required>
    <button type="submit">Sign up</button>
  </form>
</section>
```

This block is identical on every page, so it is a good candidate for caching. Caching is **not**
set in the partial — it is requested at the call site. Since the theme controls the call site, the
way to cache your own hook output is to make the partial cheap and stable; for hook output you
control and that never changes between pages, you can move the expensive work into a cached
partial that your hook calls:

```go-html-template
{{/* layouts/_partials/hooks/footer-before.html */}}
{{ partials.IncludeCached "newsletter-form.html" . }}
```

> [!IMPORTANT]
> Never wrap the call to `hook.html` or `filter.html` itself in `partials.IncludeCached`. Cache
> the work *inside* your hook partial instead, as shown above. See the
> [caching notes in the introduction](../introduction/#cache).

## Add secondary navigation using the page context

**Hook:** `header-after` — renders immediately after the site header.

This example shows using the page context to build breadcrumbs from the current page's ancestors.

```go-html-template
{{/* layouts/_partials/hooks/header-after.html */}}
{{- with .Ancestors -}}
  <nav aria-label="Breadcrumb" class="pa3 f6 bg-near-white">
    {{- range .Reverse -}}
      <a href="{{ .RelPermalink }}" class="link">{{ .LinkTitle }}</a>
      <span aria-hidden="true"> / </span>
    {{- end -}}
    <span>{{ .Title }}</span>
  </nav>
{{- end -}}
```

Here `.` is the current page, so `.Ancestors` walks up the section tree and `.Title` is the
current page's title. Because the hook receives a real page context, no extra wiring is needed to
make page data available.

## Add an author bio after the content

**Hook:** `content-after` — renders right after the article body, before tags and comments. This
hook only fires on single pages.

```go-html-template
{{/* layouts/_partials/hooks/content-after.html */}}
{{- with .Params.author -}}
  {{- $bio := index site.Data.authors . -}}
  {{- with $bio -}}
    <aside class="bt b--moon-gray pt3 mt4 flex items-center">
      {{- with .avatar -}}
        <img src="{{ . }}" alt="" width="64" height="64" class="br-100 mr3">
      {{- end -}}
      <div>
        <p class="b ma0">{{ $bio.name }}</p>
        <p class="ma0 f6 mid-gray">{{ $bio.summary }}</p>
      </div>
    </aside>
  {{- end -}}
{{- end -}}
```

```toml
# data/authors.toml
[jane]
name = "Jane Doe"
summary = "Writes about Hugo and the open web."
avatar = "/img/authors/jane.jpg"
```

The post's front matter sets `author = "jane"`; the hook looks that key up in `site.Data.authors`
and renders a bio card. Use `content-before` instead if you want the card above the article.

## Override the article section link

**Hook:** `article/section-link` — renders at the top of the article header. Unlike the other
hooks, the theme **ships a default partial** for this one (it prints the current section name).

Providing your own partial of the same name in your site replaces the default:

```go-html-template
{{/* layouts/_partials/hooks/article/section-link.html */}}
<a href="{{ .CurrentSection.RelPermalink }}"
   class="instapaper_ignoref b helvetica tracked ttu link mid-gray">
  {{ .CurrentSection.Title }}
</a>
```

This turns the plain section label shipped by the theme into a link back to the section listing.
To remove the label entirely, create the partial and leave it empty.

## Use a hook as a filter

So far every example has used `hook.html`, which prints its output immediately. When you need to
**capture** the output instead — to inspect it, wrap it conditionally, or combine it with other
markup — call `filter.html` with the same hook name and assign the result.

You would typically do this in a template you maintain (for example a custom layout in your site),
not in the theme:

```go-html-template
{{- $promo := partials.Include "filter.html" (dict
    "hook" "content-after"
    "context" .
) -}}

{{- with $promo -}}
  <div class="promo-wrapper ba b--gold pa3">
    {{ . }}
  </div>
{{- end -}}
```

The `filter.html` call loads the same `layouts/_partials/hooks/content-after.html` partial, but
returns its output as a string instead of printing it. The `with` block then only renders the
wrapper when the hook actually produced something, so an unused hook adds no empty markup. This is
the core difference described in the [introduction](../introduction/#filters): a **hook** prints,
a **filter** returns.
