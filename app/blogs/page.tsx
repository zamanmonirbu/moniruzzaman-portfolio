"use client"

import { useState } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BlogModal from "@/components/blog-modal"
import { useBlogs } from "@/hooks/use-blogs"
import type { Blog } from "@/lib/types"

// Reusable MainContent (same as Projects & Home)
function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-8 md:p-12">{children}</div>
      </div>
    </div>
  )
}

export default function BlogsPage() {
  const { data: blogs, isLoading } = useBlogs()
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <MainContent>
          <p className="text-center text-foreground/60 py-20 text-lg">Loading articles...</p>
        </MainContent>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <MainContent>
        <h1 className="text-4xl font-bold mb-12 text-foreground">Articles</h1>

        <div className="space-y-10">
          {blogs?.map((blog) => (
            <article
              key={blog._id}
              onClick={() => setSelectedBlog(blog)}
              className="group flex gap-8 cursor-pointer transition-all hover:-translate-y-1"
            >
              {/* Featured Image */}
              <div className="shrink-0">
                <div className="w-52 h-36 overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={blog.featuredImage || "/placeholder.svg"}
                    alt={blog.title}
                    width={208}
                    height={144}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition">
                  {blog.title}
                </h2>

                <p className="text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date + Read Button */}
                <div className="flex items-center justify-between">
                  <time className="text-sm text-foreground/50">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>

                  {/* Same button style as Projects */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedBlog(blog)
                    }}
                    className="inline-flex items-center gap-2 text-xs font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read Article
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </MainContent>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}

      <Footer />
    </div>
  )
}

