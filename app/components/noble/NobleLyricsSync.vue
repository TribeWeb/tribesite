<script setup lang="ts">
const { sessionId, mode, role, status, isActive, hasTransmitter, startSession, joinSession, endSession } = useLyricsSync()

const joinId = ref('')
const copied = ref(false)

async function copySessionId() {
  await navigator.clipboard.writeText(sessionId.value ?? '')
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 10000)
}

const statusColor = computed(() => {
  if (status.value === 'OPEN') return 'success'
  if (status.value === 'CONNECTING') return 'warning'
  return 'neutral'
})

const statusLabel = computed(() => {
  if (status.value === 'OPEN') return 'Connected'
  if (status.value === 'CONNECTING') return 'Connecting...'
  return 'Disconnected'
})
</script>

<template>
  <ClientOnly>
    <div class="flex flex-col gap-y-3">
      <h3 class="text-sm font-semibold">
        Live sync
      </h3>

      <!-- Not active: show start/join -->
      <template v-if="!isActive">
        <div class="flex items-center justify-between gap-x-2">
          <UButton
            icon="i-lucide-radio"
            label="Broadcast"
            variant="subtle"
            size="sm"
            @click="startSession"
          />
          <UButton
            icon="i-lucide-monitor"
            label="Receive"
            variant="subtle"
            size="sm"
            :disabled="!joinId"
            @click="joinSession(joinId)"
          />
        </div>
        <UProgress
          size="xs"
          animation="carousel"
        /> <!-- "carousel" | "carousel-inverse" | "swing" | "elastic" -->
        <div class="flex items-center gap-x-2">
          <UInput
            v-model="joinId"
            placeholder="Paste session ID"
            size="sm"
            class="flex-1"
          />
        </div>
      </template>

      <!-- Active session -->
      <template v-else>
        <!-- Status badge -->
        <div class="flex items-center justify-between gap-x-2">
          <UBadge :color="statusColor" variant="subtle" size="sm">
            {{ statusLabel }}
          </UBadge>
          <UBadge color="primary" variant="outline" size="sm">
            {{ role === 'transmitter' ? 'Transmitter' : 'Receiver' }}
          </UBadge>
        </div>

        <!-- Transmitter: share URL -->
        <template v-if="mode === 'transmitter'">
          <div class="flex items-center gap-x-1.5">
            <UInput
              :model-value="sessionId ?? undefined"
              readonly
              size="sm"
              class="flex-1"
            />
            <UButton
              :icon="copied ? 'i-lucide-check' : 'i-lucide-copy'"
              variant="ghost"
              color="neutral"
              size="sm"
              @click="copySessionId"
            />
          </div>
          <p class="text-xs text-muted">
            {{ copied ? 'Session ID copied' : 'Share this ID with receivers' }}
          </p>
        </template>

        <!-- Receiver: show transmitter status -->
        <template v-if="mode === 'receiver'">
          <p v-if="hasTransmitter" class="text-xs text-muted">
            Following transmitter — navigate via their controls
          </p>
          <p v-else class="text-xs text-warning">
            No transmitter connected
          </p>
        </template>

        <UButton
          icon="i-lucide-x"
          label="End session"
          variant="ghost"
          color="error"
          size="sm"
          block
          @click="endSession"
        />
      </template>
    </div>
  </ClientOnly>
</template>
