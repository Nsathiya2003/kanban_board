export interface Task {
  dueDate: string;
  description: string;
  priority: string;
  id: string;
  title: string;
  columnId: string
}
export interface TaskAttributes {
  id: string;
  title: string;
  description: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  columnId: string;
}
export interface AddTaskModalProps {
  onAddTask?: (task: {
    title: string;
    description: string;
    priority: string;
    dueDate: string;
  }) => void;
}
export interface Column {
  id: string;
  title: string,
  taskIds: string[]
}
export interface BoardData {
  tasks: Record<string, Task>,
  columns: Record<string, Column>,
  columnOrder: string[]
}

export interface ColumnProps {
  id: string;
  title: string;
  taskIds: string[];
  tasks: Record<string, Task>;
  onEditTask: any
}
export interface TaskProps {
  id: string,
  title: string,
  description: string,
  priority: string,
  dueDate: string
}
