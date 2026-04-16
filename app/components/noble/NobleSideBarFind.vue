<script setup lang="ts">
import type { LyricsCollectionItem } from '@nuxt/content'

const { song } = defineProps<{
  song: LyricsCollectionItem
}>()

// const router = useRouter()

// const items = computed(() => {
//   return song?.body?.toc?.links.map(link => ({
//     label: link.text,
//     to: router.push(`#${link.id}`)
//   })) || []
// })
</script>

<template>
  <div class="flex flex-col items-stretch gap-y-4">
    <USeparator type="dashed" />
    <UContentSearchButton variant="subtle" :collapsed="false" :kbds="['/']">
      <NobleSearch />
    </UContentSearchButton>
    <USeparator type="dashed" />
    <div class="flex flex-row items-center justify-start gap-x-2">
      <NobleKeySignatureBadge :key-id="song.key || ''" class="w-8" />
      <h3 class="text-md font-semibold">
        {{ song.title }}
      </h3>
    </div>
    <UContentToc
      highlight
      default-open
      :links="song?.body?.toc?.links"
      title=""
      :ui="{ root: 'top-0 px-0 sm:px-0 sm:mx-0',
             container: 'lg:pt-0 lg:py-0',
             trailingIcon: 'hidden',
             title: 'hidden' }"
    />
    <!-- <UNavigationMenu
      orientation="vertical"
      variant="pill"
      highlight
      :items="items"
    /> -->
    <USeparator type="dashed" />
    <NobleSongShortlist :song="song" />
    <USeparator type="dashed" />
  </div>
</template>
