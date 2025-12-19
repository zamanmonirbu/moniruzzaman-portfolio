"use client"

import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ProjectSkeleton } from "@/components/ui/skeleton-loader"
import { useProjects } from "@/hooks/use-projects"
import type { Project } from "@/lib/types"
import { useEffect, useState } from "react"

/* ---------------- BUTTON ---------------- */

const CodeButton = ({
  href,
  label,
  active,
  onClick,
}: {
  href: string
  label: string
  active?: boolean
  onClick?: () => void
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    onClick={onClick}
    className={`inline-flex items-center text-xs font-medium px-4 py-2 rounded-lg border transition-all
      ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-muted text-foreground border-border"
      }
      hover:${active ? "bg-primary/90" : "bg-muted/70"}`}
  >
    {label}
  </a>
)

/* ---------------- LAYOUT ---------------- */

const MainContent = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="bg-card border border-border rounded-2xl shadow-sm">
      <div className="p-8 md:p-12">{children}</div>
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

/* ---------------- PAGE ---------------- */

export default function ProjectsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: response, isLoading } = useProjects(currentPage)

  const projects = response?.projects || []
  const pagination = response?.pagination

  console.log('Response:', response)
  console.log('Projects:', projects)
  console.log('Pagination:', pagination)

  const [activeImageIndex, setActiveImageIndex] = useState<number[]>([])
  const [showFullDesc, setShowFullDesc] = useState<string[]>([])
  const [activeButton, setActiveButton] = useState<Record<string, string>>({})

  useEffect(() => {
    if (projects?.length) {
      setActiveImageIndex(projects.map(() => 0))

      // Default active button = Demo Video
      const defaults: Record<string, string> = {}
      projects.forEach((p: Project) => {
        if (p.videoLink) defaults[p._id] = "Demo Video"
      })
      setActiveButton(defaults)
      
      // Reset expanded descriptions on page change
      setShowFullDesc([])
    }
  }, [projects])

  useEffect(() => {
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentPage])

  const toggleDesc = (id: string) => {
    setShowFullDesc((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const nextImage = (projectIndex: number) => {
    setActiveImageIndex((prev) =>
      prev.map((idx, i) => {
        if (i !== projectIndex) return idx
        const total =
          projects[i].otherPhotos?.length
            ? projects[i].otherPhotos.length + 1
            : 1
        return (idx + 1) % total
      })
    )
  }

  const prevImage = (projectIndex: number) => {
    setActiveImageIndex((prev) =>
      prev.map((idx, i) => {
        if (i !== projectIndex) return idx
        const total =
          projects[i].otherPhotos?.length
            ? projects[i].otherPhotos.length + 1
            : 1
        return (idx - 1 + total) % total
      })
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <MainContent>
        <h1 className="text-4xl font-bold mb-12">Projects</h1>

        {isLoading ? (
          <ProjectSkeleton />
        ) : projects?.length === 0 ? (
          <p className="text-center text-foreground/60 py-20">
            No projects yet.
          </p>
        ) : (
          <>
            <div className="space-y-16">
              {projects?.map((project: Project, idx: number) => {
                const images = [
                  project.timelinePhoto,
                  ...(project.otherPhotos || []),
                ]
                const currentImage = images[activeImageIndex[idx]]
                const isExpanded = showFullDesc.includes(project._id)

                return (
                  <article
                    key={project._id}
                    className="flex flex-col md:flex-row gap-8 border-b border-border/30 pb-12 last:border-0"
                  >
                    {/* ---------------- IMAGE ---------------- */}
                    <div className="md:w-80 shrink-0 relative overflow-hidden rounded-xl shadow-lg h-52">
                      <div
                        className="relative w-full h-full cursor-pointer"
                        onClick={() =>
                          project.liveLink &&
                          window.open(project.liveLink, "_blank")
                        }
                      >
                        <Image
                          src={currentImage || "/placeholder.svg"}
                          alt={project.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              prevImage(idx)
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-all"
                          >
                            &#10094;
                          </button>

                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              nextImage(idx)
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60 transition-all"
                          >
                            &#10095;
                          </button>
                        </>
                      )}
                    </div>

                    {/* ---------------- DETAILS ---------------- */}
                    <div className="flex-1">
                      {/* Title */}
                      <h2 className="text-2xl font-bold mb-2">
                        {project.name}
                      </h2>

                      {/* Technologies */}
                      {project.technologies?.length > 0 && (
                        <p className="text-sm text-foreground/80 mb-4">
                          <strong>Technologies:</strong>{" "}
                          {project.technologies.join(", ")}
                        </p>
                      )}

                      {/* Links */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {project.videoLink && (
                          <CodeButton
                            href={project.videoLink}
                            label="Demo Video"
                            active={activeButton[project._id] === "Demo Video"}
                            onClick={() =>
                              setActiveButton((prev) => ({
                                ...prev,
                                [project._id]: "Demo Video",
                              }))
                            }
                          />
                        )}

                        {project.liveLink && (
                          <CodeButton
                            href={project.liveLink}
                            label="Live Site"
                            active={activeButton[project._id] === "Live Site"}
                            onClick={() =>
                              setActiveButton((prev) => ({
                                ...prev,
                                [project._id]: "Live Site",
                              }))
                            }
                          />
                        )}

                        {project.frontendCode && (
                          <CodeButton
                            href={project.frontendCode}
                            label="Frontend Code"
                            active={
                              activeButton[project._id] === "Frontend Code"
                            }
                            onClick={() =>
                              setActiveButton((prev) => ({
                                ...prev,
                                [project._id]: "Frontend Code",
                              }))
                            }
                          />
                        )}

                        {project.backendCode && (
                          <CodeButton
                            href={project.backendCode}
                            label="Backend Code"
                            active={
                              activeButton[project._id] === "Backend Code"
                            }
                            onClick={() =>
                              setActiveButton((prev) => ({
                                ...prev,
                                [project._id]: "Backend Code",
                              }))
                            }
                          />
                        )}
                      </div>

                      {/* Description */}
                      <div
                        className="text-foreground/70 leading-relaxed text-justify"
                        dangerouslySetInnerHTML={{
                          __html: isExpanded
                            ? project.description
                            : project.description.slice(0, 200),
                        }}
                      />

                      {project.description.length > 200 && (
                        <button
                          onClick={() => toggleDesc(project._id)}
                          className="text-primary underline text-sm mt-1"
                        >
                          {isExpanded ? "See Less" : "See More"}
                        </button>
                      )}
                    </div>
                  </article>
                )
              })}
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

      <Footer />
    </div>
  )
}