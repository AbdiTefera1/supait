import ContactForm from '@/components/public/ContactForm'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'
import { fetchSettings } from '@/lib/fetchSettings'

export default async function ContactPage() {
  const settings = await fetchSettings()
  const phone = settings.phone || '+251 911 234 567'
  const phoneDigits = phone.replace(/[\s\-()]/g, '')
  const email = settings.email || 'info@techservepro.com'
  const address = settings.address || 'Addis Ababa, Ethiopia'
  const businessHours = settings.business_hours || 'Mon–Sat: 8AM–8PM\nSun: 10AM–5PM'
  const whatsapp = settings.whatsapp || '251911234567'
  const telegram = settings.telegram || 'https://t.me/techservepro'
  const whatsappUrl = whatsapp.startsWith('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}`

  return (
    <div>
      <section className="hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/20 shadow-lg">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 font-heading">Get in Touch</h1>
          <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto font-medium">Have a question or need IT help? Send us a message and we'll respond within a few hours.</p>
        </div>
      </section>

      <section className="section-padding bg-surface-warm relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            <div className="lg:col-span-7 xl:col-span-8 animate-fade-up stagger-1">
              <div className="card p-8 sm:p-12 shadow-lg border-0 bg-white">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 font-heading">Send us a Message</h2>
                  <p className="text-text-secondary font-medium">Fill out the form below and our team will get back to you shortly.</p>
                </div>
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-5 xl:col-span-4 space-y-8 animate-fade-up stagger-2">
              <div className="card p-8 text-white shadow-xl border-0 relative overflow-hidden" style={{ backgroundColor: 'var(--warm-900)' }}>
                <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full filter blur-[60px] opacity-40" style={{ backgroundColor: 'var(--primary)' }}></div>
                
                <h3 className="text-xl font-bold mb-8 font-heading relative z-10 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(179, 25, 66, 0.2)' }}>
                    <MapPin size={16} style={{ color: '#ffe0e7' }} />
                  </div>
                  Contact Information
                </h3>
                
                <div className="space-y-6 relative z-10">
                  {[
                    { icon: Phone, label: 'Phone Support', val: phone, href: `tel:${phoneDigits}` },
                    { icon: Mail, label: 'Email Address', val: email, href: `mailto:${email}` },
                    { icon: MapPin, label: 'Office Location', val: address, href: null },
                    { icon: Clock, label: 'Business Hours', val: businessHours, href: null },
                  ].map(c => (
                    <div key={c.label} className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors border border-white/10 hover:bg-red-700" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                        <c.icon size={20} style={{ color: '#ffe0e7' }} className="group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: '#a8a29e' }}>{c.label}</div>
                        {c.href ? (
                          <a href={c.href} className="text-base text-white hover:text-red-300 font-bold transition-colors">{c.val}</a>
                        ) : (
                          <div className="text-base text-white font-bold whitespace-pre-line leading-relaxed">{c.val}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-8 bg-white shadow-md border-0">
                <h3 className="text-xl font-bold text-text-primary mb-6 font-heading">Reach us on Social</h3>
                <div className="grid grid-cols-1 gap-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-sm hover:shadow-md" style={{background: '#25D366', color: 'white'}}>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <MessageCircle size={22} fill="currentColor" />
                    </div>
                    WhatsApp Chat
                  </a>
                  <a href={telegram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 rounded-2xl font-bold transition-all hover:-translate-y-1 shadow-sm hover:shadow-md" style={{background: '#229ED9', color: 'white'}}>
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <Send size={20} className="-ml-1" />
                    </div>
                    Telegram Channel
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
