// components/ui/skeleton-loader.tsx
export function BlogSkeleton() {
  return (
    <div className="space-y-10 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-8">
          <div className="w-52 h-36 bg-muted rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-primary/20 rounded-full" />
              <div className="h-6 w-20 bg-primary/20 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ProjectSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      {[1, 2].map((i) => (
        <div key={i} className="flex flex-col md:flex-row gap-8 pb-12 border-b border-border/30">
          <div className="md:w-80 h-52 bg-muted rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="h-8 bg-muted rounded w-2/3" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-full" />
              <div className="h-4 bg-muted rounded w-5/6" />
            </div>
            <div className="flex gap-3">
              <div className="h-9 w-32 bg-primary rounded-lg" />
              <div className="h-9 w-36 bg-muted rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

// components/navigation-skeleton.tsx
export default function NavigationSkeleton() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border/50">
      <div className="max-w-4xl mx-auto px-6 flex items-center justify-between h-16">

        {/* Logo Skeleton */}
        <div className="w-6 h-6 rounded-full bg-muted animate-pulse ring-2 ring-primary/20 relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>

        {/* Nav Links + Theme Toggle Skeleton */}
        <div className="flex items-center gap-2">

          {/* Nav Links Skeleton */}
          <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-background/50 backdrop-blur-sm">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-8 w-20 rounded-xl bg-muted animate-pulse relative overflow-hidden"
              >
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
              </div>
            ))}
          </div>

          {/* Theme Toggle Skeleton */}
          <div className="ml-4 p-2.5 rounded-xl bg-muted animate-pulse w-10 h-10 relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      </div>
    </nav>
  )
}