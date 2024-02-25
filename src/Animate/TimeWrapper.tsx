import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { TaskType } from '../types/Task.d';

type TimeWrapperProps = {
  children: ReactNode;
  task: TaskType;
  multiplerHeight: number;
  updateTimer: () => void;
};

const TimeWrapper: React.FC<TimeWrapperProps> = ({
  children,
  task,
  multiplerHeight,
  updateTimer,
}) => {
  return (
    <motion.div
      style={{
        margin: '5px 0px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
      }}
      initial={{
        height: task.isDone ? 100 * multiplerHeight : 50,
      }}
      animate={{
        height: task.isDone ? 50 : 100 * multiplerHeight,
      }}
      transition={{ duration: 0.5 }}
      exit={{
        height: task.isDone ? 50 : 100 * multiplerHeight,
      }}
      onAnimationComplete={updateTimer}
      key={'container'}
    >
      {children}
    </motion.div>
  );
};

export default TimeWrapper;
