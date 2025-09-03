<script setup lang="ts">
import { THRGroupFX2EffectAssets, type ModelParam, type Schema } from '~/utils/schemas'

const props = defineProps<{
  fxGroup: keyof Schema['data']['tone']
}>()

const models = [...modelsAmps, ...modelsComp, ...modelsEffect, ...modelsReverb, ...modelsEcho, ...modelsFixed]

const preset = inject('preset') as Ref<Schema>
const keysToRemove = ['@asset', '@enabled']

const presetFX = computed(() => preset.value.data.tone[props.fxGroup])
const presetFXAsset = computed(() => (presetFX.value as { '@asset': Model['symbolicID'] })['@asset'])

const groupModels = computed(() => models.filter(model => THRGroupFX2EffectAssets.includes(model.symbolicID)))
const items = computed(() => groupModels.value.map(model => ({ symbolicID: model.symbolicID, name: model.name })))

const model = computed(() => models.find(model => model.symbolicID === presetFXAsset.value) as Model)
const modelParams = computed(() => model.value?.params as ModelParam[] || [])
const knobParams = computed(() => modelParams.value.filter(param => !keysToRemove.includes(param.symbolicID)))

const hasSwitch = computed(() => '@enabled' in preset.value.data.tone[props.fxGroup])
const disableControls = computed(() => {
  return hasSwitch.value && !(preset.value.data.tone[props.fxGroup] as { '@enabled': boolean })['@enabled']
    ? true
    : false
})
provide('disableControls', disableControls)
watch(modelParams, (newParams, oldParams) => {
  const removeParams = oldParams.filter(oldParam => !newParams.map(newParam => newParam.symbolicID).includes(oldParam.symbolicID))
  const addObj = Object.fromEntries(newParams.map((param) => {
    return [param.symbolicID, param.default]
  }))
  const removeObj = Object.fromEntries(removeParams.map((param) => {
    return [param.symbolicID, undefined]
  }))
  const defaults = { ...addObj, ...removeObj }
  Object.assign(preset.value.data.tone[props.fxGroup], { ...defaults })
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-if="hasSwitch" class="flex flex-row gap-x-4 gap-y-6 flex-wrap">
      <USelect
        v-model="(preset.data.tone[props.fxGroup] as { '@asset': Model['symbolicID'] })['@asset']"
        :items="items"
        value-key="symbolicID"
        label-key="name"
        size="lg"
        class="w-72"
        color="primary"
        variant="soft"
      />
      <USwitch
        v-model="(preset.data.tone[props.fxGroup] as { '@enabled': boolean })['@enabled']"
        checked-icon="i-lucide-check"
      />
    </div>
    <div class="flex flex-row gap-x-4 gap-y-6 flex-wrap">
      <ModelControls :knob-params="knobParams" :fx-group />
    </div>
    <pre>{{ presetFXAsset }}</pre>
    <pre>{{ preset.data.tone[props.fxGroup] }}</pre>
  </div>
</template>
