import { Metadata } from 'next'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import ServiceIcon from '@/components/public/ServiceIcon'
import { CheckCircle, ArrowRight, Star, Phone, MessageCircle, Zap , Shield, Clock, ThumbsUp, ChevronRight  } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Top-rated tech service in Ethiopia. We solve software problems, repair computers, and provide complete IT support in Addis Ababa.',
  alternates: { canonical: 'https://www.supait.com' },
}

async function getData() {
  const [services, testimonials, settings, packages] = await Promise.all([
    prisma.service.findMany({ where: { active: true, featured: true }, orderBy: { order: 'asc' }, take: 6 }),
    prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
    prisma.siteSettings.findMany(),
    prisma.package.findMany({ where: { active: true, popular: true }, orderBy: { order: 'asc' }, take: 3 })
  ])
  const s: Record<string, string> = {}
  settings.forEach(x => { s[x.key] = x.value })
  return { services, testimonials, settings: s, packages }
}

export default async function HomePage() {
  const { services, testimonials, settings, packages } = await getData()
  const phone = settings.phone || '+251 911 234 567'
  const phoneDigits = phone.replace(/[\s\-()]/g, '')
  const whatsapp = settings.whatsapp || '251911234567'
  const whatsappNum = whatsapp.replace(/[^0-9]/g, '')

  const whyUs = [
    { icon: Zap, title: 'Lightning Fast Response', desc: 'When your business is down, every minute counts. We respond to emergency calls within 15 minutes and resolve most issues the same day.' },
    { icon: Shield, title: 'Secure & Trustworthy', desc: 'Your data privacy is our top priority. We use enterprise-grade encryption and strict privacy protocols for every single client.' },
    { icon: Clock, title: 'Door-to-Door Service', desc: 'Don\'t unplug your entire setup. Our technicians come directly to your home or office fully equipped to solve the problem.' },
    { icon: ThumbsUp, title: 'No Surprise Pricing', desc: 'We believe in 100% transparent pricing. You get a clear, upfront quote before any work begins, with zero hidden fees.' },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SupaIT',
    image: 'https://www.supait.com/images/logo.png',
    '@id': 'https://www.supait.com',
    url: 'https://www.supait.com',
    telephone: phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Addis Ababa',
      addressLocality: 'Addis Ababa',
      addressRegion: 'Addis Ababa',
      postalCode: '1000',
      addressCountry: 'ET'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 9.0300,
      longitude: 38.7400
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
      ],
      opens: '08:00',
      closes: '20:00'
    },
    priceRange: '$$',
    description: 'Expert IT support, computer repair, and software problem solving in Addis Ababa, Ethiopia.'
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* HERO SECTION */}
      <section className="hero-gradient text-white" style={{minHeight:'90vh', display:'flex', alignItems:'center'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Hero Left: Content */}
            <div className="animate-fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8 glass shadow-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse-glow" style={{boxShadow: '0 0 10px rgba(74, 222, 128, 0.6)'}}></span>
                Technicians available now in Addis Ababa
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6">
                {settings.hero_title || 'Your Local IT Expert'}
              </h1>
              <p className="text-lg sm:text-xl text-primary-100 leading-relaxed mb-10 max-w-lg font-medium opacity-90">
                {settings.hero_subtitle || 'Fast, reliable, and affordable IT services for homes and businesses. We come to you!'}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/booking" className="btn-white text-base px-8 py-4 w-full sm:w-auto justify-center group">
                  Book a Service <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a href={`https://wa.me/${whatsappNum}`} className="btn-outline border-white text-white hover:bg-white hover:text-primary text-base px-8 py-4 w-full sm:w-auto justify-center group">
                  <MessageCircle size={18} className="group-hover:scale-110 transition-transform" /> WhatsApp Us
                </a>
              </div>
              
              <div className="flex flex-wrap gap-x-10 gap-y-6 pt-8 border-t border-white/20">
                {[['500+','Happy Clients'],['5-Star','Google Rating'],['Same Day','Response']].map(([v,l], i) => (
                  <div key={l} className={`animate-fade-up stagger-${i+1}`}>
                    <div className="text-3xl font-extrabold mb-1" style={{fontFamily: 'var(--font-heading)'}}>{v}</div>
                    <div className="text-sm font-medium text-primary-200 uppercase tracking-wider">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Right: Quick Contact Glass Card */}
            <div className="hidden lg:block animate-fade-left stagger-2 relative">
              {/* Decorative floating elements */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent rounded-full filter blur-[60px] opacity-40 animate-pulse-glow"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary-light rounded-full filter blur-[70px] opacity-40"></div>
              
              <div className="glass rounded-3xl p-10 relative z-10 shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
                <div className="text-center mb-8">
                  <div className="inline-block p-3 rounded-2xl bg-white/10 mb-4 animate-float">
                    <Zap size={32} className="text-yellow-400 drop-shadow-md" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading">Quick Contact</h3>
                  <p className="text-primary-100 font-medium mt-2">Get help right now</p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Call Support', val: phone, href: `tel:${phoneDigits}`, color: 'var(--accent)' },
                    { icon: MessageCircle, label: 'WhatsApp', val: 'Chat Instantly', href: `https://wa.me/${whatsappNum}`, color: '#25D366' },
                  ].map(c => (
                    <a key={c.label} href={c.href} className="flex items-center gap-5 p-5 rounded-2xl transition-all hover:bg-white/10 border border-transparent hover:border-white/20 group" style={{background:'rgba(255,255,255,0.05)'}} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                      <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300" style={{background: 'rgba(255,255,255,0.1)'}}>
                        <c.icon size={24} style={{color: c.color}} />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary-200 uppercase tracking-wider mb-1">{c.label}</div>
                        <div className="text-lg font-bold tracking-wide">{c.val}</div>
                      </div>
                    </a>
                  ))}
                </div>
                
                <Link href="/booking" className="btn-white w-full justify-center mt-8 py-4 text-lg group">
                  Schedule Online
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US — BENTO GRID */}
      <section className="section-padding bg-surface-warm relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="section-heading">
            <span className="overline">The TechServe Advantage</span>
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose Us?</h2>
            <p className="mt-4 text-lg">We're not just any IT service — we're your dedicated local tech partner who shows up, gets it done, and keeps you protected.</p>
          </div>
          
          <div className="bento-grid">
            {whyUs.map((w, i) => (
              <div key={w.title} className="card p-8 sm:p-10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-surface group relative overflow-hidden">
                {/* Decorative background circle on hover */}
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 ease-out z-0"></div>
                
                <div className="relative z-10">
                  <div 
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform duration-300 group-hover:scale-110"
                    style={{ background: i % 2 === 0 ? 'var(--primary)' : 'var(--accent)', color: 'white' }}
                  >
                    <w.icon size={26} />
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 font-heading leading-snug">{w.title}</h3>
                  <p className="text-text-secondary leading-relaxed font-medium">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES — ASYMMETRIC LAYOUT */}
      <section className="section-padding bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="section-heading mb-0 max-w-2xl">
              <span className="overline">What We Do</span>
              <h2 className="text-3xl md:text-4xl font-bold">Our IT Services</h2>
              <p className="mt-4 text-lg">From emergency virus removal to complete business digitalization — we handle everything IT for you.</p>
            </div>
            <Link href="/services" className="btn-outline shrink-0 group">
              View All Services <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, idx) => {
              // Make the first service span 2 columns on large screens for an asymmetric look
              const isFeatured = idx === 0;
              return (
                <div key={s.id} className={`card-interactive group flex flex-col p-8 ${isFeatured ? 'lg:col-span-2 lg:flex-row lg:items-center gap-8' : ''}`}>
                  <div 
                    className={`shrink-0 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 ${isFeatured ? 'mb-0' : 'mb-6'}`}
                    style={isFeatured ? { width: '5rem', height: '5rem', background: 'var(--primary)', color: 'white' } : { width: '3.5rem', height: '3.5rem', background: 'var(--primary-50)', color: 'var(--primary)' }}
                  >
                    <ServiceIcon name={s.icon} size={isFeatured ? 36 : 28} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold text-text-primary mb-3 font-heading ${isFeatured ? 'text-2xl' : 'text-xl'}`}>{s.title}</h3>
                    <p className={`text-text-secondary leading-relaxed mb-6 ${isFeatured ? 'text-lg max-w-xl' : 'text-base'}`}>{s.shortDesc}</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border-light mt-auto">
                      <span className="font-bold text-primary text-lg">{s.price}</span>
                      <span className="text-sm font-medium text-text-muted flex items-center gap-1"><Clock size={14} /> {s.duration}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="section-padding bg-surface-warm relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50 rounded-full filter blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-50 rounded-full filter blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="section-heading center">
            <span className="overline justify-center">Pricing</span>
            <h2 className="text-3xl md:text-4xl font-bold">Service Packages</h2>
            <p className="mt-4 text-lg">Choose a package that fits your needs. All packages include professional support and a 100% satisfaction guarantee.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center lg:px-8">
            {packages.length > 0 ? packages.map(p => {
              const features = (p.features as any[]) || []
              return (
                <div key={p.id} className={`rounded-[2rem] overflow-hidden shadow-xl relative flex flex-col transition-all duration-500 hover:-translate-y-2 ${p.popular ? 'package-popular lg:-mx-4 min-h-[520px]' : 'min-h-[480px]'}`} style={{background: p.color}}>
                  {p.popular && (
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer" style={{backgroundSize: '200% 100%'}}></div>
                  )}
                  {p.popular && (
                    <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Most Popular
                    </div>
                  )}
                  <div className={`p-8 sm:p-10 flex-1 flex flex-col ${p.popular ? 'pt-12' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2 font-heading" style={{color: p.textColor}}>{p.name}</h3>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{color: p.textColor}}>{p.price}</span>
                      <span className="text-sm font-medium opacity-70" style={{color: p.textColor}}>{p.unit}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                      {features.filter((f: any) => f.inc).slice(0, 6).map((f: any, idx: number) => (
                        <li key={idx} className="flex items-start gap-3 text-sm font-medium leading-tight" style={{color: p.textColor, opacity: 0.9}}>
                          <CheckCircle size={18} className="shrink-0 mt-0.5" style={{color: p.popular ? 'var(--accent-light)' : 'var(--primary)'}} />
                          <span>{f.f}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      href={`/booking?package=${p.id}`} 
                      className="w-full flex justify-center py-4 rounded-xl font-bold text-center transition-all group items-center gap-2 shadow-lg hover:scale-[1.02]"
                      style={p.popular ? { backgroundColor: 'white', color: 'var(--primary, #b31942)' } : { backgroundColor: 'var(--primary, #b31942)', color: 'white' }}
                    >
                      Select Package <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            }) : <p className="col-span-3 text-center text-text-muted py-10 font-medium text-lg">No packages available at the moment.</p>}
          </div>
          <div className="text-center mt-12">
            <Link href="/packages" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors text-lg group">
              Compare all features <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section-padding bg-surface relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="section-heading center mb-16">
              <span className="overline justify-center">Reviews</span>
              <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
              <p className="mt-4 text-lg">Trusted by hundreds of happy customers across Addis Ababa.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((t, idx) => (
                <div key={t.id} className={`card p-8 testimonial-card relative bg-surface-warm border-none shadow-sm hover:shadow-md transition-shadow animate-fade-up stagger-${(idx % 4) + 1}`}>
                  <div className="flex gap-1 mb-6">
                    {Array.from({length:t.rating}).map((_,i) => <Star key={i} size={16} fill="var(--accent)" color="var(--accent)" />)}
                  </div>
                  <p className="text-base text-text-secondary leading-relaxed mb-8 italic relative z-10 font-medium">"{t.content}"</p>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary font-bold flex items-center justify-center font-heading text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-text-primary tracking-wide">{t.name}</div>
                      <div className="text-xs font-medium text-text-muted uppercase tracking-wider mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA SECTION */}
      <section className="relative overflow-hidden section-padding bg-warm-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9zdmc+')] opacity-50"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-30"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent rounded-full filter blur-[100px] opacity-20"></div>
        
        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 font-heading leading-tight">Ready to Fix Your IT Problems?</h2>
          <p className="text-warm-300 text-xl mb-12 max-w-2xl mx-auto font-medium">Book a service today. We respond fast, we come to you, and we get the job done right.</p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/booking" className="btn-primary text-lg px-10 py-4 shadow-primary-lg scale-105 group">
              Book Now — It's Easy <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href={`tel:${phoneDigits}`} className="btn-outline border-warm-600 text-white hover:bg-white hover:text-warm-900 hover:border-white text-lg px-10 py-4 group">
              <Phone size={20} className="group-hover:scale-110 transition-transform" /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
