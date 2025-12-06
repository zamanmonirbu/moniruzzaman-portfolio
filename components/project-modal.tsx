"use client"

import Image from "next/image"
import type { Project } from "@/lib/types"

const LiveButton = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm font-medium bg-primary text-primary-foreground px-6 py-3 rounded-xl hover:bg-primary/90 transition-all shadow-md hover:shadow-xl"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
    Watch Video
  </a>
)

const CodeButton = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm font-medium bg-muted text-foreground px-6 py-3 rounded-xl hover:bg-muted/70 border border-border/50 transition-all"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
    {label}
  </a>
)

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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

        {/* Hero Image - Full Width & Visible */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px]">
          <Image
            src={project.timelinePhoto || "/placeholder.svg"}
            alt={project.name}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent" />
        </div>

        {/* Content Card */}
        <div className="relative z-20 -mt-16 px-6 pb-12 md:px-12">
          <div className="bg-card/98 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-border/50 shadow-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
              {project.name}
            </h1>

            <p className="text-base md:text-lg text-foreground/80 leading-relaxed mb-8">
              {project.description}
            </p>

            <time className="block text-sm text-foreground/50 mb-10">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </time>

            <div className="flex flex-wrap gap-4">
              {project.liveLink && <LiveButton href={project.liveLink} />}
              {project.frontendCode && <CodeButton href={project.frontendCode} label="Frontend Code" />}
              {project.backendCode && <CodeButton href={project.backendCode} label="Backend Code" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}