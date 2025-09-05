<script setup lang="ts">
const parsed = schemaPreset.parse(defaultPreset)
const preset = ref<Schema>(parsed)

const text = computed(() => JSON.stringify(preset.value, null, 2))
const encoded = computed(() => encodeURIComponent(text.value))
const href = computed(() => `data:application/json;charset=utf-8,${encoded.value}`)
const filename = '10. Liquid Solo.json'

provide('preset', preset)
</script>

<template>
  <div class="flex flex-col gap-4">
    <a :href="href" :download="filename" class="btn">Download</a>
    <PresetList />
    <h2 class="text-2xl font-bold text-primary">
      <UIcon name="i-lucide:factory" /> {{ preset.data.meta.name }}
    </h2>
    <AmpSelector v-model="preset.data.tone.THRGroupAmp['@asset' as keyof Pick<THRGroupAmp, '@asset'>]" />
    <div class="flex flex-row gap-4 justify-between">
      <div class="flex flex-col gap-4">
        <FxGroup :fx-group="'THRGroupFX1Compressor'" />
      </div>
      <div class="flex flex-col gap-4">
        <FxGroup :fx-group="'THRGroupGate'" />
      </div>
    </div>
    <div class="flex flex-row-reverse gap-4">
      <div class="flex flex-col gap-4 place-items-end">
        <FxGroup :fx-group="'THRGroupFX2Effect'" />
        <FxGroup :fx-group="'THRGroupFX3EffectEcho'" />
        <FxGroup :fx-group="'THRGroupFX4EffectReverb'" />
      </div>
    </div>
  </div>
</template>
