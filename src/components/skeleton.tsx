interface SkeletonProps {
  type: "list" | "card" | "admin";
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

const AdminSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="max-w-6xl mx-auto flex flex-col gap-6 p-4 w-full">
    {Array(count)
      .fill(0)
      .map((_, index) => (
        <div key={index} className="card">
          <div className="flex flex-col md:flex-row gap-4 p-4">
            <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 w-48 bg-gray-200 animate-pulse rounded"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-200 animate-pulse rounded"></div>
                <div className="h-3 w-3/4 bg-gray-200 animate-pulse rounded"></div>
              </div>
            </div>
            <div className="flex gap-2 items-start">
              <div className="h-8 w-8 rounded bg-gray-200 animate-pulse"></div>
              <div className="h-8 w-8 rounded bg-gray-200 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
  </div>
);

export const Skeleton = ({ type, count }: SkeletonProps) => {
  switch (type) {
    case "list":
      return <ListSkeleton count={count} />;
    case "card":
      return <CardSkeleton />;
    case "admin":
      return <AdminSkeleton count={count} />;
    default:
      return null;
  }
};
