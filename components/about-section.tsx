"use client"

import { useUser } from "@/hooks/use-user"

export default function AboutSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) return <div className="py-8">Loading...</div>

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p className="text-foreground/80 text-sm leading-relaxed mb-4">
        {user?.about ||
          "I am a passionate tech entrepreneur and educator focused on building impactful software solutions."}
      </p>
    </div>
  )
}
