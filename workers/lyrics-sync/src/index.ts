export { SyncSession } from './sync-session'

interface Env {
  SYNC_SESSION: DurableObjectNamespace
  ALLOWED_ORIGIN: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders(env.ALLOWED_ORIGIN || '*')
      })
    }

    const url = new URL(request.url)
    // Expected path: /ws/lyrics/:sessionId
    const match = url.pathname.match(/^\/ws\/lyrics\/([a-zA-Z0-9_-]+)$/)
    if (!match) {
      return new Response('Not found', { status: 404 })
    }

    const upgradeHeader = request.headers.get('Upgrade')
    if (!upgradeHeader || upgradeHeader.toLowerCase() !== 'websocket') {
      return new Response('Expected WebSocket upgrade', { status: 426 })
    }

    const sessionId = match[1]
    const id = env.SYNC_SESSION.idFromName(sessionId)
    const stub = env.SYNC_SESSION.get(id)
    return stub.fetch(request)
  }
}

function corsHeaders(origin: string): HeadersInit {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Upgrade, Sec-WebSocket-Key, Sec-WebSocket-Version, Sec-WebSocket-Protocol',
    'Access-Control-Max-Age': '86400'
  }
}
