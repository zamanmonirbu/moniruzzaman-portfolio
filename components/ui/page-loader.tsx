// components/ui/page-loader.tsx
import { Loader2 } from "lucide-react"

export default function PageLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-foreground/60">{message}</p>
    </div>
  )
}