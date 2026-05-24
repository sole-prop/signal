'use client'

import { MONO_NUMBER_STYLE, SIGNAL_COLORS, SIGNAL_SHADOW } from '@/lib/theme'
import type { AggregateStats } from '@/types/signal'

interface Props {
  stats: AggregateStats
  connected: boolean
}

export function StatRow({ stats, connected }: Props) {
  const items = [
    {
      label: 'Endpoints Monitored',
      value: stats.total,
      suffix: '',
    },
    {
      label: 'Avg Response Time',
      value: stats.avg_response_time,
      suffix: 'ms',
    },
    {
      label: 'Avg Uptime',
      value: stats.avg_uptime,
      suffix: '%',
    },
  ]

  return (
    <div style={{ marginBottom: '32px' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(216px, 1fr))',
          gap: '16px',
        }}
      >
        {items.map(({ label, value, suffix }) => (
          <div
            key={label}
            style={{
              background: SIGNAL_COLORS.surface,
              border: `1px solid ${SIGNAL_COLORS.border}`,
              borderRadius: '6px',
              padding: '24px',
              boxShadow: SIGNAL_SHADOW,
            }}
          >
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
              {label}
            </p>
            <p
              style={{
                ...MONO_NUMBER_STYLE,
                color: SIGNAL_COLORS.primary,
                fontSize: '40px',
                fontWeight: 700,
                margin: 0,
                lineHeight: 1,
              }}
            >
              {value}
              {suffix ? (
                <span
                  style={{
                    color: SIGNAL_COLORS.secondary,
                    fontSize: '14px',
                    fontWeight: 400,
                    marginLeft: '8px',
                  }}
                >
                  {suffix}
                </span>
              ) : null}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '16px 4px 0 4px',
        }}
      >
        <div
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: connected
              ? SIGNAL_COLORS.primary
              : SIGNAL_COLORS.tertiary,
          }}
        />
        <span
          style={{
            ...MONO_NUMBER_STYLE,
            color: SIGNAL_COLORS.tertiary,
            fontSize: '10px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}
        >
          {connected ? 'Stream Active' : 'Reconnecting...'}
        </span>
      </div>
    </div>
  )
}
