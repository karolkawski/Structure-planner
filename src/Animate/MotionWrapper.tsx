import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type MotionWrapperProps = {
  children: ReactNode;
};

const MotionWrapper: React.FC<MotionWrapperProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
