---
title: Multilingual and i18n
date: 2026-06-06T08:00:00.000+0700
---

* [Configure languages](#configure-languages)
* [Translated content files](#translated-content-files)
* [Translation fallback](#translation-fallback)
* [Translating menus](#translating-menus)
* [Overriding theme interface strings](#overriding-theme-interface-strings)

Ananke is fully multilingual. It ships interface translations for many languages
and works with Hugo's standard multilingual features.

## Configure languages

Declare your languages in the configuration. Each language has a name, a code, a
weight (controls order), and its own title:

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

The language with the lowest `weight` is the default. Per-language `params` can
override site parameters — for example a translated `read_more_copy` (see
[General content features](/content/general/#read-more-link)).

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

Interface strings (button labels, "read more", and so on) do fall back: if a
string is missing in the active language, Ananke uses the default language's
value, and ultimately English.

## Translating menus

Define a menu per language so navigation labels are localised. Put each
language's menu under that language:

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
