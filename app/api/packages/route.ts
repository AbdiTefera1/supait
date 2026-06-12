import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(packages)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await request.json()
    const newPackage = await prisma.package.create({
      data: {
        name: data.name,
        price: data.price,
        unit: data.unit,
        color: data.color || 'white',
        textColor: data.textColor || '#111827',
        popular: data.popular || false,
        features: data.features || [],
        active: data.active ?? true,
        order: data.order || 0,
      }
    })
    return NextResponse.json(newPackage)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
  }
}
