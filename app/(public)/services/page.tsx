import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import ServiceIcon from '@/components/public/ServiceIcon'
import Link from 'next/link'
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
  title: 'IT Services & Software Repair',
  description: 'Professional IT services in Ethiopia. We offer computer repair, data recovery, network setup, virus removal, and software problem solving for businesses and homes.',
  alternates: { canonical: 'https://www.supait.com/services' },
}

// Allow filtering via URL query param: ?category=Security
export default async function ServicesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const category = (await searchParams).category
  
  const whereClause = { active: true, ...(category && category !== 'All' ? { category } : {}) }
  const services = await prisma.service.findMany({ where: whereClause, orderBy: { order: 'asc' } })
  
  // Get unique categories from all active services
  const allServices = await prisma.service.findMany({ where: { active: true }, select: { category: true } })
  const uniqueCategories = ['All', ...Array.from(new Set(allServices.map(s => s.category)))]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'IT Support & Computer Repair',
    provider: {
      '@type': 'LocalBusiness',
      name: 'SupaIT',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Addis Ababa',
        addressCountry: 'ET'
      }
    },
    areaServed: {
      '@type': 'City',
      name: 'Addis Ababa'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'IT Services',
      itemListElement: services.map((s, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.description
        },
        position: index + 1
      }))
    }
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/20 shadow-lg">What We Do</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 font-heading">Our IT Services</h1>
          <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto font-medium">Complete IT solutions for homes and businesses. From emergency repairs to ongoing monthly support — we handle it all.</p>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {uniqueCategories.map(cat => {
              const isActive = category === cat || (!category && cat === 'All')
              return (
                <Link 
                  key={cat} 
                  href={cat === 'All' ? '/services' : `/services?category=${cat}`}
                  className="px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-md hover:scale-105"
                  style={isActive ? { background: 'var(--primary)', color: 'white' } : { background: 'var(--surface-warm)', color: 'var(--text-secondary)' }}
                >
                  {cat}
                </Link>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, idx) => (
              <div key={s.id} className={`card-interactive flex flex-col p-8 group animate-fade-up stagger-${(idx % 4) + 1}`}>
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-primary-50 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 shadow-sm border border-primary-100">
                    <ServiceIcon name={s.icon} size={28} />
                  </div>
                  <div className="pt-1">
                    <div className="text-xs font-bold uppercase tracking-widest text-primary mb-1">{s.category}</div>
                    <h3 className="font-bold text-text-primary text-xl font-heading leading-tight">{s.title}</h3>
                  </div>
                </div>
                
                <p className="text-base text-text-secondary leading-relaxed mb-8 flex-1 font-medium">{s.description}</p>
                
                <div className="bg-surface-warm rounded-xl p-4 mb-6 border border-border-light">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Starting from</div>
                    <div className="font-bold text-primary text-lg">{s.price}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-text-muted uppercase tracking-wider">Duration</div>
                    <div className="text-sm font-bold text-text-primary flex items-center gap-1.5">
                      <Clock size={14} className="text-primary-light" /> {s.duration}
                    </div>
                  </div>
                </div>
                
                <Link href={`/booking?service=${s.id}`} className="btn-outline w-full justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  Book This Service <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>

          {services.length === 0 && (
            <div className="text-center py-20 bg-surface-warm rounded-2xl border border-dashed border-border">
              <ShieldCheck size={48} className="mx-auto text-warm-300 mb-4" />
              <h3 className="text-xl font-bold text-text-primary mb-2">No services found</h3>
              <p className="text-text-secondary">Try selecting a different category.</p>
              <Link href="/services" className="btn-primary mt-6">View All Services</Link>
            </div>
          )}

        </div>
      </section>
      
      <section className="py-20 px-4 bg-warm-900 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 font-heading">Not sure what you need?</h2>
          <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto font-medium">Contact us and we'll diagnose your IT problem for free and recommend the right service for your specific situation.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn-primary shadow-primary-lg scale-105 hover:scale-110">Contact Us</Link>
            <Link href="/booking" className="btn-outline border-warm-600 text-white hover:bg-white hover:text-warm-900 hover:border-white">Book a Diagnostic Visit</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
