import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { LayoutWrapperProps } from '../types/Layout.d';

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({
  children,
  paddingTop,
}) => {
  return (
    <AnimatePresence>
      <div
        className={`text-center h-[calc(100vh-69px)] ${paddingTop && 'pt-5'} xs:px-5 `}
      >
        {children}
      </div>
    </AnimatePresence>
  );
};

export default LayoutWrapper;
