import { prisma } from '@/lib/prisma'
import BlogClient from './BlogClient'

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: 'desc' } })
  return <BlogClient initialPosts={posts} />
}
