<script setup lang="ts">
import type { ChannelColours } from './AmpSelector.vue'

defineProps<{
  colour: ChannelColours
}>()

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
const channel = defineModel<AmpMap['channelId']>('channel', {
  default: 'clean'
})

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

const knobValue = computed(() => (channelMeta[channel.value as keyof typeof channelMeta]?.angle / 300) - 0.1 || 0)
</script>

<template>
  <div class="flex flex-row gap-2 items-center">
    <div class="flex flex-col w-26 gap-1">
      <URadioGroup
        v-model="channel"
        class="glow"
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
        class="glow"
        :items="channelItems.filter(item => item.split==='rhs')"
        :color="colour"
      />
    </div>
  </div>
</template>
