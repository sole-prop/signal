'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { createStream, fetchEndpoints } from '@/lib/api'
import type { AggregateStats, Endpoint } from '@/types/signal'

const RETRY_DELAY_MS = 3000

function computeStats(endpoints: Endpoint[]): AggregateStats {
  if (!endpoints.length) {
    return {
      total: 0,
      up: 0,
      degraded: 0,
      down: 0,
      avg_response_time: 0,
      avg_uptime: 0,
    }
  }

  return {
    total: endpoints.length,
    up: endpoints.filter((endpoint) => endpoint.status === 'up').length,
    degraded: endpoints.filter((endpoint) => endpoint.status === 'degraded').length,
    down: endpoints.filter((endpoint) => endpoint.status === 'down').length,
    avg_response_time: Math.round(
      endpoints.reduce((sum, endpoint) => sum + endpoint.response_time_ms, 0) /
        endpoints.length
    ),
    avg_uptime: parseFloat(
      (
        endpoints.reduce((sum, endpoint) => sum + endpoint.uptime_pct, 0) /
        endpoints.length
      ).toFixed(2)
    ),
  }
}

export function useEndpoints() {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([])
  const [connected, setConnected] = useState(false)
  const [error, setError] = useState(false)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    let mounted = true

    function clearRetryTimeout() {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = null
      }
    }

    async function loadSnapshot() {
      try {
        const data = await fetchEndpoints()
        if (!mounted) return
        setEndpoints(data)
        setConnected(true)
        setError(false)
      } catch {
        if (!mounted) return
        setConnected(false)
        setError(true)
      }
    }

    function scheduleRetry() {
      clearRetryTimeout()
      retryTimeoutRef.current = setTimeout(() => {
        void loadSnapshot()
      }, RETRY_DELAY_MS)
    }

    void loadSnapshot()

    const cleanupStream = createStream(
      (data) => {
        if (!mounted) return
        clearRetryTimeout()
        setEndpoints(data)
        setConnected(true)
        setError(false)
      },
      () => {
        if (!mounted) return
        setConnected(false)
        setError(true)
        scheduleRetry()
      }
    )

    return () => {
      mounted = false
      clearRetryTimeout()
      cleanupStream()
    }
  }, [])

  const stats = useMemo(() => computeStats(endpoints), [endpoints])

  return { endpoints, stats, connected, error }
}
