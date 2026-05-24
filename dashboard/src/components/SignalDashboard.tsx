'use client'

import { EndpointCard } from '@/components/EndpointCard'
import { StatRow } from '@/components/StatRow'
import { useEndpoints } from '@/hooks/useEndpoints'
import { MONO_NUMBER_STYLE, SIGNAL_COLORS, SIGNAL_SHADOW } from '@/lib/theme'

export function SignalDashboard() {
  const { endpoints, stats, connected, error } = useEndpoints()

  return (
    <div
      style={{
        minHeight: '100vh',
        background: SIGNAL_COLORS.base,
        padding: '32px',
        fontFamily: 'var(--font-geist-sans)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}
      >
        <div>
          <h1
            style={{
              color: SIGNAL_COLORS.primary,
              fontSize: '18px',
              fontWeight: 700,
              margin: 0,
            }}
          >
            SIGNAL
          </h1>
          <p
            style={{
              ...MONO_NUMBER_STYLE,
              color: SIGNAL_COLORS.tertiary,
              fontSize: '11px',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              margin: '8px 0 0 0',
            }}
          >
            API Health Monitor
          </p>
        </div>
        <p
          style={{
            ...MONO_NUMBER_STYLE,
            color: SIGNAL_COLORS.tertiary,
            fontSize: '10px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Updates every 2s
        </p>
      </div>

      <StatRow stats={stats} connected={connected} />

      {error && endpoints.length === 0 ? (
        <div
          style={{
            background: SIGNAL_COLORS.surface,
            border: `1px solid ${SIGNAL_COLORS.border}`,
            borderRadius: '6px',
            padding: '32px',
            marginBottom: '24px',
            boxShadow: SIGNAL_SHADOW,
          }}
        >
          <p
            style={{
              ...MONO_NUMBER_STYLE,
              color: SIGNAL_COLORS.secondary,
              fontSize: '12px',
              margin: 0,
            }}
          >
            Backend offline. Start with: python backend/main.py
          </p>
        </div>
      ) : null}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {endpoints.length === 0 && !error
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                style={{
                  background: SIGNAL_COLORS.surface,
                  border: `1px solid ${SIGNAL_COLORS.border}`,
                  borderRadius: '6px',
                  padding: '24px',
                  minHeight: '184px',
                  boxShadow: SIGNAL_SHADOW,
                }}
              />
            ))
          : endpoints.map((endpoint) => (
              <EndpointCard key={endpoint.id} endpoint={endpoint} />
            ))}
      </div>

      <div
        style={{
          marginTop: '48px',
          paddingTop: '16px',
          borderTop: `1px solid ${SIGNAL_COLORS.border}`,
        }}
      >
        <p
          style={{
            ...MONO_NUMBER_STYLE,
            color: SIGNAL_COLORS.tertiary,
            fontSize: '10px',
            letterSpacing: '0.06em',
            margin: 0,
          }}
        >
          Built with OpenAI Codex . github.com/sole-prop/signal
        </p>
      </div>
    </div>
  )
}
