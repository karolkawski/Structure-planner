import React, { FC, useEffect, useState } from 'react';
import Task from '../../components/Task/Task';
import { TaskType } from '../../types/Task.d';
import { formatDate, getDateComponentsFromEpoch } from '../../utils/Date';
import { colorVariants } from './stylesVariations';
import { Color } from '../../types/Colors.d';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../../store/actions/dataActions';
import { State } from '../../store/reducers/dataReducer';
import MotionWrapper from '../../Layout/MotionWrapper';
import Progress from '../../components/UI/Progress/Progress';

const generateAllHoursInDay = (from = 0, to = 24) => {
  const hours = [];

  for (let hour = from; hour < to; hour++) {
    const formattedHour: string = hour.toString().padStart(2, '0');
    hours.push(`${formattedHour}:00`);
  }

  return hours;
};

const getProcessedDates = (
  prevTask: TaskType | undefined,
  task: TaskType,
  nextTask: TaskType | undefined
) => {
  const pEnd = prevTask
    ? getDateComponentsFromEpoch(prevTask.endTime * 1000)
    : { hour: 0 };

  const start = getDateComponentsFromEpoch(task.startTime * 1000);
  const nStart = nextTask
    ? getDateComponentsFromEpoch(nextTask.startTime * 1000)
    : { hour: 24 };
  const end = getDateComponentsFromEpoch(task.endTime * 1000);
  const hoursBefore = generateAllHoursInDay(pEnd.hour, start.hour);
  const hoursAfter = generateAllHoursInDay(end.hour, nStart.hour);
  return { hoursBefore, hoursAfter };
};

const Structure: FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: { data: State }) => state.data.data);
  const loading = useSelector((state: { data: State }) => state.data.loading);
  const [progress, setProgress] = useState<string>('0%');

  useEffect(() => {
    const totalTasks = data.length;
    const doneTasks = data.filter((task: TaskType) => task.isDone).length;
    const percentageDone = ((doneTasks / totalTasks) * 100).toFixed(2) + '%';
    setProgress(percentageDone);
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No records available.</div>;
  }

  const handleChangedDone = (task: TaskType) => {
    dispatch(updateData(task));
  };

  return (
    <MotionWrapper>
      <div className="text-center">
        <header className="w-full px-10">
          <h1 className="text-4xl font-bold my-2">Structure Daily</h1>
          <Progress progress={progress} />
        </header>
        <div className="container m-auto py-1 ">
          <div className="Calendar my-5">
            {data.map((task: TaskType, index: number) => {
              const prevTask = data[index - 1] as TaskType | undefined;
              const nextTask = data[index + 1] as TaskType | undefined;

              const { hoursBefore, hoursAfter } = getProcessedDates(
                prevTask,
                task as TaskType,
                nextTask
              );

              const multiplerHeight =
                getDateComponentsFromEpoch(task.endTime * 1000).hour -
                  getDateComponentsFromEpoch(task.startTime * 1000).hour || 1;

              const taskColorStyle = colorVariants[task.color as Color];

              return (
                <div key={task.id} className="flex flex-col">
                  {hoursBefore.map((hour) => (
                    <div className="w-20 opacity-50 relative" key={hour}>
                      <div
                        className={`left-32 w-1  h-5 -z-50 absolute bg-gray-200`}
                      ></div>
                      {hour}
                    </div>
                  ))}

                  <AnimatePresence>
                    <motion.div
                      style={{
                        margin: '5px 0px',
                        display: 'flex',
                        alignItems: 'center',
                        position: 'relative',
                      }}
                      initial={{
                        height: task.isDone ? 100 * multiplerHeight : 50,
                      }}
                      animate={{
                        height: task.isDone ? 50 : 100 * multiplerHeight,
                      }}
                      transition={{ duration: 0.5 }}
                      exit={{
                        height: task.isDone ? 50 : 100 * multiplerHeight,
                      }}
                      key={'container'}
                    >
                      <div className="w-20 absolute top-0">
                        {formatDate(task.startTime)}
                      </div>
                      <div className={`relative flex h-full items-center`}>
                        <div
                          className={`left-32 w-1 h-full -z-50 absolute ${taskColorStyle}`}
                        ></div>
                      </div>
                      <Task
                        key={task.id}
                        task={task as TaskType}
                        onChange={handleChangedDone}
                      />
                    </motion.div>
                  </AnimatePresence>
                  {hoursAfter.map((hour) => (
                    <div className="w-20 opacity-50 relative" key={hour}>
                      <div
                        className={`left-32 w-1  h-5 -z-50 absolute bg-gray-200`}
                      ></div>
                      {hour}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </MotionWrapper>
  );
};

export default Structure;
