<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { findPageHeadline } from '#ui-pro/utils/content'

const route = useRoute()
const { seo } = useAppConfig()
const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')

const { data } = await useAsyncData(route.path, () => Promise.all([
  queryCollection('projectLanding').path(route.path).first(),
  queryCollection('projects').all()
]), {
  transform: ([page, posts]) => ({ page, posts })
})
if (!data.value || !data.value.page) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const page = computed(() => data.value?.page)
const posts = computed(() => data.value?.posts)

definePageMeta({
  layout: 'projects'
})

useSeoMeta({
  title: page.value?.seo.title,
  ogTitle: `${page.value?.seo.title} - ${seo?.siteName}`,
  description: page.value?.seo.description,
  ogDescription: page.value?.seo.description
})

defineOgImageComponent('Docs')

const headline = computed(() => findPageHeadline(navigation?.value, page.value))

// const links = computed(() => [toc?.bottom?.edit && {
//   icon: 'i-lucide-external-link',
//   label: 'Edit this page',
//   to: `${toc.bottom.edit}/${page?.value?.path}`,
//   target: '_blank'
// }, ...(toc?.bottom?.links || [])].filter(Boolean))
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
    />
    <UPageHero title="Projects" />
    <UPageBody>
      <UBlogPosts>
        <UBlogPost
          v-for="(post, index) in posts"
          :key="index"
          v-bind="post"
          :to="post.path"
        />
      </UBlogPosts>
    </UPageBody>
  </UPage>
</template>
