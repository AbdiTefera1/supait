'use client'
import { useState } from 'react'
import { Plus, Trash2, Edit3, Star, X } from 'lucide-react'

const empty = { name:'', role:'', content:'', rating:5, active:true, order:0 }

export default function TestimonialsClient({ initialTestimonials }: { initialTestimonials: any[] }) {
  const [items, setItems] = useState(initialTestimonials)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string|null>(null)
  const [form, setForm] = useState(empty)
  const [saving, setSaving] = useState(false)

  const openEdit = (t: any) => { setForm(t); setEditing(t.id); setShowForm(true) }
  const openAdd = () => { setForm(empty); setEditing(null); setShowForm(true) }

  const save = async () => {
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/testimonials/${editing}` : '/api/testimonials'
    const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if (res.ok) {
      const saved = await res.json()
      if (editing) setItems(prev => prev.map(t => t.id === editing ? saved : t))
      else setItems(prev => [...prev, saved])
      setShowForm(false)
    }
    setSaving(false)
  }

  const del = async (id: string) => {
    if (!confirm('Delete?')) return
    await fetch(`/api/testimonials/${id}`, { method:'DELETE' })
    setItems(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Testimonials</h1></div>
        <button onClick={openAdd} className="btn-primary"><Plus size={16} /> Add Testimonial</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.5)'}}>
          <div className="card w-full max-w-lg">
            <div className="p-5 border-b border-gray-100 flex justify-between">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit' : 'Add'} Testimonial</h2>
              <button onClick={()=>setShowForm(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Name</label><input className="input" value={form.name} onChange={e=>setForm(p=>({...p,name:e.target.value}))} /></div>
                <div><label className="label">Role / Business</label><input className="input" value={form.role} onChange={e=>setForm(p=>({...p,role:e.target.value}))} /></div>
              </div>
              <div><label className="label">Review</label><textarea className="input" rows={4} value={form.content} onChange={e=>setForm(p=>({...p,content:e.target.value}))} /></div>
              <div className="flex gap-4">
                <div><label className="label">Rating</label>
                  <select className="input" value={form.rating} onChange={e=>setForm(p=>({...p,rating:parseInt(e.target.value)}))}>
                    {[5,4,3,2,1].map(r=><option key={r} value={r}>{r} Stars</option>)}
                  </select>
                </div>
                <div><label className="label">Order</label><input className="input" type="number" value={form.order} onChange={e=>setForm(p=>({...p,order:parseInt(e.target.value)||0}))} /></div>
                <div className="flex items-center gap-2 pt-6"><input type="checkbox" checked={form.active} onChange={e=>setForm(p=>({...p,active:e.target.checked}))} /><label className="label mb-0">Active</label></div>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={()=>setShowForm(false)} className="btn-outline">Cancel</button>
              <button onClick={save} className="btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map(t => (
          <div key={t.id} className="card p-5">
            <div className="flex justify-between mb-3">
              <div className="flex gap-0.5">
                {Array.from({length:5}).map((_,i)=><Star key={i} size={14} fill={i<t.rating?'#f59e0b':'#e5e7eb'} color={i<t.rating?'#f59e0b':'#e5e7eb'} />)}
              </div>
              {!t.active && <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">Hidden</span>}
            </div>
            <p className="text-sm text-gray-600 mb-4 italic">"{t.content}"</p>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-sm text-gray-900">{t.name}</div>
                <div className="text-xs text-gray-400">{t.role}</div>
              </div>
              <div className="flex gap-1">
                <button onClick={()=>openEdit(t)} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50"><Edit3 size={14} /></button>
                <button onClick={()=>del(t.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
