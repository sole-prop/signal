import type { Endpoint } from '@/types/signal'

const BASE = 'http://localhost:8001'

export async function fetchEndpoints(): Promise<Endpoint[]> {
  const res = await fetch(`${BASE}/api/endpoints`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function createStream(
  onData: (endpoints: Endpoint[]) => void,
  onError: () => void
): () => void {
  const es = new EventSource(`${BASE}/stream`)

  es.onmessage = (e) => {
    try {
      onData(JSON.parse(e.data) as Endpoint[])
    } catch {}
  }

  es.onerror = () => {
    onError()
    es.close()
  }

  return () => es.close()
}
