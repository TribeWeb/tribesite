<script setup lang="ts">
import type { CheckboxGroupItem, RadioGroupItem, TabsItem } from '@nuxt/ui'

type LayerItem = {
  layerId: string
  title: string
}

const props = defineProps<{
  layers: LayerItem[]
  isFullscreen: boolean
  controlsVisible: boolean
}>()

const emit = defineEmits<{
  toggleFullscreen: []
  toggleControls: []
}>()

const testamentOptions = defineModel<'old' | 'new' | 'both'>('testamentOptions', {
  required: true
})

const options = defineModel<string[]>('options', {
  required: true
})

const layer = defineModel<string>('layer', {
  required: true
})

const testamentItems = [
  {
    label: 'Both testaments',
    value: 'both'
  },
  {
    label: 'Old Testament',
    value: 'old'
  },
  {
    label: 'New Testament',
    value: 'new'
  }
] satisfies RadioGroupItem[]

const controlItems = [
  {
    label: 'Divisions',
    value: 'divisions'
  },
  {
    label: 'Categories',
    value: 'categories'
  },
  {
    label: 'Book length',
    value: 'bookLength'
  },
  {
    label: 'Book names',
    value: 'bookNames'
  }
] satisfies CheckboxGroupItem[]

const tabItems = [
  {
    label: 'Controls',
    description: 'This is the controls tab.',
    icon: 'i-lucide-sliders-horizontal',
    slot: 'controls' as const
  },
  {
    label: 'Key',
    description: 'This is the key tab.',
    icon: 'i-lucide-map',
    slot: 'key' as const
  }
] satisfies TabsItem[]

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
</script>

<template>
  <div class="flex flex-row items-start gap-x-2" v-bind="$attrs">
    <UTabs v-if="props.controlsVisible" :items="tabItems" :ui="{ trigger: 'grow' }" class="gap-4 w-full">
      <template #controls>
        <div class="flex flex-row items-start gap-x-4">
          <URadioGroup
            v-model="testamentOptions"
            :items="testamentItems"
            size="sm"
            variant="table"
            orientation="vertical"
            class="w-48"
          />
          <UCheckboxGroup
            v-model="options"
            :items="controlItems"
            size="sm"
            variant="table"
            orientation="vertical"
            class="w-48"
          />
          <div class="w-70 flex flex-row place-self-start gap-x-1">
            <USelect
              v-model="layer"
              :portal="!props.isFullscreen"
              :items="props.layers"
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
        </div>
      </template>
      <template #key>
        <UPageGrid :ui="{ base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4' }">
          <UPageFeature
            v-for="feature in keyFeatures"
            :key="feature.key"
            :title="feature.title"
            :description="feature.description"
            icon="i-mdi-square-rounded"
            :ui="{ leadingIcon: `${feature.leadingIcon}` }"
          />
        </UPageGrid>
      </template>
    </UTabs>
    <UFieldGroup orientation="horizontal" class="mt-1 self-start">
      <UButton
        color="primary"
        :icon="props.controlsVisible ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        variant="subtle"
        size="md"
        @click="emit('toggleControls')"
      />
      <UButton
        color="primary"
        :icon="props.isFullscreen ? 'i-lucide-minimize' : 'i-lucide-fullscreen'"
        variant="subtle"
        size="md"
        @click="emit('toggleFullscreen')"
      />
    </UFieldGroup>
  </div>
</template>
