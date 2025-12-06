"use client"

import { useUser } from "@/hooks/use-user"

export default function WorkExperienceSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) return <div className="py-8">Loading...</div>

  if (!user?.workExperience || user.workExperience.length === 0) {
    return null
  }

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
      <div className="space-y-6">
        {user.workExperience.map((exp, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-start gap-4 mb-2">
              <h3 className="font-semibold text-foreground">{exp.title}</h3>
              <span className="text-sm text-foreground/60 shrink-0">{exp.timePeriod}</span>
            </div>
            <p className="text-sm text-foreground/70 mb-1">{exp.designation}</p>
            <p className="text-sm text-foreground/70">{exp.details}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
