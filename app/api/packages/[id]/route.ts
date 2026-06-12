import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const data = await request.json()
    const pId = (await params).id
    const updated = await prisma.package.update({
      where: { id: pId },
      data: {
        name: data.name,
        price: data.price,
        unit: data.unit,
        color: data.color,
        textColor: data.textColor,
        popular: data.popular,
        features: data.features,
        active: data.active,
        order: data.order,
      }
    })
    return NextResponse.json(updated)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    
    const pId = (await params).id
    await prisma.package.delete({ where: { id: pId } })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 })
  }
}
