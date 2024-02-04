import { useState } from 'react';
import type { TaskProps } from './Task.d';
import { formatDate } from '../../utils/Date';
import { checkBoxVariants, colorVariants } from './styles';
import Icon from '../UI/Icon/Icon';

function Task({ task, onChange }: TaskProps) {
  const [isChecked, setChecked] = useState(task.isDone);

  const handleCheckboxChange = () => {
    task.isDone = !isChecked;
    setChecked(!isChecked);
    onChange(task);
  };

  const heightVariations: Record<string, string> = {
    true: 'h-15 p-2 opacity-75 ',
    false: 'h-40 p-2 ',
  };
  return (
    <div
      className={`Task ${heightVariations[task.isDone.toString()]} w-11/12 left-8 flex ml-20 cursor-pointer hover:bg-gray-50 absolute
      `}
      key={task.id}
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
        className={`Task__Visualise w-20 rounded-2xl border-2 ${colorVariants[task.color]} flex justify-center items-center`}
      >
        <Icon icon={task.icon} color={'white'} />
      </div>
      <div className="Task__Details flex flex-col justify-center items-start grow pl-2 leading-5">
        <div className="Task__Time text-slate-400	">
          {formatDate(task.startTime)} {formatDate(task.endTime)}
        </div>
        <div className="Task__Name font-bold">{task.name}</div>
        {!task.isDone ? (
          <div className="Task__Description">{task.description}</div>
        ) : (
          <></>
        )}
      </div>
      <div className="Task__Confirmation flex items-center">
        <div className="me-4">
          <input
            id={`${task.color}-checkbox`}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
            value=""
            className={`w-6 cursor-pointer h-6 ${checkBoxVariants[task.color]} roundeddark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
          />
        </div>
      </div>
    </div>
  );
}

export default Task;
