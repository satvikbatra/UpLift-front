interface SkeletonProps {
  type: "list" | "card";
  count?: number;
}

const ListSkeleton = ({ count = 2 }: { count?: number }) => (
  <div className="flex flex-col gap-4">
    <div className="w-1/2">
      <div className="card font-bold text-xl flex justify-between">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>

    <div className="card flex flex-col gap-6">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="card flex flex-col gap-6">
            <div className="w-full flex gap-6">
              <div className="h-20 w-20 rounded-2xl bg-gray-200 animate-pulse hidden md:block"></div>
              <div className="w-full rounded-2xl">
                <div className="h-6 w-48 bg-gray-200 animate-pulse rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  </div>
);

const CardSkeleton = () => (
  <div className="w-full h-32 bg-gray-200 animate-pulse rounded-2xl"></div>
);

export const Skeleton = ({ type, count }: SkeletonProps) => {
  switch (type) {
    case "list":
      return <ListSkeleton count={count} />;
    case "card":
      return <CardSkeleton />;
    default:
      return null;
  }
};
