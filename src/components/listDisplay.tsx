import { useState } from "react";

interface ListItem {
  _id: string;
  title: string;
  description: string;
}

interface ListDisplayProps {
  title: string;
  items: ListItem[];
  onAdd: () => void;
  onViewDetails: (id: string) => void;
}

export const ListDisplay = ({
  title,
  items,
  onAdd,
  onViewDetails,
}: ListDisplayProps) => {
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  };

  const [showAll, setShowAll] = useState(false);
  const visibleItems = showAll ? items : items.slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-1/2">
        <div className="card font-bold text-xl flex justify-between">
          <div>{title}</div>
          <div onClick={onAdd} className="cursor-pointer">
            +
          </div>
        </div>
      </div>

      <div className="card flex flex-col gap-6">
        {items.length > 0 ? (
          <>
            {visibleItems.map((item) => (
              <div key={item._id} className="card flex flex-col gap-6">
                <div
                  onClick={() => onViewDetails(item._id)}
                  className="w-full flex gap-6 cursor-pointer"
                >
                  <div className="h-20 w-20 rounded-2xl bg-gray-200 border-2 border-gray-300 hidden md:block"></div>
                  <div className="w-full rounded-2xl">
                    <div className="text-lg font-medium">{item.title}</div>
                    <div>{truncateText(item.description, 25)}</div>
                  </div>
                </div>
              </div>
            ))}

            {items.length > 2 && (
              <div className="flex justify-center items-center">
                <button className="button" onClick={() => setShowAll(!showAll)}>
                  {showAll ? "Show Less" : "Show More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div>No {title}.</div>
        )}
      </div>
    </div>
  );
};
