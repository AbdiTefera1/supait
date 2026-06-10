'use client'
import { useState } from 'react'
import { CheckCircle, Loader } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading'); setError('')
    try {
      const res = await fetch('/api/contacts', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed to send')
      setStatus('success')
    } catch {
      setError('Failed to send. Please call us directly.'); setStatus('error')
    }
  }

  if (status === 'success') return (
    <div className="text-center py-10">
      <CheckCircle size={40} className="mx-auto mb-3" style={{color:'#065f46'}} />
      <h3 className="text-lg font-bold text-gray-900 mb-2">Message Sent!</h3>
      <p className="text-gray-500">We'll get back to you within a few hours.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="label">Full Name *</label>
          <input className="input" type="text" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} required />
        </div>
        <div>
          <label className="label">Email *</label>
          <input className="input" type="email" value={form.email} onChange={e=>setForm(p=>({...p,email:e.target.value}))} required />
        </div>
      </div>
      <div>
        <label className="label">Phone</label>
        <input className="input" type="tel" value={form.phone} onChange={e=>setForm(p=>({...p,phone:e.target.value}))} />
      </div>
      <div>
        <label className="label">Subject *</label>
        <input className="input" type="text" placeholder="What can we help you with?" value={form.subject} onChange={e=>setForm(p=>({...p,subject:e.target.value}))} required />
      </div>
      <div>
        <label className="label">Message *</label>
        <textarea className="input" rows={5} placeholder="Describe your issue or question..." value={form.message} onChange={e=>setForm(p=>({...p,message:e.target.value}))} required />
      </div>
      {status === 'error' && <div className="p-3 rounded-lg text-sm text-red-700" style={{background:'#fee2e2'}}>{error}</div>}
      <button type="submit" className="btn-primary py-3 px-8" disabled={status==='loading'}>
        {status === 'loading' ? <><Loader size={16} className="animate-spin" />Sending...</> : 'Send Message'}
      </button>
    </form>
  )
}
