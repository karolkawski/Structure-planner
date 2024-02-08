import { FC, useEffect, useState } from 'react';
import Task from '../Task/Task';
import { TaskType } from '../Task/Task.d';
import { formatDate, getDateComponentsFromEpoch } from '../../utils/Date';
import { colorVariants } from './stylesVariations';
import { Color } from '../../types/Colors.d';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';

const generateAllHoursInDay = (from = 0, to = 24) => {
  const hours = [];

  for (let hour = from; hour < to; hour++) {
    const formattedHour = hour.toString().padStart(2, '0');
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
  const data = useSelector((state) => state.data.data);
  const loading = useSelector((state) => state.data.loading);
  const [records, setRecords] = useState<TaskType[]>(data);
  const [progress, setProgress] = useState<string>('0%');

  useEffect(() => {
    const totalTasks = records.length;
    const doneTasks = records.filter((task: TaskType) => task.isDone).length;
    const percentageDone = (doneTasks / totalTasks) * 100 + '%';
    setProgress(percentageDone);
  }, [records]);

  if (records && records.length === 0) {
    return <></>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!records || records.length === 0) {
    return <div>No records available.</div>;
  }

  const handleChangedDone = (task: TaskType) => {
    const updatedRecords = records.map((record) => {
      if (record.id === task.id) {
        record = task;
      }
      return record;
    });

    setRecords(updatedRecords);
  };

  return (
    <div className="text-center">
      <header className="w-full">
        <h1 className="text-4xl font-bold my-2">Structure Daily</h1>
        <div className="m-auto w-96 bg-gray-200 rounded-full dark:bg-gray-700">
          <div
            className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
            style={{ width: progress }}
          >
            {' '}
            {progress}
          </div>
        </div>
      </header>
      <div className="container m-auto py-10 ">
        <div className="Calendar mt-5">
          {records.map((task, index) => {
            const prevTask = records[index - 1] as TaskType | undefined;
            const nextTask = records[index + 1] as TaskType | undefined;

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
                  <div className="w-20 opacity-50" key={hour}>
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
                    exit={{ height: task.isDone ? 50 : 100 * multiplerHeight }}
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
                  <div className="w-20 opacity-50" key={hour}>
                    {hour}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Structure;
