import React, { useEffect, useState } from "react";
import { DndContext, closestCorners, type DragEndEvent } from "@dnd-kit/core";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store";
import { moveTask, deleteTask, loadTasks } from "../redux/taskSlice";
import Column from "./Column";
import Header from "./Header";
import AddTaskModal from "./AddTaskModal";
import type { Task } from "../types/types";

const Board: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  type ColumnKeys = "column-1" | "column-2" | "column-3";
  const columns: Record<ColumnKeys, { id: string; title: string }> = {
    "column-1": { id: "column-1", title: "To Do" },
    "column-2": { id: "column-2", title: "In Progress" },
    "column-3": { id: "column-3", title: "Done" },
  };
  const columnOrder: ColumnKeys[] = ["column-1", "column-2", "column-3"];

  // Load tasks from localStorage
  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      try {
        const parsed: Task[] = JSON.parse(storedTasks);
        dispatch(loadTasks(parsed));
      } catch (err) {
        console.error(err);
      }
    }
  }, [dispatch]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    dispatch(moveTask({ id: String(active.id), columnId: String(over.id) }));
  };

  const handleDelete = (taskId: string) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="min-h-screen p-6 bg-blue-50 dark:bg-gray-900">
        <Header
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex flex-1 gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {columnOrder.map((colId) => {
              const column = columns[colId];
              const columnTasks = tasks
                .filter((t) => t.columnId === colId)
                .filter((t) =>
                  filter === "high" ? t.priority === "high" :
                    filter === "duedate" ? t.dueDate === selectedDate : true
                )
                .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

              const taskIds = columnTasks.map((t) => t.id);

              return (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={columnTasks}
                  taskIds={taskIds}
                  onDeleteTask={handleDelete}
                />
              );
            })}
          </div>
          <AddTaskModal defaultColumnId="column-1" />
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
