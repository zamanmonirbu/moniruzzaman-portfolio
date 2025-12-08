"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useUser } from "@/hooks/use-user"

export default function Footer() {
  const { data: user, isLoading } = useUser()

  // Show skeleton while user data is loading (optional but consistent)
  if (isLoading) {
    return (
      <footer className="bg-background py-8 border-t border-border/50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Skeleton className="h-4 w-64 mx-auto" />
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-background py-8 border-t border-border/50">
      <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>
          {user?.name 
            ? `${user.name}. All rights reserved.` 
            : "MD. MONIRUZZAMAN. All rights reserved."
          }
        </p>
      </div>
    </footer>
  )
}