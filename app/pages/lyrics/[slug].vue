<script setup lang="ts">
const LYRIC_ASPECT_RATIO = 16 / 9
const LYRIC_MIN_FONT_SIZE = 16
const LYRIC_MAX_FONT_SIZE = 120
const LYRIC_FONT_FILL = 0.82 // percentage of the box the lyrics should fill, to leave some padding

const route = useRoute()

const { data: song } = await useAsyncData(`song-${route.path}`, () => {
  return queryCollection('lyrics').path(route.path).first()
})

const open = useState('lyrics-drawer-open', () => false)

const lyricsWrapper = useTemplateRef('lyricsWrapper')
const { width: containerWidth } = useElementSize(lyricsWrapper)
const { height: windowHeight } = useWindowSize()

const actualBoxWidth = computed(() =>
  Math.min(containerWidth.value, windowHeight.value * LYRIC_ASPECT_RATIO)
)

type MinimarkTuple = [tag: string, props: Record<string, string>, text: string]

const sectionTexts = computed(() =>
  ((song.value?.body?.value ?? []) as MinimarkTuple[])
    .filter(([tag]) => tag === 'p')
    .map(([,, text]) => text)
    .filter(Boolean)
)

const lyricFontSize = computed(() => {
  if (!actualBoxWidth.value || !sectionTexts.value.length) return LYRIC_MIN_FONT_SIZE
  const boxW = actualBoxWidth.value * LYRIC_FONT_FILL
  const boxH = (boxW / LYRIC_ASPECT_RATIO) * LYRIC_FONT_FILL
  const maxLines = useMaxSectionLineCount(sectionTexts.value)
  const maxChars = useMaxLineLengthAcrossSong(sectionTexts.value)
  const byHeight = maxLines > 0 ? boxH / maxLines : LYRIC_MAX_FONT_SIZE
  const byWidth = maxChars > 0 ? (boxW * 2) / maxChars : LYRIC_MAX_FONT_SIZE
  return Math.min(Math.max(Math.min(byHeight, byWidth), LYRIC_MIN_FONT_SIZE), LYRIC_MAX_FONT_SIZE)
})
</script>

<template>
  <UPage v-if="song" :ui="{ right: 'lg:pe-0' }">
    <UPageBody class="pb-0 mt-0">
      <div
        ref="lyricsWrapper"
        class="flex flex-col items-center transition-[padding-right] duration-200"
        :class="{ 'pr-80': open }"
        :style="{ '--lyric-aspect-ratio': String(LYRIC_ASPECT_RATIO), '--lyric-font-size': `${lyricFontSize}px` }"
      >
        <ContentRenderer
          :value="song.body"
        />
      </div>
      <UDrawer
        v-model:open="open"
        direction="right"
        :dismissible="false"
        :modal="false"
        :handle="false"
        :ui="{ content: 'w-80' }"
      >
        <template #header>
          <div class="flex flex-row items-center gap-x-2">
            <NuxtLink to="/">
              <AppLogo
                v-bind="{ class: 'h-7 w-auto' }"
                primary="var(--ui-primary)"
                accent="var(--ui-secondary)"
              />

            </NuxtLink>
            <span
              class="mt-2 font-feature text-xl text-primary tracking-[-0.035em] font-bold"
            >nobletheme</span>
          </div>
        </template>
        <template #body>
          <NobleSideBarContents :song="song" />
        </template>
        <template #footer>
          <NobleLyricsSync />
        </template>
      </UDrawer>
    </UPageBody>

    <div
      class="fixed bottom-2 flex z-50 transition-[right] duration-200"
      :style="{ right: open ? 'calc(20rem + 0.5rem)' : '0.5rem' }"
    >
      <UTooltip
        :text="open ? 'Close sidebar' : 'Open sidebar'"
        :kbds="['meta', 'o']"
      >
        <UButton
          :icon="open ? 'i-lucide-panel-right-close' : 'i-lucide-panel-right-open'"
          color="neutral"
          size="lg"
          variant="outline"
          :aria-label="open ? 'Close sidebar' : 'Open sidebar'"
          class="bg-transparent backdrop-blur-md"
          @click="open = !open"
        />
      </UTooltip>
    </div>
  </UPage>
</template>
