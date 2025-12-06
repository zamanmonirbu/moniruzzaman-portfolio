"use client"
import { useUser } from "@/hooks/use-user"

const btnStyle =
  "px-4 py-1 rounded-xl font-medium transition-all duration-200 font-medium text-sm flex items-center justify-center bg-primary text-primary-foreground shadow-md hover:shadow-lg"

export default function SkillsSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) return <div className="py-8">Loading...</div>

  if (!user?.skills || user.skills.length === 0) return null

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
