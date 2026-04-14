<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import { useLocalStorage } from '@vueuse/core'

type ShortlistItem = {
  path: string
  title: string
  key: string
}

interface SongProp {
  path: string
  title: string
  key?: string | null
}

const props = defineProps<{
  song?: SongProp | null
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

useSortable(listEl, shortlist, { handle: '.drag-handle', animation: 150 })
</script>

<template>
  <div class="flex flex-col gap-y-5 w-full">
    <UFieldGroup>
      <UBadge
        class="text-sm font-semibold w-full bg-default-inverted text-default-inverted"
      >
        Songs shortlist
      </UBadge>
      <UButton
        color="neutral"
        variant="soft"
        :icon="isAdded ? 'i-lucide-check' : 'i-lucide-list-plus'"
        :disabled="!song || isAdded"
        @click="addSong"
      />
    </UFieldGroup>

    <div
      v-if="shortlist.length"
      ref="listEl"
      class="flex flex-col gap-y-3"
    >
      <UFieldGroup
        v-for="item in shortlist"
        :key="item.path"
        size="xl"
      >
        <UButton
          block
          color="neutral"
          :to="item.path"
          :label="item.title"
          variant="soft"
          leading-icon="i-lucide-grip-vertical"
          size="md"
          :ui="{
            base: 'justify-start px-2',
            label: 'w-full text-left text-xs truncate',
            leadingIcon: 'drag-handle cursor-grab active:cursor-grabbing'
          }"
        >
          <template #trailing>
            <NobleKeySignatureBadge
              v-if="item.key"
              :key-id="item.key"
            />
          </template>
        </UButton>

        <UButton
          color="neutral"
          variant="soft"
          size="xs"
          icon="i-lucide-x"
          @click.prevent="removeSong(item.path)"
        />
      </UFieldGroup>
    </div>
  </div>
</template>
