<script setup lang="ts">
defineProps<{
  ampDetails: AmpMap | undefined
}>()

const colorMode = useColorMode()
const preset = inject('preset') as Ref<Schema>

const { factoryPresets } = useFactoryPresets()

const relatedPresets = computed(() =>
  getRelatedPresets(
    'THRGroupAmp',
    '@asset',
    preset.value.data.tone.THRGroupAmp['@asset'],
    factoryPresets.value as Schema[])
)
</script>

<template>
  <UPageCard
    v-if="colorMode"
    :description="ampDetails?.description"
    orientation="vertical"
  >
    <template #title>
      <USelect
        v-model="preset.data.tone.THRGroupAmp['@asset']"
        :items="ampsMap"
        value-key="symbolicID"
        label-key="inspiration"
        size="lg"
        class="w-72"
        color="primary"
        variant="soft"
      />
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
        <UButtonGroup v-if="relatedPresets" class="flex-wrap">
          <UButton
            v-for="item in relatedPresets"
            :key="item.data.meta.name"
            class="max-w-28"
            :label="item.data.meta.name"
            icon="i-lucide:factory"
            size="xs"
            variant="subtle"
            :ui="{ label: 'text-xs' }"
            @click="preset = factoryPresets?.find((preset) => preset.data.meta.name === item.data.meta.name) as Schema"
          />
        </UButtonGroup>
      </div>
    </template>
  </UPageCard>
</template>
