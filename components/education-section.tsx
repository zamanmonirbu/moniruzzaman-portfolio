"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"

export default function EducationSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="py-6 sm:py-8 border-b border-border space-y-4 sm:space-y-6">
        <Skeleton className="h-8 w-32" />
        {[1, 2].map((i) => (
          <div key={i} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
            <div className="space-y-1 sm:space-y-2 flex-1">
              <Skeleton className="h-5 w-64 sm:w-72" />
              <Skeleton className="h-4 w-40 sm:w-48" />
            </div>
            <Skeleton className="h-4 w-20 sm:w-24 shrink-0" />
          </div>
        ))}
      </div>
    )
  }

  if (!user?.education?.length) return null

  return (
    <div className="py-6 sm:py-8 border-b border-border">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Education</h2>
      <div className="space-y-4 sm:space-y-4">
        {user.education.map((edu, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm sm:text-base">{edu.institution}</h3>
              <p className="text-xs sm:text-sm text-foreground/70">{edu.degree}</p>
            </div>
            <span className="text-xs sm:text-sm text-foreground/60 shrink-0">{edu.timePeriod}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
