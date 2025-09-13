import { useDroppable } from "@dnd-kit/core";
import React from "react";
import TaskCard from "./TaskCard";
import type { Task } from "../types/types";

interface ColumnProps {
  id: string;
  title: string;
  taskIds: string[];
  tasks: Task[];
  onDeleteTask?: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({ id, title, taskIds, tasks, onDeleteTask }) => {
  const { setNodeRef, over } = useDroppable({ id });

  const getHeaderGradient = (title: string) => {
    switch (title) {
      case "To Do":
        return "bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-800 dark:to-blue-900 text-gray-800 dark:text-white";
      case "In Progress":
        return "bg-gradient-to-r from-yellow-100 to-yellow-50 dark:from-yellow-800 dark:to-yellow-900 text-gray-800 dark:text-white";
      case "Done":
        return "bg-gradient-to-r from-green-300 to-green-200 dark:from-green-800 dark:to-green-900 text-gray-800 dark:text-white";
      default:
        return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-full md:w-80 rounded-2xl shadow-lg p-4 min-h-[500px] bg-gray-50 dark:bg-gray-800 ${
        over ? "bg-blue-50 dark:bg-blue-900" : ""
      }`}
    >
      <div
        className={`h-12 rounded-xl mb-4 flex items-center justify-center font-bold shadow-md ${getHeaderGradient(
          title
        )}`}
      >
        {title}
      </div>

      <div className="flex flex-col gap-3">
        {taskIds.map((taskId) => {
          const task = tasks.find((t) => t.id === taskId);
          if (!task) return null;
          return <TaskCard key={task.id} {...task} onDelete={() => onDeleteTask?.(task.id)} />;
        })}
      </div>
    </div>
  );
};

export default Column;
 