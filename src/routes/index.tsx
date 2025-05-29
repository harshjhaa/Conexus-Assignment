import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import TaskBoard from "src/pages/TaskBoard";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/tasks" replace />} />
    <Route path="/tasks" element={<TaskBoard />} />
  </Routes>
);

export default AppRoutes;
