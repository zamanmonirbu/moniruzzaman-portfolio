"use client"

import { useState } from "react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProjectModal from "@/components/project-modal"
import { useProjects } from "@/hooks/use-projects"
import type { Project } from "@/lib/types"

// Shared button components (used in list & modal)
const LiveButton = ({ href }: { href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-xs font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
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
    className="inline-flex items-center gap-2 text-xs font-medium bg-muted text-foreground px-4 py-2 rounded-lg hover:bg-muted/70 border border-border/50 transition-all"
  >
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
    {label}
  </a>
)

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <MainContent>
          <p className="text-center text-foreground/60 py-foreground/60 py-20 text-lg">Loading projects...</p>
        </MainContent>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <MainContent>
        <h1 className="text-4xl font-bold mb-12 text-foreground">Projects</h1>

        <div className="space-y-12">
          {projects?.map((project) => (
            <article
              key={project._id}
              onClick={() => setSelectedProject(project)}
              className="group flex flex-col md:flex-row gap-8 pb-12 border-b border-border/30 last:border-0 cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="md:w-80 shrink-0">
                <div className="overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={project.timelinePhoto || "/placeholder.svg"}
                    alt={project.name}
                    width={320}
                    height={200}
                    className="w-full h-52 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h2>
                <p className="text-foreground/70 leading-relaxed mb-6 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project.liveLink && <LiveButton href={project.liveLink} />}
                  {project.frontendCode && <CodeButton href={project.frontendCode} label="Frontend Code" />}
                  {project.backendCode && <CodeButton href={project.backendCode} label="Backend Code" />}
                </div>
              </div>
            </article>
          ))}
        </div>
      </MainContent>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      <Footer />
    </div>
  )
}

// Reusable wrapper — use this on Home, Blogs, Projects
function MainContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="p-8 md:p-12">{children}</div>
      </div>
    </div>
  )
}