---
title: Nuxt quirks
description: A list of all the quirks and gotchas I've encountered when setting
  up a Nuxt website using NuxtHub, Nuxt Studio/Content and Nuxt UI.
image: https://nuxt.com/assets/blog/nuxt-icon/cover.png
date: 2025-02-16
authors:
  - name: Richard Stephenson
    slug: richstephenson
    avatar:
      src: https://2.gravatar.com/avatar/2e5901ad247594b81d5083318783e351314a7e6f5dbadc779c3c4c5734afbef7
      alt: Richard Stephenson's avatar
    to: ""
  - name: Ben Poffley
    slug: benpoffley
    description: benpoffley
    avatar:
      src: https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=606,h=769,fit=crop/dWxbrVXW2bF41OlW/ben-poffley-2-YKbrR1M4p2hD10gq.jpeg
      alt: Ben Poffley's avatar
    to: https://poffley.studio/about
    target: _blank
badge:
  label: Development
  color: primary
  variant: outline
seo:
  title: Quirks when setting up a Nuxt website
  description: A list of all the quirks and gotchas I've encountered when setting
    up a Nuxt website using NuxtHub, Nuxt Studio/Content and Nuxt UI.
---

Versions used are:

- Nuxt 3.15.x
- Nuxt UI-Pro 3.0.0-alpha.12
- Nuxt Content 3.1.1
- NuxtHub 0.8.17
- pnpm 10.4.0

## better-sqlite3: Could not locate bindings file

Pnpm 10.4.0 introduced a new feature - postinstall scripts of dependencies are ignored by default. Unfortuately this causes builds to fail when using the github CI workflow as set up by NuxtHub. Local builds appear to be unaffected.

- [github.com/pnpm/pnpm/issues/9073](https://github.com/pnpm/pnpm/issues/9073#issuecomment-2649312658)
- [github.com/pnpm/pnpm/issues/9045](https://github.com/pnpm/pnpm/issues/9045#issuecomment-2637610205)
- [pnpm.io/cli/approve-builds](https://pnpm.io/cli/approve-builds)

::code-group
```bash [pnpm]
Error:  Could not locate the bindings file. Tried: 
# followed by many lines all containing paths that include `better_sqlite3`
```

```json [package.json]
// fixed by adding the following to package.json
"pnpm": {
    "onlyBuiltDependencies": [
      "better-sqlite3"
    ]
  }
```
::

## NuxtHub API documentation

The Server API documentation within NuxtHub is not working as expected and enabling it causes builds to fail.

- [github.com/nuxt/content/issues/2839](https://github.com/nuxt/content/issues/2839)

::code-group
```bash [pnpm]
RollupError: virtual:#nitro-internal-virtual/server-handlers-meta (32:7): Identifier "_vtEFC3Meta" has already been declared
# followed by more lines
```

```ts [nuxt.config.ts]
// default config for NuxtHub apps causes the error
nitro: {
  experimental: {
    // Enable Server API documentation within NuxtHub
    openAPI: true
  }
},
```

```ts [nuxt.config.ts]
// fixed by commenting out the offending line
nitro: {
  experimental: {
    // DISABLE Server API documentation within NuxtHub
    // openAPI: true
  }
},
```
::

## Content is not styled

If the site has styling but markdown files have no (prose) styling, before you go looking for `prose` plugins, classes or props, check the module order in `nuxt.config.ts`.

Although this is now explicit in the docs, it is easily missed. `@nuxt/content` must be listed *after* `@nuxt/ui-pro`.

- [ui3.nuxt.dev/getting-started/content](https://ui3.nuxt.dev/getting-started/content)

::code-group
```bash [pnpm]
pnpm dev
# loads of lines of output ending in...
WARN [nuxt] Failed to stringify dev server logs. Received DevalueError: Cannot stringify a function.
```

```ts [nuxt.config.ts]
// the correct order is:
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content'
    ]
})
```
::

## `Preview` broken

::note
The term `Preview` is used in Nuxt Studio but has nothing in common with `Preview mode` in NuxtHub. This is fully explained in this article.
::

`Preview` in Nuxt Studio does not work as expected in Safari on MacOS\*. Use Chrome instead.

\*It actually works fine in the background it's just that it's visible because the loading blur and indicator never clears.

## Missing `.env` variables

The way this issue surfaces is that building using the GitHub workflow will fail due to a missing Nuxt UI-Pro license. Although the NuxtHub docs say that environment variables will automatically be copied to your GitHub repo, I don't think this is the case. In addition, it seems the GitHub workflow has to be manually updated in order to actually use the variables.

- [hub.nuxt.com/docs/getting-started/deploy#environment-variables-secrets](https://hub.nuxt.com/docs/getting-started/deploy#environment-variables-secrets)

::steps{level="4"}
#### Add secrets to the repository

From the project GitHub repository, go to to `Settings > Settings & variables > Actions` and add any secrets and environment variables.

  :::caution
  There's a fairly confusing interchanging of the terms, `environment`, `repository`, `variables` and `secrets`. The Nuxt UI-Pro license needs to be encrypted and so should be a `secret`.
  :::

#### Update the GitHub workflow

In the project, go to `.github/workflows/nuxthub.yml` and add an `env` object to the `Build application` step.

```diff [.github/workflows/nuxthub.yml]
 - name: Build application
   run: pnpm build
+  env:
+    NUXT_CONTENT_PREVIEW_API: https://api.nuxt.studio
+    NUXT_UI_PRO_LICENSE: ${{ secrets.NUXT_UI_PRO_LICENSE }}
```
::

## `.json` not editable

Nuxt Studio does not allow you to edit `.json` files. Only `.md` and `.yml` can be edited. Ironically, `YAML` looks like `JSON` when editing!

## Remove `@nuxt/fonts`

Building on NuxtHub fails if `@nuxt/fonts` is included is in `package.json`. It can safely be removed if using Nuxt UI-Pro as it is installed as a dependency.