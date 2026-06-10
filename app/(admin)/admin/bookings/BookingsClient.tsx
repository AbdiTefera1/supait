'use client'
import { useState } from 'react'
import { format } from 'date-fns'
import { Search, Filter, Trash2, Edit3, CheckCircle, X } from 'lucide-react'

const STATUSES = ['ALL','PENDING','CONFIRMED','IN_PROGRESS','COMPLETED','CANCELLED']
const statusColors: Record<string,string> = {
  PENDING:'badge-pending', CONFIRMED:'badge-confirmed', IN_PROGRESS:'badge-in_progress',
  COMPLETED:'badge-completed', CANCELLED:'badge-cancelled'
}

export default function BookingsClient({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings)
  const [filter, setFilter] = useState('ALL')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<string|null>(null)
  const [editStatus, setEditStatus] = useState('')

  const filtered = bookings.filter(b => {
    const matchStatus = filter === 'ALL' || b.status === filter
    const matchSearch = !search || b.name.toLowerCase().includes(search.toLowerCase()) || b.service.toLowerCase().includes(search.toLowerCase()) || b.phone.includes(search)
    return matchStatus && matchSearch
  })

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch(`/api/bookings/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ status }) })
    if (res.ok) {
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b))
      setEditing(null)
    }
  }

  const deleteBooking = async (id: string) => {
    if (!confirm('Delete this booking?')) return
    const res = await fetch(`/api/bookings/${id}`, { method:'DELETE' })
    if (res.ok) setBookings(prev => prev.filter(b => b.id !== id))
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-500 mt-0.5">{bookings.length} total bookings</p>
        </div>
      </div>

      <div className="card mb-6 p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input className="input pl-9" type="text" placeholder="Search by name, service, or phone..." value={search} onChange={e=>setSearch(e.target.value)} />
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map(s => (
            <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter===s ? 'text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`} style={filter===s?{background:'#b31942'}:{}}>
              {s.replace('_',' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="table-container">
          <table>
            <thead>
              <tr><th>Client</th><th>Service</th><th>Date & Time</th><th>Address</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="text-center py-12 text-gray-400">No bookings found</td></tr>
              )}
              {filtered.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="font-medium text-gray-900">{b.name}</div>
                    <div className="text-xs text-gray-400">{b.email}</div>
                    <div className="text-xs text-gray-400">{b.phone}</div>
                  </td>
                  <td><div className="max-w-[180px] text-gray-700">{b.service}</div></td>
                  <td>
                    <div className="text-gray-700">{format(new Date(b.date), 'MMM d, yyyy')}</div>
                    <div className="text-xs text-gray-400">{b.timeSlot}</div>
                  </td>
                  <td><div className="text-xs text-gray-500 max-w-[160px]">{b.address || '—'}</div></td>
                  <td>
                    {editing === b.id ? (
                      <div className="flex gap-1">
                        <select className="input text-xs py-1 px-2" value={editStatus} onChange={e=>setEditStatus(e.target.value)} style={{width:'auto'}}>
                          {STATUSES.filter(s=>s!=='ALL').map(s=><option key={s} value={s}>{s.replace('_',' ')}</option>)}
                        </select>
                        <button onClick={()=>updateStatus(b.id, editStatus)} className="p-1 rounded text-green-600 hover:bg-green-50"><CheckCircle size={15} /></button>
                        <button onClick={()=>setEditing(null)} className="p-1 rounded text-gray-400 hover:bg-gray-100"><X size={15} /></button>
                      </div>
                    ) : (
                      <span className={`badge ${statusColors[b.status]}`}>{b.status.replace('_',' ')}</span>
                    )}
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <button onClick={()=>{ setEditing(b.id); setEditStatus(b.status) }} className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button onClick={()=>deleteBooking(b.id)} className="p-1.5 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
