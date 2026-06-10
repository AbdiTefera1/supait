'use client'
import { useState } from 'react'
import { Plus, Trash2, Edit3, X, Eye, EyeOff } from 'lucide-react'
import { format } from 'date-fns'

const empty = { title:'', slug:'', excerpt:'', content:'', published:false, tags:[] as string[], coverImage:'' }

export default function BlogClient({ initialPosts }: { initialPosts: any[] }) {
  const [posts, setPosts] = useState(initialPosts)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<string|null>(null)
  const [form, setForm] = useState(empty)
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)

  const openEdit = (p: any) => { setForm({...p, tags: p.tags||[]}); setEditing(p.id); setShowForm(true) }
  const openAdd = () => { setForm(empty); setEditing(null); setShowForm(true); setTagInput('') }

  const addTag = () => {
    if (tagInput.trim() && !form.tags.includes(tagInput.trim())) {
      setForm(p => ({ ...p, tags: [...p.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const save = async () => {
    setSaving(true)
    const slug = form.slug || form.title.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
    const method = editing ? 'PUT' : 'POST'
    const url = editing ? `/api/blog/${editing}` : '/api/blog'
    const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body: JSON.stringify({...form, slug}) })
    if (res.ok) {
      const saved = await res.json()
      if (editing) setPosts(prev => prev.map(p => p.id === editing ? saved : p))
      else setPosts(prev => [saved, ...prev])
      setShowForm(false)
    }
    setSaving(false)
  }

  const del = async (id: string) => {
    if (!confirm('Delete post?')) return
    await fetch(`/api/blog/${id}`, { method:'DELETE' })
    setPosts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1><p className="text-gray-500 mt-0.5">{posts.length} posts</p></div>
        <button onClick={openAdd} className="btn-primary"><Plus size={16} /> New Post</button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{background:'rgba(0,0,0,0.6)'}}>
          <div className="card w-full max-w-2xl max-h-[92vh] overflow-y-auto">
            <div className="p-5 border-b border-gray-100 flex justify-between sticky top-0 bg-white">
              <h2 className="font-bold text-gray-900">{editing ? 'Edit Post' : 'New Blog Post'}</h2>
              <button onClick={()=>setShowForm(false)}><X size={18} className="text-gray-400" /></button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className="label">Title *</label><input className="input" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))} /></div>
              <div><label className="label">Excerpt (shown in listing)</label><textarea className="input" rows={2} value={form.excerpt} onChange={e=>setForm(p=>({...p,excerpt:e.target.value}))} /></div>
              <div><label className="label">Full Content</label><textarea className="input" rows={8} style={{fontFamily:'monospace',fontSize:'13px'}} value={form.content} onChange={e=>setForm(p=>({...p,content:e.target.value}))} /></div>
              <div>
                <label className="label">Tags</label>
                <div className="flex gap-2 mb-2">
                  <input className="input flex-1" placeholder="Add tag..." value={tagInput} onChange={e=>setTagInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();addTag()}}} />
                  <button onClick={addTag} className="btn-primary py-2 px-3">Add</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.tags.map(t => (
                    <span key={t} className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style={{background:'#fff1f4',color:'#b31942'}}>
                      {t}<button onClick={()=>setForm(p=>({...p,tags:p.tags.filter(x=>x!==t)}))}>×</button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="pub" checked={form.published} onChange={e=>setForm(p=>({...p,published:e.target.checked}))} />
                <label htmlFor="pub" className="text-sm font-medium text-gray-700">Published (visible on website)</label>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-3 sticky bottom-0 bg-white">
              <button onClick={()=>setShowForm(false)} className="btn-outline">Cancel</button>
              <button onClick={save} className="btn-primary" disabled={saving}>{saving?'Saving...':'Save Post'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="card overflow-hidden">
        <div className="table-container">
          <table>
            <thead><tr><th>Title</th><th>Author</th><th>Tags</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {posts.map(p => (
                <tr key={p.id}>
                  <td><div className="font-medium text-gray-900">{p.title}</div><div className="text-xs text-gray-400">{p.excerpt?.substring(0,60)}...</div></td>
                  <td className="text-gray-600">{p.author}</td>
                  <td><div className="flex flex-wrap gap-1">{(p.tags||[]).slice(0,2).map((t:string)=><span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{background:'#fff1f4',color:'#b31942'}}>{t}</span>)}</div></td>
                  <td>{p.published ? <span className="badge badge-completed">Published</span> : <span className="badge badge-pending">Draft</span>}</td>
                  <td className="text-gray-500 text-xs">{format(new Date(p.createdAt),'MMM d, yyyy')}</td>
                  <td><div className="flex gap-1">
                    <button onClick={()=>openEdit(p)} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50"><Edit3 size={14} /></button>
                    <button onClick={()=>del(p.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50"><Trash2 size={14} /></button>
                  </div></td>
                </tr>
              ))}
              {posts.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-gray-400">No posts yet. Create your first blog post!</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
