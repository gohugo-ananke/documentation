---
title: Contact Form
date: 2026-06-06T08:00:00.000+0700
---

* [What it outputs](#what-it-outputs)
* [Required configuration](#required-configuration)
* [Form fields](#form-fields)
* [A complete contact page](#a-complete-contact-page)
* [Using a form backend](#using-a-form-backend)
* [Spam protection](#spam-protection)
* [Customising labels](#customising-labels)
* [Limitations](#limitations)

Ananke includes a `form-contact` shortcode that renders a ready-styled contact
form you can drop into any page.

## What it outputs

The shortcode outputs an accessible HTML `<form>` with name, email, and message
fields and a submit button, styled to match the theme. It submits with `POST`
to the address you give in the `action` parameter.

## Required configuration

The `action` parameter is required — it is the URL that receives the submitted
form. Without a form backend the form has nowhere to send data.

```go-html-template
{{</* form-contact action="https://formspree.io/your@email.com" */>}}
```

Use any service that accepts an HTML form `POST`. [Formspree](https://formspree.io/)
is a common choice and offers a free tier; sign up, create a form, and use the
action URL it gives you.

## Form fields

The generated form contains:

* **Your Name** — a required text input (`name`).
* **Email Address** — a required email input (`email`).
* **Message** — a multi-line text area (`message`).
* a **Send** submit button.

All labels are translatable interface strings, so they appear in the visitor's
language (see [Multilingual and i18n](/configuration/multilingual/#overriding-theme-interface-strings)).

## A complete contact page

```markdown
+++
title = "Contact"
+++

Please use the form below to contact us.

{{</* form-contact action="https://formspree.io/your@email.com" */>}}
```

## Using a form backend

The form is a plain HTML form, so it works with any endpoint that accepts a
`POST`:

* **Formspree** — paste the action URL as shown above.
* **Netlify Forms** — Netlify needs a `data-netlify="true"` attribute and a
  hidden form-name field on the `<form>`. The built-in shortcode does not add
  these, so for Netlify Forms copy the shortcode into your project at
  `layouts/_shortcodes/form-contact.html` and add the required attributes. See
  [Overriding partials](/customisation/overriding-partials/) for the override
  pattern.

## Spam protection

The shortcode does not include built-in spam protection (no CAPTCHA or
honeypot). Rely on your form backend's spam filtering (Formspree and Netlify
both provide it), or add a honeypot field in an overridden copy of the
shortcode.

## Customising labels

The field labels (Your Name, Email Address, Message, Send) come from the theme's
i18n strings. Override them in your project's `i18n/<language>.toml` rather than
editing the shortcode — see
[Overriding theme interface strings](/configuration/multilingual/#overriding-theme-interface-strings).

## Limitations

* The fields are fixed (name, email, message). To add or remove fields, override
  the shortcode in your own `layouts/_shortcodes/form-contact.html`.
* The shortcode renders the form only; it does not send email itself. You must
  provide a backend via `action`.
