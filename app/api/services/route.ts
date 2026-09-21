import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  try {
    const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
    return NextResponse.json(services)
  } catch {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    const data = await request.json()
    const service = await prisma.service.create({ data })
    return NextResponse.json(service, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 })
  }
}
