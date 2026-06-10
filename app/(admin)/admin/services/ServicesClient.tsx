'use client'
import { useState } from 'react'
import { Plus, Edit3, Trash2, X, Check, Star } from 'lucide-react'
import ServiceIcon from '@/components/public/ServiceIcon'

const ICONS = ['Shield','HardDrive','Monitor','Wifi','Globe','Headphones','Lock','Printer','Users','BookOpen','Cloud','Search','Wrench','Zap','Star']
const CATEGORIES = ['Security','Data','Setup','Network','Digital','Support','Training']

const emptyForm = { title:'', slug:'', shortDesc:'', description:'', icon:'Wrench', price:'', duration:'', category:'Setup', featured:false, active:true, order:0 }

export default function ServicesClient({ initialServices }: { initialServices: any[] }) {
  const [services, setServices] = useState(initialServices)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const openAdd = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (s: any) => { setForm(s); setEditing(s.id); setShowForm(true) }

  const save = async () => {
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/services/${editing}` : '/api/services'
    const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, slug: form.slug || form.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') }) })
    if (res.ok) {
      const saved = await res.json()
      if (editing) setServices(prev => prev.map(s => s.id === editing ? saved : s))
      else setServices(prev => [...prev, saved])
      setShowForm(false)
    }
    setSaving(false)
  }

  const del = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await fetch(`/api/services/${id}`, { method:'DELETE' })
    setServices(prev => prev.filter(s => s.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-500 mt-0.5">Manage your service catalog</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><Plus size={16} /> Add Service</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.5)'}}>
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={()=>setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Title *</label><input className="input" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} /></div>
                <div><label className="label">Category</label>
                  <select className="input" value={form.category} onChange={e=>setForm(p=>({...p,category:e.target.value}))}>
                    {CATEGORIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div><label className="label">Short Description *</label><input className="input" value={form.shortDesc} onChange={e=>setForm(p=>({...p,shortDesc:e.target.value}))} /></div>
              <div><label className="label">Full Description</label><textarea className="input" rows={3} value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Price</label><input className="input" placeholder="e.g. 300–1,000 ETB" value={form.price} onChange={e=>setForm(p=>({...p,price:e.target.value}))} /></div>
                <div><label className="label">Duration</label><input className="input" placeholder="e.g. 1–3 hours" value={form.duration} onChange={e=>setForm(p=>({...p,duration:e.target.value}))} /></div>
              </div>
              <div><label className="label">Icon</label>
                <div className="grid grid-cols-8 gap-2 p-3 rounded-xl border border-gray-200">
                  {ICONS.map(ic => (
                    <button key={ic} type="button" onClick={()=>setForm(p=>({...p,icon:ic}))} className={`p-2 rounded-lg flex items-center justify-center transition-all ${form.icon===ic ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={form.icon===ic?{background:'#b31942'}:{}} title={ic}>
                      <ServiceIcon name={ic} size={16} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div><label className="label">Order</label><input className="input" type="number" value={form.order} onChange={e=>setForm(p=>({...p,order:parseInt(e.target.value)||0}))} /></div>
                <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="featured" checked={form.featured} onChange={e=>setForm(p=>({...p,featured:e.target.checked}))} /><label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured</label></div>
                <div className="flex items-center gap-2 pt-6"><input type="checkbox" id="active" checked={form.active} onChange={e=>setForm(p=>({...p,active:e.target.checked}))} /><label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label></div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={()=>setShowForm(false)} className="btn-outline">Cancel</button>
              <button onClick={save} className="btn-primary" disabled={saving}>{saving ? 'Saving...' : (editing ? 'Update' : 'Add Service')}</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map(s => (
          <div key={s.id} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'#fff1f4'}}>
                  <ServiceIcon name={s.icon} size={18} className="text-red-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{s.title}</div>
                  <div className="text-xs text-gray-400">{s.category}</div>
                </div>
              </div>
              <div className="flex gap-1">
                {s.featured && <Star size={13} fill="#f59e0b" color="#f59e0b" />}
                {!s.active && <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Inactive</span>}
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">{s.shortDesc}</p>
            <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
              <span style={{color:'#b31942', fontWeight:600}}>{s.price}</span>
              <span>{s.duration}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>openEdit(s)} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200"><Edit3 size={13} />Edit</button>
              <button onClick={()=>del(s.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-600"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
