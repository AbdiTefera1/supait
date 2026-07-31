import { Metadata } from 'next'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Tag, ArrowLeft, User, Clock, Share2 } from 'lucide-react'
import { format } from 'date-fns'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug
  const post = await prisma.blogPost.findUnique({ where: { slug } })
  if (!post) return { title: 'Post Not Found' }
  
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://www.supait.com/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.createdAt.toISOString(),
      authors: [post.author],
    }
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const post = await prisma.blogPost.findUnique({
    where: { slug }
  })

  if (!post || !post.published) {
    notFound()
  }

  // Calculate read time (rough estimate: 200 words per min)
  const wordCount = post.content.split(/\s+/).length
  const readTime = Math.max(1, Math.ceil(wordCount / 200))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    datePublished: post.createdAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    publisher: {
      '@type': 'Organization',
      name: 'SupaIT',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.supait.com/images/logo.png'
      }
    }
  }

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article className="bg-surface pb-24">
        {/* Post Header / Hero */}
        <header className="hero-gradient text-white pt-24 pb-32 px-4 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50"></div>
          
          <div className="max-w-4xl mx-auto relative z-10 animate-fade-up">
            <Link href="/blog" className="inline-flex items-center gap-2 text-primary-100 hover:text-white transition-colors mb-8 text-sm font-bold uppercase tracking-wider group">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Blog
            </Link>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-sm border border-white/20">
                    {t}
                  </span>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 font-heading leading-tight">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-primary-100 border-t border-white/20 pt-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mb-0.5">Written by</div>
                  <div className="text-white font-bold">{post.author}</div>
                </div>
              </div>
              
              <div className="w-px h-10 bg-white/20 hidden sm:block"></div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Calendar size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mb-0.5">Published</div>
                  <div className="text-white font-bold">{format(new Date(post.createdAt), 'MMMM d, yyyy')}</div>
                </div>
              </div>

              <div className="w-px h-10 bg-white/20 hidden sm:block"></div>
              
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock size={16} className="text-white" />
                </div>
                <div>
                  <div className="text-xs text-white/70 uppercase tracking-wider mb-0.5">Read Time</div>
                  <div className="text-white font-bold">{readTime} min read</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 -mt-16 relative z-20 animate-fade-up stagger-1">
          <div className="card p-8 sm:p-12 shadow-xl border-0 bg-white">
            <p className="text-xl sm:text-2xl text-text-secondary leading-relaxed font-medium mb-12 italic border-l-4 border-primary pl-6">
              {post.excerpt}
            </p>
            
            <div className="prose prose-lg max-w-none text-text-primary prose-headings:font-heading prose-headings:font-bold prose-headings:text-text-primary prose-a:text-primary hover:prose-a:text-primary-dark prose-p:leading-relaxed prose-p:mb-6">
              {/* Handling line breaks manually since we don't know if content is markdown or plain text */}
              {post.content.split('\n').map((paragraph, idx) => (
                paragraph.trim() ? <p key={idx}>{paragraph}</p> : <br key={idx} />
              ))}
            </div>
            
            <div className="mt-16 pt-8 border-t border-border-light flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-text-muted uppercase tracking-wider">Share this article</span>
                <div className="flex gap-2">
                  <button className="w-10 h-10 rounded-full bg-surface-warm flex items-center justify-center text-text-secondary hover:bg-primary hover:text-white transition-colors">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
              
              <Link href="/blog" className="btn-outline w-full sm:w-auto justify-center group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to all posts
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Related/CTA Section */}
      <section className="py-20 px-4 bg-warm-900 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full filter blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 font-heading">Need professional IT help?</h2>
          <p className="text-warm-300 text-lg mb-8 max-w-2xl mx-auto font-medium">If the issue described in this article is too complex, our certified technicians are ready to help you out right now.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/booking" className="btn-primary shadow-primary-lg scale-105 hover:scale-110 px-8 py-4 text-lg">Book a Service</Link>
            <Link href="/contact" className="btn-outline border-warm-600 text-white hover:bg-white hover:text-warm-900 px-8 py-4 text-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
