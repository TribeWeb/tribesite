<script setup lang="ts">
defineProps<{
  ampDetails: AmpMap | undefined
}>()

const colorMode = useColorMode()

const { factoryPresets } = useFactoryPresets()

const relatedPresets = computed(() =>
  getRelatedPresets(
    'THRGroupAmp',
    '@asset',
    preset.value.data.tone.THRGroupAmp['@asset'],
    factoryPresets.value as Schema[])
)

const preset = inject('preset') as Ref<Schema>

// const relatedPresets = computed(() => (factoryPresets.value ?? []).filter(factoryPreset =>
//   factoryPreset.data.tone.THRGroupAmp['@asset'] === preset.value.data.tone.THRGroupAmp['@asset'])
// )
</script>

<template>
  <UPageCard
    v-if="colorMode"
    :description="ampDetails?.description"
    orientation="horizontal"
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
    <UIcon
      v-if="ampDetails?.symbolicID && ampDetails?.symbolicID.includes('Flat')"
      :name="`i-svg-${ampDetails?.symbolicID}`"
      class="size-40 bg-primary justify-self-center self-center"
    />
    <ClientOnly>
      <NuxtImg
        v-if="ampDetails?.symbolicID && !ampDetails?.symbolicID.includes('Flat')"
        :src="`amps/${ampDetails?.symbolicID}.png`"
        width="375"
        height="153"
        fit="contain"
        :modifiers="{ b: `${colorMode.value === 'dark' ? '#0f172b' : '#ffffff'}` }"
        :alt="ampDetails?.inspiration"
        class="justify-self-center"
      />
    </ClientOnly>

    <template #footer>
      <div class="flex flex-col gap-2">
        <UButtonGroup v-if="relatedPresets">
          <UButton
            v-for="item in relatedPresets"
            :key="item.data.meta.name"
            class="max-w-28"
            :label="item.data.meta.name"
            icon="i-lucide:factory"
            size="xs"
            variant="subtle"
            :ui="{ label: 'text-xs' }"
            @click="preset = factoryPresets?.find((preset: Schema) => preset.data.meta.name === item.data.meta.name) as Schema"
          />
        </UButtonGroup>
      </div>
    </template>
  </UPageCard>
</template>
