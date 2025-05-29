import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TaskForm from "../components/TaskForm";
import TaskColumn from "../components/TaskColumn";
import styles from "./TaskBoard.module.scss";
import { useTasks } from "../hooks/useTask";

const statuses = ["To Do", "In Progress", "Done"] as const;
type StatusType = (typeof statuses)[number];

const TaskBoard: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask } = useTasks();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<null | any>(null);

  const handleSubmit = (data: any) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...data });
    } else {
      addTask(data);
    }
    setModalVisible(false);
    setEditingTask(null);
  };

  const updateTaskStatus = (id: string, status: StatusType) => {
    const task = tasks.find((t) => t.id === id);
    if (task) updateTask({ ...task, status });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.board}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setModalVisible(true)}
        >
          New Task
        </Button>
        <div className={styles.columns}>
          {statuses.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks}
              onEdit={(t) => {
                setEditingTask(t);
                setModalVisible(true);
              }}
              onDelete={deleteTask}
              onStatusChange={updateTaskStatus}
            />
          ))}
        </div>
        <TaskForm
          visible={modalVisible}
          initialValues={editingTask}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalVisible(false);
            setEditingTask(null);
          }}
        />
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
