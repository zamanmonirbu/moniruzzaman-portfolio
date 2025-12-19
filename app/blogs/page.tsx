"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import BlogModal from "@/components/blog-modal"
import { BlogSkeleton } from "@/components/ui/skeleton-loader"
import { useBlogs } from "@/hooks/use-blogs"
import type { Blog } from "@/lib/types"

const MainContent = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
    <div className="bg-card border border-border rounded-2xl shadow-sm">
      <div className="p-6 sm:p-8 md:p-12">{children}</div>
    </div>
  </div>
)

/* ---------------- PAGINATION ---------------- */

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) => {
  const pages = []
  const maxVisiblePages = 5

  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1)
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 rounded-lg border border-border bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/70 transition-all"
      >
        Previous
      </button>

      {startPage > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-2 rounded-lg border border-border bg-muted text-foreground hover:bg-muted/70 transition-all"
          >
            1
          </button>
          {startPage > 2 && <span className="px-2 text-foreground/60">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-2 rounded-lg border transition-all ${
            currentPage === page
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border bg-muted text-foreground hover:bg-muted/70"
          }`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && (
            <span className="px-2 text-foreground/60">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-2 rounded-lg border border-border bg-muted text-foreground hover:bg-muted/70 transition-all"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 rounded-lg border border-border bg-muted text-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-muted/70 transition-all"
      >
        Next
      </button>
    </div>
  )
}

// Define a type for the data structure returned by useBlogs
interface UseBlogsReturnType {
  blogs: Blog[]
  pagination: {
    currentPage: number
    totalPages: number
    totalBlogs: number
    limit: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
}

export default function BlogsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: response, isLoading } = useBlogs(currentPage)
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)

  // Cast response to the expected type or use optional chaining
  const blogs = (response as UseBlogsReturnType)?.blogs || []
  const pagination = (response as UseBlogsReturnType)?.pagination


  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <MainContent>
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12">
          Articles
        </h1>

        {isLoading ? (
          <BlogSkeleton />
        ) : blogs?.length === 0 ? (
          <p className="text-center text-foreground/60 py-20">
            No articles yet.
          </p>
        ) : (
          <>
            <div className="space-y-10 sm:space-y-14">
              {blogs?.map((blog: Blog) => (
                <article
                  key={blog._id}
                  onClick={() => setSelectedBlog(blog)}
                  className="
                    group cursor-pointer
                    flex flex-col sm:flex-row
                    gap-5 sm:gap-8
                    transition-all hover:-translate-y-1
                  "
                >
                  {/* IMAGE */}
                  <div className="shrink-0 w-full sm:w-52">
                    <div className="w-full h-48 sm:h-36 overflow-hidden rounded-xl shadow-lg">
                      <Image
                        src={blog.featuredImage || "/placeholder.svg"}
                        alt={blog.title}
                        width={400}
                        height={300}
                        className="
                          w-full h-full object-cover
                          transition-transform duration-700
                          group-hover:scale-110
                        "
                      />
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 group-hover:text-primary transition">
                        {blog.title}
                      </h2>

                      <p className="text-foreground/70 mb-3 sm:mb-4 leading-relaxed line-clamp-2">
                        {blog.excerpt}
                      </p>

                      {/* TAGS */}
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
                    </div>

                    {/* FOOTER */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <time className="text-sm text-foreground/50">
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedBlog(blog)
                        }}
                        className="
                          inline-flex items-center gap-2
                          text-xs font-medium
                          bg-primary text-primary-foreground
                          px-5 py-2.5 rounded-lg
                          hover:bg-primary/90 transition-all
                          shadow-sm hover:shadow-md
                          w-fit
                        "
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        Read Article
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </MainContent>

      {selectedBlog && (
        <BlogModal
          blog={selectedBlog}
          onClose={() => setSelectedBlog(null)}
        />
      )}

      <Footer />
    </div>
  )
}