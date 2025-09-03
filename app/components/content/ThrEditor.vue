<script setup lang="ts">
const parsed = schemaPreset.parse(defaultPreset)
const preset = ref<Schema>(parsed)

provide('preset', preset)
</script>

<template>
  <div class="flex flex-col gap-4">
    <h2 class="text-2xl font-bold text-primary">
      <UIcon name="i-lucide:factory" /> {{ preset.data.meta.name }}
    </h2>
    <AmpSelector v-model="preset.data.tone.THRGroupAmp['@asset' as keyof Pick<THRGroupAmp, '@asset'>]" />
    <FxGroup :fx-group="'THRGroupFX2Effect'" />
  </div>
</template>
