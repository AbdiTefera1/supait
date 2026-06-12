import BookingForm from '@/components/public/BookingForm'
import { prisma } from '@/lib/prisma'
import { Clock, MapPin, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react'
import { fetchSettings } from '@/lib/fetchSettings'

export default async function BookingPage() {
  const [services, settings] = await Promise.all([
    prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' }, select: { id: true, title: true, price: true, category: true } }),
    fetchSettings(),
  ])
  const phone = settings.phone || '+251 911 234 567'
  const phoneDigits = phone.replace(/[\s\-()]/g, '')
  const businessHours = settings.business_hours || 'Mon–Sat: 8AM–8PM'
  const address = settings.address || 'Addis Ababa, Ethiopia'

  return (
    <div>
      <section className="hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/20 shadow-lg">Schedule Service</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 font-heading">Book an Appointment</h1>
          <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto font-medium">Fill out the form below and we'll confirm your appointment within 2 hours. Fast, easy, and secure.</p>
        </div>
      </section>

      <section className="section-padding bg-surface-warm relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            <div className="lg:col-span-7 xl:col-span-8 animate-fade-up stagger-1">
              <div className="card p-8 sm:p-12 shadow-lg border-0 bg-white">
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-3 font-heading">Booking Details</h2>
                  <p className="text-text-secondary font-medium">Please provide accurate information so our technicians can prepare for your visit.</p>
                </div>
                <BookingForm services={services} />
              </div>
            </div>
            
            <div className="lg:col-span-5 xl:col-span-4 space-y-8 animate-fade-up stagger-2">
              
              <div className="card p-8 bg-white shadow-md border-0">
                <h3 className="text-xl font-bold text-text-primary mb-8 font-heading flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-primary-50 flex items-center justify-center text-primary"><Clock size={16} /></span>
                  How it works
                </h3>
                
                <div className="space-y-6">
                  {[
                    ['1', 'Fill the form', 'Select your service, preferred date and time.'],
                    ['2', 'Confirmation', 'We confirm within 2 hours via phone/WhatsApp.'],
                    ['3', 'We come to you', 'Our technician arrives at your location.'],
                    ['4', 'Problem solved', 'Issue fixed. Payment after completion.'],
                  ].map(([n,t,d]) => (
                    <div key={n} className="timeline-step">
                      <div className="timeline-dot">{n}</div>
                      <div>
                        <div className="font-bold text-base text-text-primary mb-1">{t}</div>
                        <div className="text-sm font-medium text-text-secondary leading-relaxed">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card p-8 bg-primary-50 border-primary-100 shadow-sm relative overflow-hidden">
                <ShieldCheck size={120} className="absolute -right-6 -bottom-6 text-primary opacity-5" />
                <h3 className="text-xl font-bold text-primary-900 mb-6 font-heading relative z-10">Our Promise</h3>
                <ul className="space-y-4 relative z-10">
                  {['Transparent pricing — no hidden fees','Professional & certified technicians','Your data stays private & secure','Satisfaction guaranteed or free revisit'].map(p => (
                    <li key={p} className="flex items-start gap-3 text-sm font-bold text-primary-900">
                      <CheckCircle2 size={18} className="shrink-0 mt-0.5 text-primary" />
                      <span className="leading-tight">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="card p-8 text-white shadow-xl border-0" style={{ backgroundColor: 'var(--warm-900)' }}>
                <h3 className="text-lg font-bold mb-6 font-heading">Need immediate help?</h3>
                <div className="space-y-5">
                  <a href={`tel:${phoneDigits}`} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-red-700" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <Phone size={18} style={{ color: '#ffe0e7' }} className="group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#a8a29e' }}>Call Us Directly</div>
                      <div className="text-base font-bold">{phone}</div>
                    </div>
                  </a>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <Clock size={18} style={{ color: '#ffe0e7' }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#a8a29e' }}>Business Hours</div>
                      <div className="text-sm font-bold">{businessHours}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
                      <MapPin size={18} style={{ color: '#ffe0e7' }} />
                    </div>
                    <div>
                      <div className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: '#a8a29e' }}>Location</div>
                      <div className="text-sm font-bold">{address}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
