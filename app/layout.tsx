import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.supait.com'),
  title: {
    template: '%s | SupaIT',
    default: 'SupaIT | Tech Support & IT Services in Ethiopia',
  },
  description: 'Fast, reliable, and affordable IT services in Addis Ababa, Ethiopia. Expert solutions for software problems, computer repair, network setup, virus removal, and web development.',
  keywords: ['IT services Ethiopia', 'tech support Addis Ababa', 'software problem fix Ethiopia', 'computer repair Addis Ababa', 'network setup', 'SupaIT', 'Ethiopian tech support'],
  authors: [{ name: 'SupaIT Team' }],
  creator: 'SupaIT',
  publisher: 'SupaIT',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'SupaIT | Local Tech Experts in Ethiopia',
    description: 'Expert IT support for homes and businesses in Addis Ababa. Software fixes, hardware repair, and complete IT solutions.',
    url: 'https://www.supait.com',
    siteName: 'SupaIT',
    locale: 'en_ET',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SupaIT | Tech Support in Ethiopia',
    description: 'Expert IT support for homes and businesses in Addis Ababa.',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <meta name="theme-color" content="#b31942" />
      </head>
      <body>{children}</body>
    </html>
  )
}
