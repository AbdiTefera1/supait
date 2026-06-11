import Navbar from '@/components/public/Navbar'
import Footer from '@/components/public/Footer'
import { fetchSettings } from '@/lib/fetchSettings'

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
