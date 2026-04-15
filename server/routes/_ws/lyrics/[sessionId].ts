const sessions = new Map<string, {
  transmitterPeerId: string | null
  currentPath: string
  currentHash: string
}>()

function getSession(sessionId: string) {
  if (!sessions.has(sessionId)) {
    sessions.set(sessionId, { transmitterPeerId: null, currentPath: '', currentHash: '' })
  }
  return sessions.get(sessionId)!
}

function getSessionId(peer: { request?: { url?: string } }): string {
  const url = peer.request?.url ?? ''
  const match = url.match(/\/_ws\/lyrics\/([^/?]+)/)
  return match?.[1] ?? 'default'
}

export default defineWebSocketHandler({
  open(peer) {
    const sessionId = getSessionId(peer)
    const session = getSession(sessionId)
    peer.subscribe('sync')
    peer.send(JSON.stringify({
      type: 'state',
      path: session.currentPath,
      hash: session.currentHash,
      hasTransmitter: !!session.transmitterPeerId
    }))
  },

  message(peer, message) {
    const sessionId = getSessionId(peer)
    const session = getSession(sessionId)

    let data: { type: string, path?: string, hash?: string }
    try {
      data = JSON.parse(message.text())
    } catch {
      return
    }

    if (data.type === 'claim-transmitter') {
      if (!session.transmitterPeerId) {
        session.transmitterPeerId = peer.id
        peer.send(JSON.stringify({ type: 'role', role: 'transmitter' }))
        // Notify receivers that transmitter is back
        peer.publish('sync', JSON.stringify({
          type: 'state',
          path: session.currentPath,
          hash: session.currentHash,
          hasTransmitter: true
        }))
      } else if (session.transmitterPeerId === peer.id) {
        peer.send(JSON.stringify({ type: 'role', role: 'transmitter' }))
      } else {
        peer.send(JSON.stringify({ type: 'role', role: 'receiver' }))
      }
    }

    if (data.type === 'end-session' && session.transmitterPeerId === peer.id) {
      session.transmitterPeerId = null
      peer.publish('sync', JSON.stringify({ type: 'end-session' }))
    }

    if (data.type === 'navigate' && session.transmitterPeerId === peer.id) {
      session.currentPath = data.path ?? ''
      session.currentHash = data.hash ?? ''
      peer.publish('sync', JSON.stringify({
        type: 'navigate',
        path: session.currentPath,
        hash: session.currentHash
      }))
    }
  },

  close(peer) {
    const sessionId = getSessionId(peer)
    const session = sessions.get(sessionId)
    if (!session) return

    if (session.transmitterPeerId === peer.id) {
      session.transmitterPeerId = null
      peer.publish('sync', JSON.stringify({
        type: 'state',
        path: session.currentPath,
        hash: session.currentHash,
        hasTransmitter: false
      }))
    }

    // Clean up empty sessions
    if (peer.peers?.size === 0) {
      sessions.delete(sessionId)
    }
  }
})
