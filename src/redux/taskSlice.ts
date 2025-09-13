import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../types/types";

interface TaskState {
  tasks: Task[];
}

// Load initial tasks from localStorage
const getInitialTasks = (): Task[] => {
  try {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const initialState: TaskState = { tasks: getInitialTasks() };

const save = (value: Task[]) => {
  try {
    localStorage.setItem("tasks", JSON.stringify(value));
  } catch {}
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      save(state.tasks);
    },
    editTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) state.tasks[index] = action.payload;
      save(state.tasks);
    },
    loadTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    moveTask: (state, action: PayloadAction<{ id: string; columnId: string }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.columnId = action.payload.columnId;
      save(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      save(state.tasks);
    },
  },
});

export const { addTask, editTask, loadTasks, moveTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
