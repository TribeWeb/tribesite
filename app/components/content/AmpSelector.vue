<script setup lang="ts">
export type ChannelColours = 'error' | 'success' | 'info' | 'neutral'
const colourMap = { modern: 'success', boutique: 'info', classic: 'error' }

const style = defineModel<AmpMap['styleId']>('style', {
  default: 'classic'
})

const channel = defineModel<AmpMap['channelId']>('channel', {
  default: 'clean'
})

const preset = inject('preset') as Ref<Schema>

const ampDetails = computed(() => ampsMap.find(amp => amp.channelId === channel.value && amp.styleId === style.value) as AmpMap)
const ampModel = computed(() => modelsAmps.find(amp => amp.symbolicID === preset.value.data.tone.THRGroupAmp['@asset']) as Model)

watch(ampDetails, (newAmp: AmpMap) => {
  preset.value.data.tone.THRGroupAmp['@asset'] = newAmp?.symbolicID || 'THR10C_Deluxe'
})

watch(preset, () => {
  style.value = ampsMap.find(amp => amp.symbolicID === preset.value.data.tone.THRGroupAmp['@asset'])?.styleId || 'classic'
  channel.value = ampsMap.find(amp => amp.symbolicID === preset.value.data.tone.THRGroupAmp['@asset'])?.channelId || 'clean'
})

const colour = computed(() => colourMap[style.value as keyof typeof colourMap] as ChannelColours)
const colourVar = computed(() => `var(--ui-${colour.value})`)
</script>

<template>
  <div class="flex flex-col gap-6">
    <StyleSelector v-model:style="style" :colour="colour" />
    <div class="flex flex-row gap-x-4 gap-y-6 flex-wrap">
      <ChannelSelector v-model:channel="channel" :colour="colour" />
      <ModelControls v-model="preset.data.tone.THRGroupAmp" :amp-model="ampModel" />
    </div>
    <AmpDisplay :amp-details="ampDetails" />
  </div>
</template>

<style>
button[data-state="checked"] {
  color: v-bind(colourVar);
  box-shadow: 0px 0px 8px 2px;
}
</style>
