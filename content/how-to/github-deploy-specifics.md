---
title: Set up robots.txt and sitemaps on GitHub Pages
description: "Configure a root robots.txt file and a sitemap index for Hugo project sites on a shared github.io domain."
date: 2026-11-22T00:00:00+07:00
weight: 100
---

Use this guide to connect a Hugo project site's sitemap to the root of a shared GitHub Pages domain. You need access to both the project repository and the repository that publishes the domain root.

The examples use Ananke's setup: `gohugo-ananke.github.io` publishes the root site, and `documentation` publishes the Hugo site under `/documentation/`. Replace the organisation name and project path when you use this setup elsewhere.

## 1. Configure the project site

In the `documentation` repository, set these values in `config/_default/hugo.toml`. Keep any other settings in that file:

```toml
baseURL = "https://gohugo-ananke.github.io/documentation/"

# The root site owns /robots.txt for this domain.
enableRobotsTXT = false

[sitemap]
filename = "sitemap.xml"
```

`baseURL` must include the project path and trailing slash. Hugo generates the sitemap by default; the explicit filename keeps the address used by the root site stable. `enableRobotsTXT` is optional in Hugo and defaults to `false`; setting it explicitly records this deployment choice.

The [robots exclusion standard](https://www.rfc-editor.org/rfc/rfc9309.html#section-2.3) places robots.txt at the domain root. A file at `/documentation/robots.txt` does not control crawling of the documentation site. The root file applies to project paths on the same domain.

## 2. Publish the root robots.txt

In the `gohugo-ananke.github.io` repository, create or update `robots.txt` in the published site root:

```text
User-agent: *
Allow: /

Sitemap: https://gohugo-ananke.github.io/sitemap.xml
```

This permits crawling and advertises the root sitemap index. Review any existing rules before replacing the file: changes here can affect every project site on this domain.

These root-repository examples assume the repository publishes these files directly. If the root site uses Hugo, put static files in `static/`, and ensure that generated files do not compete for the same output paths.

## 3. Publish the root sitemap index

In the root repository, create or update `sitemap.xml` in the published site root:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://gohugo-ananke.github.io/documentation/sitemap.xml</loc>
  </sitemap>
</sitemapindex>
```

Add one `<sitemap>` entry for each additional project sitemap. Retain existing entries. The [sitemap protocol](https://www.sitemaps.org/protocol.html#index) defines this index format; keeping the index at the root lets it reference sitemaps in project paths below it.

Let each Hugo project generate its own sitemap. Do not copy its page URLs into the root index or maintain a static copy of its generated sitemap. Documentation deployments then update the page list without requiring changes in the root repository.

## 4. Check the build and deployment

Build the documentation into a fresh output directory so that an old robots.txt cannot remain from an earlier build:

```bash
docs_output=$(mktemp -d)
hugo --environment production --destination "$docs_output"
test -s "$docs_output/sitemap.xml"
test ! -e "$docs_output/robots.txt"
cat "$docs_output/sitemap.xml"
```

Check that the sitemap lists production URLs under `https://gohugo-ananke.github.io/documentation/`. If the deployment workflow overrides `baseURL`, its value must include that same project path.

Deploy both repositories through their normal GitHub Pages workflows. After deployment, check the public files:

```bash
curl --fail --show-error https://gohugo-ananke.github.io/robots.txt
curl --fail --show-error https://gohugo-ananke.github.io/sitemap.xml
curl --fail --show-error https://gohugo-ananke.github.io/documentation/sitemap.xml
```

The first response must advertise the root index, the second must reference the project sitemap, and the third must list the documentation URLs. A successful local build does not confirm that these files have been deployed.

## Troubleshoot common problems

* **Sitemap URLs omit `/documentation/`:** correct the production `baseURL`, including any workflow override, and rebuild.
* **The project sitemap returns 404:** check that the deployment publishes Hugo's output and that sitemap generation is not disabled through `disableKinds`.
* **An old project robots.txt remains:** build into a fresh output directory before deployment, and check for a static copy in `static/robots.txt`.
* **A preview needs different indexing rules:** a preview on a separate hostname needs its own policy. See [robots.txt and environments]({{< relref "configuration/robots.md#deploy-previews" >}}). Do not block the shared production domain to exclude a preview.

If the project moves to its own custom domain, review this arrangement: its domain-root robots.txt will then belong to that site.
