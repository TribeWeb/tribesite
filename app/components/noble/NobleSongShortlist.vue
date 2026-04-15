<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { useLocalStorage } from '@vueuse/core'

type ShortlistItem = {
  path: string
  title: string
  key: string
}

const props = defineProps<{
  song: { path: string, title: string, key?: string | null } | null | undefined
}>()

const shortlist = useLocalStorage<ShortlistItem[]>('noble-shortlist', [])

const isAdded = computed(() =>
  !!props.song && shortlist.value.some(s => s.path === props.song!.path)
)

function addSong() {
  if (!props.song || isAdded.value) return
  shortlist.value = [
    ...shortlist.value,
    { path: props.song.path, title: props.song.title, key: props.song.key ?? '' }
  ]
}

function removeSong(path: string) {
  shortlist.value = shortlist.value.filter(s => s.path !== path)
}

const listEl = useTemplateRef<HTMLElement>('listEl')

useSortable(listEl, shortlist, {
  animation: 150
})
</script>

<template>
  <!-- <ClientOnly> -->
  <div class="flex flex-col gap-y-5">
    <div class="flex items-center justify-between gap-x-2">
      <h3 class="text-sm font-semibold">
        Songs shortlist
      </h3>
      <UFieldGroup>
        <UButton
          variant="subtle"
          :icon="isAdded ? 'i-lucide-check' : 'i-lucide-list-plus'"
          :disabled="!song || isAdded"
          @click="addSong"
        />
        <UButton
          variant="subtle"
          :icon="'i-lucide-list-x'"
          :disabled="shortlist.length === 0"
          @click="shortlist=[]"
        />
      </UFieldGroup>
    </div>

    <div
      v-if="shortlist.length"
      ref="listEl"
      class="flex flex-col gap-y-3"
    >
      <div
        v-for="item in shortlist"
        :key="item.path"
        class="flex items-center gap-x-1.5 rounded-md border border-default bg-elevated/50 px-1.5 py-1 text-sm"
      >
        <span class="cursor-grab text-muted active:cursor-grabbing shrink-0">
          <UIcon name="i-lucide-grip-vertical" class="size-5" />
        </span>

        <NuxtLink
          :to="item.path"
          class="flex min-w-0 flex-1 items-center justify-between gap-x-1.5"
        >
          <p class="truncate text-xs font-medium text-highlighted">{{ item.title }}</p>
          <NobleKeySignatureBadge
            v-if="item.key"
            :key-id="item.key"
            class="shrink-0"
          />
        </NuxtLink>

        <UButton
          color="neutral"
          variant="ghost"
          size="xs"
          icon="i-lucide-x"
          class="shrink-0"
          @click.prevent="removeSong(item.path)"
        />
      </div>
    </div>
  </div>
  <!-- </ClientOnly> -->
</template>
