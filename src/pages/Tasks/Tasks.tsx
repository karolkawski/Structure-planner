import React, { useEffect, useState } from 'react';
import { TaskType } from '../../types/Task.d';
import AddModal from '../../components/Modal/AddModal';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../store/actions/dataActions';
import { State } from '../../store/State.d';
import Task from '../../components/Table/Task';
import MotionWrapper from '../../Layout/MotionWrapper';

function Tasks({}) {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const [records, setRecords] = useState<TaskType[]>(reduxData);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setRecords(reduxData);
  }, [reduxData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleAddTask = (task: TaskType) => {
    task.id = records[length].id + 1;
    dispatch(addData(task));

    setOpenModal(false);
  };

  return (
    <MotionWrapper>
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
            <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-scroll">
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
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden lg:table-header-group xl:table-header-group">
                <tr>
                  <th scope="col" className="p-3">
                    Name
                  </th>
                  <th scope="col" className="p-3 lg:hidden xl:table-cell">
                    Description
                  </th>
                  <th scope="col" className="p-3">
                    Start time
                  </th>
                  <th scope="col" className="p-3">
                    End time
                  </th>
                  <th scope="col" className="p-3">
                    Category
                  </th>
                  <th scope="col" className="p-3 lg:hidden xl:table-cell">
                    Tags
                  </th>
                  <th scope="col" className="p-3">
                    Color
                  </th>
                  <th scope="col" className="p-3">
                    Icon
                  </th>
                  <th scope="col" className="p-3">
                    priority
                  </th>
                  <th scope="col" className="p-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="flex-col justify-center flex-wrap">
                {records.map((task) => {
                  return <Task task={task} key={task.id} />;
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
}

export default Tasks;
