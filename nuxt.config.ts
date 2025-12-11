// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    '@nuxthub/core',
    '@vueuse/nuxt'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://tribeweb.co.uk',
    name: 'Tribeweb'
  },
  content: {
    // database: {
    //   type: 'd1',
    //   bindingName: 'DB'
    // },
    preview: {
      dev: true,
      api: 'https://api.nuxt.studio'
    },
    build: {
      markdown: {
        highlight: {
          langs: ['sql', 'diff']
        }
      }
    }
  },

  compatibilityDate: '2024-07-11',

  nitro: {
    prerender: {
      routes: [
        '/'
      ],
      crawlLinks: true
    }
  },

  hub: {
    // database: true
    db: 'sqlite'
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  icon: {
    provider: 'iconify',
    serverBundle: false,
    customCollections: [{
      prefix: 'svg',
      dir: './app/assets/icons',
      normalizeIconName: false
    }]
  },

  image: {
    provider: 'ipx',
    format: ['webp', 'jpg', 'png', 'jpeg'],
    dir: 'assets/images'
  },

  ogImage: {
    zeroRuntime: true
  }
})
