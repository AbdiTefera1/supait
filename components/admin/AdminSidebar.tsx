'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, CalendarCheck, Wrench, FileText, MessageSquare, Star, Settings, LogOut, Zap, ChevronRight } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/contacts', label: 'Messages', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

export default function AdminSidebar({ user }: { user: { name: string; email: string } }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin-login')
  }

  return (
    <aside className="admin-sidebar flex flex-col" style={{minHeight:'100vh'}}>
      <div className="p-5 border-b border-gray-700">
        <Link href="/admin" className="flex items-center gap-2.5 font-bold text-lg text-white">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'#b31942'}}>
            <Zap size={16} fill="white" color="white" />
          </div>
          Supa IT
        </Link>
        <div className="text-xs text-gray-400 mt-1 ml-10.5">Admin Panel</div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className={`admin-nav-item ${active ? 'active' : ''}`}>
              <item.icon size={17} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <div className="mb-3 px-3">
          <div className="text-sm font-medium text-white">{user.name}</div>
          <div className="text-xs text-gray-400">{user.email}</div>
        </div>
        <button onClick={handleLogout} className="admin-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-900/20">
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
