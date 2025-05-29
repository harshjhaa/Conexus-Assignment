# HOW TO RUN

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

---

### Start

1. **Clone the repository:**
2. **Do npm install**
3. **npm start**



# Collaborative Task Manager – Low-Level Design Guide

## Overview

This document outlines the Low-Level Design (LLD) for the **Collaborative Task Manager**. Built using **React**, **TypeScript**, and modern tooling, this application allows users to create, read, update, delete, and drag-and-drop tasks across various status columns.

---

## Tech Stack

| Category            | Technology                    |
|---------------------|-------------------------------|
| Framework           | React (Vite bundler)          |
| Language            | TypeScript                    |
| Routing             | React Router DOM              |
| State Management    | Zustand                       |
| UI Library          | Ant Design                    |
| Forms & Validation  | Antd Form                     |
| Drag & Drop         | React DnD (HTML5 backend)     |
| Styling             | SCSS Modules                  |

---

## 1. Data Model

**File:** `types/types.ts`

- `Task` interface:
  - `id`: string
  - `title`: string
  - `description?`: string
  - `status`: 'To Do' | 'In Progress' | 'Done'
  - `priority`: 'Low' | 'Medium' | 'High'
  - `dueDate?`: ISO string
  - `assignee?`: string

---

## 2. State Management

**File:** `stores/taskStore.ts`

- Zustand store: `useTaskStore`
- Holds `tasks: Task[]`
- Actions:
  - `addTask(task: Omit<Task, 'id'>)`
  - `updateTask(task: Task)`
  - `deleteTask(id: string)`
- Uses `uuid` for generating IDs

---

## 3. Custom Hook

**File:** `hooks/useTask.ts`

- Wraps Zustand selectors/actions:
  - `tasks`
  - `addTask`
  - `updateTask`
  - `deleteTask`

---

## 4. Routing

**File:** `routes/index.tsx`

- Redirect `/` to `/tasks`
- Route `/tasks` renders `<TaskBoard />`

---

## 5. Pages & Components

### a) TaskBoard

**File:** `pages/TaskBoard.tsx`

- Uses `<DndProvider backend={HTML5Backend}>`
- Renders:
  - New Task button (opens modal)
  - Task columns per status
- Handles:
  - Task creation, editing, deletion
  - Status changes via drag & drop or select

### b) TaskColumn

**File:** `components/TaskColumn.tsx`

- Implements drop target:
  - `useDrop` hook
  - Accepts type `'TASK'`
- Renders tasks with matching status

### c) TaskCard

**File:** `components/TaskCard.tsx`

- Implements drag source:
  - `useDrag` hook
  - Draggable task with `type: 'TASK'`
- Shows:
  - Title, priority, assignee, status
  - Buttons: Edit, Delete
  - Status change dropdown

### d) TaskForm

**File:** `components/TaskForm.tsx`

- Uses Ant Design `<Modal>` and `<Form>`
- Fields:
  - Title
  - Description
  - Status
  - Priority
  - Due Date (Day.js)
  - Assignee
- Initializes with `initialValues`
- On submit, formats date as `YYYY-MM-DD`

---

## 6. Styling

- Scoped per component using `.module.scss`
- Global styles in `styles/global.scss`
- `global.d.ts` defines SCSS module types for TS

---

## 7. Drag & Drop Workflow

1. Drag starts from `TaskCard` → emits `{ id }`
2. Drop happens on `TaskColumn` → receives drop
3. `TaskBoard` updates task status in Zustand
4. UI re-renders automatically

---

## Design Principles

- **Modular**: Logical separation of components, pages, hooks, stores
- **Scalable**: Easy to add new statuses, task features
- **Maintainable**: Clear file structure and typed data model
- **User-Friendly**: Drag-and-drop interaction + editable form modal
