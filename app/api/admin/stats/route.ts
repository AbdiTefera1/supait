import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = requireAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const [
      totalBookings,
      pendingBookings,
      completedBookings,
      totalContacts,
      newContacts,
      totalServices,
      totalPosts,
      recentBookings,
      recentContacts,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.booking.count({ where: { status: 'PENDING' } }),
      prisma.booking.count({ where: { status: 'COMPLETED' } }),
      prisma.contact.count(),
      prisma.contact.count({ where: { status: 'NEW' } }),
      prisma.service.count({ where: { active: true } }),
      prisma.blogPost.count({ where: { published: true } }),
      // Run recentBookings and recentContacts in the same Promise.all batch
      prisma.booking.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.contact.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    ])

    return NextResponse.json({
      totalBookings,
      pendingBookings,
      completedBookings,
      totalContacts,
      newContacts,
      totalServices,
      totalPosts,
      recentBookings,
      recentContacts,
    })
  } catch {
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
