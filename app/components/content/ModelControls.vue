<script setup lang="ts">
defineProps<{
  ampModel: Partial<Model> | undefined
}>()

const preset = inject('preset') as Schema
</script>

<template>
  <div class="flex flex-row gap-2 flex-wrap">
    <template v-for="control in ampModel?.params" :key="control.symbolicID">
      <ControlSet
        v-model.scale="preset.data.tone.THRGroupAmp[control.symbolicID as keyof Omit<THRGroupAmp, '@asset'>]"
        :default="control.default"
        :min="control.min"
        :max="control.max"
        :name="control.name"
      />
    </template>
  </div>
</template>
