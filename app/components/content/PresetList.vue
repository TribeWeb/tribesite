<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const { factoryPresets } = useFactoryPresets()

const el = useTemplateRef<HTMLElement>('el')

useSortable(el, factoryPresets as Ref<Schema[]>, {
  animation: 400
})
</script>

<template>
  <div ref="el" class="columns-1 sm:columns-2 md:columns-3 gap-2">
    <UBadge
      v-for="(item, i) in factoryPresets"
      :key="i"
      class="m-1 cursor-grab"
      variant="soft"
      size="lg"
      trailing-icon="i-lucide-grip-vertical"
    >
      <template #leading>
        <span class="w-5">{{ i }}.</span>
      </template>
      <UInput v-model="item.data.meta.name" />
    </UBadge>
  </div>
</template>
