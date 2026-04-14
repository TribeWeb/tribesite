<script setup lang="ts">
const fontSize = ref(36)
</script>

<template>
  <div class="w-full h-dvh flex items-center justify-center">
    <div class="flex items-center justify-center p-4 aspect-video object-cover">
      <p :style="`font-size: ${fontSize}px; line-height: 160%`" class="text-center whitespace-pre">
        <slot />
      </p>
    </div>
  </div>
</template>
