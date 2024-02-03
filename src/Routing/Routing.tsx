// Routing.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Structure from '../components/Structure/Structure';
import Tasks from '../components/Tasks/Tasks';
import About from '../components/About/About';

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Structure />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
};

export default Routing;
