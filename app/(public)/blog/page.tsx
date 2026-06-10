import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight } from 'lucide-react'
import { format } from 'date-fns'

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } })
  return (
    <div>
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">IT Tips & News</h1>
          <p className="text-red-100 text-lg">Free advice, how-to guides, and technology news for homes and businesses.</p>
        </div>
      </section>
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Blog posts coming soon. Check back later!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map(p => (
                <article key={p.id} className="card overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="h-48 flex items-center justify-center" style={{background:'linear-gradient(135deg,#b31942,#8f1234)'}}>
                    <div className="text-white text-center px-6">
                      <div className="text-4xl mb-2">💻</div>
                      <div className="text-sm font-medium opacity-80">TechServe Blog</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={12} />{format(new Date(p.createdAt), 'MMM d, yyyy')}</span>
                      <span>·</span>
                      <span>{p.author}</span>
                    </div>
                    <h2 className="font-bold text-gray-900 mb-2 leading-snug">{p.title}</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{p.excerpt}</p>
                    {p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tags.slice(0,3).map(t => (
                          <span key={t} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full" style={{background:'#fff1f4', color:'#b31942'}}>
                            <Tag size={10} />{t}
                          </span>
                        ))}
                      </div>
                    )}
                    <button className="text-sm font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all" style={{color:'#b31942'}}>
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
