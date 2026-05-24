import type { Endpoint } from '@/types/signal'

export async function fetchEndpoints(): Promise<Endpoint[]> {
  const res = await fetch('/api/endpoints')
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export function createStream(
  onData: (endpoints: Endpoint[]) => void,
  onError: () => void
): () => void {
  const es = new EventSource('/stream')

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
