import Link from 'next/link'
import { CheckCircle, X } from 'lucide-react'

const packages = [
  {
    name: 'Home User', price: '800', unit: 'one-time visit', color: 'white',
    features: [
      {f:'OS & driver updates', inc:true},
      {f:'Virus scan & removal', inc:true},
      {f:'Speed optimization', inc:true},
      {f:'Printer setup', inc:true},
      {f:'Wi-Fi configuration', inc:true},
      {f:'30-day follow-up call', inc:true},
      {f:'Monthly visits', inc:false},
      {f:'Remote support', inc:false},
      {f:'Data backup monitoring', inc:false},
    ]
  },
  {
    name: 'Family Security', price: '1,500', unit: 'setup + 400/mo', color: 'white', popular: false,
    features: [
      {f:'Parental controls (all devices)', inc:true},
      {f:'Website blocking & time limits', inc:true},
      {f:'Antivirus on all PCs', inc:true},
      {f:'Automated backup setup', inc:true},
      {f:'Monthly check-in call', inc:true},
      {f:'WhatsApp support', inc:true},
      {f:'On-site visits', inc:false},
      {f:'Employee management', inc:false},
      {f:'Priority support', inc:false},
    ]
  },
  {
    name: 'Small Business IT', price: '1,500', unit: '/month', color: '#b31942', textColor: 'white', popular: true,
    features: [
      {f:'Full network setup', inc:true},
      {f:'Employee access management', inc:true},
      {f:'2 on-site visits/month', inc:true},
      {f:'Remote support (WhatsApp)', inc:true},
      {f:'Monthly security updates', inc:true},
      {f:'Data backup monitoring', inc:true},
      {f:'Priority 24hr response', inc:true},
      {f:'Staff training (basic)', inc:true},
      {f:'Google Business Profile', inc:false},
    ]
  },
  {
    name: 'Website + Maintenance', price: '8,000', unit: 'build + 800/mo', color: 'white',
    features: [
      {f:'5-page professional website', inc:true},
      {f:'Mobile-responsive design', inc:true},
      {f:'Google Business Profile', inc:true},
      {f:'Business email setup', inc:true},
      {f:'Monthly content update', inc:true},
      {f:'Basic SEO optimization', inc:true},
      {f:'On-site IT support', inc:false},
      {f:'Network management', inc:false},
      {f:'Staff training', inc:false},
    ]
  },
  {
    name: 'Business Pro', price: '3,000', unit: '/month', color: '#1f2937', textColor: 'white',
    features: [
      {f:'Full network infrastructure', inc:true},
      {f:'Website + Google presence', inc:true},
      {f:'Business email (all staff)', inc:true},
      {f:'Staff computer training', inc:true},
      {f:'Security & backup system', inc:true},
      {f:'4 on-site visits/month', inc:true},
      {f:'Priority 4hr response', inc:true},
      {f:'Monthly IT report', inc:true},
      {f:'Dedicated IT manager', inc:true},
    ]
  },
]

export default function PackagesPage() {
  return (
    <div>
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Service Packages</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">Choose the right plan for your home or business. All packages include a satisfaction guarantee and transparent pricing.</p>
        </div>
      </section>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map(p => (
              <div key={p.name} className="rounded-2xl overflow-hidden shadow-md relative flex flex-col" style={{background: p.color || 'white'}}>
                {p.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1" style={{color: p.textColor || '#111827'}}>{p.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold" style={{color: p.textColor || '#b31942'}}>{p.price}</span>
                    <span className="text-sm mb-1.5 opacity-60" style={{color: p.textColor || '#6b7280'}}>ETB {p.unit}</span>
                  </div>
                  <ul className="space-y-3 mb-8 flex-1">
                    {p.features.map(f => (
                      <li key={f.f} className="flex items-center gap-2.5 text-sm" style={{color: p.textColor ? (f.inc ? p.textColor : 'rgba(255,255,255,0.4)') : (f.inc ? '#374151' : '#d1d5db')}}>
                        {f.inc ? <CheckCircle size={15} className="shrink-0" /> : <X size={15} className="shrink-0" />}
                        {f.f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/booking" className={p.popular ? 'btn-white w-full justify-center' : (p.color === 'white' ? 'btn-primary w-full justify-center' : 'btn-white w-full justify-center')}>
                    Get Started
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 card p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Need a Custom Package?</h3>
            <p className="text-gray-500 mb-6">Have unique requirements? We'll build a custom IT support plan specifically for your business.</p>
            <Link href="/contact" className="btn-primary">Talk to Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
