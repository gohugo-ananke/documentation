---
title: Multilingual and i18n
description: "Publish a site in more than one language and translate the theme's interface strings."
date: 2026-06-06T08:00:00.000+0700
weight: 900
---

Ananke is fully multilingual. It ships interface translations for many languages
and works with Hugo's standard multilingual features.

## Configure languages

Declare your languages in the configuration. Each language has a label, a locale, a weight that controls the order, and its own title:

```toml
# config/_default/languages.toml

[en]
label = "English"
locale = "en-gb"
weight = 1
title = "Example site"

[de]
label = "Deutsch"
locale = "de-de"
weight = 2
title = "Beispielseite"
```

The language with the lowest `weight` is the default. Per-language `params` can
override site parameters — for example a translated `read_more_copy` (see
[The read more link](/content/summaries-and-reading-time/#the-read-more-link)).

## Translated content files

Create a translation by adding the language code to the filename, next to the
original:

```text
content/about.md
content/about.de.md
```

Hugo pairs these as translations of the same page and links them in the language
switcher. The same pattern works for section index files
(`_index.md` / `_index.de.md`).

## Translation fallback

If a page is not translated into the current language, Hugo does not invent one
— that page simply does not exist in that language, and the language switcher
only offers languages where a translation is present.

Interface strings (button labels, "read more", and so on) do fall back: if a string is missing in the active language, Hugo uses the string of the default content language.

## Translating menus

Define a menu per language so navigation labels are localised. Put each language's menu in its own file, named with the language key:

```toml
# config/_default/menus.en.toml

[[main]]
name = "About"
pageRef = "/about/"
weight = 10
```

```toml
# config/_default/menus.de.toml

[[main]]
name = "Über uns"
pageRef = "/about/"
weight = 10
```

`pageRef` points to the translation of the page in each language. Do not put language keys such as `[[en.main]]` in `menus.toml`: Hugo then stops with `failed to decode "menus"`.

See [Menus](/configuration/menus/) for the available entry fields.

## Overriding theme interface strings

Ananke's interface text comes from translation files in the theme's `i18n/`
directory, in this format:

```toml
# i18n/en.toml (in the theme)

[readMore]
other = "read more"
```

To change a string, create an `i18n/<language>.toml` file in **your own project**
with the same key. Your value overrides the theme's:

```toml
# i18n/en.toml (in your site)

[readMore]
other = "Continue reading"
```

> [!NOTE]
> Only override the keys you want to change — you do not need to copy the whole
> file. Do not edit the theme's `i18n/` files directly; your project's `i18n/`
> takes precedence and survives theme updates.
