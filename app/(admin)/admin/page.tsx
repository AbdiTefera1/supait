import { prisma } from '@/lib/prisma'
import { getAuthUser } from '@/lib/auth'
import { CalendarCheck, MessageSquare, Wrench, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { format } from 'date-fns'

export default async function AdminDashboard() {
  const user = await getAuthUser()
  const [totalBookings, pendingBookings, completedBookings, totalContacts, newContacts, totalServices, recentBookings, recentContacts] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.contact.count(),
    prisma.contact.count({ where: { status: 'NEW' } }),
    prisma.service.count({ where: { active: true } }),
    prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 6 }),
    prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 4 }),
  ])

  const statusColors: Record<string,string> = {
    PENDING: 'badge-pending', CONFIRMED: 'badge-confirmed', IN_PROGRESS: 'badge-in_progress',
    COMPLETED: 'badge-completed', CANCELLED: 'badge-cancelled'
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name} 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your business today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Bookings', value: totalBookings, sub: `${pendingBookings} pending`, icon: CalendarCheck, color: '#b31942' },
          { label: 'Completed Jobs', value: completedBookings, sub: 'All time', icon: CheckCircle, color: '#065f46' },
          { label: 'Messages', value: totalContacts, sub: `${newContacts} unread`, icon: MessageSquare, color: '#1e40af' },
          { label: 'Active Services', value: totalServices, sub: 'In catalog', icon: Wrench, color: '#92400e' },
        ].map(s => (
          <div key={s.label} className="card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-3xl font-bold text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-500 mt-0.5">{s.label}</div>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:`${s.color}18`}}>
                <s.icon size={20} style={{color:s.color}} />
              </div>
            </div>
            <div className="text-xs text-gray-400">{s.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 card overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">Recent Bookings</h2>
            <a href="/admin/bookings" className="text-sm font-medium" style={{color:'#b31942'}}>View all →</a>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr><th>Client</th><th>Service</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recentBookings.map(b => (
                  <tr key={b.id}>
                    <td>
                      <div className="font-medium text-gray-900">{b.name}</div>
                      <div className="text-xs text-gray-400">{b.phone}</div>
                    </td>
                    <td className="text-gray-600 max-w-xs truncate">{b.service}</td>
                    <td className="text-gray-500">{format(new Date(b.date), 'MMM d')}</td>
                    <td><span className={`badge ${statusColors[b.status] || 'badge-pending'}`}>{b.status.replace('_',' ')}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="card overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-semibold text-gray-900">New Messages</h2>
            <a href="/admin/contacts" className="text-sm font-medium" style={{color:'#b31942'}}>View all →</a>
          </div>
          <div className="divide-y divide-gray-50">
            {recentContacts.map(c => (
              <div key={c.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="font-medium text-sm text-gray-900">{c.name}</div>
                  {c.status === 'NEW' && <span className="badge badge-pending text-xs">New</span>}
                </div>
                <div className="text-xs text-gray-500 mb-1">{c.subject}</div>
                <div className="text-xs text-gray-400">{format(new Date(c.createdAt), 'MMM d, yyyy')}</div>
              </div>
            ))}
            {recentContacts.length === 0 && <div className="p-6 text-center text-sm text-gray-400">No messages yet</div>}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 card p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { label: 'Add Service', href: '/admin/services', icon: Wrench },
            { label: 'New Blog Post', href: '/admin/blog', icon: FileText },
            { label: 'View Bookings', href: '/admin/bookings', icon: CalendarCheck },
            { label: 'Check Messages', href: '/admin/contacts', icon: MessageSquare },
            { label: 'Site Settings', href: '/admin/settings', icon: Clock },
          ].map(a => (
            <a key={a.label} href={a.href} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-all">
              <a.icon size={15} /> {a.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
