import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  const services = await prisma.service.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
  return NextResponse.json(services)
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await request.json()
  const service = await prisma.service.create({ data })
  return NextResponse.json(service, { status: 201 })
}
