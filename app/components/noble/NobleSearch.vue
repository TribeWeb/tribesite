<script lang="ts">
</script>

<script setup lang="ts">
import type { ContentSearchItem } from '@nuxt/ui'

export interface LyricSection {
  sectionTitle: string
  label: string
  shortcut: string
}

const lyricSections = ref<{ [s: string]: LyricSection }>({
  verse1: { sectionTitle: 'Verse 1', label: 'V1', shortcut: '1' },
  verse2: { sectionTitle: 'Verse 2', label: 'V2', shortcut: '2' },
  verse3: { sectionTitle: 'Verse 3', label: 'V3', shortcut: '3' },
  verse4: { sectionTitle: 'Verse 4', label: 'V4', shortcut: '4' },
  verse5: { sectionTitle: 'Verse 5', label: 'V5', shortcut: '5' },
  prechorus1: { sectionTitle: 'Prechorus 1', label: 'PCh', shortcut: '6' },
  prechorus2: { sectionTitle: 'Prechorus 2', label: 'PCh2', shortcut: '7' },
  chorus1: { sectionTitle: 'Chorus 1', label: 'Ch', shortcut: '8' },
  chorus2: { sectionTitle: 'Chorus 2', label: 'Ch2', shortcut: '9' },
  chorus3: { sectionTitle: 'Chorus 3', label: 'Ch3', shortcut: '0' },
  chorus4: { sectionTitle: 'Chorus 4', label: 'Ch4', shortcut: '-' },
  bridge1: { sectionTitle: 'Bridge 1', label: 'Br1', shortcut: '=' },
  bridge2: { sectionTitle: 'Bridge 2', label: 'Br2', shortcut: '[' }
})

interface LyricSectionResult {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  key?: string
}

interface SongSearchItem extends ContentSearchItem {
  key?: string
  sectionId?: string
}

const { data: lyricsNavigation } = await useAsyncData('lyrics-navigation', () => queryCollectionNavigation('lyrics'))
const { data: lyricsFiles } = useLazyAsyncData('lyrics-search', () =>
  queryCollectionSearchSections('lyrics', { extraFields: ['key'] }) as unknown as Promise<LyricSectionResult[]>,
{
  server: false
})

const groups = computed(() => [{
  id: 'songs',
  label: 'Songs',
  items: (lyricsFiles.value ?? []).map(file => ({
    label: file.title,
    prefix: file.titles[0] || undefined,
    suffix: file.content,
    to: file.id,
    level: file.level,
    key: file.key,
    sectionId: file.id?.split('#')[1]?.replace(/-/g, '') // extract section id from file id
  } satisfies SongSearchItem))
}])

// defineShortcuts({
//   k: () => {
//     open.value = !open.value
//   }
// })
</script>

<template>
  <ClientOnly>
    <LazyUContentSearch
      shortcut="meta_k"
      :groups="groups"
      :navigation="lyricsNavigation"
      :fuse="{ resultLimit: 42 }"
      placeholder="Search songs..."
      :color-mode="false"
      size="lg"
      :ui="{ modal: 'sm:h-[calc(100dvh-8rem)]' }"
    >
      <template #item-leading="">
        <UIcon name="i-lucide-music" class="mt-1" />
      </template>
      <template #item-label="{ item }">
        <div v-if="item?.matches?.length && item.level === 1" class="text-default">
          <p v-html="item.labelHtml" />
        </div>
        <div v-else-if="!item?.matches?.length && item.level === 1" class="text-default">
          <p class="text-default">
            {{ item.label }} <span />
          </p>
        </div>
        <div v-else class="flex flex-row gap-x-2 text-default">
          <p class="text-default">
            {{ item.prefix }}
          </p>
          <p class="text-muted">
            <span class="mr-2">></span>{{ item.label }}
          </p>
        </div>
      </template>
      <!-- <template #item-description="{ item }">
        <p class="pt-1 truncate whitespace-pre line-clamp-2" v-html="item.suffixHtml" />
      </template> -->
      <template #item-description="{ item }">
        <!-- <pre>{{ item }}</pre> -->
        <div class="flex w-full gap-x-4 text-muted">
          <UAvatar size="sm" class="self-center">
            {{ lyricSections[item.sectionId]?.label }}
          </UAvatar>
          <p class="pt-1 basis-1/2 truncate whitespace-pre line-clamp-2" v-html="item.suffixHtml" />
          <p class="pt-1 basis-1/2 truncate whitespace-pre line-clamp-2" />
        </div>
      </template>
      <template #item-trailing="{ item }">
        <NobleKeySignatureBadge v-if="item.key" :key-id="item.key" class="w-8" />
      </template>
    </LazyUContentSearch>
  </ClientOnly>
</template>

<style>
mark {
  background-color: var(--ui-primary) !important;
  color: white !important;
  font-weight: bold;
  padding: 0.1em 0.1em;
  border-radius: 0.2em;
}
</style>
