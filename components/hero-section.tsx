"use client"

import Image from "next/image"
import { Mail, Github, Linkedin, Locate } from "lucide-react"
import { useUser } from "@/hooks/use-user"
import { Skeleton, SkeletonLine, SkeletonAvatar } from "@/components/ui/skeleton"

export default function HeroSection() {
  const { data: user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="py-8 border-b border-border">
        <div className="flex justify-between items-start gap-8">
          <div className="flex-1 space-y-4">
            <Skeleton className="h-10 w-96 rounded-lg" />
            <SkeletonLine className="w-full" />
            <SkeletonLine className="w-4/5" />
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-accent rounded-full" />
              <SkeletonLine className="w-32" />
            </div>
            <div className="flex gap-3 pt-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="w-10 h-10 rounded-lg" />
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <div className="relative w-32 h-32">
              {/* Animated border */}
              <div className="absolute inset-0 rounded-full bg-linear-to-r from-gray-500 via-slate-500 to-gray-700 animate-spin-slow" />
              <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center overflow-hidden">
                <SkeletonAvatar />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Your original loaded content (unchanged)
  const displayName = user?.name || "MD. MONIRUZZAMAN"
  const displayBio = user?.bio || "Software Engineer, Educator, and Programming Enthusiast."
  const displayLocation = user?.education?.[0]?.institution || "Dhaka, Bangladesh"
  const profileImage = user?.profilePicture || "/placeholder.svg"

  return (
    <>
      <style jsx>{`
        @keyframes rotate-border {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        .animated-border {
          animation: rotate-border 5s linear infinite;
        }
      `}</style>

      <div className="py-8 border-b border-border">
        <div className="flex justify-between items-start gap-8">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">&lt;{displayName}/&gt;</h1>

            <p className="text-foreground/80 text-sm leading-relaxed mb-4">{displayBio}</p>

            <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
              <Locate size={16} className="shrink-0" />
              <span>{displayLocation}</span>
            </div>


            <div className="flex gap-3">
              {user?.socialLinks?.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-muted rounded transition"
                  title={link.platform}
                >
                  {link.platform === "github" && <Github size={18} />}
                  {link.platform === "linkedin" && <Linkedin size={18} />}
                  {link.platform === "gmail" && <Mail size={18} />}
                </a>
              ))}
            </div>
          </div>

          <div className="shrink-0">
            <div className="relative w-32 h-32">
              {/* Animated gradient border (only this rotates) */}
              <div className="absolute inset-0 rounded-full animated-border pointer-events-none" style={{
                background: 'conic-gradient(from 0deg, #ef4444 0% 20%, #f59e0b 20% 40%, #10b981 40% 60%, #3b82f6 60% 80%, #8b5cf6 80% 100%)'
              }}></div>

              {/* Fixed image in center */}
              <div className="absolute inset-1 rounded-full bg-background flex items-center justify-center">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt={displayName}
                    width={120}
                    height={120}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}