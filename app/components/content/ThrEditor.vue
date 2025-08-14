<script setup lang="ts">
import type { z } from 'zod'

type Schema = z.output<typeof schemaPreset>
const parsed = schemaPreset.parse(defaultPreset)
const preset = reactive<Schema>(parsed)
</script>

<template>
  <div>
    <Knob
      v-model="preset.data.tone.THRGroupAmp.Mid"
      :default="0.34"
      :min="0"
      :max="1"
    />

    <pre>{{ preset.data.tone.THRGroupAmp }}</pre>
    <!-- <pre>{{ preset }}</pre> -->
  </div>
</template>
