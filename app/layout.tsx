// app/layout.tsx
import { Metadata, Viewport } from 'next'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import 'tailwindcss/tailwind.css';

export const metadata: Metadata = {
  title: 'Hey, Blue! - Connecting Communities',
  description: 'Hey, Blue! connects police officers and community members through positive interactions and events.',
  icons: {
    icon: '/assets/logo.png',
    apple: '/assets/logo.png',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4A90E2'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}