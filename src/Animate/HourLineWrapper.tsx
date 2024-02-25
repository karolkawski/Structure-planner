import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

type HourLineWrapperProps = {
  children: ReactNode;
  timePosition: string;
};

const HourLineWrapper: React.FC<HourLineWrapperProps> = ({
  children,
  timePosition,
}) => {
  return (
    <motion.div
      style={{
        width: '65px',
        left: '0',
        position: 'absolute',
        opacity: 0,
      }}
      initial={{
        top: 0,
        opacity: 0,
      }}
      animate={{
        top: timePosition,
        opacity: 1,
      }}
      transition={{ duration: 0.1 }}
      exit={{
        top: timePosition,
      }}
      key={'line'}
    >
      {children}
    </motion.div>
  );
};

export default HourLineWrapper;
