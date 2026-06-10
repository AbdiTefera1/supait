import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { getSiteSettings } from '@/lib/settings'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  
  return (
    <>
      <Navbar settings={settings} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  )
}
