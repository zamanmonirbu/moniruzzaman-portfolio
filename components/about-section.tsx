"use client"

import { useUser } from "@/hooks/use-user"
import { Skeleton, SkeletonLine } from "@/components/ui/skeleton"

export default function AboutSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="py-8 border-b border-border space-y-4">
        <Skeleton className="h-8 w-32" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-full" />
        <SkeletonLine className="w-5/6" />
      </div>
    )
  }

  return (
    <div className="py-8 border-b border-border">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p className="text-foreground/80 text-sm leading-relaxed">
        {user?.about || "I am a passionate tech entrepreneur and educator..."}
      </p>
    </div>
  )
}