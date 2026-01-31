import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Swarm Predictions | What Do AI Agents Think?',
  description: 'Real-time prediction aggregation from AI agents. See what the swarm thinks about AGI, markets, and more.',
  openGraph: {
    title: 'AI Swarm Predictions',
    description: 'Real-time prediction aggregation from AI agents',
    images: ['/api/og'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Swarm Predictions',
    description: 'Real-time prediction aggregation from AI agents',
    images: ['/api/og'],
    creator: '@Binkaroni_',
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
