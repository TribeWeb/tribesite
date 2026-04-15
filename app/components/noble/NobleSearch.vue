<script lang="ts">
</script>

<script setup lang="ts">
import type { ContentSearchItem } from '@nuxt/ui'

interface LyricSectionResult {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
  key?: string
  stem?: string
}

interface SongSearchItem extends ContentSearchItem {
  key?: string
  sectionId?: string
  primarySection?: string
  primarySectionId?: string
  secondarySection?: string
  secondarySectionId?: string
}

const { data: lyricsNavigation } = await useAsyncData('lyrics-navigation', () => queryCollectionNavigation('lyrics'))
const { data: lyricsFiles } = useLazyAsyncData('lyrics-search', () =>
  queryCollectionSearchSections('lyrics', { extraFields: ['key', 'stem'] }) as unknown as Promise<LyricSectionResult[]>,
{
  server: false
})

const groups = computed(() => [{
  id: 'songs',
  label: 'Songs',
  items: (lyricsFiles.value ?? []).map(buildSearchItem)
}])

function buildSearchItem(file: LyricSectionResult): SongSearchItem {
  // Section previews:
  //   primary  = first available section (verse-1 > chorus-1 > verse-2)
  //   secondary = second available section, only shown when verse-1 exists
  const primarySectionId = getFirstSectionId(file, 'verse-1', 'chorus-1', 'verse-2')
  const hasVerse1 = !!getSectionContent(file, 'verse-1')

  return {
    label: file.title,
    prefix: file.titles[0] || undefined,
    suffix: file.content,
    to: file.id,
    level: file.level,
    key: file.key,
    sectionId: file.id?.split('#')[1],
    primarySectionId,
    primarySection: primarySectionId ? getSectionContent(file, primarySectionId) : undefined,
    secondarySectionId: hasVerse1 ? getFirstSectionId(file, 'chorus-1', 'verse-2') : undefined,
    secondarySection: hasVerse1 ? getSectionContent(file, 'chorus-1') || getSectionContent(file, 'verse-2') || undefined : undefined
  } satisfies SongSearchItem
}

function getSectionContent(file: LyricSectionResult, sectionId: string) {
  return lyricsFiles.value?.find(f => f.id === `/${file.stem}#${sectionId}`)?.content || ''
}

function getFirstSectionId(file: LyricSectionResult, ...sectionIds: string[]) {
  return sectionIds.find(id => getSectionContent(file, id)) || undefined
}
</script>

<template>
  <ClientOnly>
    <LazyUContentSearch
      shortcut="/"
      :groups="groups"
      :navigation="lyricsNavigation"
      :fuse="{ resultLimit: 42 }"
      placeholder="Search songs..."
      :color-mode="false"
      size="lg"
      :ui="{ modal: 'sm:h-[calc(100dvh-8rem)]', itemTrailing: 'w-8', itemLabel: 'min-h-[2rem]' }"
    >
      <template #item-leading="">
        <UIcon name="i-lucide-music" class="mt-1" />
      </template>
      <template #item-label="{ item }">
        <div v-if="item.level === 1" class="text-default">
          <p v-html="item.labelHtml || item.label" />
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
      <template #item-description="{ item }">
        <div v-if="item.level === 1" class="w-full flex flex-row gap-x-4 text-muted">
          <UAvatar size="sm" class="self-center">
            {{ lyricSections[item.primarySectionId]?.label }}
          </UAvatar>
          <p class="pt-1 basis-1/2 truncate whitespace-pre line-clamp-2">
            {{ item.primarySection }}
          </p>
          <UAvatar size="sm" class="self-center">
            {{ lyricSections[item.secondarySectionId]?.label }}
          </UAvatar>
          <p class="pt-1 basis-1/2 truncate whitespace-pre line-clamp-2">
            {{ item.secondarySection }}
          </p>
        </div>
        <div v-else class="w-full flex flex-row gap-x-4 text-muted">
          <UAvatar size="sm" class="self-center">
            {{ lyricSections[item.sectionId]?.label }}
          </UAvatar>
          <p class="pt-1 basis-1/2 truncate whitespace-pre line-clamp-2" v-html="item.suffixHtml || item.suffix" />
          <UAvatar size="sm" class="self-center">
            {{ lyricSections[item.sectionId === 'verse-1' ? item.secondarySectionId : item.primarySectionId]?.label }}
          </UAvatar>
          <p class="pt-1 basis-1/2 truncate whitespace-pre line-clamp-2">
            {{ item.sectionId === 'verse-1' ? item.secondarySection : item.primarySection }}
          </p>
        </div>
      </template>
      <template #item-trailing="{ item }">
        <div class="w-8 flex flex-col items-center justify-center">
          <NobleKeySignatureBadge v-if="item.key" :key-id="item.key" />
        </div>
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
