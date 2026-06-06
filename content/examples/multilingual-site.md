---
title: Multilingual Site
date: 2026-06-06T08:00:00.000+0700
---

A two-language site (English and German) with side-by-side content and
translated menus.

## File tree

```text
example-site/
├── config/
│   └── _default/
│       ├── hugo.toml
│       ├── module.toml
│       ├── languages.toml
│       ├── menus.toml
│       └── params.toml
└── content/
    ├── _index.md
    ├── _index.de.md
    ├── about.md
    └── about.de.md
```

## Configuration

```toml
# config/_default/hugo.toml

baseURL = "https://example.com/"
title = "Example site"
enableRobotsTXT = true
defaultContentLanguage = "en"
```

```toml
# config/_default/module.toml

[[imports]]
path = "github.com/gohugo-ananke/ananke/v2"
```

```toml
# config/_default/languages.toml

[en]
languageName = "English"
languageCode = "en-gb"
weight = 1
title = "Example site"

[de]
languageName = "Deutsch"
languageCode = "de-de"
weight = 2
title = "Beispielseite"
```

```toml
# config/_default/menus.toml

[[en.main]]
name = "About"
pageRef = "/about/"
weight = 10

[[de.main]]
name = "Über uns"
pageRef = "/about/"
weight = 10
```

```toml
# config/_default/params.toml

[ananke]
show_recent_posts = false
```

## Sample content

```markdown
+++
title = "Welcome"
+++

This is the English homepage.
```

```markdown
+++
title = "Willkommen"
+++

Das ist die deutsche Startseite.
```

The about page is translated the same way: `content/about.md` and
`content/about.de.md`.

## What it looks like

Hugo serves English at the site root and German under `/de/`. A language switcher
appears in the header, offering only the languages that have a translation of the
current page. The menu labels are localised per language.

## Common adjustments

* Override theme interface strings per language in `i18n/en.toml` / `i18n/de.toml`
  (see [Multilingual and i18n](/configuration/multilingual/#overriding-theme-interface-strings)).
* Set a per-language `read_more_copy` under each language's `params`.
* Add more languages by adding more tables to `languages.toml`.
