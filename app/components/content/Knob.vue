<script setup lang="ts">
defineProps<{
  min: number
  max: number
}>()

const value = defineModel<number>({
  type: Number,
  required: true
})
// const value = ref<number>(props.default)
</script>

<template>
  <div class="h-28 flex flex-row">
    <USlider
      v-model="value"
      :min="min"
      :max="max"
      :step="0.01"
      orientation="vertical"
    />
    <div class="flex flex-col gap-2 justify-center items-center">
      <UBadge
        :label="(value * 100).toFixed(0)"
        :ui="{ base: 'flex flex-col w-10' }"
        size="lg"
        variant="soft"
        class="bg-accented"
      />
      <svg width="110" height="110" viewBox="0 0 90 90" xmlns="http://www.w3.org/2000/svg">
        <g :transform="`rotate(+${value * 300} 46 46.64)`">
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
    </div>
  </div>
</template>
