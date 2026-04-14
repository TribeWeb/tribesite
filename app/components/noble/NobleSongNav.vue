<script lang="ts" setup>
import type { LyricsCollectionItem } from '@nuxt/content'
import type { ContentTocLink } from '@nuxt/ui'
import { lyricSections } from '~/pages/apps/lyrics/[slug].vue'

const { song } = defineProps<{
  song: LyricsCollectionItem
}>()

const sections = lyricSections

// const sectionKeys = computed(() => {
//   return Object.keys(sections)
//     .filter((key) => {
//       const text = song[key as keyof typeof song]
//       return !!text
//     })
//     .map(key => ({
//       key,
//       label: sections[key as keyof typeof sections]?.sectionTitle,
//       lyrics: song[key as keyof typeof song] as string
//     }))
// })

const links = computed(() => {
  return Object.keys(sections)
    .filter((id) => {
      const text = song[id as keyof typeof song]
      return !!text
    })
    .map(id => ({
      id,
      text: sections[id as keyof typeof sections]?.sectionTitle,
      lyrics: song[id as keyof typeof song] as string,
      depth: 0
    }))
})

// defineShortcuts({
// })
</script>

<template>
  <!-- <p class="truncate">
    {{ song.title }}
  </p> -->
  <UContentToc highlight :links="links as ContentTocLink[]" />
</template>
