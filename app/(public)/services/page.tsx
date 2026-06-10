import { prisma } from '@/lib/prisma'
import ServiceIcon from '@/components/public/ServiceIcon'
import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const categories = ['All','Security','Data','Setup','Network','Digital','Support','Training']

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
  return (
    <div>
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our IT Services</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">Complete IT solutions for homes and businesses. From emergency repairs to ongoing monthly support — we do it all.</p>
        </div>
      </section>
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(s => (
              <div key={s.id} className="card p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{background:'#fff1f4'}}>
                    <ServiceIcon name={s.icon} size={22} className="text-red-700" />
                  </div>
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">{s.category}</div>
                    <h3 className="font-bold text-gray-900">{s.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-5">{s.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-xs text-gray-400">Starting from</div>
                    <div className="font-bold text-red-700">{s.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Duration</div>
                    <div className="text-sm font-medium text-gray-700">{s.duration}</div>
                  </div>
                </div>
                <Link href="/booking" className="btn-primary w-full justify-center mt-4">Book This Service</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Not sure what you need?</h2>
          <p className="text-gray-500 mb-6">Contact us and we'll diagnose your IT problem for free and recommend the right service.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn-primary">Contact Us</Link>
            <Link href="/booking" className="btn-outline">Book a Diagnostic Visit</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
