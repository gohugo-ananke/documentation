---
title: "Add a LinkedIn icon"
date: 2026-09-26T08:00:00.000+0700
---

Ananke has a pre-configured `linkedin` network, but the theme does not include a LinkedIn icon. If you add `linkedin` to your follow or share networks without an icon, the link does not show on your website.

## Why the icon is missing

LinkedIn belongs to Microsoft. Microsoft does not allow free use of its brand icons. Ananke uses [Simple Icons](https://simpleicons.org/) for its social icons, and Simple Icons had to [remove all Microsoft icons](https://github.com/simple-icons/simple-icons/issues/11236) after a request from the Microsoft legal team. Because of this, Ananke cannot include the LinkedIn icon either. You must add the icon to your website yourself.

## Add the icon

The steps are the same as for [any other icon](/configuration/social-media-networks/#adding-new-icons). The only difference is where you get the icon.

1. Download a LinkedIn icon in SVG format. [Font Awesome Free](https://fontawesome.com/icons/linkedin?f=brands) has one. You can download the file directly from [the Font Awesome repository on GitHub](https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/svgs/brands/linkedin.svg).
2. Save the file as `assets/ananke/socials/linkedin.svg` in your website repository. The file name must be `linkedin.svg`, because the `icon` parameter of the pre-configured network is `linkedin`.
3. Add `linkedin` to your networks and configure your profile:

```toml
# config/_default/params.toml

[ananke.social.follow]
networks = ["linkedin"]

[ananke.social.share]
networks = ["linkedin"]

[ananke.social.linkedin]
username = "your-linkedin-username"
```

4. Run `hugo server` and make sure that the LinkedIn icon shows in the follow and share sections.

You can also do this in one command from your website root:

```bash
mkdir -p assets/ananke/socials
curl -o assets/ananke/socials/linkedin.svg https://raw.githubusercontent.com/FortAwesome/Font-Awesome/7.x/svgs/brands/linkedin.svg
```

## Licence and brand use

Font Awesome Free brand icons use the [CC BY 4.0 licence](https://fontawesome.com/license/free). This licence requires attribution. The downloaded SVG file contains a comment with the attribution. Do not remove this comment.

The Font Awesome licence covers the icon file. It does not give you rights to the LinkedIn brand. If you want to use the official logo, read the [LinkedIn brand guidelines](https://brand.linkedin.com/downloads). You are responsible for how you use the LinkedIn brand on your website.
