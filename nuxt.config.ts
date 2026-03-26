// https://nuxt.com/docs/api/configuration/nuxt-config
const imageProvider = process.env.NETLIFY
  ? 'netlify'
  : process.env.NODE_ENV === 'production'
    ? 'ipxStatic'
    : 'ipx'

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-studio'
  ],

  devtools: {
    enabled: true
  },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ]
    }
  },

   studio: {
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'tribeweb',
      repo: 'tribesite',
      branch: 'main'
    },
    git: {
      commit: {
        messagePrefix: 'content:'
      }
    }
  },

  css: ['~/assets/css/main.css'],

  image: {
    provider: imageProvider,
    dir: 'public'
  },

  site: {
    url: 'https://tribeweb.co.uk',
    name: 'Tribeweb'
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

  ogImage: {
    zeroRuntime: true
  }
})