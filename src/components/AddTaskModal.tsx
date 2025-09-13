import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { addTask, editTask } from "../redux/taskSlice";
import InputField from "./InputField";
import type { Task } from "../types/types";

interface AddTaskModalProps {
  defaultColumnId: string;
  editTaskId?: string;
  onClose?: () => void;
  // editingTask: Task | null;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ defaultColumnId, editTaskId, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const [data, setData] = useState({ title: "", description: "", priority: "low", dueDate: "" });

  useEffect(() => {
    if (editTaskId) {
      const taskToEdit = tasks.find((t) => t.id === editTaskId);
      if (taskToEdit) {
        setData({
          title: taskToEdit.title,
          description: taskToEdit.description || "",
          priority: taskToEdit.priority || "low",
          dueDate: taskToEdit.dueDate || "",
        });
      }
    }
  }, [editTaskId, tasks]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!data.title.trim()) return;

    if (editTaskId) {
      dispatch(
        editTask({
          id: editTaskId,
          ...data,
          columnId: tasks.find((t) => t.id === editTaskId)?.columnId || defaultColumnId,
        } as Task)
      );
    } else {
      dispatch(
        addTask({
          id: Date.now().toString(),
          ...data,
          columnId: defaultColumnId,
        } as Task)
      );
    }

    setData({ title: "", description: "", priority: "low", dueDate: "" });
    onClose?.();
  };

  return (
    <div className="w-full md:w-96 p-6 bg-gradient-to-br from-white via-blue-50 to-white dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 rounded-3xl shadow-md flex flex-col gap-5 flex-shrink-0 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center mb-3 gap-2 justify-center">
        <PlusCircle className="h-6 w-6 text-pink-500 dark:text-pink-400" />
        <h2 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 tracking-wide">
          {editTaskId ? "Edit Task" : "Add New Task"}
        </h2>
      </div>

      <InputField label="Title" name="title" value={data.title} placeholder="Task Title" onChange={handleChange} required />
      <InputField label="Description" name="description" as="textarea" value={data.description} placeholder="Task Description" onChange={handleChange} required />
      <InputField
        label="Priority"
        name="priority"
        as="select"
        value={data.priority}
        onChange={handleChange}
        options={[
          { value: "low", label: "Low" },
          { value: "medium", label: "Medium" },
          { value: "high", label: "High" },
        ]}
        required
      />
      <InputField label="Due Date" name="dueDate" type="date" value={data.dueDate} onChange={handleChange} required />

      <button
        onClick={handleSubmit}
        className="bg-gradient-to-r from-blue-500 to-teal-400 text-white px-5 py-2 rounded-2xl font-semibold hover:from-blue-600 hover:to-teal-500 transition shadow-md hover:shadow-lg"
      >
        {editTaskId ? "Edit Task" : "Add Task"}
      </button>
    </div>
  );
};

export default AddTaskModal;
