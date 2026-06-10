'use client'
import { useState } from 'react'
import { format } from 'date-fns'
import { Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'

const statusColors: Record<string,string> = { NEW:'badge-new', READ:'badge-read', REPLIED:'badge-replied' }

export default function ContactsClient({ initialContacts }: { initialContacts: any[] }) {
  const [contacts, setContacts] = useState(initialContacts)
  const [expanded, setExpanded] = useState<string|null>(null)

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/contacts/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) })
    if (res.ok) setContacts(prev => prev.map(c => c.id === id ? { ...c, status } : c))
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-500 mt-0.5">{contacts.filter(c=>c.status==='NEW').length} unread · {contacts.length} total</p>
      </div>
      <div className="card overflow-hidden">
        <div className="divide-y divide-gray-50">
          {contacts.map(c => (
            <div key={c.id} className="hover:bg-gray-50">
              <div className="p-5 flex items-start gap-4 cursor-pointer" onClick={()=>setExpanded(expanded===c.id?null:c.id)}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-white text-sm" style={{background:'#b31942'}}>
                  {c.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-semibold text-gray-900">{c.name}</span>
                    <span className={`badge ${statusColors[c.status]}`}>{c.status}</span>
                    <span className="text-xs text-gray-400 ml-auto">{format(new Date(c.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="text-sm text-gray-700 mt-0.5 font-medium">{c.subject}</div>
                  <div className="text-xs text-gray-400 mt-0.5 truncate">{c.message}</div>
                </div>
                {expanded === c.id ? <ChevronUp size={16} className="text-gray-400 shrink-0" /> : <ChevronDown size={16} className="text-gray-400 shrink-0" />}
              </div>
              {expanded === c.id && (
                <div className="px-5 pb-5 ml-14">
                  <div className="p-4 rounded-xl bg-gray-50 mb-4">
                    <p className="text-sm text-gray-700 leading-relaxed">{c.message}</p>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <a href={`mailto:${c.email}`} className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"><Mail size={14} />{c.email}</a>
                    {c.phone && <a href={`tel:${c.phone}`} className="flex items-center gap-2 text-sm text-green-600 hover:text-green-800"><Phone size={14} />{c.phone}</a>}
                  </div>
                  <div className="flex gap-2">
                    {['NEW','READ','REPLIED'].map(s => (
                      <button key={s} onClick={()=>updateStatus(c.id, s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${c.status===s ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={c.status===s?{background:'#b31942'}:{}}>
                        {s}
                      </button>
                    ))}
                    <a href={`mailto:${c.email}?subject=Re: ${c.subject}`} className="ml-auto btn-primary py-1.5 px-3 text-xs">Reply via Email</a>
                  </div>
                </div>
              )}
            </div>
          ))}
          {contacts.length === 0 && <div className="p-12 text-center text-gray-400">No messages yet</div>}
        </div>
      </div>
    </div>
  )
}
