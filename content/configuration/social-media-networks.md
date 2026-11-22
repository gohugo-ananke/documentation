---
title: Social media networks
description: "Add follow links to your profiles and share links to your pages, add your own networks, and replace icons."
date: 2026-01-16T08:00:00.000+0700
weight: 500
---

Ananke can show follow links to your social profiles in the header and the footer, and share links on single pages. Both are off until you select networks. This page shows how to set them up. The [social network reference](/configuration/social-networks-reference/) lists the built-in networks and the keys of a network definition.

The examples use `config/_default/params.toml`. In a single `hugo.toml`, put each table under `[params]`, for example `[params.ananke.social.follow]`.

<!-- markdownlint-disable-next-line MD033 -->
<span id="configuration"></span><span id="configure-social-media-follow-links"></span><span id="set-up-global-options"></span>

## Add follow links

1. Select the networks and their order:

   ```toml
   # config/_default/params.toml

   [ananke.social.follow]
   networks = ["github", "bluesky", "mastodon"]
   ```

2. Set your profile for each network. For most networks, `username` is enough; Ananke inserts it into the network's profile address:

   ```toml
   # config/_default/params.toml

   [ananke.social.github]
   username = "jdoe"

   [ananke.social.bluesky]
   username = "jdoe.bsky.social"
   ```

3. Some networks have no fixed profile address: Mastodon, RSS, and Slack. Set the complete address with `profilelink`:

   ```toml
   # config/_default/params.toml

   [ananke.social.mastodon]
   profilelink = "https://mastodon.social/@jdoe"
   ```

4. Run `hugo server`. The header and the footer show an icon for each network, in the order of `networks`.

The [built-in networks table](/configuration/social-networks-reference/#built-in-networks) shows which networks need `profilelink`.

<!-- markdownlint-disable-next-line MD033 -->
<span id="set-your-profile-or-user-name"></span><span id="override-the-profile-link"></span><span id="override-the-label-of-the-social-network"></span><span id="rel-attributes-on-follow-links"></span>

## Change a follow link

Use these keys in the network's table, for example `[ananke.social.github]`:

* `profilelink`: a complete address that replaces the address made from `username`.
* `label`: the network name in the link title and accessible name, for example `label = "GitHub (work)"`.
* `rel`: values for the link's `rel` attribute. Ananke always adds `noopener`. For example, `rel = "me"` lets a service such as Mastodon verify that the profile is yours.

```toml
# config/_default/params.toml

[ananke.social.mastodon]
profilelink = "https://mastodon.social/@jdoe"
rel = "me"
```

<!-- markdownlint-disable-next-line MD033 -->
<span id="configure-social-media-share-links"></span><span id="set-up-sharing-networks"></span>

## Add share links

Select the share networks and their order:

```toml
# config/_default/params.toml

[ananke.social.share]
networks = ["email", "facebook", "bluesky", "linkedin"]
```

Single pages then show a share link for each network. Use only networks that define a share address; the [built-in networks table](/configuration/social-networks-reference/#built-in-networks) marks them.

Share links are plain links built from the page address, title, and summary. They load no third-party scripts.

Two options change the link content:

* `icons` (default `true`): show the network icon in each link. When `false`, the link shows its text.
* `sharetext` (default `true`): give each link the text "Share on" and the network name. With icons, this text is the link title and accessible name.

Do not set both `icons` and `sharetext` to `false`, because the links are then empty.

## Disable sharing partially or globally

To hide the share links on one page, add `disable_share` to its front matter:

```yaml
---
title: Private notes
disable_share: true
---
```

> [!WARNING]
> In Ananke v2.23.0, any `disable_share` value in front matter hides the share links, also `disable_share: false`. Remove the key to show share links on a page. See [ananke#1140](https://github.com/gohugo-ananke/ananke/issues/1140).

To remove share links from all pages, leave `ananke.social.share.networks` unset, or set it to an empty list. The theme ships no share networks by default:

```toml
# config/_default/params.toml

[ananke.social.share]
networks = []
```

The option `ananke.social.share.disable_share` in the site configuration has no effect in Ananke v2.23.0.

<!-- markdownlint-disable-next-line MD033 -->
<span id="icons"></span><span id="adding-new-icons"></span><span id="further-reading"></span><span id="notes"></span><span id="font-awesome"></span><span id="customize-icons"></span>

## Replace or add icons

Ananke shows the SVG file `assets/ananke/socials/<icon>.svg` in each link, where `<icon>` is the network's `icon` value. A file with the same path in your site replaces the theme's file.

In v2.23.0, some built-in networks have no icon file: email, Hacker News, LinkedIn, Slack, Stack Overflow, Twitter, and X. Their links have no visible content. Add your own icon for each network that you use:

1. Get an SVG icon for the network, and check that its licence allows your use.
2. Save it with the name from the [Icon column](/configuration/social-networks-reference/#built-in-networks), for example `assets/ananke/socials/linkedin.svg` or `assets/ananke/socials/envelope.svg`.
3. Run `hugo server` and check that the link shows the icon.

Ananke sets `fill: currentColor` on the icons, so use an SVG without its own fill colour.

<!-- markdownlint-disable-next-line MD033 -->
<span id="setup-individual-new-networks"></span><span id="configuring-networks-with-multiple-hosts"></span>

## Add a network

To link to a network that Ananke does not define, add a network definition and your profile. This example adds Codeberg, for which the theme ships an icon:

```toml
# config/_default/params.toml

[ananke.social.networks.codeberg]
slug = "codeberg"
label = "Codeberg"
color = "#2185d0"
profile = "https://codeberg.org/%s"
icon = "codeberg"

[ananke.social.codeberg]
username = "jdoe"

[ananke.social.follow]
networks = ["github", "codeberg"]
```

To use the network for sharing, also set `link` and `particles`. To change one key of a built-in network, set only that key, for example `[ananke.social.networks.linkedin]` with `color = "#0a66c2"`. The [network definition reference](/configuration/social-networks-reference/#network-definition) describes every key.

To link two profiles on the same network, define a second network with its own slug, for example `github2`, and the same values.

<!-- markdownlint-disable-next-line MD033 -->
<span id="available-networks"></span>

## Upgrade from Ananke 2.10 or earlier

<!-- markdownlint-disable-next-line MD033 -->
<span id="migrate-from-versions-before-v211"></span><span id="development-changes"></span>

Ananke 2.11.0 replaced the old social settings. See [Upgrade social links from Ananke 2.10 or earlier](/get-started/upgrade-social-links/).
