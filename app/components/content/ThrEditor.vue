<script setup lang="ts">
import type { z } from 'zod'

type channelColours = 'error' | 'success' | 'info' | 'neutral'
const colorMap = { modern: 'success', boutique: 'info', classic: 'error' }

const channelMeta = {
  clean: { order: 5, split: 'lhs', angle: 40, padding: 1 },
  crunch: { order: 4, split: 'lhs', angle: 60, padding: 2 },
  lead: { order: 3, split: 'lhs', angle: 90, padding: 2 },
  hiGain: { order: 2, split: 'lhs', angle: 120, padding: 2 },
  special: { order: 1, split: 'lhs', angle: 140, padding: 1 },
  bass: { order: 6, split: 'rhs', angle: 240, padding: 1 },
  acoustic: { order: 7, split: 'rhs', angle: 270, padding: 2 },
  flat: { order: 8, split: 'rhs', angle: 300, padding: 1 }
}

const { data: presets } = await useAsyncData('allPresets', () => {
  return queryCollection('thrPresets')
    .select('data')
    .all()
})

type Schema = z.output<typeof schemaPreset>
const parsed = schemaPreset.parse(defaultPreset)
const preset = ref<Schema>(parsed)

const style = defineModel<string>('style', {
  type: String,
  default: 'modern'
})

const channel = defineModel<string>('channel', {
  type: String
})

const ampDetails = computed(() => ampsMap.find(amp => amp.channelId === channel.value && amp.styleId === style.value))
const ampModel = computed(() => modelsAmps.find(amp => amp.symbolicID === ampDetails.value?.symbolicID))
const presetList = computed(() => (presets.value ?? []).filter(preset => preset.data.tone.THRGroupAmp['@asset'] === ampDetails.value?.symbolicID))

const channelList = [...new Set(ampsMap.map(amp => amp.channelId))]
const channelItems = computed(() => channelList.map((channelId) => {
  const amp = ampsMap.find(amp => amp.channelId === channelId)
  const meta = channelMeta[channelId as keyof typeof channelMeta]
  return {
    value: channelId,
    label: amp?.channel,
    split: meta?.split,
    order: meta?.order,
    ui: { base: `${meta?.split === 'rhs' ? `ms-${meta?.padding}` : `me-${meta?.padding}`}` }
  }
}).sort((a, b) => a.order - b.order)
)
const styleList = [...new Set(ampsMap.map(amp => amp.styleId))]
const stylelItems = computed(() => styleList.map((styleId) => {
  return { value: styleId,
    label: ampsMap.find(amp => amp.styleId === styleId)?.style ?? ''
  }
}))
const colour = computed(() => colorMap[style.value as keyof typeof colorMap] as channelColours)
const colourVar = computed(() => `var(--ui-${colour.value})`)
const knobValue = computed(() => (channelMeta[channel.value as keyof typeof channelMeta]?.angle / 300) - 0.1 || 0)

onMounted(() => {
  const presetAmpId = preset.value.data.tone.THRGroupAmp['@asset'] as keyof Schema['data']['tone']['THRGroupAmp']['@asset']
  const ampModelMap = ampsMap.find(model => model.symbolicID === presetAmpId)
  style.value = ampModelMap?.styleId || 'classic'
  channel.value = ampModelMap?.channelId || 'clean'
})
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
    <div>
      <URadioGroup
        v-model="style"
        variant="table"
        orientation="horizontal"
        :items="stylelItems"
        :color="colour"
        :ui="{ item: 'has-data-[state=checked]:border-muted has-data-[state=checked]:bg-elevated' }"
      />
    </div>
    <div class="flex flex-row gap-4">
      <div class="flex flex-row gap-2 items-center">
        <div class="flex flex-col w-26 gap-1">
          <URadioGroup
            v-model="channel"
            :items="channelItems.filter(item => item.split==='lhs')"
            :color="colour"
            indicator="end"
          />
        </div>
        <div class="flex w-24 px-2">
          <ControlKnob :value="knobValue" />
        </div>
        <div class="flex flex-col w-26 gap-2 items-start">
          <URadioGroup
            v-model="channel"
            :items="channelItems.filter(item => item.split==='rhs')"
            :color="colour"
          />
        </div>
      </div>
      <div class="flex flex-row gap-2 place-self-end">
        <template v-for="control in ampModel?.params" :key="control.symbolicID">
          <ControlSet
            v-model.scale="preset.data.tone.THRGroupAmp[control.symbolicID as keyof Omit<Schema['data']['tone']['THRGroupAmp'], '@asset'>]"
            :default="control.default"
            :min="control.min"
            :max="control.max"
            :name="control.name"
          />
        </template>
      </div>
    </div>
    <UPageCard
      :description="ampDetails?.description"
      class="h-54"
      orientation="horizontal"
      spotlight
      spotlight-color="primary"
    >
      <template #title>
        {{ ampDetails?.inspiration }}
        <UBadge
          v-if="ampDetails?.modded"
          class="ml-2"
          label="Modded"
          icon="i-lucide-wrench"
          size="sm"
          color="warning"
          variant="soft"
        />
      </template>
      <template #leading>
        <UBadge
          :label="ampDetails?.symbolicID"
          color="neutral"
          size="sm"
          variant="soft"
        />
      </template>
      <NuxtImg
        :src="`/amps/${ampDetails?.symbolicID}.png`"
        height="160"
        :alt="ampDetails?.inspiration"
        class="justify-self-center"
      />

      <template #footer>
        <div class="flex flex-col gap-2">
          <UButtonGroup class="w-24">
            <UButton
              v-for="item in presetList"
              :key="item.data.meta.name"
              :label="item.data.meta.name"
              icon="i-f7:guitars"
              size="xs"
              variant="subtle"
              :ui="{ label: 'text-xs' }"
              @click="preset = presets?.find(preset => preset.data.meta.name === item.data.meta.name) as Schema"
            />
          </UButtonGroup>
        </div>
      </template>
    </UPageCard>
  </div>
</template>

<style>
button[data-state="checked"] {
  color: v-bind(colourVar);
  box-shadow: 0px 0px 8px 2px;
}
</style>
