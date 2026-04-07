<script setup lang="ts">
// import type { NavigationMenuItem, SidebarProps } from '@nuxt/ui'

// Ignore the props for the example

const open = ref(true)

// const items: NavigationMenuItem[] = [
//   {
//     label: 'Home',
//     icon: 'i-lucide-house',
//     active: true
//   },
//   {
//     label: 'Inbox',
//     icon: 'i-lucide-inbox',
//     badge: '4'
//   },
//   {
//     label: 'Contacts',
//     icon: 'i-lucide-users'
//   }
// ]

defineShortcuts({
  meta_o: () => {
    open.value = !open.value
  }
})
</script>

<template>
  <div
    class="flex flex-1 flex-row-reverse h-[calc(100vh-var(--ui-header-height))] bg-neutral-50 dark:bg-neutral-950"
  >
    <USidebar
      v-model:open="open"
      close
      close-icon="i-lucide-panel-right-close"
      variant="inset"
      collapsible="offcanvas"
      side="right"
      :ui="{
        gap: 'h-3',
        container:
          'absolute top-[var(--ui-header-height)] bottom-0 h-[calc(100vh-var(--ui-header-height))]'
      }"
    >
      <template #header>
        <NuxtLink
          to="/"
        >
          <AppLogo
            v-bind="{ class: 'h-7 w-auto' }"
            primary="var(--ui-primary)"
            accent="var(--ui-secondary)"
          />
        </NuxtLink>
        <span
          class="font-feature md:text-xl text-lg text-primary tracking-[-0.035em] font-bold"
        >bible index</span>
      </template>
      <slot name="sidebar" />
      <template #footer>
        <slot name="sidebar-footer" />
      </template>
    </USidebar>

    <div
      class="relative flex-1 flex flex-col overflow-hidden lg:m-2 rounded-lg shadow-md ring ring-default bg-default"
    >
      <div class="flex-1 p-3">
        <slot name="body" class="size-full" />
      </div>
      <div class="absolute bottom-2 right-2 flex z-50">
        <UTooltip
          :text="open ? 'Close sidebar' : 'Open sidebar'"
          :kbds="['meta', 'o']"
        >
          <UButton
            :icon="open ? 'i-lucide-panel-right-close' : 'i-lucide-panel-right-open'"
            color="neutral"
            size="lg"
            variant="outline"
            :aria-label="open ? 'Close sidebar' : 'Open sidebar'"
            class="bg-transparent backdrop-blur-md"
            @click="open = !open"
          />
        </UTooltip>
      </div>
    </div>
  </div>
</template>
