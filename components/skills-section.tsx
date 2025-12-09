"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkillsSection() {
  const { data: user, isLoading } = useUser()

  // Exact same padding/height as your Navbar links
  const btnStyle = `
    inline-block px-4 py-1 rounded-xl font-medium text-sm 
    transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105
    bg-background text-foreground border border-border/50
  `

  if (isLoading) {
    return (
      <div className="py-8 space-y-6">
        <Skeleton className="h-8 w-24" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-wrap gap-3 items-center">
              <Skeleton className="h-7 w-32" />
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((j) => (
                  <Skeleton key={j} className="h-9 w-24 rounded-xl" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (!user?.skills?.length) return null

  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-3xl font-bold mb-8">Skills</h2>

      <div className="space-y-6">
        {user.skills.map((group) => (
          <div
            key={group._id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
          >
            <h3 className="text-lg font-semibold text-foreground/80 min-w-[120px]">
              {group.skillTile}
            </h3>

            <div className="flex flex-wrap gap-2">
              {group.skillName.map((skill) => (
                <span key={skill} className={btnStyle}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}