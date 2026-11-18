# Ananke logo kit

Selected direction: B1, the interleaved A, with an Anton wordmark. This kit continues the chosen direction. The colour treatment comes from the existing documentation palette and is ready for review. Nothing has been installed into the site or committed.

## Choose a file

| Use | File |
| --- | --- |
| Light background | `masters/ananke-horizontal.svg` |
| Dark ink background | `masters/ananke-horizontal-dark.svg` |
| One-colour print or UI | `masters/ananke-horizontal-mono.svg` |
| White artwork on dark backgrounds | `masters/ananke-horizontal-reversed.svg` |
| Square composition | `masters/ananke-stacked.svg` |
| Name without symbol | `masters/ananke-wordmark.svg` |
| Symbol from 48 px upwards | `masters/ananke-symbol.svg` |
| Symbol at 16–32 px | `masters/ananke-symbol-small.svg` |
| Optically lighter reversed symbol | `masters/ananke-symbol-reversed.svg` |
| Browser, touch, and application icons | `exports/web/` |

The SVG masters contain filled vector paths, including the wordmark. They require no installed fonts, embedded raster images, masks, or filters. The wordmark uses the actual `assets/webfonts/anton/anton-regular.ttf`, with tighter spacing. The supplied Anton SIL Open Font License is in `licences/Anton-OFL.txt`.

## Colour

| Role | HEX | RGB |
| --- | --- | --- |
| Ink | `#2a1104` | 42, 17, 4 |
| Copper | `#ab5512` | 171, 85, 18 |
| Amber | `#f0bc2f` | 240, 188, 47 |
| Paper | `#fffefb` | 255, 254, 251 |

These are existing tokens from `assets/ananke/css/docs-theme.css`, not a change to the site palette. Use copper with ink on paper or the pale `#fbf1c7` background. Use amber with warm white on ink. Keep amber off white backgrounds when the mark must remain clear. Use a single ink colour for monochrome applications.

Calculated contrast ratios: copper on paper 5.15:1; copper on pale yellow 4.58:1; ink on paper 17.64:1; amber on ink 10.11:1. These are colour-pair calculations, not a complete accessibility audit. Print colours need an output profile and a physical proof; no Pantone match or CMYK press specification has been assigned.

## Space and size

Keep clear space around the visible artwork of at least half the symbol's flat top width. Its top is 32 units wide on the 256-unit symbol canvas, so clear space is at least 16 units at that scale. Include any transparent padding in the calculation; do not crop into the visible symbol.

Use the horizontal master at a canvas width of at least 156 px for normal screen use. Use the wordmark-only master at 96 px or wider. These are starting recommendations based on visual inspection, not device-independent limits. Below those sizes, use the symbol. The small-size drawing is for 16–32 px canvases; the overview and icon checks show its actual output.

Keep the diagonal gap open. Preserve the aspect ratio and supplied spacing. Do not add shadows, gradients, outlines, or extra cuts. Do not rearrange the symbol and wordmark within a lockup. Use the dedicated dark version instead of recolouring the light logo at random.

## Web icons

`exports/web/` contains SVG and ICO favicons, PNG favicons at 16, 32, and 48 px, a 180 px touch icon, 192 and 512 px application icons, and a maskable icon. ICO dimensions were checked. The transparent dark favicon suits light tabs; a white SVG alternative is also provided for dark surfaces. Select the appropriate version or add a tested light/dark favicon rule during integration.

The generated manifest and head snippet assume that files will be installed at the site's root. They are examples, not an instruction to replace an existing application manifest. Adapt the URLs during integration. The logo kit itself does not make the documentation an installable application.

## Review and history

- `previews/overview.png`: rendered light, dark, monochrome, header, stacked, and size examples.
- `previews/icon-checks.png`: actual exported PNGs; the smallest are enlarged with nearest-neighbour sampling to expose pixel edges.
- `previews/svg-audit.txt`: structural SVG audit. Font-outline angle and precision notices describe original Anton glyphs; do not snap the font to an arbitrary geometric grid.
- `presentation.html`: a portable five-slide board with README, website, browser-tab, app-icon, sticker, and social mockups. Generated but not visually verified in a browser; the static overview and icon checks were rendered and inspected.
- `build.py`: builds the vector masters and overview from local font files. Run with `/usr/bin/python3` from the documentation repository root. Export scripts used for this kit are supplied by the invoked logo-design skill; they are not project dependencies.

Earlier work remains in `brand/01-initial-concepts/` and `brand/02-interleave-a/`. The refined counter removes the small fragment in the previous B1. The reversed symbol has slightly lighter geometry and a wider opening. The small-size cut opens the counter further.

No trademark clearance has been performed. A clearance search is recommended before adopting the mark as a registered identity.
