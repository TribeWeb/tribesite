<script setup lang="ts">
const { songSections } = defineProps<{
  songSections: Record<string, string> | undefined
}>()

const sectionList = [
  { section: 'verse1', label: 'V1' },
  { section: 'chorus1', label: 'Ch' },
  { section: 'verse2', label: 'V2' }
]

const limitedSections = computed(() => {
  return sectionList.filter(({ section }) => songSections?.[section]).slice(0, 2)
})
</script>

<template>
  <template v-for="({ section, label }) in limitedSections" :key="section">
    <UAvatar size="sm" class="self-center">
      {{ label }}
    </UAvatar>
    <p class="basis-1/2 whitespace-pre pt-1 truncate line-clamp-2">
      {{ songSections?.[section] }}
    </p>
  </template>
</template>
