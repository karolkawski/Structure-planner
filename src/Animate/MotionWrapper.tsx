import React from 'react';
import { motion } from 'framer-motion';
import { MotionWrapperProps } from '../types/Animation.d';

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
