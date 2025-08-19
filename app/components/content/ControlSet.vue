<script setup lang="ts">
defineProps<{
  min: number
  max: number
  name: string
}>()

const [value, modifiers] = defineModel<number>({
  type: Number,
  required: true,
  get(value) {
    if (modifiers.scale) {
      return Number(value.toFixed(6)) * 100
    }
    return value
  },
  set(value) {
    if (modifiers.scale) {
      return value / 100
    }
    return value
  }
})
</script>

<template>
  <div class="flex flex-col items-center gap-1">
    <div class="h-28 flex flex-row">
      <USlider
        v-model="value"
        :min="min"
        :max="max * 100"
        :step="1"
        orientation="vertical"
        :ui="{ thumb: 'rounded-xs h-2' }"
      />
      <div class="flex flex-col gap-2 justify-center items-center">
        <UInputNumber
          v-model="value"
          :min="min"
          :max="max * 100"
          :step="1"
          size="sm"
          :ui="{ base: 'flex flex-col w-16 bg-elevated' }"
          orientation="vertical"
          variant="soft"
          :format-options="{
            maximumFractionDigits: 0
          }"
        />
        <ControlKnob :value="value / 100" />
      </div>
    </div>
    <h3 class=" font-bold text-center text-primary">
      {{ name }}
    </h3>
  </div>
</template>
