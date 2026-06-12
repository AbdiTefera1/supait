import { prisma } from '@/lib/prisma'
import PackagesClient from './PackagesClient'

export default async function AdminPackagesPage() {
  const packages = await prisma.package.findMany({
    orderBy: { order: 'asc' }
  })

  return <PackagesClient initialPackages={packages} />
}
