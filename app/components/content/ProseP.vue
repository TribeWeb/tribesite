<template>
  <div class="w-full h-dvh flex items-center justify-center">
    <div
      class="w-full max-h-full flex items-center justify-center p-4"
      :style="{ aspectRatio: 'var(--lyric-aspect-ratio, 16/9)' }"
    >
      <p :style="{ fontSize: 'var(--lyric-font-size, 36px)', lineHeight: '160%' }" class="text-center whitespace-pre">
        <slot />
      </p>
    </div>
  </div>
</template>
