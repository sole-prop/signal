'use client'

import { useEffect, useRef } from 'react'
import { MONO_NUMBER_STYLE, SIGNAL_COLORS, SIGNAL_SHADOW } from '@/lib/theme'
import type { Endpoint } from '@/types/signal'

const STATUS_STYLES = {
  up: { text: SIGNAL_COLORS.primary, label: 'UP' },
  degraded: { text: SIGNAL_COLORS.secondary, label: 'DEGRADED' },
  down: { text: SIGNAL_COLORS.tertiary, label: 'DOWN' },
} as const

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 5) return 'just now'
  if (diff < 60) return `${diff}s ago`
  return `${Math.floor(diff / 60)}m ago`
}

interface Props {
  endpoint: Endpoint
}

export function EndpointCard({ endpoint }: Props) {
  const prevStatus = useRef(endpoint.status)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prevStatus.current !== endpoint.status && cardRef.current) {
      cardRef.current.style.opacity = '0.6'
      window.setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.style.opacity = '1'
        }
      }, 200)
      prevStatus.current = endpoint.status
    }
  }, [endpoint.status])

  const style = STATUS_STYLES[endpoint.status]

  return (
    <div
      ref={cardRef}
      style={{
        background: SIGNAL_COLORS.surface,
        border: `1px solid ${SIGNAL_COLORS.border}`,
        borderRadius: '6px',
        padding: '24px',
        transition: 'opacity 0.2s ease',
        boxShadow: SIGNAL_SHADOW,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '16px',
          marginBottom: '16px',
        }}
      >
        <div style={{ minWidth: 0 }}>
          <p
            style={{
              color: SIGNAL_COLORS.primary,
              fontSize: '14px',
              fontWeight: 500,
              margin: 0,
              fontFamily: 'var(--font-geist-sans)',
            }}
          >
            {endpoint.name}
          </p>
          <p
            style={{
              ...MONO_NUMBER_STYLE,
              color: SIGNAL_COLORS.tertiary,
              fontSize: '11px',
              margin: '8px 0 0 0',
              overflowWrap: 'anywhere',
            }}
          >
            {endpoint.url}
          </p>
        </div>
        <span
          style={{
            ...MONO_NUMBER_STYLE,
            color: style.text,
            fontSize: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: SIGNAL_COLORS.border,
            padding: '4px 8px',
            borderRadius: '4px',
            border: `1px solid ${SIGNAL_COLORS.tertiary}`,
            whiteSpace: 'nowrap',
          }}
        >
          {style.label}
        </span>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <p
          style={{
            color: SIGNAL_COLORS.secondary,
            fontSize: '10px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-geist-sans)',
            margin: '0 0 8px 0',
          }}
        >
          Response Time
        </p>
        <p
          style={{
            ...MONO_NUMBER_STYLE,
            color: SIGNAL_COLORS.primary,
            fontSize: '28px',
            fontWeight: 700,
            margin: 0,
            lineHeight: 1,
          }}
        >
          {endpoint.response_time_ms}
          <span
            style={{
              color: SIGNAL_COLORS.secondary,
              fontSize: '12px',
              fontWeight: 400,
              marginLeft: '8px',
            }}
          >
            ms
          </span>
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}
        >
          <p
            style={{
              color: SIGNAL_COLORS.secondary,
              fontSize: '10px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-sans)',
              margin: 0,
            }}
          >
            Uptime
          </p>
          <p
            style={{
              ...MONO_NUMBER_STYLE,
              color: SIGNAL_COLORS.primary,
              fontSize: '11px',
              margin: 0,
            }}
          >
            {endpoint.uptime_pct}%
          </p>
        </div>
        <div
          style={{
            background: SIGNAL_COLORS.border,
            height: '3px',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: style.text,
              width: `${endpoint.uptime_pct}%`,
              height: '100%',
              borderRadius: '3px',
              transition: 'width 0.3s ease',
            }}
          />
        </div>
      </div>

      <p
        style={{
          ...MONO_NUMBER_STYLE,
          color: SIGNAL_COLORS.tertiary,
          fontSize: '10px',
          margin: 0,
          letterSpacing: '0.04em',
        }}
      >
        {timeAgo(endpoint.last_checked)}
      </p>
    </div>
  )
}
