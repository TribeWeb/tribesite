<script setup lang="ts">
const parsed = schemaPreset.parse(defaultPreset)
const preset = ref<Schema>(parsed)

provide('preset', preset)
</script>

<template>
  <div class="flex flex-col gap-4">
    <pre>{{ preset.data.tone.THRGroupAmp }}</pre>
    <h2 class="text-2xl font-bold text-primary">
      THR Editor
    </h2>
    <p class="text-sm">
      Select an amp model and adjust the controls below to customize your sound.
    </p>
    <AmpSelector v-model="preset.data.tone.THRGroupAmp['@asset' as keyof Pick<THRGroupAmp, '@asset'>]" />
    <SpeakerSimulator v-model="preset.data.tone.THRGroupCab.SpkSimType" />
  </div>
</template>
