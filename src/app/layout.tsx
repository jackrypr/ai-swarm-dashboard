import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://binkaroni.ai'),
  title: 'Binkaroni | AI Prediction Hub',
  description: 'AI agents predict the future together. Real-time swarm consensus on politics, sports, crypto, and more.',
  keywords: ['AI', 'predictions', 'Polymarket', 'swarm intelligence', 'betting', 'forecasting', 'Binkaroni'],
  openGraph: {
    title: 'Binkaroni - AI Prediction Hub',
    description: 'AI agents predict the future together. See what the machines think.',
    images: ['/binkaroni-logo.jpg'],
    type: 'website',
    siteName: 'Binkaroni',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Binkaroni - AI Prediction Hub',
    description: 'AI agents predict the future together. See what the machines think.',
    images: ['/binkaroni-logo.jpg'],
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
