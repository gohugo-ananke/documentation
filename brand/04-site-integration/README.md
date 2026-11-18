# Documentation site integration

The B1 + Anton logo is now applied in the local documentation source. This work is prepared for the site branding commit and has not been deployed. The earlier rounds remain design history.

## Site assets

- `static/images/brand/`: light and dark SVG lockups, plus a 1200 by 630 PNG social card.
- `static/favicon.ico`: 16, 32, and 48 px fallback favicon.
- `static/icons/`: small-cut SVG favicons for light and dark browser preferences, PNG favicon alternatives, and the 180 px touch icon.
- `config/_default/params.toml`: the header logo, branded background class, fallback favicon, and default social image.
- `config/_default/hugo.toml`: the production base URL uses the live address documented in the repository README, so social metadata has absolute URLs. Netlify preview builds still override this through their existing command.
- `layouts/_partials/site-favicon.html`: icon links, browser colour preferences, and theme colour. No PWA manifest or installation behaviour was added.
- `layouts/_partials/site-footer.html`: logo, original copyright wording, and social links.
- `assets/ananke/css/docs-theme.css`: logo sizing and the existing ink token for header/footer backgrounds.

The header uses Ananke's existing `site_logo` support. Its navigation markup is not overridden. The footer logo has a 160 px canvas width; the header uses 208 px. Both preserve the supplied lockup aspect ratio and exceed the usage guide's 156 px recommendation.

## Artwork provenance

Logo and icon files were copied from `brand/03-anton-kit/`. The dark favicon uses the same small-size path with the warm-white fill, keeping it legible on dark browser tabs. The social card uses the primary lockup and outlined glyphs from the local Inter font. Rebuild it with `/usr/bin/python3 brand/04-site-integration/build-social-card.py`, then `rsvg-convert brand/04-site-integration/social-card.svg -o static/images/brand/ananke-social.png` from the documentation root.

## Verification

Production-style minified and `/docs/` subdirectory builds passed with Hugo 0.170.0 against the pinned Ananke v2.19.1 source, extracted from the local Git tag. Normal Go module downloading is blocked by the machine's existing SSH configuration error; the local source replacement avoids that error without changing `go.mod` or `go.sum`.

The generated header/footer logos, accessible image names, icon links, and absolute Open Graph/Twitter image URLs were checked on all 56 rendered pages, excluding redirect aliases, in both builds. Image sizes and ICO sizes were checked. Browser checks confirmed HTTP 200 responses for branding assets and the correct SVG favicon media condition in light and dark preferences.

The homepage has no horizontal overflow at 320, 375, 768, or 1440 px. The general configuration article has pre-existing mobile overflow: its scroll width is 520 px at a 320 px viewport both before and after this change, including a wide table. The branding itself stays within the viewport. That unrelated layout issue was left unchanged.

Desktop/mobile homepage and article screenshots, plus header/footer crops, are stored here. `header-before.png` records the baseline header. The social card's initial generic-font version is retained as `social-card-v1.svg`; the applied version uses local font outlines.
