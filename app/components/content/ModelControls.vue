<script setup lang="ts">
defineProps<{
  knobParams: ModelParam[]
  fxGroup: keyof Schema['data']['tone']
}>()

const preset = inject('preset') as Schema
</script>

<template>
  <div class="flex flex-row gap-2 flex-wrap">
    <template v-for="param in knobParams" :key="param?.symbolicID">
      <ControlSet
        v-if="param"
        v-model.scale="(preset.data.tone[fxGroup] as THRGroupEffects)[param.symbolicID as keyof Omit<THRGroupEffects, '@asset' | '@enabled'>]"
        :default="param.default"
        :min="param.min"
        :max="param.max"
        :name="param.name"
      />
    </template>
  </div>
</template>
