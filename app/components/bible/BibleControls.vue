<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

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

const showKeyPanel = ref(false)

function toggleKeyPanel() {
  showKeyPanel.value = !showKeyPanel.value
}

function checkboxIcon(checked: boolean) {
  return checked ? 'i-lucide-square-check-big' : 'i-lucide-square'
}

function preventMenuNavigation(e: Event) {
  e.preventDefault()
}

function createMenuActionItem(
  label: string,
  value: string,
  icon: string,
  onAction: (e: Event) => void
): NavigationMenuItem {
  return {
    label,
    value,
    icon,
    type: 'trigger',
    as: 'button',
    onClick: onAction,
    onSelect: onAction
  }
}

function createMenuTriggerItem(
  label: string,
  icon: string,
  children: NavigationMenuItem[]
): NavigationMenuItem {
  return {
    label,
    icon,
    type: 'trigger',
    as: 'button',
    onClick: preventMenuNavigation,
    onSelect: preventMenuNavigation,
    children
  }
}

const testamentOptions = defineModel<'old' | 'new' | 'both'>('testamentOptions', {
  required: true
})

const options = defineModel<string[]>('options', {
  required: true
})

const layer = defineModel<string>('layer', {
  required: true
})

function selectTestament(option: 'both' | 'old' | 'new', e?: Event) {
  e?.preventDefault()
  testamentOptions.value = option
}

function toggleOption(option: string, e?: Event) {
  e?.preventDefault()

  if (options.value.includes(option)) {
    options.value = options.value.filter(value => value !== option)
    return
  }

  options.value = [...options.value, option]
}

function handleTestamentMenuUpdate(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return
  }

  if (value === 'both' || value === 'old' || value === 'new') {
    testamentOptions.value = value
  }
}

const headerMenuItems = computed<NavigationMenuItem[]>(() => [
  createMenuTriggerItem('Testaments', 'i-lucide-book-open', [
    createMenuActionItem('Both testaments', 'both', checkboxIcon(testamentOptions.value === 'both'), e => selectTestament('both', e)),
    createMenuActionItem('Old Testament', 'old', checkboxIcon(testamentOptions.value === 'old'), e => selectTestament('old', e)),
    createMenuActionItem('New Testament', 'new', checkboxIcon(testamentOptions.value === 'new'), e => selectTestament('new', e))
  ]),
  createMenuTriggerItem('Options', 'i-lucide-list-filter', [
    createMenuActionItem('Divisions', 'divisions', checkboxIcon(options.value.includes('divisions')), e => toggleOption('divisions', e)),
    createMenuActionItem('Categories', 'categories', checkboxIcon(options.value.includes('categories')), e => toggleOption('categories', e)),
    createMenuActionItem('Book length', 'bookLength', checkboxIcon(options.value.includes('bookLength')), e => toggleOption('bookLength', e)),
    createMenuActionItem('Book names', 'bookNames', checkboxIcon(options.value.includes('bookNames')), e => toggleOption('bookNames', e))
  ])
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
  'fixed inset-x-0 !top-auto bottom-0 z-50',
  'border-t border-default bg-default/95',
  'backdrop-blur supports-backdrop-filter:bg-default/80'
].join(' ')
const fullscreenHeaderUi = { root: fullscreenHeaderRootClass }

const navigationMenuUi = computed(() => ({
  root: 'w-full min-w-56',
  viewportWrapper: props.isFullscreen
    ? 'w-full justify-start top-auto bottom-full mb-2'
    : 'w-full justify-start',
  viewport: 'w-72 sm:w-80',
  content: 'w-72 sm:w-80',
  childList: 'grid-cols-1 w-full'
}))
</script>

<template>
  <UHeader :ui="props.isFullscreen ? fullscreenHeaderUi : {}">
    <template #title>
      <UNavigationMenu
        :items="headerMenuItems"
        value-key="value"
        highlight
        :ui="navigationMenuUi"
        @update:model-value="handleTestamentMenuUpdate"
      />
    </template>

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

    <template #right>
      <UButton
        color="primary"
        :icon="showKeyPanel ? 'i-lucide-sliders-horizontal' : 'i-lucide-map'"
        variant="subtle"
        size="md"
        @click="toggleKeyPanel"
      />
      <UButton
        color="primary"
        :icon="props.isFullscreen ? 'i-lucide-minimize' : 'i-lucide-fullscreen'"
        variant="subtle"
        size="md"
        @click="emit('toggleFullscreen')"
      />
    </template>
  </UHeader>
  <div v-bind="$attrs" class="w-full">
    <UPageGrid
      v-if="showKeyPanel"
      :ui="{ base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4' }"
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
