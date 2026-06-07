---
title: Shortcodes
date: 2026-06-06T08:00:00.000+0700
weight: 350
---

Shortcodes are small snippets you place in your Markdown content to render
something the theme provides. Ananke ships the following shortcodes. Each entry
lists what it does, its parameters, and an example.

## edit-page

* **Purpose:** render an "Improve this page on GitHub" link to edit the current
  page's source file. Readers without write access are automatically offered
  GitHub's fork-and-propose-changes flow.
* **Syntax:** `{{</* edit-page */>}}` or, targeting a specific branch,
  `{{</* edit-page branch="development" */>}}`.
* **Parameters:**
  * branch (optional) — passed as the first positional argument or as a named
    `branch` argument. Overrides the configured branch for this page only.
* **Output:** an anchor styled as a badge linking to the GitHub editor for the
  page's source file.
* **Example:**

  ```go-html-template
  {{</* edit-page */>}}
  ```

* **Common mistakes:** using it without setting
  `params.ananke.shortcodes.edit_page.repo_url` (a build-time warning is printed
  and nothing is rendered).

See the [Edit page](/shortcodes/edit-page/) page for configuration and for
showing the link automatically below every page.

## form-contact

* **Purpose:** render a styled, accessible contact form.
* **Syntax:** `{{</* form-contact action="URL" */>}}`
* **Parameters:**
  * `action` (required) — the URL that receives the form `POST`.
* **Output:** an HTML form with name, email, and message fields and a Send
  button.
* **Example:**

  ```go-html-template
  {{</* form-contact action="https://formspree.io/your@email.com" */>}}
  ```

* **Common mistakes:** omitting `action` (the form then has nowhere to submit);
  expecting Netlify Forms to work without overriding the shortcode.

See the [Contact Form](/shortcodes/contact-form/) page for full details,
backends, and spam-protection notes.

## page-index

* **Purpose:** render an index of child pages for a section. Used by the
  documentation's own section pages to list their contents.
* **Syntax:** `{{</* page-index */>}}`
* **Parameters:** none.
* **Output:** a list of the current section's pages.
* **Example:**

  ```go-html-template
  {{</* page-index */>}}
  ```

* **Common mistakes:** using it on a single page rather than a section
  (`_index.md`) page, where there are no children to list.

## since

* **Purpose:** render a small badge linking to the release where a feature was
  introduced (for example "since 2.17.0").
* **Syntax:** `{{</* since "2.17.0" */>}}` or, reading the version from front
  matter, `{{</* since */>}}`.
* **Parameters:**
  * version (optional) — passed as the first positional argument or as a named
    `version` argument. If omitted, the page's `since` front matter value is
    used.
* **Output:** an anchor styled as a badge linking to the matching release tag.
* **Example:**

  ```go-html-template
  {{</* since "2.17.0" */>}}
  ```

* **Common mistakes:** calling it with no argument on a page that has no `since`
  front matter (a build-time warning is printed and nothing is rendered).

See the [Since](/shortcodes/since/) page for configuring the release URL and
front-matter usage.

---

> [!NOTE]
> This list reflects the shortcodes in the theme's `layouts/_shortcodes`
> directory. If you add your own shortcodes in your project's
> `layouts/_shortcodes`, they are available too but are not documented here.
