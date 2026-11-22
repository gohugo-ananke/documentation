---
title: Configuration reference
description: "Every site parameter that Ananke reads, with its type, default value, and the places where you can set it."
date: 2026-06-06T08:00:00.000+0700
weight: 1000
---

This page lists the parameters that Ananke v2.23.0 reads from your site configuration and from page front matter. Each table gives the type, the default value, the places where you can set the option, and the page that explains its use. To learn where configuration files go and how Hugo combines them with the theme defaults, read [How Ananke configuration works](/explanation/configuration/).

<!-- markdownlint-disable-next-line MD033 -->
<span id="where-configuration-lives"></span><span id="how-hugo-merges-configuration"></span><span id="how-theme-defaults-work"></span><span id="what-belongs-in-your-site-not-the-theme"></span><span id="installing-the-theme-hugo-module"></span><span id="installing-the-theme-git-submodule"></span><span id="how-to-override-defaults-safely"></span><span id="where-each-example-goes"></span>

Use the **Set in** column to find where a value has an effect:

* **Site**: the `params` table of your site configuration. A front matter value has no effect.
* **Site, page**: the site value is the default; a page value in front matter, also through `cascade`, replaces it for that page. Use the same key path in front matter without the `params` prefix.
* **Page**: front matter only. The [front matter reference](/content/frontmatter/) lists more page-only keys.

A default of "none" means that the theme ships no value and the feature stays off or uses the behaviour that the table describes.

## General options

These options are under `[params.ananke]`.

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `copy_code` | Boolean | `true` | Site | Shows a copy button on code blocks. Set `false` to remove it. |
| `custom_css` | List of strings | None | Site | Stylesheets in `assets/`, or partials that return CSS, added after the theme styles. See [Custom CSS](/customisation/custom-css/). |
| `responsive_image_widths` | List of integers | `[480, 960, 1440, 1920]` | Site, page | Widths in pixels for featured image variants. See [Images](/content/images/). |
| `section_link` | String | None: the section page | Site, page | Destination of the section label above an article title: `first`, or the path of a page in the section. See [hook catalogue](/customisation/hooks-and-filters/all/). |
| `show_categories` | Boolean | `true` | Site | Shows category terms on single pages. See [General configuration](/configuration/general/#show-taxonomies-on-pages). |
| `show_recent_posts` | Boolean | `true` | Site | Shows recent posts below the homepage introduction. See [Homepage](/configuration/homepage/). |

## Homepage

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `params.ananke.home.content_alignment` | String | `"center"` | Site | Alignment of the homepage introduction on large screens: `left`, `center`, or `right`. See [Homepage](/configuration/homepage/). |
| `params.recent_posts_number` | Integer | `3` | Site, homepage | Number of recent post cards. The homepage also links up to four more posts. See [Homepage](/configuration/homepage/#how-many-posts-appear). |
| `params.mainSections` | List of strings | Hugo's main sections | Site | Sections that supply recent posts. Hugo uses the section with the most pages when you do not set a value. See [Homepage](/configuration/homepage/). |

## Dates, section titles, and list cards

Site values for these options are under `[params.ananke.pages]`. Page values for the `show_*` options are directly under `ananke` in front matter, for example `ananke.show_single_date`. The [precedence rules](/configuration/general/#show-or-hide-dates-on-pages) explain how Ananke selects a value.

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `show_date` | Boolean | None: show | Site, page | Shared fallback for `show_single_date` and `show_summary_date`. |
| `show_single_date` | Boolean | None: show | Site, page | Date on a single page. |
| `show_summary_date` | Boolean | None: show | Site, page | Date on summary cards, including recent posts on the homepage. |
| `show_section_title` | Boolean | None: show | Site, page | Section title above the post title on compact list cards. |
| `show_list_images` | Boolean | None: no images | Site, list page | Uses image cards on list pages. The front matter key is `ananke.pages.show_list_images` in the list page's `_index.md`. See [General configuration](/configuration/general/#show-images-on-list-page-cards). |

Other date settings:

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `params.date_format` | String | `"January 2, 2006"` | Site | Go layout or Hugo date layout for displayed dates. See [General configuration](/configuration/general/#localize-date-format). |

## Header and navigation

These options are under `[params.ananke.header]` and `[params.ananke.navigation]`. See [Header layout and hooks](/customisation/header/) and [Menus](/configuration/menus/).

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `header.navigation` | List of groups | `[["logo"], ["languages", "menu", "social"]]` | Site, page | Groups of components in the navigation bar. A group is a list of component names or one name. Give the complete layout: your list replaces the default. |
| `header.content` | List of strings | `["title", "description"]` | Site, page | Components below the navigation bar, from top to bottom. |
| `navigation.submenu_mode` | String | `"split"` | Site, page | Desktop submenu behaviour: `split`, `hover`, `click`, or `toplevel`. |
| `navigation.classes.<element>` | String | Empty: theme classes | Site, page | Replaces the Tachyons classes of one navigation element. |

The `<element>` keys and the theme classes that an empty value uses:

| Element | Theme classes |
| --- | --- |
| `nav` | `pv3 ph3 ph4-ns` |
| `inner` | `flex flex-wrap items-center justify-between center` |
| `brand` | `f3 fw2 hover-white white-90 dib no-underline` |
| `toggle` | `f5 white-90 hover-white` |
| `group` | `flex-l items-center` |
| `panel` | `flex-l items-center` |
| `menu` | `pl0 mr3`, or `pr0 ml3` for right-to-left languages |
| `item` | `list f5 f4-ns fw4 dib pr3`, or `pl3` instead of `pr3` for right-to-left languages |
| `link` | `hover-white white-90 no-underline` |
| `submenu_toggle` | `hover-white white-90` |
| `submenu` | `list ma0 pv2 ph0 br2 ba b--white-20` and the `background_color_class` value |
| `submenu_link` | `db pv2 ph3 f5 white-90 hover-white hover-bg-white-10 no-underline` |

## Colours, typefaces, and header images

These options are directly under `[params]`, not under `[params.ananke]`. Each value is a list of Tachyons classes, separated by spaces. See [Colours and typefaces](/customisation/colours/) and [Page headers](/customisation/hero-section/).

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `background_color_class` | String | `"bg-black"` | Site | Background of the header without an image, the footer, and submenus. |
| `body_classes` | String | `"avenir bg-near-white"` | Site, page | Classes on the `body` element. |
| `text_color` | String | `"mid-gray"` | Site, page | Text colour of the main content and of cards. |
| `post_content_classes` | String | `"serif"` | Site, page | Classes on the content of a single page. |
| `header_section_class` | String | Depends on the header | Site, page | Classes on the title area of the header. The theme uses `tc-l pv4 pv6-l ph3 ph4-ns` on list pages and the homepage with an image, `tc-l pv3 ph3 ph4-ns` on those pages without an image, and `tc-l pv6 ph3 ph4-ns` on single pages with an image. |
| `featured_image_class` | String | `"cover bg-top"` | Site | Classes on the header with an image on list pages and the homepage. |
| `featured_image_class` | String | `"cover bg-center"` | Page | Classes on the header with an image on a single page. The site value does not apply to single pages. |
| `cover_dimming_class` | String | `"bg-black-60"` | Site | Overlay on the header image on list pages and the homepage. |
| `cover_dimming_class` | String | `"bg-black-60"` | Page | Overlay on the header image on a single page. The site value does not apply to single pages. |

## Site identity

These options are directly under `[params]`.

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `site_logo` | String | None: the site title | Site | Path of a logo image that replaces the site title in the header. See [General configuration](/configuration/general/#logo). |
| `favicon` | String | None | Site | Path of the favicon file, relative to the site root. |
| `description` | String | None | Site | Meta description of the homepage, list pages, and taxonomy pages without their own description. Single pages use their summary instead. See [SEO](/configuration/seo/). |
| `author` | String | None | Site, page | Author name for metadata and article bylines. See [Authors and read more links](/content/general/). |

## Summaries and reading time

These options are directly under `[params]`. See [Summaries and reading time](/content/summaries-and-reading-time/).

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `read_more_copy` | String | Translated "Read more" text | Site, page | Text of the link on summary cards. |
| `show_reading_time` | Boolean | None: hidden | Site, section, page | Shows reading time and word count on single pages when the value is `true`. A top-level section's `_index.md` can also enable it for its pages. |
| `reading_speed` | Integer | None: Hugo's estimate | Site | Words per minute for the reading time. |

## Social links

These options are under `[params.ananke.social]`. See [Social media networks](/configuration/social-media-networks/) for complete examples.

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `follow.networks` | List of strings | None: no follow links | Site | Network slugs for follow links in the header and footer. |
| `share.networks` | List of strings | None: no share links | Site | Network slugs for share links on single pages. |
| `share.icons` | Boolean | `true` | Site | Shows an icon in each share link. When `false`, the link shows its text instead. |
| `share.sharetext` | Boolean | `true` | Site | Gives each share link the text "Share on" and the network label. Links with icons use it as their title and accessible name. If you set both `icons` and `sharetext` to `false`, the links are empty. |
| `<network>.username` | String | None | Site | Your user name. Ananke inserts it into the network's profile address. |
| `<network>.profilelink` | String | None | Site | A complete profile address. Replaces the address made from `username`. |
| `<network>.label` | String | The network label | Site | Network name in the title and accessible name of your follow link. |
| `<network>.rel` | String | None | Site | Value added to the link's `rel` attribute, for example `me`. |
| `networks.<network>` | Table | 24 networks | Site | Definition of a network: `slug`, `label`, `color`, `profile`, `icon`, and, for sharing, `link` and `particles`. Add a table to define a new network or change one key of an existing definition. |

Share links on a page are hidden when its front matter contains `disable_share`. In v2.23.0, this includes `disable_share: false`.

Some shipped values have no effect in v2.23.0:

* `share.disable_share` in the site configuration does not hide share links.
* `follow.new_window_icon` and `icon_path` are in the theme defaults, but no template reads them.

## Shortcodes

These options are under `[params.ananke.shortcodes]`.

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `edit_page.repo_url` | String | None: no link, with a build warning | Site | Address of the GitHub repository. See [Edit page](/content/shortcodes/edit-page/). |
| `edit_page.branch` | String | `"main"` | Site | Branch for the edit link. |
| `edit_page.content_dir` | String | `"content"` | Site | Content directory in the repository. |
| `edit_page.target` | String or `false` | `"_blank"` | Site | Link target. `false` opens the link in the same window. |
| `since.repo_url` | String | None: a badge without a link | Site | Format string for the release link. `%s` receives the version. See [Since](/content/shortcodes/since/). |
| `since.target` | String or `false` | `"_blank"` | Site | Link target. `false` opens the link in the same window. |

## Hooks

These options are under `[params.ananke.hooks]`. See [Hooks and filters](/customisation/hooks-and-filters/introduction/).

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `verbosity` | String | `"error"` | Site | Hook messages in the build log: `debug`, `info`, `warning`, or `error`. |
| `disable_messages` | List of strings | None | Site | Message groups to suppress. `unused_hooks` hides the notice about hooks without a partial. |

## Comments

These options are directly under `[params]`. See [Comments](/customisation/comments/).

| Option | Type | Default | Set in | Description |
| --- | --- | --- | --- | --- |
| `commentoEnable` | Boolean | None: off | Site | Adds Commento comments to single pages. |
| `commentoPath` | String | `"https://cdn.commento.io/js/commento.js"` | Site | Address of the Commento script. |

## Hugo settings that Ananke uses

Ananke also reads some of Hugo's own settings. Hugo's documentation describes them.

| Setting | Effect in Ananke | Documentation |
| --- | --- | --- |
| `services.disqus.shortname` | Adds Disqus comments to single pages. | [Comments](/customisation/comments/) |
| `services.googleAnalytics.id` | Adds Google Analytics in production builds only. | [Analytics](/configuration/analytics/) |
| `menus.main` | Supplies the header menu. | [Menus](/configuration/menus/) |
| `languages` | Supplies the language switcher and the text direction. | [Multilingual and i18n](/configuration/multilingual/) |

## Deprecated options

| Option | Replacement | Behaviour in v2.23.0 |
| --- | --- | --- |
| `params.custom_css` | `params.ananke.custom_css` | Still used when `params.ananke.custom_css` is not set, with a warning in the build log. |
