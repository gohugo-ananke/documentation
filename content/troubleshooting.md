---
title: Troubleshooting
date: 2026-01-16T08:00:00.000+0700
---

* [Diagnostic commands](#diagnostic-commands)
* [Common problems](#common-problems)
  * [The theme is not loading](#the-theme-is-not-loading)
  * [The homepage is blank](#the-homepage-is-blank)
  * [CSS / styling is missing](#css--styling-is-missing)
  * [The menu is not showing](#the-menu-is-not-showing)
  * [Images are not showing](#images-are-not-showing)
  * [Social links are not showing](#social-links-are-not-showing)
  * [Hugo Module path issues](#hugo-module-path-issues)
  * [The old theNewDynamic path is still used](#the-old-thenewdynamic-path-is-still-used)
  * [The Netlify build fails](#the-netlify-build-fails)
  * [Local Hugo version mismatch](#local-hugo-version-mismatch)
* [Sorry, but "$FEATURE does not work" doesn't work for us](#sorry-but-feature-does-not-work-doesnt-work-for-us)

## Diagnostic commands

Before digging into a specific problem, these commands tell you most of what you
need to know:

```bash
hugo version                     # your Hugo version
hugo config                      # the fully merged configuration
hugo mod graph                   # module dependencies (Hugo Module installs)
hugo server --disableFastRender  # rebuild everything on each change
```

## Common problems

### The theme is not loading

**Symptoms:** the site renders with no styling, or Hugo errors that it cannot
find the theme.

**Likely causes:** the theme is not installed, or `theme`/the module import is
not set.

**Fix:**

* Git submodule installs: confirm `themes/ananke/` exists and `theme = "ananke"`
  is set. If the folder is empty, run `git submodule update --init --recursive`.
* Hugo Module installs: confirm the import in `module.toml` and run
  `hugo mod get github.com/gohugo-ananke/ananke/v2 && hugo mod tidy`.
* Verify with `hugo config | grep -i theme`.

### The homepage is blank

**Symptoms:** the homepage shows little or no content.

**Likely causes:** there is no `content/_index.md`, and recent posts are
disabled or there are no posts in the expected section.

**Fix:**

* Add a `content/_index.md` with body text (see [Homepage](/configuration/homepage/)).
* Confirm `ananke.show_recent_posts = true` and that posts exist.
* If your posts are not in the `post` section, set `mainSections` to your
  section name.

### CSS / styling is missing

**Symptoms:** content shows but is unstyled.

**Likely causes:** the theme failed to load, stale generated resources, or a
broken custom CSS reference.

**Fix:**

* Confirm the theme loads (see above).
* Clear generated resources and rebuild: `hugo --gc`.
* Check any [custom CSS](/customisation/custom-css/) paths and the build log for
  warnings.

### The menu is not showing

**Symptoms:** no navigation links appear in the header.

**Likely causes:** no `main` menu is defined, or entries use nested children.

**Fix:**

* Define a `main` menu (see [Menus](/configuration/menus/)).
* Keep it flat — the theme renders a single level only.

### Images are not showing

**Symptoms:** images 404 or do not appear.

**Likely causes:** wrong path, `static` included in the URL, or case mismatch.

**Fix:** see [Images → Common path mistakes](/content/images/#common-path-mistakes).

### Social links are not showing

**Symptoms:** follow or share icons do not appear.

**Likely causes:** the network is not listed in the `networks` array, or it has
no configured profile.

**Fix:** add the network slug to `ananke.social.follow.networks` (or
`...share.networks`) and configure it, as described in
[Social Media Networks](/configuration/social-media-networks/).

### Hugo Module path issues

**Symptoms:** `hugo mod` errors, or the wrong theme version is used.

**Fix:**

* Run `hugo mod graph` and confirm `github.com/gohugo-ananke/ananke/v2` appears.
* Force an update: `hugo mod get -u github.com/gohugo-ananke/ananke/v2 && hugo mod tidy`.
* Ensure Go is installed (`go version`).

### The old theNewDynamic path is still used

**Symptoms:** `hugo mod graph` or `.gitmodules` still references
`theNewDynamic/gohugo-theme-ananke`.

**Fix:** follow the
[Migration from theNewDynamic](/installation/migration-from-thenewdynamic/) guide.

### The Netlify build fails

**Symptoms:** the deploy fails while building.

**Likely causes:** a Hugo version mismatch between Netlify and your project, or
missing Go for Module installs.

**Fix:**

* Pin the Hugo version in `netlify.toml` (or the `HUGO_VERSION` environment
  variable) to a version that meets the theme's minimum.
* For Hugo Module sites, ensure the build environment has Go available.
* Read the **full** build log, not just the last line.

### Local Hugo version mismatch

**Symptoms:** features behave differently locally than in production, or Hugo
reports an unsupported feature.

**Fix:** check `hugo version` against the theme's minimum (declared in the
theme's `module.toml`) and install the extended edition if needed.

## Sorry, but "$FEATURE does not work" doesn't work for us

Long story short, ask yourself: If you start bleeding out of all your orifices, will you tell the doctor "Doctor please help, I am quite new to this whole health thing and know you will laugh about me but I suddenly started bleeding out of all my orifices."? Or will you tell the doctor "Doctor, after ingesting a couple of razor blades I suddenly started bleeding. The razor blades were quite sharp. Can you help me?"

In open source communities like ours reporting issues clearly helps everyone. A message like *"the homepage doesn’t work"* might feel like a good starting point, but without more detail, it leaves us guessing. Some problems come from Hugo itself, others from the Ananke theme, or even from how it's configured - so the more info you share, the faster we can figure it out together.

When reporting a bug or asking for help, please include:

* **Versions**: your Hugo version, the version of the Ananke theme (and how you installed it), and your operating system.
* **Configuration**: your full `hugo.toml` or `hugo.yaml` file or configuration folder, plus any relevant folder structure or module settings. Note that this can be `hugo.ext`, `config.ext`, or even a full folder `config` with several sub levels. Hugo is flexible.
* **Steps**: what you were trying to do, what you expected to happen, and what actually happened instead.
* **Output**: the full error messages from the command line—don’t just paste the last line.
* **Extras**: logs, browser details (for visual issues), screenshots are very much appreciated and help to put words into visual or, if something looks wrong, make that clear - anything that might help us reproduce the problem.

The more complete the picture, the more likely it is that someone in the community will jump in and help quickly. You're not just helping yourself—you’re making the project better for everyone.
