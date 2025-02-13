<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const { visibleHeadings, updateHeadings } = useScrollspy1()

const route = useRoute()

const { header } = useAppConfig()

const menu = computed(() => header.menu || [])

// if (!import.meta.test) {
const nuxtApp = useNuxtApp()
nuxtApp.hooks.hookOnce('page:finish', () => {
  updateHeadings([
    ...document.querySelectorAll('h1 span'),
    ...document.querySelectorAll('h2 span')
  ])
})
// }

// add a `name` property to each menu item in app.config.ts so that it that it can be matched to the route `name` property to show when active
// const menuItemsWithActiveProp = computed(() => {
//   return menu.value.map((menuItem) => {
//     const isActive = route.hash ? `/${route.hash}` === menuItem.to : route.name === menuItem.name
//     return { ...menuItem, active: isActive }
//   })
// })
// const activeHeading = ref('')
const activeHeading = computed(() => {
  return visibleHeadings.value[0] || ''
})

const menuItemsWithActiveProp = computed(() => {
  return menu.value.map((menuItem) => {
    return route.hash
      ? { ...menuItem, active: activeHeading.value === menuItem.to.replace('/#', '') }
      : { ...menuItem, active: route.name === menuItem.name }
  })
})

// remove any unecessary properties. E.g. `name` is no longer required as we have used it to check if the menu item is active, `icon` is also not needed
const menuItemsWithRemovedProps = computed(() =>
  menuItemsWithActiveProp.value.map(({ icon, name, ...menu }) => menu)
)

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

// watch(visibleHeadings, (val) => {
//   if (val.length !== 0) {
//     activeHeading.value = val[0]
//   }
// })
</script>

<template>
  <UHeader :ui="{ center: 'flex-1', title: 'font-display text-xl/7 md:text-2xl/7 text-[var(--ui-primary)]' }">
    <UContentSearchButton
      v-if="header?.search"
      label="Search..."
      variant="outline"
      class="w-full"
    >
      <template #trailing>
        <div class="flex items-center gap-0.5 ms-auto">
          <UKbd value="meta" />
          <UKbd value="k" />
        </div>
      </template>
    </UContentSearchButton>

    <UNavigationMenu
      v-if="menuItemsWithRemovedProps"
      :ui="{ viewportWrapper: 'w-[150%] -left-1/2 -right-1/2 mx-auto' }"
      :items="menuItemsWithRemovedProps"
      highlight
    />

    <template #title>
      <AppLogo
        v-bind="{ class: 'md:h-12 h-7 w-auto m-auto' }"
        primary="var(--ui-primary)"
        accent="var(--ui-secondary)"
      />
      <span class="font-feature md:text-4xl text-2xl text-primary tracking-[-0.035em] font-bold">tribeweb</span>
    </template>

    <template #right>
      <UContentSearchButton
        v-if="header?.search"
        class="lg:hidden"
      />

      <UColorModeButton v-if="header?.colorMode" />

      <template v-if="header?.links">
        <UButton
          v-for="(link, index) of header.links"
          :key="index"
          v-bind="{ color: 'primary', variant: 'outline', size: 'sm', ...link }"
        >
          {{ link.label }}
          <UBadge
            v-if="link.badge"
            size="md"
            :label="link.badge"
          />
        </UButton>
      </template>
    </template>

    <template #content>
      <UNavigationMenu
        orientation="vertical"
        :items="menu"
        class="-mx-2.5"
      />
      <USeparator
        type="dashed"
        class="my-4"
      />
      <UContentNavigation
        highlight
        :navigation="navigation"
      />
    </template>
  </UHeader>
</template>
