import Link from 'next/link'
import { CheckCircle, X, Star, ArrowRight, ShieldCheck } from 'lucide-react'
import { prisma } from '@/lib/prisma'

export default async function PackagesPage() {
  const dbPackages = await prisma.package.findMany({
    where: { active: true },
    orderBy: { order: 'asc' }
  })

  return (
    <div>
      <section className="hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/20 shadow-lg">Pricing Plans</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 font-heading">Service Packages</h1>
          <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto font-medium">Choose the right plan for your home or business. All packages include a satisfaction guarantee and 100% transparent pricing.</p>
        </div>
      </section>

      <section className="section-padding bg-surface-warm relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-50 rounded-full filter blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent-50 rounded-full filter blur-[80px] opacity-60 translate-y-1/3 -translate-x-1/4"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center lg:px-4">
            {dbPackages.length > 0 ? dbPackages.map((p, idx) => {
              const features = (p.features as any[]) || []
              return (
                <div key={p.id} className={`rounded-[2rem] overflow-hidden shadow-xl relative flex flex-col transition-all duration-500 hover:-translate-y-2 animate-fade-up stagger-${(idx % 3) + 1} ${p.popular ? 'package-popular lg:-mx-4 min-h-[600px]' : 'min-h-[560px]'}`} style={{background: p.color || 'white'}}>
                  {p.popular && (
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer" style={{backgroundSize: '200% 100%'}}></div>
                  )}
                  {p.popular && (
                    <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Star size={12} fill="currentColor" /> Most Popular
                    </div>
                  )}
                  <div className={`p-8 sm:p-10 flex-1 flex flex-col ${p.popular ? 'pt-12' : ''}`}>
                    <h3 className="text-2xl font-bold mb-2 font-heading" style={{color: p.textColor || 'var(--text-primary)'}}>{p.name}</h3>
                    <div className="flex items-baseline gap-1 mb-8">
                      <span className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{color: p.textColor || 'var(--text-primary)'}}>{p.price}</span>
                      <span className="text-sm font-bold opacity-60" style={{color: p.textColor || 'var(--text-primary)'}}>ETB {p.unit}</span>
                    </div>
                    
                    <ul className="space-y-4 mb-10 flex-1">
                      {features.map((f: any, i: number) => {
                        const isLightText = p.textColor && p.textColor.toLowerCase() !== '#111827' && p.textColor.toLowerCase() !== 'black' && p.textColor.toLowerCase() !== 'var(--text-primary)'
                        const colorProps = isLightText 
                          ? { color: f.inc ? p.textColor : 'rgba(255,255,255,0.4)' }
                          : { color: f.inc ? 'var(--text-primary)' : 'var(--text-muted)' }
                          
                        return (
                          <li key={i} className="flex items-start gap-3 text-sm font-medium leading-tight" style={colorProps}>
                            {f.inc ? (
                              <CheckCircle size={18} className="shrink-0 mt-0.5" style={{color: p.popular && !isLightText ? 'var(--accent)' : (isLightText ? p.textColor : 'var(--primary)')}} />
                            ) : (
                              <X size={18} className="shrink-0 mt-0.5 opacity-50" />
                            )}
                            <span className={!f.inc ? 'line-through opacity-70' : ''}>{f.f}</span>
                          </li>
                        )
                      })}
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
            }) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 bg-surface rounded-3xl border border-dashed border-border shadow-sm">
                <ShieldCheck size={64} className="mx-auto text-warm-300 mb-6" />
                <h3 className="text-2xl font-bold text-text-primary mb-3 font-heading">No packages available</h3>
                <p className="text-text-secondary text-lg">We are currently updating our pricing. Please contact us directly for a quote.</p>
                <Link href="/contact" className="btn-primary mt-8">Contact Us</Link>
              </div>
            )}
          </div>
          
          <div className="mt-20 card p-10 sm:p-16 text-center max-w-4xl mx-auto bg-white shadow-xl relative overflow-hidden border-0">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full filter blur-[60px] opacity-80 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <span className="overline justify-center">Enterprise Solutions</span>
              <h3 className="text-3xl font-bold text-text-primary mb-4 font-heading">Need a Custom Package?</h3>
              <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto font-medium leading-relaxed">Have unique requirements, multiple locations, or need specialized enterprise IT support? We'll build a custom IT support plan specifically for your business.</p>
              <Link href="/contact" className="btn-primary shadow-primary-lg text-lg px-8 py-4">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
