<script setup lang="ts">
import type { RadioGroupItem, CheckboxGroupItem } from '@nuxt/ui'

type LayerItem = {
  layerId: string
  title: string
}

const props = defineProps<{
  layers: LayerItem[]
  isFullscreen: boolean
}>()

const emit = defineEmits<{
  toggleFullscreen: []
}>()

const isTestamentsOpen = ref(false)
const isOptionsOpen = ref(false)
const isTouchInput = ref(false)

const controlsPopoverMode = computed(() => {
  return isTouchInput.value ? 'click' : 'hover'
})

onMounted(() => {
  isTouchInput.value = window.matchMedia('(hover: none), (pointer: coarse)').matches
})

const testamentOptions = defineModel<'old' | 'new' | 'both'>('testamentOptions', {
  required: true
})

const options = defineModel<string[]>('options', {
  required: true
})

const layer = defineModel<string>('layer', {
  required: true
})

const testamentItems = ref<RadioGroupItem[]>([
  { label: 'Both testaments', value: 'both' },
  { label: 'Old Testament', value: 'old' },
  { label: 'New Testament', value: 'new' }
])

const optionItems = ref<CheckboxGroupItem[]>([
  { label: 'Divisions', value: 'divisions' },
  { label: 'Categories', value: 'categories' },
  { label: 'Book length', value: 'bookLength' },
  { label: 'Book names', value: 'bookNames' }
])

const keyFeatures = [
  {
    key: 'history',
    title: 'Books of History',
    description: 'Carry the core historical narrative and redemptive storyline.',
    leadingIcon: 'text-history-700 size-12'
  },
  {
    key: 'experience',
    title: 'Books of Experience',
    description: 'Books of letters, poetry and philosophy with collections of songs and wise sayings.',
    leadingIcon: 'text-experience-700 size-12'
  },
  {
    key: 'prophecy',
    title: 'Books of Prophecy',
    description: 'Books and collections by the prophets containing visions and apocalyptic writings.',
    leadingIcon: 'text-prophecy-700 size-12'
  },
  {
    key: 'entry',
    title: 'Books of Entry',
    description: 'Gradient colours are for books that follow collections that serve as entry points to each set of writings.',
    leadingIcon: 'text-neutral-200 size-12'
  }
]

const fullscreenHeaderRootClass = [
  'fixed inset-x-0 !top-auto bottom-0',
  'border-t border-default bg-default/95',
  'backdrop-blur supports-backdrop-filter:bg-default/95'
].join(' ')
const fullscreenHeaderUi = { root: fullscreenHeaderRootClass }
</script>

<template>
  <UHeader :ui="props.isFullscreen ? fullscreenHeaderUi : {}">
    <template #left>
      <div class="flex items-center gap-2">
        <UPopover
          :mode="controlsPopoverMode"
          :portal="!props.isFullscreen"
          :content="{ side: 'top', align: 'start' }"
          @update:open="isTestamentsOpen = $event"
        >
          <UButton
            label="Testaments"
            :trailing-icon="isTestamentsOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            variant="soft"
            color="neutral"
            @click.prevent
          />
          <template #content>
            <div class="w-48 p-3">
              <URadioGroup
                v-model="testamentOptions"
                :items="testamentItems"
              />
            </div>
          </template>
        </UPopover>

        <UPopover
          :mode="controlsPopoverMode"
          :portal="!props.isFullscreen"
          :content="{ side: 'top', align: 'start' }"
          @update:open="isOptionsOpen = $event"
        >
          <UButton
            label="Options"
            :trailing-icon="isOptionsOpen ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
            variant="soft"
            color="neutral"
            @click.prevent
          />
          <template #content>
            <div class="w-48 p-3">
              <UCheckboxGroup
                v-model="options"
                :items="optionItems"
              />
            </div>
          </template>
        </UPopover>
      </div>
    </template>

    <div class="w-70 flex flex-row place-self-start gap-x-1">
      <USelectMenu
        v-model="layer"
        :portal="!props.isFullscreen"
        :items="props.layers"
        :content="{ side: 'top' }"
        leading
        value-key="layerId"
        label-key="title"
        placeholder="Image overlays"
        class="w-64"
      />
      <UButton
        v-if="layer"
        icon="i-lucide-x"
        variant="soft"
        size="sm"
        @click="layer = ''"
      />
    </div>

    <template #right>
      <UPopover
        mode="click"
        :portal="!props.isFullscreen"
        :content="{ side: 'top', align: 'end' }"
      >
        <UButton
          color="neutral"
          icon="i-lucide-map"
          variant="subtle"
          size="md"
        />
        <template #content>
          <div class="w-[min(90vw,56rem)] p-3">
            <UPageGrid
              :ui="{ base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2' }"
            >
              <UPageFeature
                v-for="feature in keyFeatures"
                :key="feature.key"
                :title="feature.title"
                :description="feature.description"
                icon="i-mdi-square-rounded"
                :ui="{ leadingIcon: `${feature.leadingIcon}` }"
              />
            </UPageGrid>
          </div>
        </template>
      </UPopover>
      <UButton
        color="neutral"
        :icon="props.isFullscreen ? 'i-lucide-minimize' : 'i-lucide-fullscreen'"
        variant="subtle"
        size="md"
        @click="emit('toggleFullscreen')"
      />
    </template>
  </UHeader>
</template>
