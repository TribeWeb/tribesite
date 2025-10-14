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
    orientation="vertical"
  >
    <template #title>
      <USelect
        v-model="preset.data.tone.THRGroupCab['SpkSimType']"
        :items="cabsMap"
        value-key="SpkSimType"
        label-key="name"
        size="lg"
        class="w-72"
        color="primary"
        variant="soft"
        :icon="`i-svg-${cabDetails?.speakerCount}x${cabDetails?.speakerSize}`"
      >
        <template #item-leading="{ item }">
          <UIcon :name="`i-svg-${item.speakerCount}x${item.speakerSize}`" size="30" class="bg-primary" />
        </template>
      </USelect>
      <UBadge
        class="ml-2"
        :label="`${cabDetails?.enclosure}`"
        icon="i-bxs-guitar-amp"
        size="sm"
        color="warning"
        variant="soft"
      />
    </template>
    <template #leading>
      <UBadge
        :label="`${cabDetails.category} ${cabDetails.speakerCount}x${cabDetails.speakerSize}`"
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
        <UFieldGroup v-if="relatedPresets" class="flex-wrap">
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
        </UFieldGroup>
      </div>
    </template>
  </UPageCard>
</template>
