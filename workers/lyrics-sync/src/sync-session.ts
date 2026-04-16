import { DurableObject } from 'cloudflare:workers'

interface SyncMessage {
  type: 'navigate' | 'state' | 'role' | 'claim-transmitter' | 'end-session' | 'ping'
  path?: string
  hash?: string
  role?: string
  hasTransmitter?: boolean
}

export class SyncSession extends DurableObject {
  private transmitterWs: WebSocket | null = null
  private currentPath = ''
  private currentHash = ''

  async fetch(_request: Request): Promise<Response> {
    const pair = new WebSocketPair()
    const [client, server] = [pair[0], pair[1]]

    this.ctx.acceptWebSocket(server)

    // Send current state to the new connection
    server.send(JSON.stringify({
      type: 'state',
      path: this.currentPath,
      hash: this.currentHash,
      hasTransmitter: this.transmitterWs !== null
    } satisfies SyncMessage))

    return new Response(null, { status: 101, webSocket: client })
  }

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer) {
    const text = typeof raw === 'string' ? raw : new TextDecoder().decode(raw)

    let msg: SyncMessage
    try {
      msg = JSON.parse(text)
    }
    catch {
      return
    }

    if (msg.type === 'ping') return

    if (msg.type === 'claim-transmitter') {
      if (!this.transmitterWs) {
        this.transmitterWs = ws
        ws.send(JSON.stringify({ type: 'role', role: 'transmitter' } satisfies SyncMessage))
        this.broadcast(JSON.stringify({
          type: 'state',
          path: this.currentPath,
          hash: this.currentHash,
          hasTransmitter: true
        } satisfies SyncMessage), ws)
      }
      else if (this.transmitterWs === ws) {
        ws.send(JSON.stringify({ type: 'role', role: 'transmitter' } satisfies SyncMessage))
      }
      else {
        ws.send(JSON.stringify({ type: 'role', role: 'receiver' } satisfies SyncMessage))
      }
    }

    if (msg.type === 'end-session' && this.transmitterWs === ws) {
      this.transmitterWs = null
      this.broadcast(JSON.stringify({ type: 'end-session' } satisfies SyncMessage), ws)
    }

    if (msg.type === 'navigate' && this.transmitterWs === ws) {
      this.currentPath = msg.path ?? ''
      this.currentHash = msg.hash ?? ''
      this.broadcast(JSON.stringify({
        type: 'navigate',
        path: this.currentPath,
        hash: this.currentHash
      } satisfies SyncMessage), ws)
    }
  }

  async webSocketClose(ws: WebSocket) {
    if (this.transmitterWs === ws) {
      this.transmitterWs = null
      this.broadcast(JSON.stringify({
        type: 'state',
        path: this.currentPath,
        hash: this.currentHash,
        hasTransmitter: false
      } satisfies SyncMessage))
    }
  }

  async webSocketError(ws: WebSocket) {
    // Treat errors the same as close
    await this.webSocketClose(ws)
  }

  /** Send a message to all connected WebSockets, optionally excluding one. */
  private broadcast(message: string, exclude?: WebSocket) {
    for (const ws of this.ctx.getWebSockets()) {
      if (ws !== exclude) {
        try {
          ws.send(message)
        }
        catch {
          // Client already gone — ignore
        }
      }
    }
  }
}
