<script setup lang="ts">
import type { LyricsCollectionItem } from '@nuxt/content'

const { song } = defineProps<{
  song: LyricsCollectionItem
}>()

const youtubeId = computed(() => {
  if (!song.video?.youtube) return null
  const urlMatch = song.video.youtube.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
  return urlMatch ? urlMatch[1] : song.video.youtube
})

const spotifyId = computed(() => {
  if (!song.audio?.spotify) return null
  const urlMatch = song.audio.spotify.match(/spotify\.com\/track\/([a-zA-Z0-9]+)/)
  return urlMatch ? urlMatch[1] : song.audio.spotify
})

const appleMusicId = computed(() => {
  if (!song.audio?.apple) return null
  const urlMatch = song.audio.apple.match(/music\.apple\.com\/[a-z]{2}\/album\/[a-z0-9-]+\/([0-9]+)/)
  return urlMatch ? `https://embed.music.apple.com/us/album/${urlMatch[1]}` : song.audio.apple
})
</script>

<template>
  <div class="flex flex-col p-1 gap-y-4 items-center">
    <ScriptYouTubePlayer v-if="youtubeId" :video-id="youtubeId || ''">
      <template #placeholder="{ placeholder }">
        <img :src="placeholder" alt="Video Placeholder">
      </template>
    </ScriptYouTubePlayer>
    <div v-if="spotifyId" style="left: 0; width: 100%; height: 152px; position: relative;">
      <iframe
        :src="`https://open.spotify.com/embed/track/${spotifyId || ''}?utm_source=oembed`"
        style="top: 0; left: 0; width: 100%; height: 100%; position: absolute; border: 0; border-radius: 12px;"
        allowfullscreen
        allow="clipboard-write *; encrypted-media *; fullscreen *; picture-in-picture *;"
      />
    </div>
    <div v-if="appleMusicId">
      <iframe
        allow="autoplay *; encrypted-media *;"
        frameborder="0"
        height="150"
        style="width:100%;max-width:660px;overflow:hidden;background:transparent;"
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        :src="appleMusicId"
      />
    </div>
    <div v-if="song.video?.vimeo">
      <UButton
        :to="song.video.vimeo"
        target="_blank"
        variant="outline"
        size="sm"
        icon="i-lucide-video"
        block
      >
        Vimeo video
      </UButton>
    </div>
    <div v-if="song.video?.other">
      <UButton
        :to="song.video.other"
        target="_blank"
        variant="outline"
        size="sm"
        icon="i-lucide-video"
        block
      >
        Other video
      </UButton>
    </div>
    <div v-if="song.audio?.other">
      <UButton
        :to="song.audio.other"
        target="_blank"
        variant="outline"
        size="sm"
        icon="i-lucide-music"
        block
      >
        Other audio
      </UButton>
    </div>
    <div v-if="song.audio?.soundcloud">
      <UButton
        :to="song.audio.soundcloud"
        target="_blank"
        variant="outline"
        size="sm"
        icon="i-lucide-music"
        block
      >
        SoundCloud
      </UButton>
    </div>
  </div>
</template>
