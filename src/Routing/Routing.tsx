// Routing.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Structure from '../components/Structure/Structure';
import Tasks from '../components/Tasks/Tasks';
import About from '../components/About/About';
import EditTask from '../components/Task/EditTask';

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
