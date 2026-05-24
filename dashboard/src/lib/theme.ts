import type { CSSProperties } from 'react'

export const SIGNAL_COLORS = {
  base: '#0A0A0A',
  surface: '#111111',
  border: '#1E1E1E',
  primary: '#F2F2F7',
  secondary: '#8E8E93',
  tertiary: '#48484A',
} as const

export const SIGNAL_SHADOW = '0 1px 3px rgba(0,0,0,0.4)'

export const MONO_NUMBER_STYLE: CSSProperties = {
  fontFamily: 'var(--font-geist-mono)',
  fontVariantNumeric: 'tabular-nums',
  fontFeatureSettings: '"tnum"',
}
