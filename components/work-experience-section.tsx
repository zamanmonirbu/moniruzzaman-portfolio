"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton, SkeletonLine } from "@/components/ui/skeleton"

export default function WorkExperienceSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="py-8 border-b border-border space-y-6">
        <Skeleton className="h-8 w-48" />
        {[1, 2].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-28" />
            </div>
            <SkeletonLine className="w-48" />
            <SkeletonLine className="w-full" />
          </div>
        ))}
      </div>
    )
  }

  if (!user?.workExperience?.length) return null

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-6 text-justify">
        {user.workExperience.map((exp, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-semibold text-foreground">{exp.title}</h3>
              <span className="text-sm text-foreground/60 shrink-0">{exp.timePeriod}</span>
            </div>
            <p className="text-sm text-foreground/70 mb-1">{exp.designation}</p>
            <div
              className="prose prose-sm max-w-none text-foreground/70"
              dangerouslySetInnerHTML={{ __html: exp.details }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
