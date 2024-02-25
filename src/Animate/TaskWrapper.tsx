import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type TaskWrapperProps = {
  children: ReactNode;
  isDone: boolean;
};

const TaskWrapper: React.FC<TaskWrapperProps> = ({ children, isDone }) => {
  return (
    <motion.div
      style={{ margin: '5px 0px', display: 'flex', width: '100%' }}
      initial={{
        height: isDone ? 100 : 50,
      }}
      animate={{
        height: isDone ? 50 : 100,
      }}
      transition={{ duration: 0.5 }}
      exit={{ height: isDone ? 50 : 100 }}
      key={'container'}
    >
      {children}
    </motion.div>
  );
};

export default TaskWrapper;
