import React, { useEffect, useState } from 'react';
import { TaskType } from '../../types/Task.d';
import AddModal from '../../components/Modal/AddModal';
import './styles.css';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../../store/actions/dataActions';
import { State } from '../../store/State.d';
import Task from '../../components/Table/Task';
import MotionWrapper from '../../Animate/MotionWrapper';
import { Button } from 'flowbite-react';
import LayoutWrapper from '../../Layout/LayoutWrapper';
import Header from '../../components/UI/Header/Header';
import { ButtonTheme } from '../../Themes/ButtonTheme';
import { Loading } from '../../components/UI/Loading/Loading';

const Tasks = ({}) => {
  const dispatch = useDispatch();
  const reduxData = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const [records, setRecords] = useState<TaskType[]>(reduxData);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setRecords(reduxData);
  }, [reduxData]);

  if (loading) {
    return (
      <LayoutWrapper>
        <Header title="Tasks" />
        <Loading />
      </LayoutWrapper>
    );
  }

  const handleAddTask = (task: TaskType) => {
    dispatch(addData(task));

    setOpenModal(false);
  };

  const TableHeader = () => {
    return (
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 hidden lg:table-header-group xl:table-header-group">
        <tr>
          <th scope="col" className="p-3 font-bold">
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
    );
  };

  return (
    <MotionWrapper>
      <LayoutWrapper>
        <AddModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleAddTask={handleAddTask}
        />
        <Header title="Tasks" />
        <div className="container m-auto py-5">
          <div className="relative overflow-x-auto">
            <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-50 overflow-x-scroll">
              <caption className="text-xl font-semibold text-left rtl:text-right text-gray-50">
                Description
                <p className="mt-1 text-base font-normal text-gray-50 ">
                  The Daily Planner table allows users to manage their daily
                  activities. Entries include key details such as task name,
                  description, start and end times, and priority. Users can add,
                  edit, and remove entries as needed. The data is presented in a
                  structured daily schedule for easy visualization and effective
                  daily planning.
                </p>
                <div className="my-5 flex justify-end">
                  <Button
                    onClick={() => setOpenModal(true)}
                    type="button"
                    theme={ButtonTheme}
                    color="alternativeSecondary"
                    className="px-3"
                  >
                    Add task
                  </Button>
                </div>
              </caption>
              <TableHeader />
              <tbody className="flex-col justify-center flex-wrap">
                {records.length ? (
                  records.map((task) => {
                    return <Task task={task} key={task.id} />;
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={10}
                      className="text-center bg-gray-50 text-black h-20 hidden lg:table-cell"
                    >
                      no data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </LayoutWrapper>
    </MotionWrapper>
  );
};

export default Tasks;
