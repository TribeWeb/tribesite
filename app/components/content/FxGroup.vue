<script setup lang="ts">
const props = defineProps<{
  fxGroup: keyof Schema['data']['tone']
}>()

const models = [...modelsAmps, ...modelsComp, ...modelsEffect, ...modelsReverb, ...modelsEcho, ...modelsFixed]

const preset = inject('preset') as Ref<Schema>
const keysToRemove = ['@asset', '@enabled']

const presetFX = computed(() => preset.value.data.tone[props.fxGroup])
const presetFXAsset = computed(() => (presetFX.value as { '@asset': Model['symbolicID'] })['@asset'])

const groupModels = computed(() => models.filter(model => assetsList[props.fxGroup as keyof typeof assetsList]?.includes(model.symbolicID)))
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
  const paramsToRemove = oldParams.filter(
    oldParam => !newParams.map(
      newParam => newParam.symbolicID).includes(oldParam.symbolicID)
  )

  const paramObjToAdd = Object.fromEntries(newParams.map((param) => {
    return [param.symbolicID, param.default]
  }))
  const paramObjToRemove = Object.fromEntries(paramsToRemove.map((param) => {
    return [param.symbolicID, undefined]
  }))
  const defaults = { ...paramObjToAdd, ...paramObjToRemove }
  Object.assign(preset.value.data.tone[props.fxGroup], { ...defaults })
})
</script>

<template>
  <UCard
    class="w-fit"
    :ui="{ body: props.fxGroup === 'THRGroupAmp' ? 'p-0 sm:p-0' : '',
           root: props.fxGroup === 'THRGroupAmp' ? 'ring-0 rounded-none overflow-visible' : ''
    }"
  >
    <div class="flex flex-col gap-6">
      <div v-if="hasSwitch" class="flex flex-0 flex-row gap-x-4 gap-y-6 flex-wrap justify-between items-center">
        <USwitch
          v-model="(preset.data.tone[props.fxGroup] as { '@enabled': boolean })['@enabled']"
          size="lg"
          color="success"
          class="on"
        />
        <URadioGroup
          v-model="(preset.data.tone[props.fxGroup] as { '@asset': Model['symbolicID'] })['@asset']"
          :items="items"
          orientation="horizontal"
          value-key="symbolicID"
          label-key="name"
          size="xs"
          variant="table"
          :class="(preset.data.tone[props.fxGroup] as { '@enabled': boolean })['@enabled'] ? '' : 'opacity-75' "
        />
      </div>
      <Transition name="slide-fade">
        <div v-if="!disableControls" class="flex flex-row gap-x-4 gap-y-6 flex-wrap">
          <ModelControls :knob-params="knobParams" :fx-group />
        </div>
      </Transition>
    </div>
  </UCard>
</template>

<style>
.on button[data-state="checked"] {
  color: var(--color-success);
  box-shadow: 0px 0px 8px 2px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  transform: translateX(10px);
  opacity: 0;
}
</style>
