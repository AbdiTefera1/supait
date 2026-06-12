import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Calendar, Tag, ArrowRight, BookOpen, Clock, FileText } from 'lucide-react'
import { format } from 'date-fns'
import { fetchSettings } from '@/lib/fetchSettings'

export default async function BlogPage() {
  const [posts, settings] = await Promise.all([
    prisma.blogPost.findMany({ where: { published: true }, orderBy: { createdAt: 'desc' } }),
    fetchSettings()
  ])
  const siteName = settings.site_name || 'TechServe'

  return (
    <div>
      <section className="hero-gradient text-white py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-up">
          <span className="inline-block py-1 px-3 rounded-full bg-white/10 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md border border-white/20 shadow-lg">Our Blog</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 font-heading">IT Tips & News</h1>
          <p className="text-primary-100 text-lg sm:text-xl max-w-2xl mx-auto font-medium">Free advice, how-to guides, and technology news to keep your home and business running smoothly.</p>
        </div>
      </section>

      <section className="section-padding bg-surface-warm relative min-h-[50vh]">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5" style={{backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '32px 32px'}}></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {posts.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-border-light max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-6">
                <FileText size={32} className="text-warm-400" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-3 font-heading">No posts yet</h3>
              <p className="text-text-secondary text-lg font-medium">We're working on some great content. Check back later!</p>
            </div>
          ) : (
            <>
              {/* Featured Post (First one) */}
              {posts.length > 0 && (
                <div className="mb-16 animate-fade-up stagger-1">
                  <article className="card p-0 overflow-hidden flex flex-col md:flex-row group hover:shadow-xl border-0 bg-white shadow-md transition-all duration-500 hover:-translate-y-1">
                    <div className="md:w-1/2 min-h-[250px] relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-warm-800 to-warm-900">
                      <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')]"></div>
                      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary rounded-full filter blur-[50px] opacity-40 group-hover:scale-150 transition-transform duration-700"></div>
                      <div className="text-center p-8 relative z-10 text-white transform group-hover:scale-105 transition-transform duration-500">
                        <BookOpen size={48} className="mx-auto mb-4 text-primary-200" />
                        <div className="text-sm font-bold tracking-[0.2em] uppercase opacity-60 mb-2">{siteName}</div>
                        <div className="text-2xl font-bold font-heading">Featured Article</div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 text-sm font-bold text-text-muted uppercase tracking-wider mb-4">
                        <span className="flex items-center gap-1.5"><Calendar size={14} className="text-primary" />{format(new Date(posts[0].createdAt), 'MMM d, yyyy')}</span>
                        <span className="w-1 h-1 rounded-full bg-border"></span>
                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-primary" /> 5 min read</span>
                      </div>
                      
                      <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4 font-heading leading-tight group-hover:text-primary transition-colors">{posts[0].title}</h2>
                      <p className="text-text-secondary text-lg leading-relaxed mb-8 font-medium">{posts[0].excerpt}</p>
                      
                      {posts[0].tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                          {posts[0].tags.map((t: string) => (
                            <span key={t} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-md bg-warm-100 text-text-secondary">
                              <Tag size={12} className="text-warm-400" />{t}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <Link href={`/blog/${posts[0].slug}`} className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary-dark transition-colors group/link mt-auto">
                        Read Full Article <ArrowRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                </div>
              )}

              {/* Remaining Posts Grid */}
              {posts.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.slice(1).map((p, idx) => (
                    <article key={p.id} className={`card p-0 overflow-hidden hover:shadow-lg transition-all duration-500 hover:-translate-y-2 border-0 bg-white group animate-fade-up stagger-${(idx % 3) + 2}`}>
                      <div className="h-48 relative overflow-hidden flex items-center justify-center bg-gradient-to-br from-warm-100 to-warm-200">
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white rounded-full filter blur-[30px] opacity-60"></div>
                        <div className="text-center p-6 relative z-10 text-warm-700 transform group-hover:scale-105 transition-transform duration-500">
                          <BookOpen size={32} className="mx-auto mb-2 text-warm-400" />
                          <div className="text-xs font-bold tracking-widest uppercase opacity-50">{siteName}</div>
                        </div>
                      </div>
                      
                      <div className="p-8 flex flex-col h-[calc(100%-12rem)]">
                        <div className="flex items-center gap-3 text-xs font-bold text-text-muted uppercase tracking-wider mb-3">
                          <span className="flex items-center gap-1.5"><Calendar size={12} className="text-primary-light" />{format(new Date(p.createdAt), 'MMM d, yyyy')}</span>
                        </div>
                        
                        <h2 className="text-xl font-bold text-text-primary mb-3 font-heading leading-snug group-hover:text-primary transition-colors">{p.title}</h2>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6 font-medium line-clamp-3">{p.excerpt}</p>
                        
                        <div className="mt-auto">
                          {p.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                              {p.tags.slice(0,2).map((t: string) => (
                                <span key={t} className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-surface-warm text-text-secondary border border-border-light">
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                          
                          <Link href={`/blog/${p.slug}`} className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors group/link">
                            Read More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}
