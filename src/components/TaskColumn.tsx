import React from "react";
import { useDrop } from "react-dnd";
import { Task } from "../types/types";
import TaskCard from "./TaskCard";
import styles from "./TaskColumn.module.scss";

interface TaskColumnProps {
  status: Task["status"];
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [, dropRef] = useDrop(() => ({
    accept: "TASK",
    drop: (item: { id: string }) => {
      onStatusChange(item.id, status);
    },
  }));

  return (
    <div ref={dropRef} className={styles.column}>
      <h3>{status}</h3>
      {tasks
        .filter((t) => t.status === status)
        .map((t) => (
          <TaskCard
            key={t.id}
            task={t}
            onEdit={onEdit}
            onDelete={onDelete}
            onStatusChange={onStatusChange}
          />
        ))}
    </div>
  );
};

export default TaskColumn;
