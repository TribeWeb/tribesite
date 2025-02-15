---
seo:
  title: Nuxt UI Pro - Docs template.
  description: Nuxt UI Pro is a collection of premium Vue components built on top
    of Nuxt UI to create beautiful & responsive Nuxt applications in minutes.
---

::u-page-hero
---
as: section
class: h-dvh
id: home
orientation: horizontal
---
  :::prose-pre{filename="Terminal"}
  ```bash
  npx nuxi init -t github:nuxt-ui-pro/docs#v3
  ```
  :::

#title
[Beautifully crafted applications for the web]{#title-home}

#description
Nuxt UI Pro is a collection of premium components built on top of Nuxt UI to create beautiful & responsive applications in minutes.

#links
  :::u-button{size="xl" to="/blog" trailing-icon="i-lucide-arrow-right"}
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: i-simple-icons-github
  size: xl
  target: _blank
  to: https://github.com/nuxt-ui-pro/docs/tree/v3
  variant: subtle
  ---
  Use this template
  :::
::

::u-page-section
---
class: h-dvh
id: testimonials
---
#title
[Testimonials]{#title-testimonials}

#links
  :::u-button
  ---
  color: neutral
  size: lg
  target: _blank
  to: https://ui3.nuxt.dev/getting-started/installation/pro/nuxt
  trailingIcon: i-lucide-arrow-right
  variant: subtle
  ---
  Discover Nuxt UI Pro v3
  :::

#features
  :::u-page-feature
  ---
  icon: i-simple-icons-nuxt
  target: _blank
  to: https://nuxt.com
  ---
  #title
  Nuxt 3
  
  #description
  Powered by Nuxt 3 for optimal performances and SEO.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-markdown
  target: _blank
  to: https://content.nuxt.com
  ---
  #title
  Markdown
  
  #description
  Write your pages with MDC thanks to Nuxt Content.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-sparkles
  target: _blank
  to: https://ui3.nuxt.dev
  ---
  #title
  Nuxt UI v3
  
  #description
  Offers a very large set of full customizable components.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-typescript
  target: _blank
  to: https://www.typescriptlang.org
  ---
  #title
  TypeScript
  
  #description
  A fully typed development experience.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-nuxtdotjs
  target: _blank
  to: https://content.nuxt.com/docs/studio
  ---
  #title
  Nuxt Studio
  
  #description
  Supported by Nuxt Studio for fast updates and previews.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-search
  target: _blank
  to: https://ui3.nuxt.dev/components/content-search
  ---
  #title
  Search
  
  #description
  A full-text search modal powered by Fuse.js.
  :::
::

::u-page-section{#contact .h-dvh}
  :::u-page-c-t-a
  ---
  links:
    - label: Buy now
      to: https://ui.nuxt.com/pro/purchase
      target: _blank
      icon: i-lucide-shopping-cart
      color: neutral
    - label: License
      to: https://ui3.nuxt.dev/getting-started/license
      trailingIcon: i-lucide-circle-help
      target: _blank
      color: neutral
      variant: subtle
  as: section
  description: Nuxt UI Pro is free in development, but you need a license to use
    it in production.
  variant: subtle
  ---
  #title
  [Contact]{#title-contact}
  :::
::
