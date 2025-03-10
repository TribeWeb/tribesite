<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '#ui-pro/utils/content'

const route = useRoute()
const { seo, toc } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data } = await useAsyncData(route.path, () => Promise.all([
  queryCollection('projects').path(route.path).first(),
  queryCollectionItemSurroundings('projects', route.path, {
    fields: ['description']
  })
]), {
  transform: ([page, surround]) => ({ page, surround })
})
if (!data.value || !data.value.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => data.value?.page)
const surround = computed(() => data.value?.surround)

definePageMeta({
  layout: 'projects'
})

useSeoMeta({
  title: page.value?.seo.title,
  ogTitle: `${page.value?.seo.title} - ${seo?.siteName}`,
  description: page.value?.seo.description,
  ogDescription: page.value?.seo.description
})

defineOgImageComponent('Projects', {
  title: page.value?.seo.title,
  description: page.value?.seo.description
  // theme: '#ff0000',
  // colorMode: 'dark'
})

const headline = computed(() => findPageHeadline(navigation?.value, page.value))

const links = computed(() => [toc?.bottom?.edit && {
  icon: 'i-lucide-external-link',
  label: 'Edit this page',
  to: `${toc.bottom.edit}/${page?.value?.path}`,
  target: '_blank'
}, ...(toc?.bottom?.links || [])].filter(Boolean))
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    />
    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />

      <USeparator v-if="surround?.filter(Boolean).length" />

      <UContentSurround :surround="(surround as any)" />
    </UPageBody>
    <template
      v-if="page?.body?.toc?.links?.length"
      #right
    >
      <UContentToc
        :title="toc?.title"
        :links="page.body?.toc?.links"
      >
        <template
          v-if="toc?.bottom"
          #bottom
        >
          <div
            class="hidden lg:block space-y-6"
            :class="{ '!mt-6': page.body?.toc?.links?.length }"
          >
            <USeparator
              v-if="page.body?.toc?.links?.length"
              type="dashed"
            />
            <UPageLinks
              :title="toc.bottom.title"
              :links="links"
            />
          </div>
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
