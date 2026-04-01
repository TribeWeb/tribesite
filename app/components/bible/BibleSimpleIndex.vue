<script setup lang="ts">
import type { CheckboxGroupItem, RadioGroupItem } from '@nuxt/ui'

const TOOLTIP_RESET_MS = 2000
const TOOLTIP_DELAY_MS = 1300
const TOOLTIP_NEIGHBOR_RANGE = 7
const TOOLTIP_UPPER_SIDE_OFFSET = -85
const TOOLTIP_LOWER_SIDE_OFFSET = -45

const testamentItems = ref<RadioGroupItem[]>([
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
])

const testamentOptions = ref<'old' | 'new' | 'both'>('both')

const items = ref<CheckboxGroupItem[]>([
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
])

type BaseCategory = 'history' | 'experience' | 'prophecy'

const categoryPalette: Record<BaseCategory, { solid: string, gradient: string, icon: string }> = {
  history: {
    solid: 'bg-history-700',
    gradient: 'bg-gradient-to-b from-history-700 from-10% to-history-500',
    icon: 'text-history-700'
  },
  experience: {
    solid: 'bg-experience-700',
    gradient: 'bg-gradient-to-b from-experience-700 from-10% to-experience-500',
    icon: 'text-experience-700'
  },
  prophecy: {
    solid: 'bg-prophecy-700',
    gradient: 'bg-gradient-to-b from-prophecy-700 from-10% to-prophecy-500',
    icon: 'text-prophecy-700'
  }
}

const options = ref([
  'divisions',
  'categories',
  'bookNames'
])

const optionSet = computed(() => new Set(options.value))

const { data: books } = await useAsyncData('bible-books', () => {
  return queryCollection('bibleBooks').all()
})

const { data: layers } = await useAsyncData('bible-index-layers', () => {
  return queryCollection('bibleIndexLayers').all()
})

const layer = ref('')

const layerDetails = computed(() => {
  return layers.value?.find(l => l.layerId === layer.value)
})

const openBookSlugSet = computed(() => {
  return new Set(Object.keys(layerDetails.value?.icons ?? {}))
})

const filteredBooks = computed(() => {
  return (books.value || []).filter((book) => {
    return testamentOptions.value === book.testament || testamentOptions.value === 'both'
  })
})

const bookWidth = computed(() => filteredBooks.value ? 100 / filteredBooks.value.length : 0)

function getBookEnds(bookCategory: string, thisBookCategory: string) {
  if (optionSet.value.has('categories')) {
    return bookCategory !== thisBookCategory
  }
  return bookCategory?.split('-')[0] !== thisBookCategory.split('-')[0]
}

const booksWithBookEnd = computed(() => {
  return (filteredBooks.value || []).map((book, index, allBooks) => {
    const previousBook = allBooks[index - 1]
    const nextBook = allBooks[index + 1]
    const isCategoryStart = previousBook ? getBookEnds(previousBook?.category, book.category) : true
    const isCategoryEnd = nextBook ? getBookEnds(nextBook?.category, book.category) : true
    const isLastBook = index === allBooks.length - 1

    let bookEnd: 'start' | 'end' | 'center' | undefined = 'center'
    let bookAlign: typeof TOOLTIP_UPPER_SIDE_OFFSET | typeof TOOLTIP_LOWER_SIDE_OFFSET = TOOLTIP_UPPER_SIDE_OFFSET

    if (isCategoryEnd) {
      bookEnd = 'end'
      bookAlign = isLastBook ? TOOLTIP_UPPER_SIDE_OFFSET : TOOLTIP_LOWER_SIDE_OFFSET
    } else if (isCategoryStart) {
      bookEnd = 'start'
    }

    return {
      ...book,
      bookEnd,
      bookAlign
    }
  })
})

const tooltipIndex = ref<number>(-100)
const { ready, start } = useTimeout(TOOLTIP_RESET_MS, { controls: true })
watch(ready, (isReady) => {
  if (isReady) {
    tooltipIndex.value = -100
  }
})

const tooltipBoundary = ref<HTMLElement | null>(null)
const popoverBoundary = ref<HTMLElement | null>(null)
const keyPopoverBoundary = ref<HTMLElement | null>(null)

function getBookHeight(bookRank: number) {
  if (optionSet.value.has('bookLength')) {
    return (bookRank / 66) * 100
  }
  return 100
}

function getDivisionBorderStyle(bookEnd?: 'start' | 'end' | 'center') {
  if (optionSet.value.has('divisions')) {
    if (bookEnd && bookEnd !== 'end') {
      return 'border: none;'
    }
    return 'border-right: 1px solid var(--ui-bg);'
  }

  return 'border: none;'
}

function getBaseCategory(category: string): BaseCategory {
  const [base] = category.split('-')
  if (base === 'history' || base === 'experience' || base === 'prophecy') {
    return base
  }
  return 'history'
}

function getCategoryColourClass(category: string, useGradient: boolean) {
  const base = getBaseCategory(category)
  const shouldUseGradient = useGradient && !category.endsWith('-entry')
  return shouldUseGradient ? categoryPalette[base].gradient : categoryPalette[base].solid
}

const keyFeatures = computed(() => {
  return [
    {
      key: 'history',
      title: 'Books of History',
      description: 'Carry the core historical narrative and redemptive storyline.',
      leadingIcon: `${categoryPalette.history.icon} size-12`
    },
    {
      key: 'experience',
      title: 'Books of Experience',
      description: 'Books of letters, poetry and philosophy with collections of songs and wise sayings.',
      leadingIcon: `${categoryPalette.experience.icon} size-12`
    },
    {
      key: 'prophecy',
      title: 'Books of Prophecy',
      description: 'Books and collections by the prophets containing visions and apocalyptic writings.',
      leadingIcon: `${categoryPalette.prophecy.icon} size-12`
    }
  ]
})

const keyFeatureUiBase = {
  root: 'mb-2',
  title: 'text-md',
  description: 'text-sm'
}

function getKeyFeatureUi(leadingIcon: string) {
  return {
    ...keyFeatureUiBase,
    leadingIcon
  }
}

function isTooltipOpen(bookEnd: 'start' | 'end' | 'center' | undefined, index: number) {
  if (!optionSet.value.has('bookNames')) {
    return false
  }

  return ((bookEnd !== 'center' && (tooltipIndex.value >= index + TOOLTIP_NEIGHBOR_RANGE || tooltipIndex.value <= index - TOOLTIP_NEIGHBOR_RANGE))
    || tooltipIndex.value === index)
}

function isPopoverOpen(bookSlug: string) {
  return openBookSlugSet.value.has(bookSlug)
}

function getLayerIcons(bookSlug: string) {
  const iconsForBook = layerDetails.value?.icons?.[bookSlug]
  if (iconsForBook && iconsForBook.length > 0) {
    return iconsForBook
  }

  return layerDetails.value?.defaultIcons ?? []
}
</script>

<template>
  <div v-if="books" ref="keyPopoverBoundary">
    <div ref="popoverBoundary" class="h-64 py-4 flex flex-col justify-end">
      <div ref="tooltipBoundary" class="flex flex-row ">
        <template
          v-for="(book, index) in booksWithBookEnd"
          :key="book.slug"
        >
          <div
            :style="`width: ${bookWidth}%;`"
            class="flex flex-col min-h-30"
          >
            <UPopover
              :open="isPopoverOpen(book.slug)"
              :arrow="{ rounded: false }"
              :content="{
                side: 'top',
                collisionBoundary: popoverBoundary,
                collisionPadding: 0
              }"
              :ui="{
                content: layerDetails?.bringToFront?.includes(book.slug)
                  ? 'z-10 px-0.5 py-3 ring-inverted/50 dark:bg-inverted'
                  : 'px-0.5 py-3 ring-inverted/50 dark:bg-inverted',
                arrow: 'stroke-inverted/70 dark:fill-inverted'
              }"
            >
              <div
                :style="getDivisionBorderStyle()"
                class="flex flex-col-reverse basis-3/12"
              >
                <div
                  :style="`height: ${getBookHeight(book.wordCountRank)}%;`"
                  :class="getCategoryColourClass(book.category, false)"
                />
              </div>
              <template #content>
                <UIcon
                  v-for="(icon, i) in getLayerIcons(book.slug)"
                  :key="i"
                  :name="icon"
                  size="60"
                  class="text-default dark:text-inverted"
                />
              </template>
            </UPopover>
            <UTooltip
              :key="index"
              :open="isTooltipOpen(book.bookEnd, index)"
              :delay-duration="TOOLTIP_DELAY_MS"
              arrow
              :content="{
                align: tooltipIndex === index ? 'center' : book.bookEnd,
                side: 'bottom',
                sideOffset: tooltipIndex === index ? TOOLTIP_UPPER_SIDE_OFFSET : book.bookAlign,
                alignOffset: 0,
                collisionBoundary: tooltipBoundary,
                collisionPadding: 0
              }"
              :text="book.shortName || book.name"
              :ui="{
                content: 'px-1.5 text-sm text-white font-bold bg-neutral-900/70 ring-neutral-900/70',
                arrow: 'fill-neutral-900/70 stroke-neutral-900/70'
              }"
            >
              <div
                class="basis-9/12"
                :style="getDivisionBorderStyle(book.bookEnd)"
                :class="getCategoryColourClass(book.category, optionSet.has('categories'))"
                @pointerenter="tooltipIndex = index, start()"
              />
            </UTooltip>
          </div>
          <USeparator
            v-if="book.slug === 'malachi'"
            orientation="vertical"
            class="self-stretch mx-0.5"
            icon="i-material-symbols-menu-book-rounded"
            type="dashed"
            color="neutral"
            :ui="{ icon: 'text-neutral-700', border: 'border-neutral-700' }"
          />
        </template>
      </div>
    </div>
    <div class="flex flex-row items-start gap-x-4 mt-10">
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
        :items="items"
        size="sm"
        variant="table"
        orientation="vertical"
        class="w-48"
      />

      <div class="w-70 flex flex-row place-self-start gap-x-1">
        <USelect
          v-model="layer"
          :items="layers"
          leading
          value-key="layerId"
          label-key="title"
          placeholder="Image overlays"
          class="w-64"
        />
        <UButton
          v-if="layerDetails"
          icon="i-lucide-x"
          variant="soft"
          size="sm"
          @click="layer = ''"
        />
      </div>
      <UPopover
        class="ml-auto self-start"
        :arrow="{ rounded: false }"
        :content="{
          side: 'left',
          align: 'start',
          alignOffset: 0,
          collisionBoundary: keyPopoverBoundary,
          collisionPadding: 0
        }"
        :ui="{ content: 'max-w-[min(95vw,56rem)] overflow-x-auto' }"
      >
        <UButton
          icon="i-lucide-key"
          variant="solid"
          size="sm"
          color="primary"
        />
        <template #content>
          <UPageGrid :ui="{ base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-4' }">
            <UPageFeature
              v-for="feature in keyFeatures"
              :key="feature.key"
              :title="feature.title"
              :description="feature.description"
              icon="i-mdi-square-rounded"
              :ui="getKeyFeatureUi(feature.leadingIcon)"
            />
            <UPageFeature
              v-if="optionSet.has('categories')"
              title="Books of Entry"
              description="Gradient colours are for books that follow collections that serve as entry points to each set of writings."
              icon="i-mdi-square-rounded"
              :ui="getKeyFeatureUi('text-neutral-200 size-12')"
            />
          </UPageGrid>
        </template>
      </UPopover>
    </div>
  </div>
</template>

<style>
[data-slot="arrow"] {
  height: 10px;
  width: 8px;
}
</style>
