import React, { useState } from 'react';
import type { TaskProps } from '../../types/Task.d';
import { formatDate } from '../../utils/Date';
import { checkBoxVariants, colorVariants } from './stylesVariations';
import Icon from '../UI/Icon/Icon';
import { isMobile } from '../../utils/MobileDetect';
import TaskWrapper from '../../Animate/TaskWrapper';

const Task = ({ task, onChange }: TaskProps) => {
  const [MobileDevice] = useState(isMobile());
  const [isChecked, setChecked] = useState(task.isDone);
  const { id, name, icon, color, startTime, endTime, description, isDone } =
    task;

  const handleCheckboxChange = () => {
    task.isDone = !isChecked;
    setChecked(!isChecked);
    onChange(task);
  };

  return (
    <TaskWrapper isDone={isDone}>
      <div
        className={`Task h-15 p-2 w-11/12 left-8 flex ml-20 cursor-pointer hover:brightness-125
      `}
        key={id}
        onClick={() => handleCheckboxChange()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCheckboxChange();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div
          className={`Task__Visualise max-w-12 md:max-w-20 w-20 rounded-2xl border-2 ${colorVariants[color]} flex justify-center items-center`}
        >
          <Icon icon={icon} color={'white'} />
        </div>
        <div className="Task__Details max-w-44 md:max-w-full flex flex-col justify-center items-start grow px-2 leading-5">
          <div className="Task__Time text-slate-400 text-sm	">
            {formatDate(startTime)} {formatDate(endTime)}
          </div>
          <div className="Task__Name font-bold text-sm">{name}</div>
          {!isDone ? (
            <div className="Task__Description text-left text-sm">
              {description.length > (MobileDevice ? 20 : 300)
                ? description.substring(0, 40 - 3) + '...'
                : description}
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="Task__Confirmation flex items-center">
          <div className="me-4">
            <input
              id={`${color}-checkbox`}
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              value=""
              className={`w-6 cursor-pointer h-6 ${checkBoxVariants[color]} rounded dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
            />
          </div>
        </div>
      </div>
    </TaskWrapper>
  );
};

export default Task;
