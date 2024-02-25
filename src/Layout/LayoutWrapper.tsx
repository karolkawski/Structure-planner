import { AnimatePresence } from 'framer-motion';
import React, { ReactNode } from 'react';

type LayoutWrapperProps = {
  children: ReactNode;
};

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children }) => {
  return (
    <AnimatePresence>
      <div className="text-center px-5">{children}</div>
    </AnimatePresence>
  );
};

export default LayoutWrapper;
