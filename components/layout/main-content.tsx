// components/layout/main-content.tsx
import { ReactNode } from "react"

export default function MainContent({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  )
}