import ContactForm from '@/components/public/ContactForm'
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react'

export default function ContactPage() {
  return (
    <div>
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">Have a question or need IT help? Contact us and we'll respond within a few hours.</p>
        </div>
      </section>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 card p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <ContactForm />
            </div>
            <div className="space-y-5">
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-5">Contact Information</h3>
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: 'Phone', val: '+251 911 234 567', href: 'tel:+251911234567' },
                    { icon: Mail, label: 'Email', val: 'info@techservepro.com', href: 'mailto:info@techservepro.com' },
                    { icon: MapPin, label: 'Location', val: 'Addis Ababa, Ethiopia', href: null },
                    { icon: Clock, label: 'Hours', val: 'Mon–Sat: 8AM–8PM\nSun: 10AM–5PM', href: null },
                  ].map(c => (
                    <div key={c.label} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{background:'#fff1f4'}}>
                        <c.icon size={16} style={{color:'#b31942'}} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 font-medium">{c.label}</div>
                        {c.href ? (
                          <a href={c.href} className="text-sm text-gray-700 hover:text-red-700 font-medium">{c.val}</a>
                        ) : (
                          <div className="text-sm text-gray-700 font-medium whitespace-pre-line">{c.val}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Reach us on Social</h3>
                <div className="space-y-3">
                  <a href="https://wa.me/251911234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-green-700 transition-colors hover:bg-green-50">
                    <MessageCircle size={18} /> WhatsApp Chat
                  </a>
                  <a href="https://t.me/techservepro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl text-sm font-medium text-blue-700 transition-colors hover:bg-blue-50">
                    <Send size={18} /> Telegram Channel
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
