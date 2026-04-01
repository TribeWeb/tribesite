// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@nuxt/content',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@nuxt/fonts',
    'nuxt-studio',
    'nuxt-google-sheets-import'
  ],

  devtools: {
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://tribeweb.co.uk',
    name: 'Tribeweb'
  },

  runtimeConfig: {
    // Private keys are only available on the server
    googleApiKey: ''
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

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vueuse/integrations/useSortable',
        'zod'
      ]
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

  googleSheetsImport: {
    googleSheets: [
      { id: '1aOTrB6bE4DjvEmefNMgx9-1irITIozynNW-clLi7MCs', label: 'Bible data' }
    ]
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
    // Use Netlify image transforms in production on Netlify, keep ipx for local/dev.
    provider: process.env.NUXT_IMAGE_PROVIDER || (process.env.NETLIFY ? 'netlify' : 'ipx'),
    format: ['webp'],
    quality: 80,
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  ogImage: {
    zeroRuntime: true
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
    },
    meta: {
      components: {
        groups: [
          { label: 'Content', include: ['app/components/content/**'] },
          { label: 'Bible', include: ['app/components/bible/**'] }
        ]
      }
    }
  }
})
