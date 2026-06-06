---
title: Homepage
date: 2026-06-06T08:00:00.000+0700
---

* [The homepage content file](#the-homepage-content-file)
* [Recent posts](#recent-posts)
* [How many posts appear](#how-many-posts-appear)
* [Which section recent posts come from](#which-section-recent-posts-come-from)
* [A homepage without blog posts](#a-homepage-without-blog-posts)
* [Content alignment](#content-alignment)
* [The homepage hero image](#the-homepage-hero-image)

The homepage is built from two parts: the body copy you write in your homepage
content file, and an optional list of recent posts that Ananke adds below it.

## The homepage content file

The text at the top of the homepage comes from `content/_index.md`. Whatever you
write in the body of that file is rendered as the homepage introduction:

```markdown
+++
title = "Welcome"
featured_image = "/images/home.jpg"
+++

This is the homepage introduction. Write anything you like here — it is
rendered as the top of the homepage.
```

If `content/_index.md` does not exist, the homepage shows only the recent posts
(if enabled) and no introduction text.

## Recent posts

By default Ananke lists recent posts below the homepage introduction. Toggle
this with `show_recent_posts` under the `ananke` namespace:

```toml
# config/_default/params.toml

[ananke]
show_recent_posts = true
```

Set it to `false` to hide the list entirely (see
[A homepage without blog posts](#a-homepage-without-blog-posts)).

## How many posts appear

The number of recent posts shown is controlled by `recent_posts_number`, which
defaults to `3`:

```toml
# config/_default/params.toml

[params]
recent_posts_number = 3
```

After the first `recent_posts_number` posts (shown as summary cards), the
homepage adds a "More" list with links to the next few posts, so visitors can
reach older content without a full archive page.

> [!NOTE]
> `show_recent_posts` lives under the `[ananke]` table, while
> `recent_posts_number` is a top-level `[params]` value. This is intentional —
> copy each example to the table shown in its comment.

## Which section recent posts come from

Recent posts are drawn from your site's main sections. By default that is the
`post` section (so content under `content/post/`). To use a different section —
for example `posts` or `blog` — set `mainSections`:

```toml
# config/_default/params.toml

[params]
mainSections = ["posts"]
```

Posts are ordered by Hugo's default page ordering (date, then weight, then
title), so the newest posts appear first.

## A homepage without blog posts

For a static site or a simple landing page with no post list, disable recent
posts and write your content in `content/_index.md`:

```toml
# config/_default/params.toml

[ananke]
show_recent_posts = false
```

```markdown
+++
title = "My Studio"
featured_image = "/images/studio.jpg"
+++

We design and build things. Get in touch to start a project.
```

The homepage then shows just your introduction and hero image.

## Content alignment

The homepage introduction can be aligned left, centre, or right with
`ananke.home.content_alignment` (the default is `center`):

```toml
# config/_default/params.toml

[ananke.home]
content_alignment = "left"
```

## The homepage hero image

The large image at the top of the homepage is the homepage's `featured_image`,
set in the front matter of `content/_index.md` as shown above. The lookup rules,
static vs page-bundle paths, and the colour fallback when no image is set are
all described in [Header and Hero](/configuration/header-and-hero/).
