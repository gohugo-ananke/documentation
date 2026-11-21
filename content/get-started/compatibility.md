---
title: Hugo version compatibility
date: 2026-11-21T00:00:00+07:00
weight: 45
---

The compatibility table below records which stable Ananke releases build with specific Hugo versions. Hugo versions before 1.0 can introduce breaking changes between minor releases. Use tested results when selecting a Hugo version for an existing site.

A declared minimum is the requirement recorded by a theme release. A tested minimum is the earliest passing Hugo version in this audit, which begins at v0.128.0. These values can differ. A successful build verifies the tested configuration; it does not guarantee every theme feature or site configuration.

## Tested compatibility

Last execution: 2026-11-21T05:04:16.962Z. Release discovery: 2026-11-21T05:04:14.090Z. Latest stable Hugo in this snapshot: v0.170.1. Platform: linux/amd64.

| Ananke | Minimum tested Hugo | Maximum tested Hugo | Notes |
| --- | --- | --- | --- |
| [v2.23.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.23.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] [3] |
| [v2.22.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.22.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.21.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.21.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.20.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.20.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.19.2](https://github.com/gohugo-ananke/ananke/releases/tag/v2.19.2) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.19.1](https://github.com/gohugo-ananke/ananke/releases/tag/v2.19.1) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.19.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.19.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.18.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.18.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.17.1](https://github.com/gohugo-ananke/ananke/releases/tag/v2.17.1) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.17.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.17.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.16.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.16.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] |
| [v2.15.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.15.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] [4] |
| [v2.13.3](https://github.com/gohugo-ananke/ananke/releases/tag/v2.13.3) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] [4] |
| [v2.13.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.13.0) | v0.158.0 | v0.170.1 (latest tested) | [1] [2] [4] |
| [v2.12.1](https://github.com/gohugo-ananke/ananke/releases/tag/v2.12.1) | v0.128.0 | v0.170.1 (latest tested) | [2] [5] [6] [7] |
| [v2.12.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.12.0) | v0.128.0 | v0.170.1 (latest tested) | [2] [5] [6] [7] |
| [v2.11.2](https://github.com/gohugo-ananke/ananke/releases/tag/v2.11.2) | v0.128.0 | v0.170.1 (latest tested) | [2] [5] [6] [7] |
| [v2.11.1](https://github.com/gohugo-ananke/ananke/releases/tag/v2.11.1) | v0.128.0 | v0.170.1 (latest tested) | [2] [5] [6] [7] |
| [v2.11.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.11.0) | v0.128.0 | v0.170.1 (latest tested) | [2] [5] [6] [7] |
| [v2.10.0](https://github.com/gohugo-ananke/ananke/releases/tag/v2.10.0) | v0.128.0 | v0.135.0 | [2] [8] [9] |

<!-- markdownlint-disable MD033 -->
<div class="docs-footnotes">
<p><sup>1</sup> Declared minimum Hugo version: 0.160.0.</p>
<p><sup>2</sup> Builds with warnings.</p>
<p><sup>3</sup> No passing build between v0.159.0 and v0.159.2, and between v0.160.1 and v0.168.0.</p>
<p><sup>4</sup> Requires Hugo Extended for v0.158.0 to v0.169.0.</p>
<p><sup>5</sup> Declared minimum Hugo version: 0.128.0.</p>
<p><sup>6</sup> Requires Hugo Extended for v0.128.0 to v0.169.0.</p>
<p><sup>7</sup> No passing build between v0.139.4 and v0.140.0.</p>
<p><sup>8</sup> Declared minimum Hugo version: 0.84.0.</p>
<p><sup>9</sup> Requires Hugo Extended for v0.128.0 to v0.135.0.</p>
</div>
<!-- markdownlint-enable MD033 -->

## How the testing works

The runner in the [compatibility repository](https://github.com/gohugo-ananke/compatibility) discovers stable releases from GitHub, starting with Ananke v2.10.0. It archives each exact release commit and invokes each selected Hugo binary directly. Historical source files and release tags remain unchanged.

Each combination uses a fresh build directory, resource directory, cache, and temporary directory. The production build uses minification. Tests cover a controlled site with home, list, single, taxonomy, navigation, summary, image, shortcode, multilingual, pagination, RSS, sitemap, and theme CSS output. Where a release includes an example site, that site must also build successfully.

Ananke v2.12.1 and later audited releases do not include the historical example site. Their results use the controlled site only. Modern feature fixtures and browser behaviour are outside this audit. The initial platform is Linux/amd64.

## What a successful build means

`PASS` means the build completed and the controlled fixture produced its expected pages and stylesheet. `PASS_WITH_WARNINGS` means it completed with diagnostics. Both count as passing.

`FAIL` records a build failure with a recognised template or Hugo API diagnostic. Failures require log review and reproduction before they can establish a useful compatibility boundary. `INFRA_ERROR` records execution, dependency, timeout, missing output, or unclassified failures. Such errors do not establish theme incompatibility.

`NOT_APPLICABLE` identifies an unavailable edition or a fixture not shipped with a release. `NOT_TESTED` means there is no execution evidence. Neither status counts as a successful build.

## Standard and Extended Hugo

The table shows one row for each Ananke release. A Hugo version counts as passing when the standard or the Extended edition builds the release. Older Ananke releases can require Hugo Extended, particularly when their CSS pipeline uses LibSass. The notes column shows the Hugo versions that need Extended. The compact facts keep the separate results for each edition.

[Hugo v0.170.0 removed the Extended edition](https://github.com/gohugoio/hugo/releases/tag/v0.170.0). Its Extended archive names are compatibility aliases for the single remaining binary. The matrix marks the Extended edition unavailable from that release; it does not count an alias as a separate Extended build.

## What warnings mean

Warnings can report deprecated functions, configuration changes, optional resources, or fixture limitations. They remain in the detailed results and raw build logs. A warning does not automatically mean that the site is incompatible. Review it before selecting a version, because a later Hugo release may remove the deprecated function.

## Choose a suitable version

1. Find your exact Ananke release in the table.
2. Select a Hugo version between the minimum and maximum tested Hugo versions.
3. Check the notes for the declared requirement, Extended requirements, warnings, and gaps.
4. Build your own site and review its output before deployment.

A tested interval contains only consecutive passing patch releases in the discovery snapshot. An unavailable, failed, or untested release breaks the interval. If compatibility returns in a later release, the notes column shows the gap. Do not assume that a gap is supported.

The label `latest tested` identifies the newest discovered stable Hugo release when it passes. It does not promise support for a future release or establish an absolute maximum.

## Known limitations and evidence

The audit begins at Hugo v0.128.0. It cannot establish an earlier minimum. Hugo v0.139.5 has no published Linux/amd64 binaries in the initial release snapshot and creates an availability gap. Original archive checksums for existing local binaries were not independently reverified; their executable hashes and full version output were recorded. Downloaded binaries use the existing version manager's checksum workflow.

The [compact compatibility facts](https://github.com/gohugo-ananke/compatibility/blob/main/data/compatibility.json) record release and edition statuses, exact theme commits, binary identities, fixture and runner revisions, and audit evidence hashes. Detailed execution records and raw logs are retained as local working files or CI artefacts. Raw logs and generated output remain in the maintainer's scratch workspace. The initial profile does not include visual regression, accessibility, image transformation, exhaustive feature, or installation-method testing.

## Last verification date

The generated table shows the last execution date and release discovery date. Each audit records its execution period. A newly published version is untested until the dataset includes a new execution for it.

## Report a compatibility problem

[Open an Ananke issue](https://github.com/gohugo-ananke/ananke/issues/new) with the Ananke tag, full `hugo version` output, installation method, configuration needed to reproduce the problem, build command, and complete diagnostic output. Identify any third-party dependencies.

The maintained runner and this page implement [documentation issue #59](https://github.com/gohugo-ananke/documentation/issues/59). Results are generated from validated runner data; there is no separate manually maintained version list.
