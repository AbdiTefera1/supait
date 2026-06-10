import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({ where: { active: true }, orderBy: { order: 'asc' } })
  return NextResponse.json(testimonials)
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await request.json()
  const t = await prisma.testimonial.create({ data })
  return NextResponse.json(t, { status: 201 })
}
