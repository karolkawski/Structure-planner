import React from 'react';

const Progress = ({ progress }) => {
  return (
    <div className="m-auto bg-gray-200 rounded-full dark:bg-gray-700 md:w-96">
      <div
        className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: progress }}
      >
        {' '}
        {progress}
      </div>
    </div>
  );
};

export default Progress;
