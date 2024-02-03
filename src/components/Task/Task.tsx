import { ReactElement, useState } from 'react';
import type { TaskProps } from './Task.d';
import { formatDate } from '../../utils/Date';
import {
  FaBook,
  FaComputerMouse,
  FaPaperPlane,
  FaDumbbell,
  FaAppleWhole,
  FaCouch,
} from 'react-icons/fa6';
import { checkBoxVariants, colorVariants } from './styles';
import { Icons } from '../../types/Icons.d';

function Task({ task, onChange }: TaskProps) {
  const [isChecked, setChecked] = useState(task.isDone);

  const handleCheckboxChange = () => {
    task.isDone = !isChecked;
    setChecked(!isChecked);
    onChange(task);
  };

  const iconVariations: Record<Icons, ReactElement> = {
    study: <FaBook />,
    work: <FaComputerMouse />,
    email: <FaPaperPlane />,
    gym: <FaDumbbell />,
    food: <FaAppleWhole />,
    rest: <FaCouch />,
  };
  return (
    <div className={`Task h-40 w-full flex m-1 ml-20 pl-10 `} key={task.id}>
      <div
        className={`Task__Visualise w-20 rounded-2xl border-2 ${colorVariants[task.color]} flex justify-center items-center`}
      >
        <div className="Task__Icon text-white ">
          {iconVariations[task.icon]}
        </div>
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
        <div className="me-4  ">
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
