"use client"

import Image from "next/image"
import type { Blog } from "@/lib/types"

interface BlogModalProps {
  blog: Blog
  onClose: () => void
}

export default function BlogModal({ blog, onClose }: BlogModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto pt-20"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - ALWAYS VISIBLE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 
                     bg-background/90 backdrop-blur-md
                     text-foreground hover:text-foreground/80
                     w-12 h-12 rounded-full 
                     flex items-center justify-center 
                     text-3xl font-thin
                     transition-all hover:scale-110 shadow-lg"
          aria-label="Close"
        >
          ×
        </button>

        {/* Hero Image */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
          <Image
            src={blog.featuredImage || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-20 -mt-16 px-6 pb-12 md:px-12">
          <div className="bg-card/98 backdrop-blur-xl rounded-2xl p-8 md:p-12 lg:p-16 border border-border/60 shadow-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-foreground leading-tight">
              {blog.title}
            </h1>

            <div className="flex flex-col sm:flex-row gap-6 mb-12 text-sm text-foreground/60">
              <time className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>

              <div className="flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-primary/15 text-primary px-4 py-2 rounded-full text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <article
              className="prose prose-invert max-w-none text-foreground/90 leading-relaxed text-base md:text-lg space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}