import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { LayoutWrapperProps } from '../types/Layout.d';

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <AnimatePresence>
      <div className="text-center px-5 container mx-auto">{children}</div>
    </AnimatePresence>
  );
};

export default LayoutWrapper;
