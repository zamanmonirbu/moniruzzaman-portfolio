"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton, SkeletonLine } from "@/components/ui/skeleton"

export default function WorkExperienceSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="py-6 sm:py-8 border-b border-border space-y-4 sm:space-y-6">
        <Skeleton className="h-8 w-40 sm:w-48" />
        {[1, 2].map((i) => (
          <div key={i} className="space-y-2 sm:space-y-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-4">
              <Skeleton className="h-5 w-48 sm:w-64" />
              <Skeleton className="h-4 w-24 sm:w-28 shrink-0" />
            </div>
            <SkeletonLine className="w-36 sm:w-48" />
            <SkeletonLine className="w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (!user?.workExperience?.length) return null

  return (
    <div className="py-6 sm:py-8 border-b border-border">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Work Experience</h2>
      <div className="space-y-4 sm:space-y-6 text-justify">
        {user.workExperience.map((exp, idx) => (
          <div key={idx}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 sm:gap-4 mb-1 sm:mb-2">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">{exp.title}</h3>
              <span className="text-xs sm:text-sm text-foreground/60 shrink-0">{exp.timePeriod}</span>
            </div>
            <p className="text-xs sm:text-sm text-foreground/70 mb-1">{exp.designation}</p>
            <div
              className="prose prose-sm sm:prose text-foreground/70 max-w-full break-words"
              dangerouslySetInnerHTML={{ __html: exp.details }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
