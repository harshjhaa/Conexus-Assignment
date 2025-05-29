import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { Task } from "../types/types";

interface TaskFormProps {
  visible: boolean;
  initialValues?: Task | null;
  onSubmit: (data: Omit<Task, "id"> | Task) => void;
  onCancel: () => void;
}

const statusOptions = [
  { label: "To Do", value: "To Do" },
  { label: "In Progress", value: "In Progress" },
  { label: "Done", value: "Done" },
];

const priorityOptions = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

const TaskForm: React.FC<TaskFormProps> = ({
  visible,
  initialValues,
  onSubmit,
  onCancel,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          dueDate: initialValues.dueDate
            ? dayjs(initialValues.dueDate)
            : undefined,
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues]);

  const handleOk = async () => {
    try {
      console.log("form ", form.getFieldsValue());

      const values = await form.validateFields();
      console.log("values ", values);
      onSubmit({
        ...(initialValues ? { id: initialValues.id } : {}),
        ...values,
        dueDate: values.dueDate?.format("YYYY-MM-DD"),
      });
      form.resetFields();
    } catch (err) {
      // validation failed, errors will show on form
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Task" : "New Task"}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Enter title" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select options={statusOptions} />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true }]}
        >
          <Select options={priorityOptions} />
        </Form.Item>
        <Form.Item name="dueDate" label="Due Date">
          <DatePicker />
        </Form.Item>
        <Form.Item name="assignee" label="Assignee">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskForm;
