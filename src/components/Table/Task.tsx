import { Link } from 'react-router-dom';
import { TaskType } from '../../types/Task.d';
import { formatDate } from '../../utils/Date';
import { colorVariants, priorityVariations } from './stylesVariations';
import Icon from '../UI/Icon/Icon';
import React, { useState } from 'react';
import { isMobile } from '../../utils/MobileDetect';

const Task = ({ task }: { task: TaskType }) => {
  const [MobileDevice] = useState(isMobile());
  const {
    name,
    description,
    startTime,
    endTime,
    category,
    tags,
    color,
    icon,
    priority,
  } = task;
  return (
    <tr className="border-b flex-col items-start border">
      <td className="p-3 font-medium text-gray-50 whitespace-nowrap ">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Name
        </div>
        {name}
      </td>
      <td className="p-3 lg:hidden xl:table-cell">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Desctiption
        </div>
        {description.length > (MobileDevice ? 20 : 300)
          ? description.substring(0, 300 - 3) + '...'
          : description}
      </td>
      <td className="p-3">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Start time
        </div>
        {formatDate(startTime)}
      </td>
      <td className="p-3">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          End time
        </div>
        {formatDate(endTime)}
      </td>
      <td className="p-3">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Category
        </div>
        <span className="bg-secondary text-white text-center text-xs font-medium me-2 px-2.5 py-0.5 rounded">
          {category}
        </span>
      </td>
      <td className="p-3 lg:hidden xl:table-cell">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Tag
        </div>
        <div>
          {tags.length > 0 &&
            tags.map((tag, index) => {
              return (
                <span
                  key={`${task}-${index}`}
                  className="bg-blue-100 text-blue-800 text-xs text-center font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag}
                </span>
              );
            })}
        </div>
      </td>
      <td className="p-3">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Color
        </div>
        <span className={`text-center ${colorVariants[color]}`}>{color}</span>
      </td>
      <td className="p-3">
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Icon
        </div>
        <Icon icon={icon} color={'white'} />
      </td>
      <td className="p-3">
        {' '}
        <div className="sm:block lg:hidden xl:hidden font-bold text-white">
          Piriority
        </div>
        <span className={`text-center ${priorityVariations[priority]}`}>
          {priority}
        </span>
      </td>
      <td className="p-3 flex justify-end px-5">
        <Link
          to={`/task/:${task.id}`}
          className="font-medium px-3 py-2 text-sm text-center text-white bg-secondary rounded-lg hover:bg-white hover:text-black"
        >
          Edit
        </Link>
      </td>
    </tr>
  );
};

export default Task;
