---
title: Social network reference
description: "The built-in social networks of Ananke v2.23.0 and the keys of a network definition, including share link particles."
date: 2026-11-22T00:00:00+07:00
weight: 510
---

This page lists the social networks that Ananke v2.23.0 defines and the keys of a network definition. To add follow or share links to your site, follow [Social media networks](/configuration/social-media-networks/). The other social options are in the [configuration reference](/configuration/reference/#social-links).

## Built-in networks

Use the slug in `follow.networks` or `share.networks` under `[params.ananke.social]`.

* **Follow link**: "username" means that `username` is enough; "profilelink" means that you must set the complete address in `profilelink`; "no" means that the network has no profile address.
* **Share link**: "yes" means that the network defines a share address. Do not use a network with "no" in `share.networks`: its link has no valid address.
* **Icon**: the file in `assets/ananke/socials/` that the link shows. "Not shipped" means that v2.23.0 has no such file, so the link has no visible content. Add your own SVG file with that name to your site's `assets/ananke/socials/` directory.

| Slug | Label | Follow link | Share link | Icon |
| --- | --- | --- | --- | --- |
| `bluesky` | Bluesky | username | yes | `bluesky` |
| `email` | Email | no | yes | `envelope`, not shipped |
| `facebook` | Facebook | username | yes | `facebook` |
| `github` | GitHub | username | no | `github` |
| `gitlab` | GitLab | username | no | `gitlab` |
| `hackernews` | Hacker News | username | yes | `hacker-news`, not shipped |
| `instagram` | Instagram | username | no | `instagram` |
| `keybase` | Keybase | username | no | `keybase` |
| `linkedin` | LinkedIn | username | yes | `linkedin`, not shipped |
| `medium` | Medium | username | no | `medium` |
| `mastodon` | Mastodon | profilelink | no | `mastodon` |
| `pinterest` | Pinterest | username | yes | `pinterest` |
| `reddit` | Reddit | username | yes | `reddit` |
| `rss` | RSS | profilelink | no | `rss` |
| `slack` | Slack | profilelink | no | `slack`, not shipped |
| `stackoverflow` | Stack Overflow | username: your numeric user ID | no | `stack-overflow`, not shipped |
| `telegram` | Telegram | username | yes | `telegram` |
| `tiktok` | TikTok | username | no | `tiktok` |
| `tumblr` | Tumblr | username | yes | `tumblr` |
| `twitter` | Twitter | username | yes | `twitter`, not shipped |
| `whatsapp` | WhatsApp | no | yes | `whatsapp` |
| `xing` | Xing | username | yes | `xing` |
| `x-twitter` | X | username | yes | `x-twitter`, not shipped |
| `youtube` | YouTube | username | no | `youtube` |

For Bluesky, use your full handle as `username`, for example `jdoe.bsky.social`.

## Network definition

A network definition is a table under `[params.ananke.social.networks.<slug>]`. Your table is merged with a built-in definition of the same slug, so you can change one key without repeating the others.

| Key | Required | Type | Description |
| --- | --- | --- | --- |
| `slug` | Yes | String | The network's name in links and CSS classes. Use the table name. |
| `label` | Yes | String | The network name in link titles and accessible names. |
| `color` | No | String | A CSS colour for the hover state of the icon. |
| `profile` | For follow links | String or `false` | The profile address. `%s` receives `username`. Use `""` when users must set `profilelink`, or `false` when the network has no profile. |
| `icon` | Yes | String | The name of the SVG file in `assets/ananke/socials/`, without `.svg`. |
| `link` | For share links | String | The start of the share address, without `?`. |
| `particles` | For share links | Table | The query parameters of the share address. See [Particles](#particles). |
| `separator` | No | String | The character between query parameters. The default is `&`. |

## Particles

Each key in `particles` becomes a query parameter of the share address. Its value selects the content:

| Value | Replaced with |
| --- | --- |
| `permalink` | The page's permanent address. |
| `title` | The page title. |
| `description` | The page summary, as plain text. |

The key `params` is special: Ananke adds its value as it is, for example `params = "mini=true"` adds `mini=true`. Other values are ignored.

Ananke adds the parameters in alphabetical order of their keys, and starts with the separator. For example, the built-in LinkedIn definition creates this address:

```text
https://www.linkedin.com/shareArticle?&mini=true&source=<permalink>&summary=<summary>&title=<title>&url=<permalink>
```

## Profile settings

Your own profile for a network is under `[params.ananke.social.<slug>]`: `username`, `profilelink`, `label`, and `rel`. The [configuration reference](/configuration/reference/#social-links) describes them.
