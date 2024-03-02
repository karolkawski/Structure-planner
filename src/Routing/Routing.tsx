// Routing.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Structure from '../pages/Structure/Structure';
import Tasks from '../pages/Tasks/Tasks';
import Credentials from '../pages/Credentials/Credentials';
import EditTask from '../pages/Task/EditTask';
import { AnimatePresence } from 'framer-motion';
import Intro from '../pages/Intro/Intro';

const Routing = () => {
  return (
    <AnimatePresence>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/daily" element={<Structure />} />
        <Route path="task/:taskId" element={<EditTask />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/about" element={<Credentials />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Routing;
