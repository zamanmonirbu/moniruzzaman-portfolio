// app/loading.tsx
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-8">
        <div className="relative">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
          <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary/20" />
        </div>
      </div>
    </div>
  )
}