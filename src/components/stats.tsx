export const Stats = ({ stats = [] }: { stats: { id: string; value: number; color: string }[] }) => {
    if (stats.length === 0) {
      return <div className="text-gray-500 text-center">No Data Available</div>;
    }
  
    return (
      <div className="card p-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-xl shadow-sm flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <span className="text-md font-medium leading-tight">{stat.id}</span>
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: stat.color }}
                ></span>
              </div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  