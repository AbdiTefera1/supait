import BookingForm from '@/components/public/BookingForm'
import { prisma } from '@/lib/prisma'
import { Clock, MapPin, Phone, CheckCircle } from 'lucide-react'
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
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-3">Book a Service</h1>
          <p className="text-red-100 text-lg">Fill out the form below and we'll confirm your appointment within 2 hours.</p>
        </div>
      </section>
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="card p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>
                <BookingForm services={services} />
              </div>
            </div>
            <div className="space-y-5">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">How it works</h3>
                <div className="space-y-4">
                  {[
                    ['1', 'Fill the form', 'Select your service, preferred date and time.'],
                    ['2', 'Confirmation', 'We confirm within 2 hours via phone/WhatsApp.'],
                    ['3', 'We come to you', 'Our technician arrives at your location.'],
                    ['4', 'Problem solved', 'Issue fixed. Payment after completion.'],
                  ].map(([n,t,d]) => (
                    <div key={n} className="flex gap-3">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white" style={{background:'#b31942'}}>{n}</div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{t}</div>
                        <div className="text-xs text-gray-500">{d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Our Promise</h3>
                <ul className="space-y-3">
                  {['Transparent pricing — no hidden fees','Professional & certified technician','Your data stays private & secure','Satisfaction guaranteed or free revisit'].map(p => (
                    <li key={p} className="flex gap-2 text-sm text-gray-600"><CheckCircle size={15} className="shrink-0 mt-0.5" style={{color:'#b31942'}} />{p}</li>
                  ))}
                </ul>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Contact Us Directly</h3>
                <div className="space-y-3">
                  <a href={`tel:${phoneDigits}`} className="flex items-center gap-3 text-sm text-gray-600 hover:text-red-700"><Phone size={15} style={{color:'#b31942'}} />{phone}</a>
                  <div className="flex items-center gap-3 text-sm text-gray-600"><Clock size={15} style={{color:'#b31942'}} />{businessHours}</div>
                  <div className="flex items-center gap-3 text-sm text-gray-600"><MapPin size={15} style={{color:'#b31942'}} />{address}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
