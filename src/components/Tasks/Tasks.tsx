// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { data } from '../../assets/data';
import { TaskType } from '../Task/Task.d';
import { formatDate } from '../../utils/Date';
import Icon from '../UI/Icon/Icon';
import AddModal from './Modal/AddModal';
import { colorVariants, piorityVariations } from './styles';

function Tasks({}) {
  const [records, setRecords] = useState<TaskType[]>(data);
  const [openModal, setOpenModal] = useState(false);

  const handleAddTask = (task: TaskType) => {
    console.log('🚀 ~ handleAddTask ~ task:', task);
    task.id = records.length;

    setRecords([...records, task]);
    setOpenModal(false);
  };

  const TableRow = ({ task }: { task: TaskType }) => {
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
      connectedWith,
    } = task;
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="px-6 py-4">{description}</td>
        <td className="px-6 py-4">{formatDate(startTime)}</td>
        <td className="px-6 py-4">{formatDate(endTime)}</td>
        <td className="px-6 py-4">
          {' '}
          <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            {category}
          </span>
        </td>
        <td className="px-6 py-4">
          {tags.length > 0 &&
            tags.map((tag, index) => {
              return (
                <span
                  key={`${task}-${index}`}
                  className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                >
                  {tag}
                </span>
              );
            })}
        </td>
        <td className="px-6 py-4">
          <span className={`${colorVariants[color]}`}>{color}</span>
        </td>
        <td className="px-6 py-4">
          <Icon icon={icon} color={'black'} />
        </td>
        <td className="px-6 py-4">
          {' '}
          <span className={`${piorityVariations[priority]}`}>{priority}</span>
        </td>
        <td className="px-6 py-4">{connectedWith}</td>
        <td className="px-6 py-4 text-right">
          <a
            href={`/task/:${task.id}`}
            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            Edit
          </a>
        </td>
      </tr>
    );
  };
  return (
    <div className="text-center">
      <AddModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleAddTask={handleAddTask}
      />
      <header className="w-full">
        <h1>Tasks</h1>
      </header>
      <div className="container m-auto py-10 ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
              Description
              <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                The Daily Planner table allows users to manage their daily
                activities. Entries include key details such as task name,
                description, start and end times, and priority. Users can add,
                edit, and remove entries as needed. The data is presented in a
                structured daily schedule for easy visualization and effective
                daily planning.
              </p>
              <div className="my-5 flex justify-end">
                <button
                  onClick={() => setOpenModal(true)}
                  type="button"
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add task
                </button>
              </div>
            </caption>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Start time
                </th>
                <th scope="col" className="px-6 py-3">
                  End time
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3">
                  Icon
                </th>
                <th scope="col" className="px-6 py-3">
                  Piority
                </th>
                <th scope="col" className="px-6 py-3">
                  Connected with
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {records.map((task) => {
                return <TableRow task={task} key={task.id} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Tasks;
