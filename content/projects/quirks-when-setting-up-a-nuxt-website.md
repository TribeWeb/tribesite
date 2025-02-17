---
title: Nuxt quirks
description: A list of all the quirks and gotchas I've encountered when setting up a Nuxt website using NuxtHub, Nuxt Studio/Content and Nuxt UI.
image: https://nuxt.com/assets/blog/nuxt-icon/cover.png
date: 2025-02-16
seo:
  title: Quirks when setting up a Nuxt website
  description: A list of all the quirks and gotchas I've encountered when setting up a Nuxt website using NuxtHub, Nuxt Studio/Content and Nuxt UI.
---

Versions used are:
- Nuxt 3.15.x
- Nuxt UI-Pro 3.0.0-alpha.12
- Nuxt Content 3.1.1
- NuxtHub 0.8.17
- pnpm 10.4.0

## better-sqlite3: Could not locate bindings file

pnpm 10.4.0 introduced a new feature - postinstall scripts of dependencies are ignored by default. Unfortuately this causes builds to fail when using the github CI workflow as set up by NuxtHub. Local builds appear to be unaffected.

- https://github.com/pnpm/pnpm/issues/9073#issuecomment-2649312658
- https://github.com/pnpm/pnpm/issues/9045#issuecomment-2637610205
- https://pnpm.io/cli/approve-builds

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

## NuxtHub Server API documentation

The Server API documentation within NuxtHub is not working as expected and enabling it causes builds to fail.

- https://github.com/nuxt/content/issues/2839

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

## No content styling

If the site has styling but markdown files have no (prose) styling, before you go looking for `prose` plugins, classes or props, check the module order in `nuxt.config.ts`.

Although this is now explicit in the docs, it is easily missed. `@nuxt/content` must be listed _after_ `@nuxt/ui-pro`. 

- https://ui3.nuxt.dev/getting-started/content


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

## `Preview` mode

::note
The term `Preview` is used in Nuxt Studio but has nothing in common with `Preview mode` in NuxtHub. This is fully explained in this article.
::

`Preview` in Nuxt Studio does not work as expected in Safari on MacOS<sup>\*</sup>. Use Chrome instead.

<sup>\*</sup>It actually works fine in the background it's just that it's visible because the loading blur and indicator never clear. 


