# Ananke brand exploration

Exploratory artwork for Ananke, the Hugo theme. These files are design history, not approved production assets. Keep earlier rounds when adding new work. No artwork has been installed into the site.

## Rounds

- `01-initial-concepts/concepts.png`: initial Open A, Interleave, and Imprint proposals. The user selected Interleave (B), requested a stronger A shape, and specified the documentation's existing font setup.
- `02-interleave-a/shapes-v1.png`: first A-shaped refinements of B, retained for comparison.
- `02-interleave-a/shapes-v2.png`: revised split positions to reduce thin fragments. B1 is the recommended direction; B2 is simpler, and B3 is narrower.
- `02-interleave-a/typography.png`: the same B1 mark paired with Anton Regular, Inter at weight 600, and Rubik Regular, taken directly from `assets/webfonts`.
- `02-interleave-a/checks.png`: white on black, mirror, rotation, and true 64, 32, and 16 px examples.
- `02-interleave-a/interactive-tests.html`: additional browser-based inspection sheet; generated, but not visually verified in a browser.

## Typography and construction

The source `assets/ananke/css/fonts.css` assigns Anton to headings, Inter Variable to body text, and Monaspace Krypton to code. Rubik is defined as another available family. This round uses actual font files and vector glyph outlines, not substituted system fonts. The local Rubik font is labelled Regular; its CSS weight declaration is 300. No site font configuration has been changed.

The Anton, Inter, and Rubik licence files in `assets/webfonts` specify SIL Open Font License 1.1. The font outlines in the studies are artwork, not redistributed font software. Preserve source and licence references when preparing final deliverables. No trademark clearance has been performed.

The marks use closed filled paths with real negative space. The second-pass symbol audits report no structural issues. Lockup audit warnings about angles and precision refer to original font glyph outlines; do not snap those glyphs to a geometric grid. Lockup spacing and wordmark customisation remain exploratory.

## Reproduction

Run `/usr/bin/python3 brand/02-interleave-a/build.py` and `/usr/bin/python3 brand/02-interleave-a/preview.py` from the documentation repository root. The system Python has FontTools and WOFF2 support. Render SVG previews with `rsvg-convert`. Before rerunning any builder after edits, retain the current artwork under a new version or round.

The first-round builder and notes are an archived snapshot from the original temporary workspace. Their absolute temporary paths and then-current repository status are historical, not current instructions.

## Status

Recommendation: B1 with Anton Regular. The broader Inter 600 lockup is an alternative if a quieter presentation is preferred. Await feedback on shape and typography before producing the full colour, favicon, and lockup kit.

All work is intentionally uncommitted, as requested.

## Selected direction: Anton

The user chose Anton. Continue with B1 + Anton in `03-anton-kit/`. See `03-anton-kit/USAGE.md` for the masters, palette, web icons, checks, and integration notes. The earlier status above is retained as part of the exploration history. No site integration or commit has been made.

## Local site integration

The selected kit has now been applied to the local documentation site. See `04-site-integration/README.md` for the runtime files, asset provenance, screenshots, and checks. This supersedes earlier statements about installation status. The design history is included with the site branding change. Deployment remains a separate step.
