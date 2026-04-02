<script setup lang="ts">
const TOOLTIP_DELAY_MS = 1300
const TOOLTIP_NEIGHBOR_RANGE = 7
const TOOLTIP_UPPER_SIDE_OFFSET = -85
const TOOLTIP_LOWER_SIDE_OFFSET = -45
const testamentOptions = ref<'old' | 'new' | 'both'>('both')

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
  getLayerIcons
} = useBibleLayers(layer)

const {
  tooltipIndex,
  handlePointerEnter,
  handlePointerLeave,
  isTooltipIdle
} = useTooltipHoverState(80)

const { getCategoryColourClass } = useBibleCategoryStyles()

const tooltipBoundary = ref<HTMLElement | null>(null)
const popoverBoundary = ref<HTMLElement | null>(null)
const fullscreenTarget = useTemplateRef<HTMLElement>('fullscreenTarget')
const { isFullscreen, toggle: toggleFullscreen } = useFullscreen(fullscreenTarget)

const containerClass = computed(() => {
  if (isFullscreen.value) {
    return 'w-full max-w-none min-h-screen bg-default text-default py-[12vh] px-[10vw]'
  }

  return 'w-full max-w-none px-0 sm:px-0 lg:px-0'
})

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
</script>

<template>
  <div
    v-if="books"
    ref="fullscreenTarget"
    :class="containerClass"
  >
    <div
      ref="popoverBoundary"
      class="h-64 py-4 flex flex-col justify-end"
    >
      <div ref="tooltipBoundary" class="flex flex-row ">
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
              :portal="!isFullscreen"
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
              :portal="!isFullscreen"
              :open="isTooltipOpen(book.bookEnd, index)"
              :delay-duration="TOOLTIP_DELAY_MS"
              arrow
              :content="{
                align: tooltipIndex === index ? 'center' : (book.bookEnd || 'center'),
                side: 'bottom',
                sideOffset: tooltipIndex === index ? TOOLTIP_UPPER_SIDE_OFFSET : (book.bookAlign ?? TOOLTIP_UPPER_SIDE_OFFSET),
                alignOffset: 0,
                collisionBoundary: tooltipBoundary,
                collisionPadding: 0
              }"
              :ui="{
                content: 'px-1.5 text-sm text-white font-bold bg-neutral-900/70 ring-neutral-900/70',
                arrow: 'fill-neutral-900/70 stroke-neutral-900/70'
              }"
            >
              <div
                class="basis-9/12"
                :style="getDivisionBorderStyle(book.bookEnd)"
                :class="getCategoryColourClass(book.category, optionSet.has('categories'))"
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
    <BibleControls
      v-model:testament-options="testamentOptions"
      v-model:options="options"
      v-model:layer="layer"
      :layers="layers || []"
      :is-fullscreen="isFullscreen"
      class="mt-10"
      @toggle-fullscreen="toggleFullscreen()"
    />
  </div>
</template>

<style>
[data-slot="arrow"] {
  height: 10px;
  width: 8px;
}
</style>
