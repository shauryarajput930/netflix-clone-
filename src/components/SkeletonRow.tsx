const SkeletonRow = () => (
  <div className="mb-8">
    <div className="loading-pulse h-6 w-48 mx-4 md:mx-12 mb-4" />
    <div className="flex gap-2 px-4 md:px-12 overflow-hidden">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex-shrink-0 w-[160px] md:w-[200px]">
          <div className="loading-pulse aspect-[2/3] rounded" />
        </div>
      ))}
    </div>
  </div>
);

export const HeroSkeleton = () => (
  <div className="relative h-[85vh] w-full">
    <div className="loading-pulse absolute inset-0" />
    <div className="absolute bottom-32 left-4 md:left-12 space-y-4">
      <div className="loading-pulse h-16 w-96 rounded" />
      <div className="loading-pulse h-4 w-80 rounded" />
      <div className="loading-pulse h-4 w-64 rounded" />
      <div className="flex gap-3 mt-4">
        <div className="loading-pulse h-12 w-32 rounded" />
        <div className="loading-pulse h-12 w-40 rounded" />
      </div>
    </div>
  </div>
);

export default SkeletonRow;
