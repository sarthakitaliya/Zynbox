export const EmailDetailSkeleton = () => (
  <div className="p-6 animate-pulse">
    <div className="h-5 w-1/2 bg-zinc-700 mb-4 rounded" />
    <div className="h-4 w-1/3 bg-zinc-700 mb-6 rounded" />
    <div className="space-y-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-3 bg-zinc-700 rounded w-full" />
      ))}
    </div>
  </div>
);