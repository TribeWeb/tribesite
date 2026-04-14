<script setup lang="ts">
const route = useRoute()
// const slideAspectRatio = 16 / 9

const { data: song } = await useAsyncData(`song-${route.path}`, () => {
  return queryCollection('lyrics').path(route.path).first()
})

// const sectionTexts = computed(() =>
//   Object.keys(lyricSections)
//     .map(key => (song.value as Record<string, string> | undefined)?.[key])
//     .filter((t): t is string => !!t)
// )

// const pageHeight = computed(() => bodyBuilder.value?.slides.value.length ? bodyBuilder.value.slides.value.length * height.value : 0)

// const maxLines = computed(() => useMaxSectionLineCount(sectionTexts.value))
// const maxChars = computed(() => useMaxLineLengthAcrossSong(sectionTexts.value))

// const slideSize = computed(() => {
//   if (!width.value || !height.value) return
//   if ((width.value / slideAspectRatio) > height.value) {
//     // height is the limiting factor
//     const sizeBasedOnHeight = height.value / (maxLines.value + 2)
//     return {
//       slideHeight: height.value,
//       fontSize: sizeBasedOnHeight,
//       aspect: slideAspectRatio,
//       viewportHeight: height.value,
//       viewportWidth: width.value
//     }
//   } else {
//     // width is the limiting factor
//     const sizeBasedOnWidth = (width.value / (maxChars.value + 4)) * 2
//     return {
//       slideHeight: width.value / slideAspectRatio,
//       fontSize: sizeBasedOnWidth,
//       aspect: slideAspectRatio,
//       viewportHeight: height.value,
//       viewportWidth: width.value
//     }
//   }
// })

// const elHeight = useTemplateRef('elHeight')
// const { height } = useElementSize(elHeight)
// const elWidth = useTemplateRef('elWidth')
// const { width } = useElementSize(elWidth)
</script>

<template>
  <UContainer>
    <UPage v-if="song" :ui="{ right: 'lg:pe-0' }">
      <UPageBody class="pb-0 mt-0">
        <ContentRenderer
          :value="song.body"
          class="flex flex-col items-center"
        />
      </UPageBody>
      <template #right>
        <UPageAside
          :ui="{ container: 'flex flex-col items-center items-stretch gap-y-4',
                 topFooter: 'hidden'
          }"
        >
          <template #top>
            <div class="flex flex-row items-center gap-x-2">
              <NuxtLink
                to="/"
              >
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
          <USeparator type="dashed" />
          <UContentSearchButton variant="subtle" :collapsed="false" :kbds="['meta', 'k']">
            <NobleSearch />
          </UContentSearchButton>
          <USeparator type="dashed" />

          <UContentToc
            highlight
            :links="song?.body?.toc?.links"
            :title="song.title"
            :ui="{ root: 'top-0 px-0 sm:px-0', container: 'lg:pt-0 lg:py-0' }"
          />
          <USeparator type="dashed" />
          <NobleSongShortlist :song="song" />
        </UPageAside>
      </template>
    </UPage>
  </UContainer>
</template>
