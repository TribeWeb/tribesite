<script setup lang="ts">
import type { ChannelColours } from './AmpSelector.vue'

defineProps<{
  colour: ChannelColours
}>()

const style = defineModel<AmpMap['styleId']>('style', {
  default: 'classic'
})

const styleList = [...new Set(ampsMap.map(amp => amp.styleId))]
const styleItems = computed(() => styleList.map((styleId) => {
  return { value: styleId,
    label: ampsMap.find(amp => amp.styleId === styleId)?.style ?? ''
  }
}))
</script>

<template>
  <URadioGroup
    v-model="style"
    variant="table"
    orientation="horizontal"
    :items="styleItems"
    :color="colour"
    :ui="{ item: 'has-data-[state=checked]:border-muted has-data-[state=checked]:bg-elevated' }"
  />
</template>
