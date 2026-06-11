'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Phone, Zap } from 'lucide-react'

interface NavbarProps {
  settings: Record<string, string>
}

export default function Navbar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Packages' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]
  const siteName = settings.site_name || 'Supa IT'
  const phone = settings.phone || '+251 911 234 567'
  const phoneDigits = phone.replace(/[\s\-()]/g, '')
  const logo = settings.logo

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl" style={{color:'#b31942'}}>
            {logo ? (
              <img src={logo} alt={siteName} style={{height:'32px', width:'auto', objectFit:'contain'}} />
            ) : (
              <Zap size={22} fill="#b31942" />
            )}
            {siteName}
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-red-700 hover:bg-red-50 transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${phoneDigits}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-700">
              <Phone size={15} /> {phone}
            </a>
            <Link href="/booking" className="btn-primary text-sm py-2">Book Now</Link>
          </div>
          <button className="md:hidden p-2 rounded-lg text-gray-600" onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {open && (
          <div className="md:hidden py-4 border-t border-gray-100 space-y-1">
            {links.map(l => (
              <Link key={l.href} href={l.href} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-red-50 hover:text-red-700" onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            <div className="pt-2 px-4">
              <Link href="/booking" className="btn-primary w-full justify-center" onClick={() => setOpen(false)}>Book Now</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
