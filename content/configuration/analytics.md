---
title: Analytics
date: 2026-06-06T08:00:00.000+0700
---

* [Google Analytics](#google-analytics)
* [Production-only loading](#production-only-loading)
* [Disabling analytics in development](#disabling-analytics-in-development)
* [Verifying the output](#verifying-the-output)
* [Privacy](#privacy)

Ananke loads analytics through Hugo's embedded Google Analytics template. There
is no theme-specific analytics parameter — you configure Hugo's standard
service and the theme renders it.

## Google Analytics

Set your measurement ID under Hugo's `services.googleAnalytics` configuration:

```toml
# config/_default/hugo.toml

[services.googleAnalytics]
ID = "G-XXXXXXXXXX"
```

With an ID set, the theme includes Hugo's analytics snippet in the page head.

## Production-only loading

The theme only emits the analytics snippet in **production** builds. During
`hugo server` and any non-production environment, no tracking code is rendered,
so your local development and deploy previews are not counted.

This means a plain `hugo server` already behaves correctly for local work — you
do not need to remove your ID.

## Disabling analytics in development

Because loading is production-only, the simplest approach is to keep your ID in
the default configuration and rely on the environment check. If you want to be
explicit, override the ID per environment — for example leave it empty in
`config/development/`:

```toml
# config/development/hugo.toml

[services.googleAnalytics]
ID = ""
```

## Verifying the output

Build for production and check whether the snippet is present:

```bash
hugo --environment production
grep -r "googletagmanager\|gtag" public/index.html
```

You should see the analytics script when an ID is set. Build without the
production environment and confirm it is absent:

```bash
hugo --environment development
grep -r "googletagmanager\|gtag" public/index.html
```

## Privacy

Analytics scripts collect visitor data and may set cookies, so disclose them in
your privacy policy. Hugo's
[privacy configuration](https://gohugo.io/configuration/privacy/) offers options
such as `respectDoNotTrack` and anonymising IPs for Google Analytics:

```toml
# config/_default/hugo.toml

[privacy.googleAnalytics]
respectDoNotTrack = true
```
