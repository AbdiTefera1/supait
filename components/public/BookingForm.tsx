'use client'
import { useState } from 'react'
import { CheckCircle, Loader } from 'lucide-react'

const TIME_SLOTS = ['8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 PM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM']

interface Service { id: string; title: string; price: string; category: string }

export default function BookingForm({ services }: { services: Service[] }) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', date:'', timeSlot:'', notes:'', address:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  const tomorrow = new Date(); tomorrow.setDate(tomorrow.getDate()+1)
  const minDate = tomorrow.toISOString().split('T')[0]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/bookings', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!res.ok) { const d = await res.json(); throw new Error(d.error || 'Failed') }
      setStatus('success')
    } catch (err: any) {
      setError(err.message); setStatus('error')
    }
  }

  if (status === 'success') return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{background:'#d1fae5'}}>
        <CheckCircle size={32} style={{color:'#065f46'}} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">Booking Submitted!</h3>
      <p className="text-gray-500 mb-6">We'll confirm your appointment within 2 hours via phone or WhatsApp.</p>
      <button onClick={() => { setStatus('idle'); setForm({ name:'', email:'', phone:'', service:'', date:'', timeSlot:'', notes:'', address:'' }) }} className="btn-primary">Book Another Service</button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Full Name *</label>
          <input className="input" type="text" placeholder="Your full name" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required />
        </div>
        <div>
          <label className="label">Phone Number *</label>
          <input className="input" type="tel" placeholder="+251 9XX XXX XXX" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} required />
        </div>
      </div>
      <div>
        <label className="label">Email Address *</label>
        <input className="input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} required />
      </div>
      <div>
        <label className="label">Service Needed *</label>
        <select className="input" value={form.service} onChange={e=>setForm(p=>({...p,service:e.target.value}))} required>
          <option value="">Select a service...</option>
          {services.map(s => <option key={s.id} value={s.title}>{s.title} — {s.price}</option>)}
          <option value="Other / Not Sure">Other / Not Sure — We'll Diagnose</option>
        </select>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Preferred Date *</label>
          <input className="input" type="date" min={minDate} value={form.date} onChange={e=>setForm(p=>({...p,date:e.target.value}))} required />
        </div>
        <div>
          <label className="label">Preferred Time *</label>
          <select className="input" value={form.timeSlot} onChange={e=>setForm(p=>({...p,timeSlot:e.target.value}))} required>
            <option value="">Select a time...</option>
            {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div>
        <label className="label">Your Address / Location *</label>
        <input className="input" type="text" placeholder="e.g. Bole, near Edna Mall, Addis Ababa" value={form.address} onChange={e=>setForm(p=>({...p,address:e.target.value}))} required />
      </div>
      <div>
        <label className="label">Additional Notes</label>
        <textarea className="input" rows={3} placeholder="Describe your issue in more detail (optional)" value={form.notes} onChange={e=>setForm(p=>({...p,notes:e.target.value}))} />
      </div>
      {status === 'error' && (
        <div className="p-3 rounded-lg text-sm text-red-700" style={{background:'#fee2e2'}}>{error}</div>
      )}
      <button type="submit" className="btn-primary w-full justify-center py-3 text-base" disabled={status==='loading'}>
        {status === 'loading' ? <><Loader size={18} className="animate-spin" />Submitting...</> : 'Confirm Booking'}
      </button>
    </form>
  )
}
