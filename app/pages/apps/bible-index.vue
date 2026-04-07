<script setup lang="ts">
const TOOLTIP_DELAY_MS = 1300
const TOOLTIP_NEIGHBOR_RANGE = 7
const TOOLTIP_UPPER_SIDE_OFFSET = -85
const TOOLTIP_LOWER_SIDE_OFFSET = -45
const testamentOptions = ref<'old' | 'new' | 'both'>('both')

const showKey = ref(false)

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

const options = ref<string[]>([
  'divisions',
  'categories',
  'bookNames'
])

const optionSet = computed(() => new Set(options.value))

const layer = ref('')

const {
  books,
  booksWithBookEnd,
  bookWidth
} = useBibleIndexData(
  testamentOptions,
  optionSet,
  TOOLTIP_UPPER_SIDE_OFFSET,
  TOOLTIP_LOWER_SIDE_OFFSET
)

const {
  layers,
  layerDetails,
  isPopoverOpen,
  getLayerIcons,
  getPopoverAlign
} = useBibleLayers(layer)

const {
  tooltipIndex,
  handlePointerEnter,
  handlePointerLeave,
  isTooltipIdle
} = useTooltipHoverState(80)

const { getCategoryColourClass } = useBibleCategoryStyles()

const popoverBoundary = ref<HTMLElement | null>(null)

function getBookHeight(bookRank: number) {
  if (optionSet.value.has('bookLength')) {
    return (bookRank / 66) * 100
  }
  return 100
}

function isTooltipOpen(bookEnd: 'start' | 'end' | 'center' | undefined, index: number) {
  if (!optionSet.value.has('bookNames')) {
    return false
  }

  const activeIndex = tooltipIndex.value

  if (isTooltipIdle(activeIndex)) {
    // Idle state: show category boundary labels as the default overview.
    return bookEnd !== 'center'
  }

  const isCurrentBook = activeIndex === index
  const isCategoryBoundary = bookEnd !== 'center'
  const isOutsideNeighborRange = activeIndex >= index + TOOLTIP_NEIGHBOR_RANGE
    || activeIndex <= index - TOOLTIP_NEIGHBOR_RANGE

  return isCurrentBook || (isCategoryBoundary && isOutsideNeighborRange)
}
definePageMeta({
  layout: false
})
</script>

<template>
  <AppSidebarWrapper v-if="books">
    <template #sidebar>
      <BibleControls
        v-model:testament-options="testamentOptions"
        v-model:options="options"
        v-model:layer="layer"
        :layers="layers || []"
      />
    </template>
    <template #sidebar-footer>
      <UButton
        label="Colour key"
        color="neutral"
        icon="i-lucide-map"
        variant="subtle"
        size="md"
        @click="showKey = !showKey"
      />
    </template>
    <template #body>
      <div class="size-full flex flex-col">
        <div ref="popoverBoundary" class="flex basis-3/5 flex-col justify-end">
          <div class="flex flex-row">
            <template
              v-for="(book, index) in booksWithBookEnd"
              :key="book.slug"
            >
              <BibleSeperator
                v-if="book.slug === 'matthew' && testamentOptions === 'new'"
              />
              <div
                :style="`width: ${bookWidth}%;`"
                class="flex flex-col min-h-30"
              >
                <UPopover
                  :open="isPopoverOpen(book.slug)"
                  :arrow="{ rounded: false }"
                  :content="{
                    side: 'top',
                    sideOffset: layerDetails?.emphasise?.includes(book.slug) ? 7 : 4,
                    align: getPopoverAlign(book.slug),
                    collisionBoundary: popoverBoundary,
                    collisionPadding: 0
                  }"
                  :ui="{
                    content: `px-0.5 py-3 ring-inverted/50 dark:bg-inverted
                ${layerDetails?.bringToFront?.includes(book.slug) ? 'z-10 ' : ''},
                ${layerDetails?.emphasise?.includes(book.slug) ? 'p-2 scale-120 shadow-lg/80 ' : ''}`,
                    arrow: 'stroke-inverted/70 dark:fill-inverted'
                  }"
                >
                  <div
                    class="flex flex-col-reverse basis-3/12"
                    :class="{
                      'border-r border-bg': optionSet.has('divisions'),
                      'border-0': !optionSet.has('divisions')
                    }"
                  >
                    <div
                      :style="`height: ${getBookHeight(book.wordCountRank)}%;`"
                      :class="getCategoryColourClass(book.category, false)"
                    />
                  </div>
                  <template #content>
                    <div
                      class="grid gap-2"
                      :class="{
                        'grid-cols-1': getLayerIcons(book.slug).length <= 1,
                        'grid-cols-2': getLayerIcons(book.slug).length > 1 && getLayerIcons(book.slug).length < 7,
                        'grid-cols-3': getLayerIcons(book.slug).length >= 7
                      }"
                    >
                      <div
                        v-for="(icon, i) in getLayerIcons(book.slug)"
                        :key="i"
                        class="flex justify-center"
                      >
                        <UIcon
                          :name="icon"
                          size="60"
                          class="text-default dark:text-inverted"
                        />
                      </div>
                    </div>
                  </template>
                </UPopover>
                <UTooltip
                  :key="index"
                  :open="isTooltipOpen(book.bookEnd, index)"
                  :delay-duration="TOOLTIP_DELAY_MS"
                  arrow
                  :content="{
                    align: tooltipIndex === index ? 'center' : (book.bookEnd || 'center'),
                    side: 'bottom',
                    sideOffset: tooltipIndex === index ? TOOLTIP_UPPER_SIDE_OFFSET : (book.bookAlign ?? TOOLTIP_UPPER_SIDE_OFFSET),
                    alignOffset: 0,
                    collisionBoundary: popoverBoundary,
                    collisionPadding: 0
                  }"
                  :ui="{
                    content: 'px-1.5 text-sm text-white font-bold bg-neutral-900/70 ring-neutral-900/70',
                    arrow: 'fill-neutral-900/70 stroke-neutral-900/70'
                  }"
                >
                  <div
                    class="basis-9/12"
                    :class="[
                      {
                        'border-r border-bg': optionSet.has('divisions') && (!book.bookEnd || book.bookEnd === 'end'),
                        'border-0': !optionSet.has('divisions') || (book.bookEnd && book.bookEnd !== 'end')
                      },
                      getCategoryColourClass(book.category, optionSet.has('categories'))
                    ]"
                    @pointerenter="handlePointerEnter(index)"
                    @pointerleave="handlePointerLeave()"
                  />
                  <template #content>
                    <span
                      @pointerenter="handlePointerEnter(index)"
                      @pointerleave="handlePointerLeave()"
                    >
                      {{ book.shortName || book.name }}
                    </span>
                  </template>
                </UTooltip>
              </div>
              <BibleSeperator
                v-if="book.slug === 'malachi' && testamentOptions !== 'new'"
              />
            </template>
          </div>
        </div>
        <div v-if="showKey" class="basis-2/5 flex flex-col justify-center">
          <UPageGrid
            :ui="{ base: 'relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 p-10' }"
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
      </div>
    </template>
  </AppSidebarWrapper>
</template>

<style>
[data-slot="arrow"] {
  height: 10px;
  width: 8px;
}
</style>
