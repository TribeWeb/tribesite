<script setup lang="ts">
const { keyId, variant, color } = defineProps<{
  keyId: string
  variant?: 'solid' | 'outline' | 'soft' | 'subtle'
  color?: 'error' | 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'neutral'
}>()

const accidental = computed(() => {
  if (keyId.includes('#')) {
    return '#'
  } else if (keyId.includes('b')) {
    return '♭'
  } else {
    return null
  }
})

const tonic = computed(() => {
  return keyId.charAt(0).toUpperCase()
})

const majorMinor = computed(() => {
  if (keyId.endsWith('minor')) {
    return 'm'
  } else {
    return ''
  }
})
</script>

<template>
  <UBadge
    :color="color ?? 'primary'"
    :variant="variant ?? 'solid'"
    class="flex justify-center font-music text-sm font-bold rounded-sm ml-1"
    :ui="{ base: 'py-0' }"
  >
    {{ tonic }}
    <span v-if="accidental">{{ accidental }}</span>
    {{ majorMinor }}
  </UBadge>
</template>
