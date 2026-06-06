---
title: Comments
date: 2026-01-16T08:00:00.000+0700
---

* [Disqus](#disqus)
* [Commento.io](#commentoio)
* [Disabling comments](#disabling-comments)
* [Privacy](#privacy)

Ananke currently supports two commenting systems: Disqus and [Commento](https://commento.io/).
Both render below the content on single pages.

## Disqus

Using [Disqus](https://disqus.com/) as a comment system for your website is an internal feature of Hugo. For more information see the official [Hugo documentation](http://gohugo.io/content-management/comments/).

```toml
[services.disqus]
shortname = 'YOURSHORTNAME'
```

Note that the setup for Disqus is *NOT* done inside of the `params` section, but with in the `services` section of your config file. To turn off Disqus, remove, or comment out the preceding lines.

## Commento.io

```toml
[params]
commentoEnable = true
# if you use a selfhosted version of commento, uncomment the next line and set your path
# commentoPath = "https://commento.io/YOURPATH"
```

By default it uses the public Commento instance at `https://commento.io`. If you are using a [self-hosted version of Commento](https://docs.commento.io/installation/self-hosting/), uncomment the `commentoPath` line and set it to your Commento instance URL.

## Disabling comments

Comments are controlled globally:

* **Disqus** is enabled only while `services.disqus.shortname` is set. Remove or
  comment out that setting to turn Disqus off everywhere.
* **Commento** is enabled only while `commentoEnable = true`. Set it to `false`
  (or remove it) to turn Commento off everywhere.

> [!NOTE]
> The theme does not include a per-page front matter switch to hide comments on
> a single page. If you need that, override the single template (see
> [Overriding partials](/customisation/overriding-partials/)) and gate the
> comment block on a front matter value of your own.

## Privacy

Both systems load third-party JavaScript and may set cookies or collect visitor
data, so mention them in your privacy policy. For Disqus, Hugo's
[privacy configuration](https://gohugo.io/configuration/privacy/) can further
restrict its behaviour. Only enable a comment system in production if your
privacy notices cover it.
