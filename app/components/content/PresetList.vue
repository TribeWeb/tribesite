<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'

const userPresets = ref<Schema[]>([])

const el = useTemplateRef<HTMLElement>('el')

useSortable(el, userPresets as Ref<Schema[]>, {
  animation: 400
})

const files = ref<File[]>([])

watch(files, (latest, existing) => {
  // Only process newly added files and deal with files being removed
  const newFiles = latest.filter(file => !existing.includes(file))
  if (newFiles.length > 0) {
    newFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        const fileContents = JSON.parse(reader.result as string) as Schema
        // if ()
        // check if preset already exists in factoryPresets
        if (userPresets.value?.some(preset => preset.data.meta.name === fileContents.data.meta.name)) {
          console.log(fileContents.data.meta.name, ' - Preset with this name already exists')
          // TODO: ask user to overwrite, rename or cancel
        }
        userPresets.value?.push(fileContents)
      }
      reader.readAsText(file)
    })
  }
})
</script>

<template>
  <div>
    <div>
      <!-- <FileUpload /> -->
      <UFileUpload
        v-model="files"
        multiple
        layout="grid"
        class="w-96 min-h-48"
        accept="text/json,.thrl6p"
        label="Upload your presets"
        description=".thrl6p format"
        highlight
      />
      <!-- <pre>{{ files }}</pre> -->
    </div>
    <div ref="el" class="columns-1 sm:columns-2 md:columns-3 gap-2">
      <UBadge
        v-for="(item, i) in userPresets"
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
  </div>
</template>
