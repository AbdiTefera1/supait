'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Phone, Zap } from 'lucide-react'

interface NavbarProps {
  settings: Record<string, string>
}

export default function Navbar({ settings }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const links = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/packages', label: 'Packages' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const siteName = settings.site_name || 'Supa IT'
  const phone = settings.phone || '+251 940 050 709 / +251 714 088 343'
  const phoneNumbers = phone.split('/').map((ph) => ph.trim())
  const logo = settings.logo

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 font-bold text-2xl"
            style={{
              color: 'var(--primary)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {logo ? (
              <img
                src={logo}
                alt={siteName}
                className="h-9 w-auto object-contain"
              />
            ) : (
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                }}
              >
                <Zap size={20} fill="currentColor" />
              </div>
            )}

            <span>{siteName}</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${isActive ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: 'var(--primary-50)',
                  color: 'var(--primary)',
                }}
              >
                <Phone size={18} />
              </div>

              <div className="flex flex-col leading-tight">
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  Call Us
                </span>

                <div className="flex items-center flex-wrap">
                  {phoneNumbers.map((number, index) => (
                    <span key={number} className="flex items-center">
                      <a
                        href={`tel:${number.replace(/[\s\-()]/g, '')}`}
                        className="font-medium hover:text-primary transition-colors"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {number}
                      </a>

                      {index < phoneNumbers.length - 1 && (
                        <span className="mx-2 text-gray-400">|</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/booking" className="btn-primary shadow-primary">
              Book Now
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden mobile-menu ${open ? 'open' : ''}`}>
          <div
            className="py-4 border-t space-y-2"
            style={{ borderColor: 'var(--border-light)' }}
          >
            {links.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href))

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive
                    ? 'bg-primary-50 text-primary'
                    : 'hover:bg-gray-100'
                    }`}
                  style={
                    isActive
                      ? {
                        background: 'var(--primary-50)',
                        color: 'var(--primary)',
                      }
                      : {
                        color: 'var(--text-primary)',
                      }
                  }
                >
                  {link.label}
                </Link>
              )
            })}

            {/* Mobile Contact */}
            <div
              className="mt-4 pt-4 px-4 border-t"
              style={{ borderColor: 'var(--border-light)' }}
            >
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: 'var(--primary-50)',
                    color: 'var(--primary)',
                  }}
                >
                  <Phone size={18} />
                </div>

                <div className="flex flex-col">
                  <span className="font-semibold mb-2">Call Us</span>

                  {phoneNumbers.map((number) => (
                    <a
                      key={number}
                      href={`tel:${number.replace(/[\s\-()]/g, '')}`}
                      className="hover:text-primary transition-colors"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {number}
                    </a>
                  ))}
                </div>
              </div>

              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="w-full flex justify-center items-center py-3 rounded-lg font-bold"
                style={{
                  background: 'var(--primary)',
                  color: '#fff',
                }}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
