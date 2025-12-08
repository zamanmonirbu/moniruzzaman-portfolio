"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkillsSection() {
  const { data: user, isLoading } = useUser();
  const btnStyle =
  "px-4 py-1 rounded-xl font-medium transition-all duration-200 font-medium text-sm flex items-center justify-center bg-primary text-primary-foreground shadow-md hover:shadow-lg"


  if (isLoading) {
    return (
      <div className="py-8 space-y-4">
        <Skeleton className="h-8 w-24" />
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Skeleton key={i} className="h-9 w-28 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (!user?.skills?.length) return null


  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>

      <div className="flex gap-2 flex-wrap">
        {user.skills.map((skill) => (
          <span key={skill} className={btnStyle}>
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}
