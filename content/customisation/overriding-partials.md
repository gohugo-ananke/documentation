---
title: Overriding Partials
date: 2026-06-06T08:00:00.000+0700
---

* [How Hugo lookup order works](#how-hugo-lookup-order-works)
* [The safe override pattern](#the-safe-override-pattern)
* [A full example](#a-full-example)
* [Keep overrides small](#keep-overrides-small)
* [Update risks](#update-risks)

Ananke is built from many small template files called partials. You can change
any of them without editing the theme, by placing a file with the same path in
your own project.

## How Hugo lookup order works

When Hugo needs a partial, it looks in your project first and the theme second.
If a file exists at the same path in both places, **your** copy wins. This is
what makes safe customisation possible: you never touch the theme, you just
shadow the file you want to change.

## The safe override pattern

The theme ships its footer partial here:

```text
themes/ananke/layouts/_partials/site-footer.html
```

To change it, create a file at the matching path in your own project:

```text
layouts/_partials/site-footer.html
```

Hugo uses your version instead of the theme's.

> [!IMPORTANT]
> This works for Hugo Module installs too — you don't have a `themes/ananke`
> folder, but the same project path (`layouts/_partials/site-footer.html`)
> overrides the module's partial.

## A full example

1. Find the partial you want to change in the theme, for example
   `layouts/_partials/site-footer.html`.
2. Copy it to the same path in your project:

   ```text
   layouts/_partials/site-footer.html
   ```

3. Edit your copy. For instance, add a copyright line.
4. Run `hugo server` and confirm your version renders.

You only need to copy the **one** partial you are changing. Everything else
keeps coming from the theme.

## Keep overrides small

* Copy only the partial you need, not the whole `layouts/` tree.
* Change as little as possible inside it.
* If you only need to add markup at a specific point, check whether a
  [layout hook](/hooks-and-filters/) already exists for that spot — hooks are
  safer than full overrides because they survive theme changes untouched.

## Update risks

When the theme updates, its version of a partial may change. Your override does
**not** update automatically — it keeps shadowing the theme with your old copy,
which can miss bug fixes or break against new markup.

After updating the theme:

* review your overridden partials against the theme's new versions;
* re-apply any upstream improvements you want;
* delete overrides you no longer need so you get the theme's version back.

For the authoritative reference, see Hugo's
[template lookup order](https://gohugo.io/templates/lookup-order/).
