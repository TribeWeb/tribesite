<script setup lang="ts">
const colorMode = useColorMode()

const preset = inject('preset') as Ref<Schema>

const { factoryPresets } = useFactoryPresets()

const relatedPresets = computed(() =>
  getRelatedPresets(
    'THRGroupCab',
    'SpkSimType',
    preset.value.data.tone.THRGroupCab['SpkSimType'],
    factoryPresets.value as Schema[])
)

const cabDetails = computed(() =>
  cabsMap.find(cab => cab.SpkSimType === preset.value.data.tone.THRGroupCab['SpkSimType']) as CabMap
)
</script>

<template>
  <UPageCard
    v-if="colorMode"
    :description="cabDetails?.description"
    orientation="horizontal"
  >
    <template #title>
      {{ cabDetails?.name }}
      <UBadge
        class="ml-2"
        :label="`${cabDetails.speakerCount}x${cabDetails.speakerSize}`"
        icon="i-lucide-wrench"
        size="sm"
        color="warning"
        variant="soft"
      />
    </template>
    <template #leading>
      <UBadge
        :label="cabDetails?.enclosure"
        color="neutral"
        size="sm"
        variant="soft"
      />
    </template>
    <ClientOnly>
      <NuxtImg
        v-if="cabDetails?.slug"
        :src="`cabs/${cabDetails?.slug}.png`"
        width="375"
        height="153"
        fit="contain"
        :modifiers="{ b: `${colorMode.value === 'dark' ? '#0f172b' : '#ffffff'}` }"
        :alt="cabDetails?.description"
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
