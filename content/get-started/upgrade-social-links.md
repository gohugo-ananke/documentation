---
title: Upgrade social links from Ananke 2.10 or earlier
description: "Move social profile settings from ananke_socials or flat parameters to the ananke.social configuration of Ananke 2.11.0 and later."
date: 2026-11-22T00:00:00+07:00
weight: 420
---

Ananke 2.11.0 replaced the social settings. Later releases ignore the old settings, so a site that still uses them shows no follow links. This guide moves your settings to the current structure.

## Find the old settings

Ananke 2.10 and earlier read two forms. Search your site configuration for both:

* A list of tables named `ananke_socials`:

  ```toml
  # config/_default/params.toml (old)

  [[ananke_socials]]
  name = "github"
  url = "https://github.com/jdoe"
  ```

* A flat parameter with the network name, for example `github = "https://github.com/jdoe"` directly under `[params]`. Ananke 2.10 read these names: `facebook`, `twitter`, `instagram`, `youtube`, `github`, `gitlab`, `keybase`, `linkedin`, `medium`, `mastodon`, `slack`, `stackoverflow`, and `rss`.

## Move the settings

1. Add each network to the follow list, in the order that you want:

   ```toml
   # config/_default/params.toml

   [ananke.social.follow]
   networks = ["github"]
   ```

2. Add a table for each network and copy the old `url` to `profilelink`:

   ```toml
   # config/_default/params.toml

   [ananke.social.github]
   profilelink = "https://github.com/jdoe"
   ```

   Instead of `profilelink`, you can set `username` for networks with a fixed profile address. The [built-in networks table](/configuration/social-networks-reference/#built-in-networks) shows which networks support this.

3. If an old entry set `label`, copy it to the same table. If it set `color`, set it in the network definition instead, for example `color` under `[ananke.social.networks.github]`.
4. Delete the `ananke_socials` tables and the flat network parameters.
5. Run `hugo server` and check the follow links in the header and the footer.

To add share links too, see [Add share links](/configuration/social-media-networks/#add-share-links).

## Update your own templates

Ananke 2.11.0 also removed the old social partials and the functions in `partials/func/socials/`. If your own templates call them, change the calls:

| Old call | New call |
| --- | --- |
| `{{ partial "social-follow.html" . }}` | `{{ partial "social/follow.html" . }}` |
| `{{ partial "social-share.html" . }}` | `{{ partial "social/share.html" . }}` |
