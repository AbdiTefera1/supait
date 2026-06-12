import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })

export const metadata: Metadata = {
  title: 'Supa IT - Your Local IT Expert',
  description: 'Fast, reliable, and affordable IT services for homes and businesses in Addis Ababa. Computer repair, virus removal, network setup, website development and more.',
  keywords: 'IT services, computer repair, virus removal, network setup, website development, Addis Ababa',
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
