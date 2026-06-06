---
title: robots.txt and Environments
date: 2026-06-06T08:00:00.000+0700
---

* [Enable robots.txt](#enable-robotstxt)
* [How the environment changes the output](#how-the-environment-changes-the-output)
* [Deploy previews](#deploy-previews)
* [Testing the generated file](#testing-the-generated-file)
* [Overriding the template](#overriding-the-template)

Ananke ships a `robots.txt` template that changes its output depending on the
build environment, so production sites are crawlable while previews and local
builds are not.

## Enable robots.txt

Tell Hugo to generate `robots.txt` by enabling it in your configuration:

```toml
# config/_default/hugo.toml

enableRobotsTXT = true
```

With this on, Hugo renders the theme's template to `public/robots.txt` on every
build.

## How the environment changes the output

The template checks whether the build is a production build:

* **Production** (`hugo` with the default environment, or
  `hugo --environment production`) allows crawling and points to the sitemap:

  ```text
  User-agent: *
  Allow: /
  Sitemap: https://example.com/sitemap.xml
  ```

* **Any non-production build** (for example `hugo server`, or
  `--environment development`) disallows everything:

  ```text
  User-agent: *
  Disallow: /
  ```

This mirrors the per-page indexing behaviour described in
[SEO → Content indexing](/configuration/seo/#content-indexing): non-production
output is kept out of search engines.

## Deploy previews

Branch and pull-request previews (for example Netlify deploy previews) should
not be indexed. Build them in a non-production environment so the disallow
output is produced. Netlify sets a non-production context for previews
automatically; if you build previews yourself, pass a non-production
environment:

```bash
hugo --environment development
```

Only your live production deploy should run in the production environment.

## Testing the generated file

Build for production and inspect the output:

```bash
hugo --environment production
cat public/robots.txt
```

You should see `Allow: /` and the `Sitemap:` line. Then build without the
production environment and confirm it switches to `Disallow: /`:

```bash
hugo --environment development
cat public/robots.txt
```

## Overriding the template

To customise the rules, override the theme's template by creating
`layouts/robots.txt` in your own project. Hugo uses your copy instead of the
theme's. Keep the environment check if you still want previews excluded:

```text
User-agent: *
{{ if hugo.IsProduction -}}
Allow: /
Sitemap: {{ "/sitemap.xml" | urls.AbsURL }}
{{ else -}}
Disallow: /
{{ end -}}
```
