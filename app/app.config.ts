export default defineAppConfig({
  ui: {
    colors: {
      primary: 'tribeweb',
      secondary: 'accent',
      neutral: 'slate',
      experience: 'experience',
      history: 'history',
      prophecy: 'prophecy'
    }
  },
  seo: {
    siteName: 'Tribeweb'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '',
      light: '',
      dark: ''
    },
    search: false,
    colorMode: true,
    links: [{
      'label': 'hello@tribeweb.co.uk',
      'icon': 'i-lucide-mail',
      'to': 'mailto:hello@tribeweb.co.uk',
      'target': '_blank',
      'aria-label': 'Email TribeWeb'
    }],
    menu: [{
      label: 'Home',
      icon: 'i-lucide-home',
      to: '/#home',
      // to: '/#beautifully-crafted-applications-for-the-web',
      name: 'index'
    }, {
      label: 'Expertise',
      icon: 'i-lucide-cog',
      to: '/#expertise'
    }, {
      label: 'Work',
      icon: 'i-lucide-briefcase-business',
      to: '/#selected-work'
    }, {
      label: 'Contact',
      icon: 'i-lucide-mail',
      to: '/#contact'
    }, {
      label: 'Projects',
      icon: 'i-lucide-lightbulb',
      to: '/projects',
      name: 'projects-slug'
    }]
  },
  footer: {
    slots: {
      root: 'border-t border-(--ui-border)',
      left: 'text-sm text-(--ui-text-muted)'
    },
    credits: `Copyright Tribeweb © ${new Date().getFullYear()}`,
    colorMode: false
  },
  toc: {
    title: 'On this page',
    bottom: {
      title: 'Community',
      edit: 'https://github.com/nuxt-ui-pro/docs/edit/v3/content',
      links: [{
        icon: 'i-lucide-star',
        label: 'Star on GitHub',
        to: 'https://github.com/nuxt/ui',
        target: '_blank'
      }, {
        icon: 'i-lucide-book-open',
        label: 'Nuxt UI Pro docs',
        to: 'https://ui3.nuxt.dev/getting-started/installation/pro/nuxt',
        target: '_blank'
      }, {
        icon: 'i-simple-icons-nuxtdotjs',
        label: 'Purchase a license',
        to: 'https://ui.nuxt.com/pro/purchase',
        target: '_blank'
      }]
    }
  }
})
