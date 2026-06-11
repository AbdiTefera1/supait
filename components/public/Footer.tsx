import Link from 'next/link'
import { Zap, Phone, Mail, MapPin, Facebook, Send, MessageCircle } from 'lucide-react'

interface FooterProps {
  settings: Record<string, string>
}

export default function Footer({ settings }: FooterProps) {
  const siteName = settings.site_name || 'Supa IT'
  const tagline = settings.site_tagline || 'Your trusted local IT partner for homes and businesses. Fast, reliable, affordable.'
  const phone = settings.phone || '+251 911 234 567'
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

  return (
    <footer style={{background:'#1f2937', color:'white'}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4" style={{color:'#f87171'}}>
              {logo ? (
                <img src={logo} alt={siteName} style={{height:'28px', width:'auto', objectFit:'contain'}} />
              ) : (
                <Zap size={22} fill="#f87171" />
              )}
              {siteName}
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">{tagline}</p>
            <div className="flex gap-3">
              {facebook && (
                <a href={facebook} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{background:'rgba(255,255,255,0.08)'}} target="_blank" rel="noopener noreferrer">
                  <Facebook size={16} />
                </a>
              )}
              {telegram && (
                <a href={telegram} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{background:'rgba(255,255,255,0.08)'}} target="_blank" rel="noopener noreferrer">
                  <Send size={16} />
                </a>
              )}
              {whatsappUrl && (
                <a href={whatsappUrl} className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors" style={{background:'rgba(255,255,255,0.08)'}} target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={16} />
                </a>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Virus Removal','Data Recovery','PC Setup','Network Setup','Website Development','Monthly Support'].map(s => (
                <li key={s}><Link href="/services" className="text-sm text-gray-400 hover:text-white transition-colors">{s}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[['Home','/'],['Services','/services'],['Packages','/packages'],['Book Now','/booking'],['Blog','/blog'],['Contact','/contact']].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-sm text-gray-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-400 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400"><Phone size={15} className="mt-0.5 shrink-0" /><span>{phone}</span></li>
              <li className="flex items-start gap-3 text-sm text-gray-400"><Mail size={15} className="mt-0.5 shrink-0" /><span>{email}</span></li>
              <li className="flex items-start gap-3 text-sm text-gray-400"><MapPin size={15} className="mt-0.5 shrink-0" /><span>{address}</span></li>
            </ul>
            <div className="mt-5 p-3 rounded-lg" style={{background:'rgba(179,25,66,0.2)', border:'1px solid rgba(179,25,66,0.3)'}}>
              <p className="text-xs text-gray-300 font-medium">Business Hours</p>
              {hoursParts.map((h, i) => (
                <p key={i} className="text-xs text-gray-400 mt-1">{h}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          <Link href="/admin" className="text-xs text-gray-600 hover:text-gray-400">Admin Portal</Link>
        </div>
      </div>
    </footer>
  )
}
