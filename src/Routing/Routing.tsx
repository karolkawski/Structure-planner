// Routing.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Structure from '../pages/Structure/Structure';
import Tasks from '../pages/Tasks/Tasks';
import About from '../pages/About/About';
import EditTask from '../pages/Task/EditTask';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Structure />} />
      <Route path="task/:taskId" element={<EditTask />} />

      <Route path="/tasks" element={<Tasks />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Routing;
