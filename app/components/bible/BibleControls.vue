<script setup lang="ts">
import type { RadioGroupItem, CheckboxGroupItem } from '@nuxt/ui'

type LayerItem = {
  layerId: string
  title: string
}

const props = defineProps<{
  layers: LayerItem[]
}>()

const isTouchInput = ref(false)

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
</script>

<template>
  <div class="flex flex-col justify-between divide-y divide-dotted divide-default">
    <UFieldGroup label="Testaments" class="py-4">
      <URadioGroup
        v-model="testamentOptions"
        :items="testamentItems"
      />
    </UFieldGroup>
    <UFieldGroup label="Options" class="py-4">
      <UCheckboxGroup
        v-model="options"
        :items="optionItems"
      />
    </UFieldGroup>

    <UFieldGroup
      v-if="props.layers.length > 0"
      label="Image overlays"
      class="py-4"
    >
      <USelectMenu
        v-model="layer"
        :items="props.layers"
        :content="{ side: 'bottom' }"
        leading
        clear
        value-key="layerId"
        label-key="title"
        placeholder="Image overlays"
        class="w-64"
        :ui="{ content: '' }"
      />
    </UFieldGroup>
  </div>
</template>
