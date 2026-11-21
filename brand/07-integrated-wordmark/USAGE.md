# Ananke integrated logo kit

Approved direction: B, the tucked wordmark. The existing interleaved A is the first letter of ANANKE. Anton supplies the remaining uppercase NANKE as filled vector outlines. This kit uses the current documentation palette and preserves earlier design rounds. The user accepted this direction. The horizontal logo, dark social preview, browser icons, and touch icon are now applied in the documentation source. Deployment remains a separate step.

## Choose a file

| Use | File |
| --- | --- |
| Documentation and other dark backgrounds | `masters/ananke-horizontal-dark.svg` |
| Pale backgrounds | `masters/ananke-horizontal.svg` |
| One colour | `masters/ananke-horizontal-mono.svg` |
| White on dark | `masters/ananke-horizontal-reversed.svg` |
| Integrated wordmark | `masters/ananke-wordmark.svg` and `masters/ananke-wordmark-dark.svg` |
| Optional stacked symbol and complete name | `masters/ananke-stacked.svg` and `masters/ananke-stacked-dark.svg` |
| Complete name without the symbol | `masters/ananke-type-only.svg` |
| Standalone A | `masters/ananke-symbol.svg` and `masters/ananke-symbol-dark.svg` |
| Standalone A at 16–32 px | `masters/ananke-symbol-small.svg` and `masters/ananke-symbol-small-dark.svg` |
| Black, white, and olive exports | `exports/horizontal/` and `exports/stacked/` |
| Transparent colour PNGs and vector PDF | `exports/colour/` |
| Browser, touch, and application icons | `exports/web/` |

The horizontal logo and integrated wordmark are the same composition, provided under both descriptive names. All master artwork is vector geometry: no installed fonts, live text, raster images, filters, or masks are needed. The stacked alternative places the symbol above the complete ANANKE name; do not place NANKE alone below the symbol.

## Colour

The normative source is `assets/ananke/css/docs-colors.css`. Standalone artwork uses the following rounded sRGB conversions of its OKLCH values so it works in SVG viewers, image exporters, and design software. Out-of-gamut channels are clipped to the sRGB range. `palette.json` records the export values.

| Role | Site token | HEX | RGB |
| --- | --- | --- | --- |
| Background and one-colour ink | olive-950 | `#0c0c09` | 12, 12, 9 |
| Main lettering on dark | olive-100 | `#f4f4f0` | 244, 244, 240 |
| Symbol on dark | yellow-400 | `#fdc700` | 253, 199, 0 |
| Symbol on pale backgrounds | yellow-800 | `#894b00` | 137, 75, 0 |
| Supporting surface | olive-900 | `#1d1d16` | 29, 29, 22 |

Use yellow-400 with pale olive lettering on olive-950. For pale backgrounds, yellow-800 gives a stronger silhouette than bright yellow. It comes from the same site palette; it does not introduce a new hue. Calculated contrast ratios for the rounded exports are 12.45:1 for yellow on dark olive, 17.76:1 for pale olive on dark olive, and 6.20:1 for yellow-800 on pale olive. These are colour-pair calculations, not a complete accessibility audit.

Print output needs a printer profile and a physical proof. No press-specific CMYK or Pantone values have been assigned.

## Construction, space, and size

The horizontal master has a 680 by 256 canvas. The original A is unchanged. Its visible right edge is at x=240. The first N begins at x=232, so it sits eight units inside the symbol's horizontal extent. The lettering runs from y=32 to its baseline at y=192; the A extends to y=224. At the N baseline, the A's right edge is x=224, leaving eight units of open space between the forms. Preserve this offset and gap.

Allow at least 16 master units of clear space around the visible artwork: half the A's 32-unit flat top. Preserve the supplied aspect ratio. Do not stretch, re-space, add effects, close the slash, or repeat another A before NANKE.

Recommended starting sizes are a 160 px canvas width for the horizontal wordmark and a 16 px canvas for the small standalone A. The overview includes a rendered 208 px header example and 16, 32, and 64 px symbols. The exported favicon checks show 16, 32, and 48 px raster output. Use the standalone A where the complete wordmark becomes too small to read. These minimum sizes are visual recommendations, not guarantees for every display or medium.

Reversed and colour artwork keep the approved geometry. No separate thinning has been applied: preserving the existing A takes priority over changing its weight. Inspect a physical proof for small reversed print applications.

## Web files

The web exports include light and dark SVG favicons, ICO and PNG favicons at 16, 32, and 48 px, a 180 px touch icon, 192 and 512 px application icons, and a 512 px maskable icon. Application tiles use yellow on dark olive. The ICO contains all three expected sizes.

`head-snippet.html` demonstrates light/dark browser preference selection and the current dark olive theme colour. Paths assume installation at the host root and need adjustment for a subdirectory. `site.webmanifest` is an optional export, not a configured application or an instruction to replace the site's current favicon partial. The documentation uses the selected files through its existing logo settings and favicon partial. Its ICO and PNG fallbacks use yellow on a dark olive tile for visibility on either browser-tab colour.

## Evidence and rebuilding

* `previews/overview.png`: rendered colour, monochrome, header, stacked, and symbol examples.
* `previews/icon-checks.png`: actual PNG exports, with nearest-neighbour enlargements of the small favicons.
* `previews/svg-audit.txt`: structural master audit. Angle notices refer to the original Anton K outlines; preserve the font's intended angles.
* `previews/verification.json`: checks for outlined masters, original A geometry, icon dimensions, PDF page count, colour contrast, and presentation images.
* `presentation.html`: a portable five-slide presentation, inspected in a browser, with README, website, browser-tab, application-icon, sticker, and social-profile mockups. These are illustrative contexts, not screenshots of the documentation site.
* `build.py`: rebuilds masters, palette, overview, colour PNGs, PDF, and presentation specification. Run `/usr/bin/python3 brand/07-integrated-wordmark/build.py` from the documentation root. It uses the existing local Anton font, FontTools, rsvg-convert, and Inkscape.

The black, white, olive, and web exports use `scripts/export_variants.py` from the invoked logo-design skill. The presentation uses its `scripts/presentation_board.py` with `presentation.json`. These tools are external to the repository and no project dependencies were added.

Anton is the actual local `assets/webfonts/anton/anton-regular.ttf`. Its SIL Open Font License is included as `licences/Anton-OFL.txt`; the logo files contain outlines. The earlier copper/amber kit remains in `brand/03-anton-kit/`. The repository normally ignores new files in `brand/`; this accepted kit is included explicitly alongside the site integration.
