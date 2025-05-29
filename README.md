Collaborative Task Manager

Overview

This document outlines the Low-Level Design (LLD) of the Collaborative Task Manager built with React, TypeScript, Zustand, React Router DOM, Ant Design, SCSS, and React DnD (HTML5 backend). The app allows users to create, read, update, delete, and drag‑and‑drop tasks across status columns.

Tech Stack

Framework: React (with Vite bundler)

Language: TypeScript

Routing: React Router DOM

State Management: Zustand

UI Library: Ant Design

Forms & Validation: Antd Form (built‑in validation)

Drag & Drop: React DnD & HTML5 Backend

Styling: SCSS modules

Folder Structure

src/
├─ components/        # Presentational and drag/drop-enabled UI
│  ├─ TaskCard.tsx
│  ├─ TaskCard.module.scss
│  ├─ TaskColumn.tsx
│  ├─ TaskColumn.module.scss
│  ├─ TaskForm.tsx
│  └─ index.module.scss
│
├─ hooks/
│  └─ useTask.ts      # Encapsulates Zustand selectors and actions
│
├─ pages/
│  ├─ TaskBoard.tsx
│  └─ TaskBoard.module.scss
│
├─ routes/
│  └─ index.tsx       # Route definitions
│
├─ stores/
│  └─ taskStore.ts    # Zustand store with CRUD actions
│
├─ types/
│  └─ types.ts        # Task interface
│
├─ styles/
│  └─ global.scss     # Global resets and base styles
│
├─ App.tsx            # Root component
├─ index.tsx          # App entry point
└─ global.d.ts         # SCSS module type declarations

Low-Level Design

1. Data Model (types/types.ts)

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: string;      // ISO date string
  assignee?: string;
}

2. State Management (stores/taskStore.ts)

Store: useTaskStore holds tasks: Task[] and exposes:

addTask(task: Omit<Task,'id'>)

updateTask(task: Task)

deleteTask(id: string)

Uses uuid to generate unique IDs

3. Custom Hook (hooks/useTask.ts)

Wraps the store selectors and actions:

export const useTasks = () => ({
  tasks: useTaskStore(state => state.tasks),
  addTask: useTaskStore(state => state.addTask),
  updateTask: useTaskStore(state => state.updateTask),
  deleteTask: useTaskStore(state => state.deleteTask),
});

4. Routing (routes/index.tsx)

Redirect / → /tasks

Main route /tasks renders <TaskBoard />

5. Pages and Components

a) TaskBoard.tsx

Wraps content in <DndProvider backend={HTML5Backend}>

Renders New Task button to open <TaskForm />

Maps over statuses to render <TaskColumn> for each

Handles onSubmit, onEdit, onDelete, onStatusChange

b) TaskColumn.tsx

Implements React DnD drop target:

useDrop({ accept: 'TASK', drop: item => onStatusChange(item.id, status) })

Renders its column heading + filtered <TaskCard>s

c) TaskCard.tsx

Implements React DnD drag source:

useDrag({ type: 'TASK', item: { id: task.id } })

Displays task details and antd <Select> to change status manually

Edit & Delete buttons trigger parent callbacks

d) TaskForm.tsx

Antd <Modal> with controlled open={visible}

<Form> with fields: title, description, status, priority, dueDate (Day.js), assignee

Initializes form with initialValues on open

On submit, calls onSubmit({ id?, ...values, dueDate: values.dueDate?.format('YYYY-MM-DD') })

6. Styling

SCSS modules isolate styles per component/page

global.scss for resets and base typography

global.d.ts declares SCSS module types for TypeScript

7. Drag & Drop Workflow

Users drag a TaskCard (drag source emits { id }).

Users drop onto a TaskColumn (drop target calls onStatusChange).

TaskBoard updates the task’s status in the store, triggering re-render.

This LLD ensures a modular, scalable structure: presentational components live under components, page‑level layout under pages, business logic in stores/hooks, and routing at the root. Drag‑and‑drop is cleanly encapsulated within the Card & Column components.
