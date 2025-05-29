import { v4 as uuidv4 } from "uuid";
import { create } from "zustand";
import { Task } from "../types/types";

interface TaskState {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [
    {
      id: uuidv4(),
      title: "Sample Task",
      description: "This is a sample",
      status: "To Do",
      priority: "Medium",
      dueDate: undefined,
      assignee: "Harsh Jha",
    },
  ],
  addTask: (task) =>
    set((state) => ({ tasks: [...state.tasks, { id: uuidv4(), ...task }] })),
  updateTask: (updated) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
    })),
  deleteTask: (id) =>
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
}));
