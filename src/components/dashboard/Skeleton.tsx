"use client";

export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/10 rounded ${className}`} />
  );
}

export function TokenCardSkeleton() {
  return (
    <div className="p-4 rounded-xl bg-white/10 border border-white/10">
      <Skeleton className="h-5 w-16 mb-2" />
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

export function NFTSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-white/10 border border-white/10">
      <Skeleton className="w-full h-40" />
      <div className="p-2">
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export function ActivitySkeleton() {
  return (
    <div className="p-3 rounded-lg bg-white/10 border border-white/10">
      <Skeleton className="h-4 w-32 mb-2" />
      <Skeleton className="h-3 w-full" />
    </div>
  );
}
