<script setup lang="ts">
import { executeTransition, TransitionPresets } from '@vueuse/core'

const props = defineProps<{
  value: number
}>()

const knobPosition = computed(() => props.value)
const knobEase = ref(props.value)

watch(knobPosition, async (to, from) => {
  await executeTransition(knobEase, from, to, {
    duration: 300,
    transition: TransitionPresets.easeOutCirc
  })
})
</script>

<template>
  <svg width="110" height="110" viewBox="0 0 92 92" xmlns="http://www.w3.org/2000/svg">
    <g :transform="`rotate(+${knobEase * 300} 46 46.64)`">
      <circle
        cx="46"
        cy="46.64"
        r="45"
        fill="var(--ui-bg-accented)"
      />
      <path
        id="arm"
        d="M 26 12 Q 28 10 31 13 Q 46 23 61 13 Q 64 10 66 12 L 46 46.64 Z"
        fill="var(--ui-primary)"
        stroke="var(--ui-primary)"
        stroke-width="2"
        stroke-linecap="round"
      />
      <use href="#arm" transform="rotate(+60 46 46.64)" />
      <use href="#arm" transform="rotate(+120 46 46.64)" />
      <use href="#arm" transform="rotate(+180 46 46.64)" />
      <use href="#arm" transform="rotate(+240 46 46.64)" />
      <use href="#arm" transform="rotate(+300 46 46.64)" />
      <path
        d="M 38 46.64 L 9 46.64"
        stroke="var(--ui-bg)"
        stroke-width="5"
        stroke-linecap="round"
        transform="rotate(+300 46 46.64)"
      />
    </g>
  </svg>
</template>
