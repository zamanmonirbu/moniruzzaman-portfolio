import { cn } from '@/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn('bg-accent animate-pulse rounded-md', className)}
      {...props}
    />
  )
}

// Helper components (optional, but super clean)
export function SkeletonText({ className }: { className?: string }) {
  return <Skeleton className={cn('h-4 w-full', className)} />
}

export function SkeletonTitle({ className }: { className?: string }) {
  return <Skeleton className={cn('h-8 w-48', className)} />
}

export function SkeletonAvatar({ size = 'w-32 h-32' }: { size?: string }) {
  return <Skeleton className={cn('rounded-full', size)} />
}

export function SkeletonButton({ className }: { className?: string }) {
  return <Skeleton className={cn('h-9 w-24 rounded-xl', className)} />
}

export function SkeletonLine({ className }: { className?: string }) {
  return <Skeleton className={cn('h-4 rounded-md', className)} />
}

export { Skeleton }