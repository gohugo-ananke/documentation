---
title: Page headers
description: "Choose page-header images, control their height and crop, and keep overlaid text readable."
date: 2026-01-16T08:00:00.000+0700
weight: 300
aliases:
  - /configuration/header-and-hero/
---

A page header is the banner above the main content. It can show a title, a description, and a background image. This area is also called a hero. It is separate from the headings inside an article and from the navigation menu, although the navigation sits inside the default header.

This guide describes the standard Ananke header templates used by this site's published theme dependency, v2.19.1. A site that overrides those templates can behave differently. Check your installed version before copying a template override, especially when adopting a newer header implementation.

## Add an image to one page

Put `about.jpg` in `static/images/`, then add this front matter to the page:

```toml
# content/about.md
+++
title = "About"
[params]
featured_image = "/images/about.jpg"
+++
```

Use the URL `/images/about.jpg`, without the `static` prefix. For the homepage, put the settings in `content/_index.md`. For a section such as Posts, use `content/posts/_index.md`. A section image does not automatically become the image of every page in that section.

For a page bundle, keep the file next to `index.md` and reference its filename:

```toml
# content/posts/my-post/index.md
+++
title = "My post"
[params]
featured_image = "header.jpg"
+++
```

Place `header.jpg` in `content/posts/my-post/`. The theme looks for a matching page resource, then an asset relative to `assets/`, before treating the value as an image URL. Keep image URLs valid: a missing file does not automatically select a different image.

## How the featured image is found

The theme uses the first applicable source:

1. The page's `featured_image` parameter, including a value inherited through a cascade.
2. The first entry in the page's `images` array.
3. An image resource in the page bundle whose name matches the theme's `feature` or `cover` pattern.

If no source supplies an image, the header uses its no-image layout. An empty `featured_image` allows the next source to be tried; it is not a switch that disables images.

`images` can also supply social-preview metadata. Setting it for social sharing can therefore introduce a header image when `featured_image` is absent. See [Images](/content/images/) and [SEO](/configuration/seo/).

## Use the same image across the site

Use a cascade to give pages a shared image. Setting only `[params].featured_image` in site configuration is not enough: the featured-image helper reads page parameters, not a site-wide fallback.

For a shared homepage image and inherited images on its descendants:

```toml
# content/_index.md
+++
title = "Welcome"
[params]
featured_image = "/images/shared-header.jpg"
[cascade.params]
featured_image = "/images/shared-header.jpg"
+++
```

Place the file at `static/images/shared-header.jpg`. Alternatively, in the development version, place it at `assets/images/shared-header.jpg` and use `images/shared-header.jpg` in both parameters for responsive processing. Use assets or a static URL for shared images: a filename in the homepage bundle is not a page resource of every descendant. A cascade in a section's `_index.md` can instead provide defaults for that section's descendants. Configure taxonomy and other generated pages explicitly if they do not inherit the cascade you expect.

Override the inherited image on any individual page with its own `params.featured_image`, as in the first example. The content section, documentation branch, and image filename do not need to share a name.

## Use images only on selected pages

Start without a shared image cascade. Omit `featured_image`, omit header-image entries in `images`, and avoid bundle images named `cover` or `feature` on pages that should have no image. Then add `featured_image` only to the selected pages.

If a page inherits an image, remove or narrow the cascade rather than setting `featured_image = ""` and assuming the image is disabled. Also check the `images` fallback and bundle-resource discovery. The standard theme has no dedicated boolean parameter to suppress all featured-image sources for one page. If you need that behaviour while keeping social images or inherited defaults, add it in a site-specific featured-image helper override and maintain that override when updating the theme.

For a site with no header images at all, apply the same checks to every page, including the homepage and section pages. On individual pages the no-image layout shows navigation at the top, with the page title in the article below. Home and list pages retain a title area in their header.

## Choose the fallback colour

Without an image, the default navigation/header background is black. Set its colour in site configuration:

```toml
# config/_default/hugo.toml
[params]
background_color_class = "bg-dark-blue"
```

This setting also affects the footer. It does not set an image overlay or the background behind a transparent image. Use a Tachyons background class that keeps navigation readable.

## Control the crop and alignment

Home and list pages read `featured_image_class` from site parameters, with a default of `cover bg-top`:

```toml
# config/_default/hugo.toml
[params]
featured_image_class = "cover bg-center"
```

Individual pages read the setting from page parameters, with a default of `cover bg-center`:

```toml
# content/about.md
+++
title = "About"
[params]
featured_image = "/images/about.jpg"
featured_image_class = "cover bg-top"
+++
```

Use `bg-top`, `bg-center`, or `bg-bottom` to keep the subject in view. `cover` fills the banner and crops the image when its proportions differ from the header. `contain` fits the whole image inside the available area, but can leave empty space and does not change the banner height. Add a custom class with `background-repeat: no-repeat` when using `contain`; fitting alone does not disable tiling.

For consistent individual-page defaults, cascade `featured_image_class` through page parameters. A site parameter alone does not change this setting on individual pages. Home and list templates still read their site-wide setting.

## Set header height and spacing

A CSS background image has no intrinsic layout height. A large image does not make the standard header taller. Navigation, title wrapping, descriptions, and padding determine its height.

`header_section_class` controls the title area's classes. It is optional, accepts a site-wide default, and can be overridden per page. These are the built-in defaults:

* Home and list pages with an image: `tc-l pv4 pv6-l ph3 ph4-ns`.
* Home and list pages without an image: `tc-l pv3 ph3 ph4-ns`.
* Individual pages with an image: `tc-l pv6 ph3 ph4-ns`.
* Individual pages without an image: no banner title area; this setting has no effect there.

Choose the same padding for all title areas:

```toml
# config/_default/hugo.toml
[params]
header_section_class = "tc-l pv4 ph3 ph4-ns"
```

Use `pv3` for less vertical padding or `pv6` for more. The value replaces the full class list, so retain the alignment and horizontal padding you need. This makes padding consistent, not total height: longer titles, descriptions, navigation wrapping, and the extra bottom padding on no-image home/list headers can still change the result.

### Give title areas a common minimum height

Add your own class instead of relying on padding alone:

```toml
# config/_default/hugo.toml
[params]
header_section_class = "header-panel tc-l ph3 ph4-ns"
[params.ananke]
custom_css = ["headers.css"]
```

```css
/* assets/ananke/css/headers.css */
.header-panel {
  min-height: 18rem;
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
```

Append `headers.css` to any existing `ananke.custom_css` list. This gives title areas a common minimum height while allowing long text to grow. It does not equalise the navigation or add a missing title area to individual pages without images.

### Make all complete banners exactly the same height

There is no built-in parameter that equalises all complete headers, with and without images. For exact equality, use site-specific header templates with the same structure: navigation, a consistently sized title area, and matching outer spacing. Apply your height rule to that shared banner container. See [Overriding partials](/customisation/overriding-partials/).

Prefer a minimum height when titles can wrap. A fixed height can let text overflow on phones, at increased text sizes, or in translations. Do not hide that overflow to make a banner look equal. Test long titles and expanded navigation before choosing an exact height.

## Adapt the header to image proportions

`cover`, `contain`, and `height: auto` cannot make a CSS background determine its container's height. There are two approaches:

* For a known shared shape, add a custom class with an `aspect-ratio`, such as `3 / 1`, to the image-bearing header. Remove conflicting title padding and allow enough room for navigation and text. This uses your chosen ratio, not the source image's dimensions, and small screens may need a taller ratio.
* To follow each image's own proportions automatically, override the header markup to render an actual `<img>` with `display: block; width: 100%; height: auto`, or derive the container's aspect ratio from the image resource's width and height. Resource dimensions are available for suitable local raster resources; an arbitrary static URL does not supply those dimensions to the template automatically.

The second approach is a template customisation, not a front matter setting. Maintain the navigation, title, overlay, and no-image fallback when replacing a header template. Place text below the image if it cannot safely fit over it. A normal-flow image preserves its proportions but does not guarantee room for overlaid text.

Choose either a standard banner height with cropping or image-led proportions. They cannot both remain exact when images have different ratios. For photographs with different compositions, use consistent landscape crops or set page-specific focal positions instead.

## Adjust the overlay and text contrast

Ananke places a dimming layer over the background image. The default is `bg-black-60`: black at 60% opacity. A stronger dark overlay generally makes the default light text easier to read.

For home and list headers, set the overlay in site configuration:

```toml
# config/_default/hugo.toml
[params]
cover_dimming_class = "bg-black-70"
```

For an individual page, use page parameters:

```toml
# content/about.md
+++
title = "About"
[params]
featured_image = "/images/about.jpg"
cover_dimming_class = "bg-black-70"
+++
```

As with image-fitting classes, a cascade can set individual-page defaults. The site parameter controls home/list headers, while individual-page headers read page parameters.

`bg-black-20` leaves more of the image visible; `bg-black-80` darkens it more. A light overlay such as `bg-white-40` does not change the light title or navigation text to dark text. If you choose one, also customise foreground colours and verify contrast. The article's `text_color` is not a general header-text colour control.

To remove dimming, use a custom class with a transparent background, for example `header-overlay-clear`, and define it in your registered stylesheet:

```css
/* assets/ananke/css/headers.css */
.header-overlay-clear {
  background-color: transparent;
}
```

Set `cover_dimming_class` to `header-overlay-clear` in the appropriate configuration or page parameters. An empty string selects the theme's default overlay again; it does not remove it.

Check the title, description, logo, navigation, and focus indicators against the brightest and darkest image areas at mobile and desktop crops. Use at least 4.5:1 contrast for normal text and 3:1 for large text. See [Colour contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html). A dimming percentage alone does not prove that every part is readable.

## Put colour behind transparent images

Add a background colour to the image-fitting classes, such as `cover bg-center bg-dark-blue`. Use the site setting for home/list headers or page parameters for individual pages. The colour sits behind transparent parts of the image; the dimming overlay still sits above both.

For a logo or illustration that must remain fully visible, consider a normal content image instead of a cropped background. Keep branding and required text separate from decorative photography.

## Show or hide the banner text

On individual pages with an image, `omit_header_text = true` hides the banner title and description while retaining its padded area and navigation:

```toml
# content/about.md
+++
title = "About"
[params]
featured_image = "/images/about.jpg"
omit_header_text = true
+++
```

The individual-page article title remains below the banner. This parameter is false by default and is not read by the standard home/list header. Hiding home/list banner text requires a template customisation. Do not use an image of text as the only page title.

## Accessibility

Header backgrounds are decorative CSS images and have no image alternative text. If an image conveys information, include it in the article with a useful alternative description or caption. See [Images](/content/images/).

Keep page titles as real text. Test at narrow widths, with enlarged text, and with keyboard navigation. Do not use fixed-height clipping to hide a long title or remove focus outlines to improve the appearance of an overlay.

## Troubleshooting

* **The header ignores a site setting:** check the scope. Individual-page fitting and overlay classes come from page parameters; home/list settings come from site parameters.
* **A header image appears unexpectedly:** inspect `images`, inherited page parameters, and bundle images with `cover` or `feature` names.
* **Removing an image has no effect:** an empty `featured_image` still permits fallbacks. Remove or change the actual source.
* **The same image appears on content cards:** the theme also uses featured images for some summary layouts. Changing the featured-image source can affect those cards.
* **Headers still have different heights:** equal padding is not equal height. Check title wrapping, descriptions, navigation, the no-image layout, and custom overrides.
* **An image looks soft or downloads too much data:** use an appropriately sized, compressed source. Home, list, and individual-page headers in the development version create resized backgrounds from suitable page or asset resources; static URLs do not follow the resource-processing path. See [Responsive header images](/content/images/#responsive-header-images).
* **An overlay seems unchanged:** an empty class value restores the default. Use an explicit custom class and confirm that its stylesheet is registered.

For related settings, see [Colours](/customisation/colours/), [Custom CSS](/customisation/custom-css/), and [Hugo's cascade reference](https://gohugo.io/content-management/front-matter/#cascade).
