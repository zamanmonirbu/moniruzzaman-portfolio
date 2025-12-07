"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"

export default function EducationSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="py-8 border-b border-border space-y-6">
        <Skeleton className="h-8 w-32" />
        {[1, 2].map((i) => (
          <div key={i} className="flex justify-between items-start gap-4">
            <div className="space-y-2 flex-1">
              <Skeleton className="h-5 w-72" />
              <Skeleton className="h-4 w-48" />
            </div>
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
      </div>
    )
  }

  if (!user?.education?.length) return null

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-2xl font-bold mb-6">Education</h2>
      <div className="space-y-4">
        {user.education.map((edu, idx) => (
          <div key={idx} className="flex justify-between items-start gap-4">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{edu.institution}</h3>
              <p className="text-sm text-foreground/70">{edu.degree}</p>
            </div>
            <span className="text-sm text-foreground/60 shrink-0">{edu.timePeriod}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
