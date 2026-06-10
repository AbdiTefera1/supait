import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { requireAuth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const user = requireAuth(request)
  const where = user ? {} : { published: true }
  const posts = await prisma.blogPost.findMany({ where, orderBy: { createdAt: 'desc' } })
  return NextResponse.json(posts)
}

export async function POST(request: NextRequest) {
  const user = requireAuth(request)
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const data = await request.json()
  const post = await prisma.blogPost.create({ data: { ...data, author: user.name } })
  return NextResponse.json(post, { status: 201 })
}
