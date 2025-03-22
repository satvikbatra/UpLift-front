import { ReactNode, useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface Section {
  id: string;
  component: ReactNode;
}

interface DashboardSectionsProps {
  sections: Section[];
}

export const DashboardSections = ({ sections }: DashboardSectionsProps) => {
  const [orderedSections, setOrderedSections] = useState<Section[]>([]);

  useEffect(() => {
    const savedOrder = localStorage.getItem("dashboardSectionsOrder");
    if (savedOrder) {
      const orderIds = JSON.parse(savedOrder);
      const orderedSections = orderIds
        .map((id: string) => sections.find((section) => section.id === id))
        .filter(Boolean);

      const newSections = sections.filter(
        (section) => !orderIds.includes(section.id)
      );

      setOrderedSections([...orderedSections, ...newSections]);
    } else {
      setOrderedSections(sections);
    }
  }, [sections]);

  const handleDragEnd = (result: any) => {
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
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="w-full transition-transform duration-200 hover:scale-[1.01]"
                    style={{
                      ...provided.draggableProps.style,
                      transform: snapshot.isDragging
                        ? `${provided.draggableProps.style?.transform} scale(1.02)`
                        : provided.draggableProps.style?.transform,
                    }}
                  >
                    <div
                      className={`card transition-all duration-200 relative group ${
                        snapshot.isDragging
                          ? "shadow-xl bg-gray-50"
                          : "hover:shadow-lg"
                      }`}
                    >
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
                      <div
                        className={`absolute -left-3 top-1/2 -translate-y-1/2 w-2 h-12 bg-gray-300 rounded-full transition-opacity duration-200 ${
                          snapshot.isDragging
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
                      <div
                        className={`absolute -right-3 top-1/2 -translate-y-1/2 w-2 h-12 bg-gray-300 rounded-full transition-opacity duration-200 ${
                          snapshot.isDragging
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      />
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
