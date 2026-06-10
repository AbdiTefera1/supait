import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Supa IT - Your Local IT Expert',
  description: 'Fast, reliable, and affordable IT services for homes and businesses in Addis Ababa. Computer repair, virus removal, network setup, website development and more.',
  keywords: 'IT services, computer repair, virus removal, network setup, website development, Addis Ababa',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
