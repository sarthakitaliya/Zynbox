
export const EmailSkeleton = () => {
  return (
    <div className="flex items-center gap-3 py-4 px-4 animate-pulse border-b border-zinc-800">
      <div className="w-10 h-10 bg-zinc-700 rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="w-1/3 h-3 bg-zinc-700 rounded"></div>
        <div className="w-2/3 h-3 bg-zinc-700 rounded"></div>
      </div>
      <div className="w-14 h-3 bg-zinc-700 rounded ml-auto"></div>
    </div>
  );
};