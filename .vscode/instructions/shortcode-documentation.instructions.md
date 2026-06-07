---
description: Documentation rules for Ananke shortcode pages
applyTo: "**/content/shortcodes/**/*.md"
---

# Ananke shortcode documentation instructions

Use these instructions whenever creating, reviewing, or updating documentation pages for Ananke theme shortcodes.

## Primary goal

Every shortcode documentation page must use the same structure, headings, option table format, explanation style, and example catalogue pattern.

The page must help readers answer these questions quickly:

* What does this shortcode do?
* When should I use it?
* Which parameters are available?
* Which parameters are positional?
* Which parameters are named?
* What examples can I copy and adapt?
* What result does each example produce?

## Required page structure

Use this heading structure for every shortcode page:

```markdown
# `shortcode-name` shortcode

## Quick summary

## Syntax overview

### Positional options

### Named options

## Parameter overview

## Usage rules

## How it works

## Intended use

## Basic examples

## Example catalogue

## Output explanation

## Accessibility notes

## Configuration notes

## i18n strings

## Related shortcodes

## Troubleshooting
```

Do not rename these required top-level headings.

Keep every required top-level heading even when a section is not applicable. In that case, keep the heading and write a short note.

Only omit sub-headings that are explicitly marked optional elsewhere in this file (for example: unsupported syntax-style sub-headings in `## Syntax overview`, and non-applicable categories in `## Example catalogue`).

Use a short note such as:

```markdown
This shortcode does not use site-level configuration.
```

## Page title

The page title must use the shortcode name in inline code formatting.

Example:

```markdown
# `figure` shortcode
```

## Quick summary

The quick summary must be one short paragraph.

It must explain:

* what the shortcode renders
* where it is normally used
* what problem it solves
* what the expected result is

Template:

```markdown
The `shortcode-name` shortcode is used to [describe output or behaviour]. It is intended for [primary use case]. Use it when you need to [practical reason].
```

## Syntax overview

Show both syntax styles if the shortcode supports both.

If the shortcode supports only one syntax style, include only the relevant sub-heading (`### Positional options` or `### Named options`). Remove the unsupported sub-heading entirely and do not add a placeholder note.

If the shortcode supports inner content, add a third sub-heading:

### Inner content

```go-html-template
{{</* shortcode-name */>}}inner content{{</* /shortcode-name */>}}
```

Use escaped shortcode comments in examples so the documentation page does not execute the shortcode. This is a limitation in Hugo as Static Site Generator, not a Markdown formatting issue.

### Positional options

```go-html-template
{{</* shortcode-name "value1" "value2" */>}}
```

### Named options

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

Always include this rule below the syntax examples:

```markdown
Include the no-mixing rule (see Canonical no-mixing rule).
```

## Parameter overview

Every shortcode page must include a parameter overview table.

Use this exact table structure:

```markdown
| Title | Positional option | Named option | Required | Type | Default | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Example title | `1` | `example` | No | String | `""` | Short explanation of what this option controls. |
```

## Parameter table rules

The table columns must be used as follows:

* **Title**: Human-readable label, for example `Image source`, `Alternative text`, `Caption`, `CSS class`.
* **Positional option**: Use the documented position for positional calls. Prefer one-based numbering unless the existing shortcode documentation already uses another convention. When no existing documentation exists for the shortcode, always use one-based numbering (`1`, `2`, `3`). If unsupported, use `-`.
* **Named option**: Use the exact named parameter, for example `src`, `alt`, `caption`, `class`. If unsupported, use `-`.
* **Required**: Use `Yes` or `No`.
* **Type**: Use clear terms such as `String`, `Boolean`, `Integer`, `URL`, `Path`, `Markdown`, `HTML`, or `CSS class list`.
* **Default**: Use the real default value. If there is no default, use `-`.
* **Description**: Explain the visible or practical effect of the option.

## Positional and named option rule

### Canonical no-mixing rule

Include the no-mixing rule (see Canonical no-mixing rule).

A shortcode call may use positional options or named options.

A shortcode call must not mix positional and named options.

Correct positional example:

```go-html-template
{{</* shortcode-name "value1" "value2" */>}}
```

Correct named example:

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

Incorrect mixed example:

```go-html-template
{{</* shortcode-name "value1" option2="value2" */>}}
```

When a shortcode has more than two options, prefer named options in examples unless the positional style is important for backwards compatibility or existing usage.

## Usage rules section

Every shortcode page must include a short usage rules section.

Use this baseline text and adapt where needed:

```markdown
* Include the no-mixing rule (see Canonical no-mixing rule).
* Prefer named options when the shortcode has more than two parameters.
* Prefer named options when values are optional, repeated, or easy to confuse.
* Use positional options only when the order is obvious and documented.
* Keep values quoted unless the shortcode documentation explicitly shows otherwise.
```

## How it works section

Explain behaviour in plain language.

Include:

* what the shortcode renders
* how input values are interpreted
* what happens when optional values are missing
* whether inner Markdown content is supported
* whether the shortcode generates HTML
* whether the shortcode depends on theme settings, page parameters, assets, or external services

Use this template:

```markdown
The `shortcode-name` shortcode reads the provided options and renders [describe generated output]. Required options must be provided. Optional options change [layout, content, behaviour, styling, links, media handling].

When an option is omitted, the shortcode uses [default behaviour]. If the shortcode depends on page front matter, site configuration, assets, or remote services, explain that dependency here.
```

## Intended use section

Describe when the shortcode should and should not be used.

Use this structure:

```markdown
Use this shortcode when:

* [recommended use case]
* [recommended use case]
* [recommended use case]

Avoid this shortcode when:

* plain Markdown already provides enough structure
* the content should be handled by a layout, partial, or data file instead
* the same content is repeated across many pages and should be centralised
```

## Basic examples section

Start with the smallest useful examples.

Include:

* one positional example if positional options are supported
* one named example if named options are supported
* the expected result after each example

Example format:

````markdown
### Basic positional example

```go-html-template
{{</* shortcode-name "value1" "value2" */>}}
````

This renders [expected result].

### Basic named example

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

This renders [expected result].

`````

## Example catalogue section

The example catalogue must be organised by result, not by parameter.

Write examples as user goals, for example:

* `### Show a basic image`
* `### Add a caption`
* `### Link the image`
* `### Add a custom CSS class`
* `### Use a remote image`
* `### Use an image from page resources`

Each example must include:

* a clear heading
* a copy-paste shortcode example
* a short result explanation

Example format:

````markdown
### Add a custom title

```go-html-template
{{</* shortcode-name title="Example title" */>}}
`````

Result:

This renders [describe the visible output].

`````

## Recommended example categories

Use all relevant categories from this list:

```markdown
### Minimal usage

### Recommended usage

### Positional usage

### Named usage

### With optional text

### With links

### With media

### With layout options

### With accessibility options

### With Markdown content

### With nested content

### With site configuration

### With page front matter

### With fallback behaviour

### Common mistakes
```

Do not include irrelevant categories just to fill the page. These are optional sub-headings inside `## Example catalogue`, not required top-level headings. If a category is not applicable, omit it. If you keep it for clarity, state that the shortcode does not support that behaviour.

## Output explanation section

Explain the rendered result before describing implementation details.

Use this template:

```markdown
This shortcode renders [visible output]. Depending on the provided options, it may also render [caption, link, wrapper, class, script, embed, metadata].

The generated output is intended to [purpose]. It should be styled by the theme and should not require custom HTML in the Markdown content.
```

Only document generated HTML in detail when the HTML structure is important for users, styling, accessibility, or troubleshooting.

## Accessibility notes section

Include accessibility notes whenever the shortcode outputs media, links, buttons, embeds, icons, or interactive content.

Use this baseline:

```markdown
* Provide meaningful alternative text when the shortcode renders an image.
* Use descriptive link text when the shortcode renders a link.
* Avoid using the shortcode only for visual decoration unless it is hidden from assistive technology.
* Check keyboard behaviour if the shortcode renders interactive content.
```

Adapt this section to the shortcode. Do not add irrelevant accessibility advice.

## Configuration notes section

Use this section when the shortcode is affected by site configuration, page front matter, assets, remote services, or theme parameters.

Use this table:

```markdown
| Configuration location | Key | Description |
| --- | --- | --- |
| `hugo.toml` | `params.example` | Controls [behaviour]. |
| Page front matter | `example` | Overrides [behaviour] for a single page. |
```

If the shortcode has no configuration dependencies, write:

```markdown
This shortcode does not use site-level or page-level configuration.
```

## i18n strings section

Use this section to document all translation strings used by the shortcode.

The relevant translation keys are typically found in the Ananke theme repository in `i18n/en.toml`. Check the shortcode template, related partials, and any nested templates it calls for `i18n` or `T` usage. If `i18n/en.toml` is not accessible, document keys/values from the shortcode source and add this note in the table notes column: `Key and default value taken from shortcode source; not verified against i18n/en.toml.`

Every shortcode page must list shortcode-specific i18n strings when they exist.

Use this table:

```markdown
| Key | Default English value | Used for | Notes |
| --- | --- | --- | --- |
| `example_key` | `Example text` | Visible label, button text, fallback text, or accessibility text. | Explain where this string appears. |
```

If the shortcode does not use i18n strings, write:

```markdown
This shortcode does not use shortcode-specific i18n strings.
```

When documenting i18n strings:

* Use the exact key from `i18n/en.toml`.
* Use the default English value from `i18n/en.toml`.
* Explain where the string appears in the rendered output.
* Mention whether the string is visible text, fallback text, button text, metadata, or accessibility text.
* Check related partials if the shortcode delegates rendering to another template.
* Do not invent translation keys. If a string is hard-coded in the shortcode and not present in `i18n/en.toml`, mention that as a documentation note or improvement task.

## Related shortcodes section

List related shortcodes and explain when to use them instead.

Use this table:

```markdown
| Shortcode | Use when |
| --- | --- |
| `other-shortcode` | You need [alternative use case]. |
```

If there are no related shortcodes, write:

```markdown
There are no closely related shortcodes.
```

## Troubleshooting section

Every shortcode page must include common failures.

Use this baseline table:

```markdown
| Problem | Likely cause | Fix |
| --- | --- | --- |
| The shortcode does not render. | The shortcode name is misspelled or the file does not exist in the theme. | Check the shortcode name and theme version. |
| The output is missing a value. | A required option was omitted. | Add the required positional or named option. |
| The wrong value is displayed. | Positional options were passed in the wrong order. | Use named options for clarity. |
| The shortcode fails with a build error. | Positional and named options were mixed in one call. | Use only one option style per shortcode call. |
```

Add shortcode-specific problems where useful.

## Copy-paste page skeleton

Use this skeleton for new shortcode documentation pages.

When using this skeleton, apply conditional replacements outside the pasted page content. For example, if no shortcode-specific i18n strings exist, replace the `## i18n strings` table with the single sentence defined in the i18n section instructions.

````markdown
# `shortcode-name` shortcode

## Quick summary

The `shortcode-name` shortcode is used to [describe output or behaviour]. It is intended for [primary use case]. Use it when you need to [practical reason].

## Syntax overview

### Positional options

```go-html-template
{{</* shortcode-name "value1" "value2" */>}}
```

### Named options

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

Include the no-mixing rule (see Canonical no-mixing rule).

## Parameter overview

| Title | Positional option | Named option | Required | Type | Default | Description |
| --- | --- | --- | --- | --- | --- | --- |
| Example title | `1` | `example` | No | String | `""` | Short explanation of what this option controls. |

## Usage rules

* Include the no-mixing rule (see Canonical no-mixing rule).
* Prefer named options when the shortcode has more than two parameters.
* Prefer named options when values are optional, repeated, or easy to confuse.
* Use positional options only when the order is obvious and documented.
* Keep values quoted unless the shortcode documentation explicitly shows otherwise.

## How it works

The `shortcode-name` shortcode reads the provided options and renders [describe generated output]. Required options must be provided. Optional options change [layout, content, behaviour, styling, links, media handling].

When an option is omitted, the shortcode uses [default behaviour].

## Intended use

Use this shortcode when:

* [recommended use case]
* [recommended use case]
* [recommended use case]

Avoid this shortcode when:

* plain Markdown already provides enough structure
* the content should be handled by a layout, partial, or data file instead
* the same content is repeated across many pages and should be centralised

## Basic examples

### Basic positional example

```go-html-template
{{</* shortcode-name "value1" "value2" */>}}
```

This renders [expected result].

### Basic named example

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

This renders [expected result].

## Example catalogue

### Minimal usage

```go-html-template
{{</* shortcode-name option="value" */>}}
```

Result:

[Describe the visible output.]

### Recommended usage

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

Result:

[Describe the visible output.]

### Common mistake: mixing positional and named options

Do not use this:

```go-html-template
{{</* shortcode-name "value1" option2="value2" */>}}
```

Use positional options:

```go-html-template
{{</* shortcode-name "value1" "value2" */>}}
```

Or use named options:

```go-html-template
{{</* shortcode-name option1="value1" option2="value2" */>}}
```

## Output explanation

This shortcode renders [visible output]. Depending on the provided options, it may also render [caption, link, wrapper, class, script, embed, metadata].

The generated output is intended to [purpose]. It should be styled by the theme and should not require custom HTML in the Markdown content.

## Accessibility notes

* Provide meaningful alternative text when the shortcode renders an image.
* Use descriptive link text when the shortcode renders a link.
* Avoid using the shortcode only for visual decoration unless it is hidden from assistive technology.
* Check keyboard behaviour if the shortcode renders interactive content.

## Configuration notes

| Configuration location | Key | Description |
| --- | --- | --- |
| `hugo.toml` | `params.example` | Controls [behaviour]. |
| Page front matter | `example` | Overrides [behaviour] for a single page. |

## i18n strings

| Key | Default English value | Used for | Notes |
| --- | --- | --- | --- |
| `example_key` | `Example text` | [visible label, fallback text, button text, accessibility text] | Explain where this string appears. |

## Related shortcodes

| Shortcode | Use when |
| --- | --- |
| `other-shortcode` | You need [alternative use case]. |

## Troubleshooting

| Problem | Likely cause | Fix |
| --- | --- | --- |
| The shortcode does not render. | The shortcode name is misspelled or the file does not exist in the theme. | Check the shortcode name and theme version. |
| The output is missing a value. | A required option was omitted. | Add the required positional or named option. |
| The wrong value is displayed. | Positional options were passed in the wrong order. | Use named options for clarity. |
| The shortcode fails with a build error. | Positional and named options were mixed in one call. | Use only one option style per shortcode call. |
`````

## Review checklist

Before considering a shortcode documentation page complete, verify:

* The page uses the standard heading structure.
* The shortcode name is formatted as inline code.
* The quick summary explains the practical purpose.
* Syntax examples are escaped and do not execute on the documentation page.
* Positional and named options are documented separately.
* The parameter table includes title, positional option, named option, required status, type, default, and description.
* The page clearly states that positional and named options must not be mixed.
* Examples are organised by desired result.
* Every example explains the expected result.
* Accessibility notes are relevant to the shortcode.
* Configuration dependencies are documented or explicitly marked as not applicable.
* Troubleshooting includes shortcode-specific issues where useful.
* The page lists all shortcode-specific i18n strings used by the shortcode.
* The i18n strings were checked against `i18n/en.toml` in the Ananke theme repository.
* Related partials or nested templates were checked for additional `i18n` or `T` usage.
* If no i18n strings are used, the page explicitly states that no shortcode-specific i18n strings are used.
* Hard-coded user-facing strings are noted as possible i18n improvement tasks.
