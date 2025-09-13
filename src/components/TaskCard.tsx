import { useDraggable } from "@dnd-kit/core";
import React from "react";
import { Trash2 } from "lucide-react";
import type { Task } from "../types/types";

interface TaskCardProps extends Task {
  onDelete?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ id, title, description, priority, dueDate, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    opacity: isDragging ? 0.5 : 1,
    transition: isDragging ? "none" : "transform 200ms ease",
    pointerEvents: "auto" as const,
  };

  const priorityMap = {
    low: "bg-green-200 text-green-800",
    medium: "bg-yellow-200 text-yellow-800",
    high: "bg-red-200 text-red-800",
  } as const;

  const priorityColor = priorityMap[priority as keyof typeof priorityMap] || "bg-green-200 text-green-800";

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div className="relative bg-white dark:bg-gray-700 p-4 rounded-2xl shadow-md hover:shadow-lg cursor-grab transition-transform transform hover:-translate-y-1 border border-gray-200 dark:border-gray-600">
        <div className="absolute top-2 right-2 flex gap-2">
          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to delete this task?")) onDelete?.();
            }}
            onPointerDown={(e) => e.stopPropagation()}
            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>

        <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-lg">{title}</h3>
        {description && <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{description}</p>}

        <div className="flex justify-between items-center mt-3">
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${priorityColor}`}>
            {priority?.toUpperCase()}
          </span>
          {dueDate && <span className="text-xs text-gray-500 dark:text-gray-300">Due: {new Date(dueDate).toLocaleDateString()}</span>}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
