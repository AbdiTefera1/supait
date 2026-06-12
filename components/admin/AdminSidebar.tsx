'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LayoutDashboard, CalendarCheck, Wrench, FileText, MessageSquare, Star, Settings, LogOut, Zap, ChevronRight, PanelLeftClose, PanelLeft, Package } from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/packages', label: 'Packages', icon: Package },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/contacts', label: 'Messages', icon: MessageSquare },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
]

interface AdminSidebarProps {
  user: { name: string; email: string }
  logo?: string
  siteName?: string
}

export default function AdminSidebar({ user, logo, siteName }: AdminSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('admin-sidebar-collapsed')
    if (saved === 'true') setCollapsed(true)
    setMounted(true)
  }, [])

  const toggleCollapse = () => {
    setCollapsed(prev => {
      const next = !prev
      localStorage.setItem('admin-sidebar-collapsed', String(next))
      return next
    })
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin-login')
  }

  const displayName = siteName || 'Supa IT'

  return (
    <aside className={`admin-sidebar flex flex-col ${collapsed ? 'collapsed' : ''}`} style={{minHeight:'100vh'}}>
      {/* Header */}
      <div className="sidebar-header">
        <Link href="/admin" className="sidebar-brand">
          {logo ? (
            <img src={logo} alt={displayName} className="sidebar-logo-img" />
          ) : (
            <div className="sidebar-logo-icon">
              <Zap size={16} fill="white" color="white" />
            </div>
          )}
          <span className="sidebar-label">
            <span className="font-bold text-lg text-white">{displayName}</span>
            <span className="text-xs text-gray-400">Admin Panel</span>
          </span>
        </Link>
        <button onClick={toggleCollapse} className="sidebar-toggle" title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
          {collapsed ? <PanelLeft size={16} /> : <PanelLeftClose size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className={`admin-nav-item ${active ? 'active' : ''}`} title={collapsed ? item.label : undefined}>
              <item.icon size={17} className="shrink-0" />
              <span className="sidebar-label">{item.label}</span>
              {active && !collapsed && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          )
        })}
      </nav>

      {/* User / Logout */}
      <div className="p-3 border-t border-gray-700">
        <div className="sidebar-label mb-3 px-3">
          <div className="text-sm font-medium text-white truncate">{user.name}</div>
          <div className="text-xs text-gray-400 truncate">{user.email}</div>
        </div>
        <button onClick={handleLogout} className="admin-nav-item w-full text-red-400 hover:text-red-300 hover:bg-red-900/20" title={collapsed ? 'Sign Out' : undefined}>
          <LogOut size={17} className="shrink-0" />
          <span className="sidebar-label">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
