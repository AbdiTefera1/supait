import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const [totalBookings, pendingBookings, completedBookings, totalContacts, newContacts, totalServices, totalPosts] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'COMPLETED' } }),
    prisma.contact.count(),
    prisma.contact.count({ where: { status: 'NEW' } }),
    prisma.service.count({ where: { active: true } }),
    prisma.blogPost.count({ where: { published: true } }),
  ])
  const recentBookings = await prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  const recentContacts = await prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 })
  return NextResponse.json({ totalBookings, pendingBookings, completedBookings, totalContacts, newContacts, totalServices, totalPosts, recentBookings, recentContacts })
}
