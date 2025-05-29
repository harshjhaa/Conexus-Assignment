import React from "react";
import { Card, Button, Select } from "antd";
import { useDrag } from "react-dnd";
import styles from "./TaskCard.module.scss";
import { Task } from "src/types/types";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task["status"]) => void;
}

const statusOptionsShort = ["To Do", "In Progress", "Done"] as const;

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const [, dragRef] = useDrag(() => ({
    type: "TASK",
    item: { id: task.id },
  }));

  return (
    <Card
      ref={dragRef}
      className={styles.card}
      size="small"
      title={task.title}
      extra={
        <Button onClick={() => onDelete(task.id)} type="text">
          Delete
        </Button>
      }
    >
      <p>{task.description}</p>
      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
      <p>
        <strong>Due:</strong> {task.dueDate}
      </p>
      <p>
        <strong>Assignee:</strong> {task.assignee}
      </p>
      <Select
        value={task.status}
        onChange={(value) => onStatusChange(task.id, value)}
        options={statusOptionsShort.map((s) => ({ label: s, value: s }))}
        size="small"
      />
      <Button onClick={() => onEdit(task)} type="link">
        Edit
      </Button>
    </Card>
  );
};

export default TaskCard;
