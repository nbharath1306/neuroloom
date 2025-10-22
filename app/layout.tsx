import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NeuroLoom - Your Daily Tech & AI Updates',
  description: 'Stop doom scrolling! Get curated AI and tech news from 10 top sources in a futuristic cyberpunk interface. Built with Next.js 14.',
  keywords: ['AI news', 'tech news', 'RSS aggregator', 'news feed', 'technology updates', 'artificial intelligence', 'Next.js', 'NeuroLoom'],
  authors: [{ name: 'Bharath' }],
  creator: 'Bharath',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neuroloom-orpin.vercel.app',
    title: 'NeuroLoom - Your Daily Tech & AI Updates',
    description: 'Stop doom scrolling! Get curated AI and tech news from 10 top sources in a futuristic cyberpunk interface.',
    siteName: 'NeuroLoom',
    images: [
      {
        url: 'https://neuroloom-orpin.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NeuroLoom - Cyberpunk Tech & AI News Aggregator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NeuroLoom - Your Daily Tech & AI Updates',
    description: 'Stop doom scrolling! Get curated AI and tech news from 10 top sources.',
    images: ['https://neuroloom-orpin.vercel.app/og-image.png'],
    creator: '@nbharath1306',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>{children}</body>
    </html>
  )
}
