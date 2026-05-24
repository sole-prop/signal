import type { Metadata } from 'next'
import { GeistMono, GeistSans } from 'geist/font'
import { SIGNAL_COLORS } from '@/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'SIGNAL - API Health Monitor',
  description: 'Real-time API health monitoring. Built with OpenAI Codex.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body style={{ margin: 0, background: SIGNAL_COLORS.base }}>{children}</body>
    </html>
  )
}
