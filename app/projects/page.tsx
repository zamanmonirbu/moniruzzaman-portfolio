"use client"

import Image from "next/image"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ProjectSkeleton } from "@/components/ui/skeleton-loader"
import { useProjects } from "@/hooks/use-projects"
import type { Project } from "@/lib/types"
import { useState, useEffect } from "react"

// Button supporting dark/light mode
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
    className={`inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-lg border transition-all duration-200
      ${active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-muted text-foreground border-border"
      }
      hover:${active ? "bg-primary/90" : "bg-muted/70"}`}
  >
    {label}
  </a>
)

const MainContent = ({ children }: { children: React.ReactNode }) => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
      <div className="p-8 md:p-12">{children}</div>
    </div>
  </div>
)

export default function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const [activeImageIndex, setActiveImageIndex] = useState<number[]>([])
  const [showFullDesc, setShowFullDesc] = useState<string[]>([])
  const [activeButton, setActiveButton] = useState<Record<string, string>>({})

  useEffect(() => {
    if (projects?.length) {
      setActiveImageIndex(projects.map(() => 0))
    }
  }, [projects])

  const toggleDesc = (id: string) => {
    setShowFullDesc((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const nextImage = (projectIndex: number) => {
    setActiveImageIndex((prev) =>
      prev.map((idx, i) => {
        if (i !== projectIndex) return idx
        const total = projects![i].otherPhotos?.length
          ? projects![i].otherPhotos.length + 1
          : 1
        return (idx + 1) % total
      })
    )
  }

  const prevImage = (projectIndex: number) => {
    setActiveImageIndex((prev) =>
      prev.map((idx, i) => {
        if (i !== projectIndex) return idx
        const total = projects![i].otherPhotos?.length
          ? projects![i].otherPhotos.length + 1
          : 1
        return (idx - 1 + total) % total
      })
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      <MainContent>
        <h1 className="text-4xl font-bold mb-12">Projects</h1>

        {isLoading ? (
          <ProjectSkeleton />
        ) : projects?.length === 0 ? (
          <p className="text-center text-foreground/60 py-20">No projects yet.</p>
        ) : (
          <div className="space-y-16">
            {projects?.map((project: Project, idx: number) => {
              const allImages = [project.timelinePhoto, ...(project.otherPhotos || [])]
              const currentImage = allImages[activeImageIndex[idx]] || project.timelinePhoto
              const isExpanded = showFullDesc.includes(project._id)

              return (
                <article
                  key={project._id}
                  className="flex flex-col md:flex-row gap-8 border-b border-border/30 pb-12 last:border-0"
                >
                  {/* Carousel */}
                  <div className="md:w-80 shrink-0 relative overflow-hidden rounded-xl shadow-lg h-52">
                    <div className="relative w-full h-full">
                      <Image
                        src={currentImage || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-cover transition-transform duration-700 ease-in-out"
                      />
                    </div>

                    {/* Prev/Next Buttons */}
                    <button
                      onClick={() => prevImage(idx)}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/70"
                    >
                      &#10094;
                    </button>
                    <button
                      onClick={() => nextImage(idx)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/70"
                    >
                      &#10095;
                    </button>
                  </div>


                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-3 tr">{project.name}</h2>
                    <div
  className="text-foreground/70 leading-relaxed mb-2 text-justify"
  dangerouslySetInnerHTML={{
    __html: isExpanded ? project.description : project.description.slice(0, 200),
  }}
/>

{project.description.length > 200 && (
  <button
    onClick={() => toggleDesc(project._id)}
    className="ml-2 text-primary underline text-sm"
  >
    {isExpanded ? "See Less" : "See More"}
  </button>
)}

                      {project.technologies?.length > 0 && (
                        <p className="text-foreground/80 mb-2">
                          <strong>Technologies:</strong> {project.technologies.join(", ")}
                        </p>
                      )}
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-3 mt-4">
                      {project.liveLink && (
                        <CodeButton
                          href={project.liveLink}
                          label="Demo Video"
                          active={activeButton[project._id] === "Demo Video" || !activeButton[project._id]}
                          onClick={() =>
                            setActiveButton((prev) => ({ ...prev, [project._id]: "Demo Video" }))
                          }
                        />
                      )}
                      {project.frontendCode && (
                        <CodeButton
                          href={project.frontendCode}
                          label="Frontend Code"
                          active={activeButton[project._id] === "Frontend Code"}
                          onClick={() =>
                            setActiveButton((prev) => ({ ...prev, [project._id]: "Frontend Code" }))
                          }
                        />
                      )}
                      {project.backendCode && (
                        <CodeButton
                          href={project.backendCode}
                          label="Backend Code"
                          active={activeButton[project._id] === "Backend Code"}
                          onClick={() =>
                            setActiveButton((prev) => ({ ...prev, [project._id]: "Backend Code" }))
                          }
                        />
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </MainContent>

      <Footer />
    </div>
  )
}
