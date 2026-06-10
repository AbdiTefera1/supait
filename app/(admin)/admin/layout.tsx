import { redirect } from 'next/navigation'
import { getAuthUser } from '@/lib/auth'
import AdminSidebar from '@/components/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser()
  if (!user) redirect('/admin-login')
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar user={{ name: user.name, email: user.email }} />
      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-6 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
