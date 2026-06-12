'use client'
import { useState } from 'react'
import { Plus, Edit3, Trash2, X, Star, CheckCircle } from 'lucide-react'

const emptyForm = { 
  name: '', 
  price: '', 
  unit: '', 
  color: 'white', 
  textColor: '#111827', 
  popular: false, 
  features: [], 
  active: true, 
  order: 0 
}

export default function PackagesClient({ initialPackages }: { initialPackages: any[] }) {
  const [packages, setPackages] = useState(initialPackages)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState<any>(emptyForm)
  const [saving, setSaving] = useState(false)

  const openAdd = () => { setForm(emptyForm); setEditing(null); setShowForm(true) }
  const openEdit = (p: any) => { setForm(p); setEditing(p.id); setShowForm(true) }

  const save = async () => {
    setSaving(true)
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/packages/${editing}` : '/api/packages'
    const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) })
    if (res.ok) {
      const saved = await res.json()
      if (editing) setPackages(prev => prev.map(p => p.id === editing ? saved : p))
      else setPackages(prev => [...prev, saved])
      setShowForm(false)
    }
    setSaving(false)
  }

  const del = async (id: string) => {
    if (!confirm('Delete this package?')) return
    await fetch(`/api/packages/${id}`, { method:'DELETE' })
    setPackages(prev => prev.filter(p => p.id !== id))
  }

  const addFeature = () => {
    setForm((prev: any) => ({
      ...prev,
      features: [...prev.features, { f: '', inc: true }]
    }))
  }

  const updateFeature = (index: number, key: string, value: any) => {
    setForm((prev: any) => {
      const newFeatures = [...prev.features]
      newFeatures[index] = { ...newFeatures[index], [key]: value }
      return { ...prev, features: newFeatures }
    })
  }

  const removeFeature = (index: number) => {
    setForm((prev: any) => {
      const newFeatures = [...prev.features]
      newFeatures.splice(index, 1)
      return { ...prev, features: newFeatures }
    })
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Packages</h1>
          <p className="text-gray-500 mt-0.5">Manage your service packages</p>
        </div>
        <button onClick={openAdd} className="btn-primary"><Plus size={16} /> Add Package</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.5)'}}>
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Package' : 'Add Package'}</h2>
              <button onClick={()=>setShowForm(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Name *</label><input className="input" value={form.name} onChange={e=>setForm((p: any)=>({...p,name:e.target.value}))} /></div>
                <div><label className="label">Price *</label><input className="input" placeholder="e.g. 1,500" value={form.price} onChange={e=>setForm((p: any)=>({...p,price:e.target.value}))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Unit</label><input className="input" placeholder="e.g. /month" value={form.unit} onChange={e=>setForm((p: any)=>({...p,unit:e.target.value}))} /></div>
                <div><label className="label">Order</label><input className="input" type="number" value={form.order} onChange={e=>setForm((p: any)=>({...p,order:parseInt(e.target.value)||0}))} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="label">Background Color</label><input className="input" placeholder="e.g. #b31942 or white" value={form.color} onChange={e=>setForm((p: any)=>({...p,color:e.target.value}))} /></div>
                <div><label className="label">Text Color</label><input className="input" placeholder="e.g. white or #111827" value={form.textColor} onChange={e=>setForm((p: any)=>({...p,textColor:e.target.value}))} /></div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex items-center gap-2 pt-2"><input type="checkbox" id="popular" checked={form.popular} onChange={e=>setForm((p: any)=>({...p,popular:e.target.checked}))} /><label htmlFor="popular" className="text-sm font-medium text-gray-700">Most Popular</label></div>
                <div className="flex items-center gap-2 pt-2"><input type="checkbox" id="active" checked={form.active} onChange={e=>setForm((p: any)=>({...p,active:e.target.checked}))} /><label htmlFor="active" className="text-sm font-medium text-gray-700">Active</label></div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="label !mb-0">Features</label>
                  <button type="button" onClick={addFeature} className="text-xs font-medium text-red-700 hover:underline flex items-center gap-1"><Plus size={12}/> Add Feature</button>
                </div>
                <div className="space-y-2">
                  {form.features.map((feat: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        checked={feat.inc} 
                        onChange={(e) => updateFeature(idx, 'inc', e.target.checked)} 
                        title="Included?"
                      />
                      <input 
                        className="input !py-1.5" 
                        value={feat.f} 
                        onChange={(e) => updateFeature(idx, 'f', e.target.value)} 
                        placeholder="Feature description"
                      />
                      <button type="button" onClick={() => removeFeature(idx)} className="text-gray-400 hover:text-red-600">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                  {form.features.length === 0 && <p className="text-sm text-gray-500 italic">No features added yet.</p>}
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100 flex justify-end gap-3">
              <button onClick={()=>setShowForm(false)} className="btn-outline">Cancel</button>
              <button onClick={save} className="btn-primary" disabled={saving}>{saving ? 'Saving...' : (editing ? 'Update' : 'Add Package')}</button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {packages.map(p => (
          <div key={p.id} className="rounded-2xl overflow-hidden shadow-md relative flex flex-col" style={{background: p.color || 'white'}}>
            {p.popular && (
              <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
            )}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold" style={{color: p.textColor || '#111827'}}>{p.name}</h3>
                <div className="flex gap-1 bg-white/20 backdrop-blur-sm p-1 rounded-lg">
                  <button onClick={()=>openEdit(p)} className="p-1 rounded text-white mix-blend-difference opacity-70 hover:opacity-100"><Edit3 size={14} /></button>
                  <button onClick={()=>del(p.id)} className="p-1 rounded text-red-400 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </div>
              <div className="flex items-end gap-1 mb-4">
                <span className="text-3xl font-bold" style={{color: p.textColor || '#b31942'}}>{p.price}</span>
                <span className="text-sm mb-1 opacity-60" style={{color: p.textColor || '#6b7280'}}>ETB {p.unit}</span>
              </div>
              <ul className="space-y-2 mb-4 flex-1">
                {p.features?.slice(0, 4).map((f: any, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-xs" style={{color: p.textColor ? (f.inc ? p.textColor : 'rgba(255,255,255,0.4)') : (f.inc ? '#374151' : '#d1d5db')}}>
                    {f.inc ? <CheckCircle size={12} className="shrink-0" /> : <X size={12} className="shrink-0" />}
                    <span className="truncate">{f.f}</span>
                  </li>
                ))}
                {p.features?.length > 4 && (
                  <li className="text-xs italic" style={{color: p.textColor || '#6b7280'}}>+ {p.features.length - 4} more features...</li>
                )}
              </ul>
              {!p.active && <div className="text-xs bg-black/10 text-white rounded p-1 text-center font-bold uppercase mt-2">Inactive</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
