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
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [open])

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
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 font-bold text-2xl" style={{color: 'var(--primary)', fontFamily: 'var(--font-heading)'}}>
            {logo ? (
              <img src={logo} alt={siteName} style={{height:'36px', width:'auto', objectFit:'contain'}} />
            ) : (
              <div className="icon-box-sm text-white bg-primary shadow-sm" style={{background: 'var(--primary)', color: 'white'}}>
                <Zap size={20} fill="currentColor" />
              </div>
            )}
            {siteName}
          </Link>
          
          <nav className="hidden md:flex items-center gap-2">
            {links.map(l => {
              const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
              return (
                <Link key={l.href} href={l.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a href={`tel:${phoneDigits}`} className="flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors text-text-secondary" style={{color: 'var(--text-secondary)'}}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary-50 text-primary transition-transform hover:scale-110" style={{background: 'var(--primary-50)', color: 'var(--primary)'}}>
                <Phone size={14} />
              </div>
              <span className="hover:text-primary transition-colors" style={{color: 'var(--primary)'}}>{phone}</span>
            </a>
            <Link href="/booking" className="btn-primary shadow-primary">
              Book Now
            </Link>
          </div>

          <button 
            className="md:hidden p-2 rounded-lg text-text-secondary hover:bg-warm-100 transition-colors" 
            style={{color: 'var(--text-secondary)'}}
            onClick={() => setOpen(!open)}
            aria-label="Toggle Menu"
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden mobile-menu ${open ? 'open' : ''}`}>
          <div className="py-4 border-t border-border-light space-y-2 flex flex-col" style={{borderColor: 'var(--border-light)'}}>
            {links.map(l => {
              const isActive = pathname === l.href || (l.href !== '/' && pathname.startsWith(l.href))
              return (
                <Link 
                  key={l.href} 
                  href={l.href} 
                  className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary' : 'text-text-primary hover:bg-warm-50'}`}
                  style={isActive ? {background: 'var(--primary-50)', color: 'var(--primary)'} : {color: 'var(--text-primary)'}}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              )
            })}
            
            <div className="pt-4 pb-2 px-4 border-t border-border-light mt-2" style={{borderColor: 'var(--border-light)'}}>
               <a href={`tel:${phoneDigits}`} className="flex items-center gap-3 text-base font-medium mb-4 text-text-primary" style={{color: 'var(--text-primary)'}}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-50 text-primary" style={{background: 'var(--primary-50)', color: 'var(--primary)'}}>
                  <Phone size={18} />
                </div>
                Call: {phone}
              </a>
              <Link 
                href="/booking" 
                className="w-full flex justify-center py-3 rounded-lg font-bold transition-colors" 
                style={{ backgroundColor: 'var(--primary, #b31942)', color: 'white' }}
                onClick={() => setOpen(false)}
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
