import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ServiceIcon from '@/components/public/ServiceIcon'
import { CheckCircle, ArrowRight, Star, Phone, MessageCircle, Zap, Shield, Clock, ThumbsUp } from 'lucide-react'

async function getData() {
  const [services, testimonials, settings] = await Promise.all([
    prisma.service.findMany({ where: { active: true, featured: true }, orderBy: { order: 'asc' }, take: 6 }),
    prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.siteSettings.findMany(),
  ])
  const s: Record<string, string> = {}
  settings.forEach(x => { s[x.key] = x.value })
  return { services, testimonials, settings: s }
}

export default async function HomePage() {
  const { services, testimonials, settings } = await getData()
  const phone = settings.phone || '+251 911 234 567'
  const phoneDigits = phone.replace(/[\s\-()]/g, '')
  const whatsapp = settings.whatsapp || '251911234567'
  const whatsappNum = whatsapp.replace(/[^0-9]/g, '')

  const whyUs = [
    { icon: Zap, title: 'Same-Day Service', desc: 'We respond fast. Most issues resolved within hours of your call.' },
    { icon: Shield, title: 'Secure & Trustworthy', desc: 'Your data and privacy are safe with us. Professional service every time.' },
    { icon: Clock, title: 'We Come to You', desc: 'Door-to-door service. No need to unplug and carry your computer anywhere.' },
    { icon: ThumbsUp, title: 'Affordable Pricing', desc: 'Transparent prices with no hidden fees. Packages to fit every budget.' },
  ]

  const packages = [
    { name: 'Home User', price: '800', unit: 'one-time', features: ['OS & driver updates', 'Virus scan & removal', 'Speed optimization', 'Printer setup', 'Wi-Fi configuration'], color: '#f3f4f6', textColor: '#1f2937' },
    { name: 'Small Business IT', price: '1,500', unit: '/month', features: ['Full network setup', 'Employee access mgmt', '2 visits/month', 'Remote support', 'Monthly security updates', 'Data backup monitoring'], color: '#b31942', textColor: 'white', popular: true },
    { name: 'Website + Maintenance', price: '8,000', unit: 'build + 800/mo', features: ['5-page website', 'Mobile responsive', 'Google Business Profile', 'Business email setup', 'Monthly content update', 'SEO optimization'], color: '#1f2937', textColor: 'white' },
  ]

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient text-white" style={{minHeight:'90vh', display:'flex', alignItems:'center'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-6" style={{background:'rgba(255,255,255,0.15)'}}>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                Available Now · Addis Ababa
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {settings.hero_title || 'Your Local IT Expert'}
              </h1>
              <p className="text-lg sm:text-xl text-red-100 leading-relaxed mb-8 max-w-lg">
                {settings.hero_subtitle || 'Fast, reliable, and affordable IT services for homes and businesses. We come to you!'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking" className="btn-white text-base px-6 py-3">
                  Book a Service <ArrowRight size={18} />
                </Link>
                <a href={`https://wa.me/${whatsappNum}`} className="btn-outline border-white text-white hover:bg-white hover:text-red-700 text-base px-6 py-3">
                  <MessageCircle size={18} /> WhatsApp Us
                </a>
              </div>
              <div className="flex flex-wrap gap-6 mt-10">
                {[['500+','Happy Clients'],['5-Star','Google Rating'],['Same Day','Response'],['3yr','Experience']].map(([v,l]) => (
                  <div key={l}>
                    <div className="text-2xl font-bold">{v}</div>
                    <div className="text-sm text-red-200">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="rounded-2xl p-8" style={{background:'rgba(255,255,255,0.1)', backdropFilter:'blur(10px)', border:'1px solid rgba(255,255,255,0.2)'}}>
                  <div className="text-center mb-6">
                    <div className="text-lg font-semibold">Quick Contact</div>
                    <div className="text-sm text-red-200">Get help right now</div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { icon: Phone, label: 'Call Us', val: phone, href: `tel:${phoneDigits}` },
                      { icon: MessageCircle, label: 'WhatsApp', val: 'Chat Instantly', href: `https://wa.me/${whatsappNum}` },
                    ].map(c => (
                      <a key={c.label} href={c.href} className="flex items-center gap-4 p-4 rounded-xl transition-all" style={{background:'rgba(255,255,255,0.1)'}} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{background:'rgba(255,255,255,0.2)'}}>
                          <c.icon size={18} />
                        </div>
                        <div>
                          <div className="text-xs text-red-200">{c.label}</div>
                          <div className="font-semibold">{c.val}</div>
                        </div>
                      </a>
                    ))}
                  </div>
                  <Link href="/booking" className="btn-white w-full justify-center mt-4 py-3">
                    Book a Service Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why Choose TechServe Pro?</h2>
            <p className="text-gray-500 max-w-xl mx-auto">We're not just any IT service — we're your dedicated local tech partner who shows up, gets it done, and keeps you protected.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyUs.map(w => (
              <div key={w.title} className="card p-6 text-center hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{background:'#fff1f4'}}>
                  <w.icon size={22} style={{color:'#b31942'}} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{w.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Our IT Services</h2>
            <p className="text-gray-500 max-w-xl mx-auto">From emergency virus removal to complete business digitalization — we handle everything IT for you.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.id} className="card p-6 hover:shadow-lg transition-all hover:-translate-y-1 group">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{background:'#fff1f4'}}>
                  <ServiceIcon name={s.icon} size={22} className="text-red-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{s.shortDesc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold" style={{color:'#b31942'}}>{s.price}</span>
                  <span className="text-xs text-gray-400">{s.duration}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-outline">View All Services <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-padding bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Service Packages</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Choose a package that fits your needs. All packages include professional support and a satisfaction guarantee.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map(p => (
              <div key={p.name} className="rounded-2xl overflow-hidden shadow-md relative" style={{background:p.color}}>
                {p.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                )}
                <div className="p-8">
                  <h3 className="text-lg font-bold mb-1" style={{color:p.textColor}}>{p.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-3xl font-bold" style={{color:p.textColor}}>{p.price}</span>
                    <span className="text-sm mb-1 opacity-70" style={{color:p.textColor}}>ETB {p.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {p.features.map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-sm" style={{color:p.textColor, opacity:0.9}}>
                        <CheckCircle size={15} className="shrink-0 opacity-80" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking" className={p.popular ? 'btn-white w-full justify-center' : 'btn-primary w-full justify-center'}>
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/packages" className="text-sm font-medium hover:underline" style={{color:'#b31942'}}>See all packages & compare features →</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">What Our Clients Say</h2>
              <p className="text-gray-500">Trusted by hundreds of happy customers across Addis Ababa.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map(t => (
                <div key={t.id} className="card p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({length:t.rating}).map((_,i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">"{t.content}"</p>
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                    <div className="text-xs text-gray-400">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="hero-gradient text-white py-20">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Fix Your IT Problems?</h2>
          <p className="text-red-100 text-lg mb-8">Book a service today. We respond fast, we come to you, and we get the job done right.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/booking" className="btn-white text-base px-8 py-3">Book Now — It's Easy</Link>
            <a href={`tel:${phoneDigits}`} className="btn-outline border-white text-white hover:bg-white hover:text-red-700 text-base px-8 py-3">
              <Phone size={18} /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
