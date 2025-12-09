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
        <SkeletonLine className="w-11/12" />
      </div>
    )
  }

  return (
    <div className="py-10 md:py-12 border-b border-border">
      <h2 className="text-2xl md:text-3xl font-bold mb-5 md:mb-6">About Me</h2>
      
      <div className="max-w-none md:max-w-3xl text-justify">
        <p className="text-sm text-foreground/70 mb-1 leading-relaxed">
          {user?.about || "I am a passionate tech entrepreneur and educator..."}
        </p>
      </div>
    </div>
  )
}