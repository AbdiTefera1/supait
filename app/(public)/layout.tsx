import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { fetchSettings } from '@/lib/fetchSettings'

// Removed 'force-dynamic' — settings are now cached for 60s via unstable_cache.
// Pages that need per-request rendering (e.g. with searchParams) set their own dynamic export.

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await fetchSettings()
  return (
    <>
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
