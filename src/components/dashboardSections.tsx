import { ReactNode, useEffect, useState, CSSProperties } from "react";
import { DragDropContext, Droppable, Draggable, DropResult, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";

interface Section {
  id: string;
  component: ReactNode;
}

interface DashboardSectionsProps {
  sections: Section[];
}

const getDraggableStyle = (
  style: DraggableProvided["draggableProps"]["style"],
  isDragging: boolean
): CSSProperties => ({
  ...style,
  transform: isDragging
    ? `${style?.transform} scale(1.02)`
    : style?.transform,
});

const getCardClasses = (isDragging: boolean): string =>
  `card transition-all duration-200 relative group ${
    isDragging ? "shadow-xl bg-gray-50" : "hover:shadow-lg"
  }`;

const getIndicatorClasses = (isDragging: boolean): string =>
  `absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-12 bg-gray-300 rounded-full transition-opacity duration-200 ${
    isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`;

const getRightIndicatorClasses = (isDragging: boolean): string =>
  `absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-12 bg-gray-300 rounded-full transition-opacity duration-200 ${
    isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`;

export const DashboardSections = ({ sections }: DashboardSectionsProps) => {
  const [orderedSections, setOrderedSections] = useState<Section[]>([]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("dashboardSectionsOrder");
    if (savedOrder) {
      const orderIds = JSON.parse(savedOrder) as string[];
      const ordered = orderIds
        .map((id) => sections.find((section) => section.id === id))
        .filter((section): section is Section => section !== undefined);

      const newSections = sections.filter(
        (section) => !orderIds.includes(section.id)
      );

      setOrderedSections([...ordered, ...newSections]);
    } else {
      setOrderedSections(sections);
    }
  }, [sections]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(orderedSections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOrderedSections(items);
    localStorage.setItem(
      "dashboardSectionsOrder",
      JSON.stringify(items.map((item) => item.id))
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="dashboard-sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-6"
          >
            {orderedSections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="w-full transition-transform duration-200 hover:scale-[1.01]"
                    style={getDraggableStyle(
                      provided.draggableProps.style,
                      snapshot.isDragging
                    )}
                  >
                    <div className={getCardClasses(snapshot.isDragging)}>
                      <div
                        {...provided.dragHandleProps}
                        className="h-6 w-full flex items-center justify-center cursor-move hover:bg-gray-100 rounded-t-2xl border-b border-gray-200"
                      >
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-1 rounded-full bg-gray-400"
                            />
                          ))}
                        </div>
                      </div>
                      <div className={getIndicatorClasses(snapshot.isDragging)} />
                      <div className={getRightIndicatorClasses(snapshot.isDragging)} />
                      {section.component}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
