import { useTaskStore } from "../stores/taskStore";

export const useTasks = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  return { tasks, addTask, updateTask, deleteTask };
};
