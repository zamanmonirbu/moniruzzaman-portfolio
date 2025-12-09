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
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="flex-1 space-y-4 w-full">
            <Skeleton className="h-10 w-80 md:w-96 rounded-lg" />
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

          <div className="shrink-0 mx-auto md:mx-0">
            <SkeletonAvatar  />
          </div>
        </div>
      </div>
    )
  }

  const displayName = user?.name || "MD. MONIRUZZAMAN"
  const displayBio = user?.bio || "Software Engineer, Educator, and Programming Enthusiast."
  const displayLocation = user?.education?.[0]?.institution || "Dhaka, Bangladesh"
  const profileImage = user?.profilePicture || "/placeholder.svg"

  return (
    <>
      <style jsx>{`
        @keyframes rotate-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animated-border {
          animation: rotate-border 5s linear infinite;
        }
      `}</style>

      <div className="py-8 border-b border-border">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Text Content */}
          <div className="flex-1 order-2 md:order-1">
            <h1 className="text-2xl md:text-4xl font-bold mb-3">&lt;{displayName}/&gt;</h1>

            <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
              {displayBio}
            </p>

            <div className="flex items-center gap-2 text-foreground/60 text-sm mb-6">
              <Locate size={16} className="shrink-0" />
              <span>{displayLocation}</span>
            </div>

            <div className="flex gap-4">
              {user?.socialLinks?.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 hover:bg-muted rounded-xl transition-all hover:scale-110"
                  title={link.platform}
                >
                  {link.platform === "github" && <Github size={20} />}
                  {link.platform === "linkedin" && <Linkedin size={20} />}
                  {link.platform === "gmail" && <Mail size={20} />}
                </a>
              ))}
            </div>
          </div>

          {/* Profile Image with Animated Border */}
          <div className="shrink-0 order-1 md:order-2 mx-auto md:mx-0">
            <div className="relative w-32 h-32 md:w-36 md:h-36">
              {/* Rotating gradient border */}
              <div
                className="absolute inset-0 rounded-full animated-border pointer-events-none"
                style={{
                  background:
                    "conic-gradient(from 0deg, #ef4444 0% 20%, #f59e0b 20% 40%, #10b981 40% 60%, #3b82f6 60% 80%, #8b5cf6 80% 100%)",
                }}
              />

              {/* Inner image (fixed) */}
              <div className="absolute inset-1.5 rounded-full bg-background overflow-hidden">
                <Image
                  src={profileImage}
                  alt={displayName}
                  width={140}
                  height={140}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}