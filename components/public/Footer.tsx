'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, Facebook, Send, MessageCircle, ArrowUp } from 'lucide-react'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const siteName = settings.site_name || 'Supa IT'
  const tagline = settings.site_tagline || 'Your trusted local IT partner for homes and businesses. Fast, reliable, affordable.'
  const phone = settings.phone || '+251 940 050 709 / +251 714 088 343'
  const phoneNumbers = phone.split('/').map((ph) => ph.trim())
  const email = settings.email || 'info@techservepro.com'
  const address = settings.address || 'Addis Ababa, Ethiopia'
  const businessHours = settings.business_hours || 'Mon–Sat: 8AM–8PM | Sun: 10AM–5PM'
  const facebook = settings.facebook || 'https://facebook.com/techservepro'
  const telegram = settings.telegram || 'https://t.me/supa_it'
  const whatsapp = settings.whatsapp || ''
  const logo = settings.logo
  const whatsappUrl = whatsapp
    ? (whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`)
    : 'https://whatsapp.com/channel/0029VbCXwCzCBtxDjPn1Wg2y'

  const hoursParts = businessHours.split(/[|\n]/).map(h => h.trim()).filter(Boolean)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="footer section-padding">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl mb-6" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>
              {logo ? (
                <img src={logo} alt={siteName} style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'brightness(0) invert(1)' }} />
              ) : (
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--primary)' }}>
                  <Zap size={20} fill="currentColor" />
                </div>
              )}
              {siteName}
            </div>
            <p className="text-base text-warm-400 leading-relaxed mb-8 max-w-sm" style={{ color: 'var(--warm-400)' }}>{tagline}</p>
            <div className="flex gap-4">
              {facebook && (
                <a href={facebook} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
              )}
              {telegram && (
                <a href={telegram} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                  <Send size={18} />
                </a>
              )}
              {whatsappUrl && (
                <a href={whatsappUrl} className="social-icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle size={18} />
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-base mb-6" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>Services</h4>
            <ul className="space-y-4">
              {['Virus Removal', 'Data Recovery', 'PC Setup', 'Network Setup', 'Website Development', 'Monthly Support'].map(s => (
                <li key={s}><Link href="/services" className="footer-link hover:-translate-y-0.5 inline-block transform">{s}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-6" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>Quick Links</h4>
            <ul className="space-y-4">
              {[['Home', '/'], ['Services', '/services'], ['Packages', '/packages'], ['Book Now', '/booking'], ['Blog', '/blog'], ['Contact', '/contact']].map(([l, h]) => (
                <li key={h}><Link href={h} className="footer-link hover:-translate-y-0.5 inline-block transform">{l}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-base mb-6" style={{ color: 'white', fontFamily: 'var(--font-heading)' }}>Contact</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3 text-sm text-warm-300" style={{ color: 'var(--warm-300)' }}>
                <Phone size={16} className="mt-0.5 shrink-0 text-primary" style={{ color: 'var(--primary-light)' }} />
                <span>{phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-warm-300" style={{ color: 'var(--warm-300)' }}>
                <Mail size={16} className="mt-0.5 shrink-0 text-primary" style={{ color: 'var(--primary-light)' }} />
                <span>{email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-warm-300" style={{ color: 'var(--warm-300)' }}>
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" style={{ color: 'var(--primary-light)' }} />
                <span>{address}</span>
              </li>
            </ul>

            <div className="p-4 rounded-xl border border-warm-700 bg-warm-800" style={{ borderColor: 'var(--warm-700)', background: 'rgba(255,255,255,0.03)' }}>
              <p className="text-xs font-bold uppercase tracking-wider text-warm-400 mb-2" style={{ color: 'var(--warm-400)' }}>Business Hours</p>
              <div className="space-y-1">
                {hoursParts.map((h, i) => (
                  <p key={i} className="text-sm font-medium" style={{ color: 'var(--warm-200)' }}>{h}</p>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-warm-800 flex flex-col sm:flex-row justify-between items-center gap-6" style={{ borderColor: 'var(--warm-800)' }}>
          <p className="text-sm text-warm-500" style={{ color: 'var(--warm-500)' }}>
            © {new Date().getFullYear()} {siteName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-xs font-medium text-warm-500 hover:text-white transition-colors" style={{ color: 'var(--warm-500)' }}>
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 z-[100] animate-fade-up"
          style={{ backgroundColor: 'var(--primary, #b31942)', color: 'white' }}
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </footer>
  )
}
