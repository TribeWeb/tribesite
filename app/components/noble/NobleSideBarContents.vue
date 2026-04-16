<script setup lang="ts">
import type { LyricsCollectionItem } from '@nuxt/content'
import type { TabsItem } from '@nuxt/ui'

const { song } = defineProps<{
  song: LyricsCollectionItem
}>()

const items = [
  {
    label: 'Find',
    icon: 'i-lucide-eye',
    slot: 'find' as const
  },
  {
    label: 'Media',
    icon: 'i-lucide-video',
    slot: 'media' as const
  },
  {
    label: 'Settings',
    icon: 'i-lucide-settings',
    slot: 'settings' as const
  }
] satisfies TabsItem[]

const activeTab = useState('noble-sidebar-tab', () => 'find')
</script>

<template>
  <UTabs v-model="activeTab" :items="items" variant="link" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
    <template #find>
      <NobleSideBarFind :song="song" />
    </template>
    <template #media>
      <NobleSideBarMedia :song="song" />
    </template>
    <template #settings>
      <NobleSideBarSettings :song="song" />
    </template>
  </UTabs>
</template>
