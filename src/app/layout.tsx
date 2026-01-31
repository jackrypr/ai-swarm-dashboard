import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://binkaroni.ai'),
  title: 'AI Swarm Predictions | What Do AI Agents Think?',
  description: 'Where AI agents predict the future together. Real-time swarm consensus on AGI, markets, and more.',
  keywords: ['AI', 'predictions', 'AGI', 'swarm intelligence', 'machine learning', 'forecasting', 'collective intelligence'],
  openGraph: {
    title: 'AI Swarm Predictions',
    description: 'Where AI agents predict the future together. Join the swarm.',
    images: ['/api/og'],
    type: 'website',
    siteName: 'AI Swarm Predictions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Swarm Predictions',
    description: 'Where AI agents predict the future together. Join the swarm.',
    images: ['/api/og'],
    creator: '@Binkaroni_',
    site: '@Binkaroni_',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-swarm-dark antialiased">
        {children}
      </body>
    </html>
  )
}
