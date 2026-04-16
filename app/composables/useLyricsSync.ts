type SyncMode = 'transmitter' | 'receiver'

interface SyncMessage {
  type: 'navigate' | 'state' | 'role' | 'claim-transmitter' | 'end-session'
  path?: string
  hash?: string
  role?: SyncMode
  hasTransmitter?: boolean
}

let _instance: ReturnType<typeof _useLyricsSync> | null = null

export function useLyricsSync() {
  if (!_instance) {
    const scope = effectScope(true) // detached — survives component unmounts
    _instance = scope.run(() => _useLyricsSync())!
  }
  return _instance
}

function _useLyricsSync() {
  const router = useRouter()
  const route = router.currentRoute // global reactive route — works in detached scope

  const sessionId = useState<string | null>('lyrics-sync-session', () => null)
  const mode = useState<SyncMode | null>('lyrics-sync-mode', () => null)
  const role = useState<SyncMode | null>('lyrics-sync-role', () => null)
  const hasTransmitter = useState('lyrics-sync-has-tx', () => false)
  const isActive = computed(() => !!sessionId.value && !!mode.value)

  let dropTimer: ReturnType<typeof setTimeout> | null = null
  function clearDropTimer() {
    if (dropTimer !== null) {
      clearTimeout(dropTimer)
      dropTimer = null
    }
  }

  const config = useRuntimeConfig()

  const wsUrl = computed(() => {
    if (!sessionId.value || import.meta.server) return ''
    const wsHost = config.public.wsHost as string
    if (wsHost) {
      // External WebSocket server (Cloudflare Worker)
      const proto = wsHost.startsWith('localhost') ? 'ws:' : 'wss:'
      return `${proto}//${wsHost}/ws/lyrics/${sessionId.value}`
    }
    // Local dev fallback — Nitro WebSocket handler
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
    return `${proto}//${location.host}/_ws/lyrics/${sessionId.value}`
  })

  const { status, data, send, close: wsClose } = useWebSocket(wsUrl, {
    immediate: false,
    autoReconnect: {
      retries: 10,
      delay: retries => Math.min(1000 * 2 ** (retries - 1), 15000)
    },
    heartbeat: {
      message: JSON.stringify({ type: 'ping' }),
      interval: 30000,
      pongTimeout: 5000
    },
    onConnected() {
      if (mode.value === 'transmitter') {
        send(JSON.stringify({ type: 'claim-transmitter' }))
        // Send current position immediately
        send(JSON.stringify({
          type: 'navigate',
          path: route.value.path,
          hash: route.value.hash
        }))
      }
    },
    onError(ws, event) {
      console.error('Error:', event)
    }
  })

  // Process incoming messages
  watch(data, (raw) => {
    if (!raw) return
    let msg: SyncMessage
    try {
      msg = JSON.parse(raw)
    } catch {
      return
    }

    if (msg.type === 'role') {
      role.value = msg.role ?? null
    }

    if (msg.type === 'state') {
      const txWasPresent = hasTransmitter.value
      hasTransmitter.value = !!msg.hasTransmitter
      // If receiver and state has a path, navigate to it
      if (mode.value === 'receiver' && msg.path) {
        navigateReceiver(msg.path, msg.hash ?? '')
      }
      if (mode.value === 'receiver') {
        if (!msg.hasTransmitter && txWasPresent) {
          // Transmitter dropped — wait 30s before ending in case they reconnect
          dropTimer = setTimeout(() => {
            dropTimer = null
            endSession()
          }, 30000)
        } else if (msg.hasTransmitter) {
          // Transmitter (re)connected — cancel any pending drop timer
          clearDropTimer()
        }
      }
    }

    if (msg.type === 'end-session' && mode.value === 'receiver') {
      // Transmitter deliberately ended — end immediately
      clearDropTimer()
      endSession()
    }

    if (msg.type === 'navigate' && mode.value === 'receiver') {
      navigateReceiver(msg.path ?? '', msg.hash ?? '')
    }
  })

  // Transmitter: watch route changes and broadcast
  let skipNextRouteWatch = false

  watch(
    () => route.value.path + route.value.hash,
    () => {
      if (skipNextRouteWatch) {
        skipNextRouteWatch = false
        return
      }
      if (mode.value !== 'transmitter' || status.value !== 'OPEN') return
      send(JSON.stringify({
        type: 'navigate',
        path: route.value.path,
        hash: route.value.hash
      }))
    }
  )

  async function navigateReceiver(path: string, hash: string) {
    if (!path) return
    skipNextRouteWatch = true
    const target = path + hash
    if (route.value.path !== path) {
      await navigateTo(target)
    } else if (route.value.hash !== hash && hash) {
      await router.replace(target)
    }
  }

  function startSession() {
    sessionId.value = crypto.randomUUID().slice(0, 8)
    mode.value = 'transmitter'
  }

  function joinSession(id: string) {
    // Accept either a bare session ID or a full URL containing ?session=
    const urlMatch = id.match(/[?&]session=([^&]+)/)
    sessionId.value = urlMatch?.[1] ?? id.trim()
    mode.value = 'receiver'
  }

  function endSession() {
    clearDropTimer()
    if (mode.value === 'transmitter' && status.value === 'OPEN') {
      send(JSON.stringify({ type: 'end-session' }))
    }
    wsClose()
    sessionId.value = null
    mode.value = null
    role.value = null
    hasTransmitter.value = false
  }

  const sessionUrl = computed(() => {
    if (!sessionId.value) return ''
    const base = import.meta.server ? '' : location.origin
    return `${base}/lyrics?session=${sessionId.value}`
  })

  // Auto-join if query param present on mount
  onMounted(() => {
    const querySession = route.value.query.session as string | undefined
    if (querySession && !isActive.value) {
      joinSession(querySession)
    }
  })

  return {
    sessionId: readonly(sessionId),
    mode: readonly(mode),
    role: readonly(role),
    status,
    isActive,
    hasTransmitter: readonly(hasTransmitter),
    sessionUrl,
    startSession,
    joinSession,
    endSession
  }
}
