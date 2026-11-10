import { cn } from '@/lib/utils/cn';

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-surface-50/60', className)}
      {...props}
    />
  );
}

export function CertificationCardSkeleton() {
  return (
    <div className="rounded-xl border border-surface-border bg-surface-card p-6 flex flex-col justify-between h-[360px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-7 w-3/4 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <Skeleton className="h-12 w-full mb-4" />
      </div>
      <div>
        <div className="flex items-baseline gap-2 mb-4">
          <Skeleton className="h-7 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
    </div>
  );
}

