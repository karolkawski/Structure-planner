import React from 'react';
import { motion } from 'framer-motion';
import { MotionWrapperProps } from '../types/Animation.d';

const MotionWrapper: React.FC<MotionWrapperProps> = ({
  children,
  primary = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        backgroundColor: primary ? '#19364C' : '#FFFFFF',
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;
