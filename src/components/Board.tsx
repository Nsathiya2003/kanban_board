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

  // Filters & Sorting
  const [filter, setFilter] = useState("all"); // which tasks to show
  const [search, setSearch] = useState(""); // search by title
  const [selectedDate, setSelectedDate] = useState(""); // filter by due date
  const [sortBy, setSortBy] = useState("none"); // how tasks are ordered

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
        {/* Header */}
        <Header
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Columns */}
        <div className="flex flex-col md:flex-row gap-6 mt-6">
          <div className="flex flex-1 gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700">
            {columnOrder.map((colId) => {
              const column = columns[colId];

              // Step 1: Filter tasks
              let filteredTasks = tasks.filter((t) => t.columnId === colId);

              if (filter === "high") {
                filteredTasks = filteredTasks.filter((t) => t.priority === "high");
              } else if (filter === "duedate") {
                filteredTasks = filteredTasks.filter((t) => t.dueDate === selectedDate);
              }

              filteredTasks = filteredTasks.filter((t) =>
                t.title.toLowerCase().includes(search.toLowerCase())
              );

              // Step 2: Sort tasks
              let sortedTasks = [...filteredTasks];
              if (sortBy === "priority") {
                const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 };
                sortedTasks.sort(
                  (a, b) => (priorityOrder[a.priority] ?? 999) - (priorityOrder[b.priority] ?? 999)
                );
              } else if (sortBy === "duedate") {
                sortedTasks.sort(
                  (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                );
              }

              const taskIds = sortedTasks.map((t) => t.id);

              return (
                <Column
                  key={column.id}
                  id={column.id}
                  title={column.title}
                  tasks={sortedTasks}
                  taskIds={taskIds}
                  onDeleteTask={handleDelete}
                />
              );
            })}
          </div>

          {/* Add Task Modal */}
          <AddTaskModal defaultColumnId="column-1" />
        </div>
      </div>
    </DndContext>
  );
};

export default Board;
