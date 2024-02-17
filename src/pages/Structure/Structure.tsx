import React, { FC, useEffect, useState } from 'react';
import Task from '../../components/Task/Task';
import { TaskType } from '../../types/Task.d';
import {
  convertStringToEpoch,
  formatDate,
  getCurrentTime,
  getDateComponentsFromEpoch,
} from '../../utils/Date';
import { colorVariants } from './stylesVariations';
import { Color } from '../../types/Colors.d';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../../store/actions/dataActions';
import { State } from '../../store/reducers/dataReducer';
import MotionWrapper from '../../Layout/MotionWrapper';
import Progress from '../../components/UI/Progress/Progress';
import { Button } from 'flowbite-react/lib/esm/components/Button/Button';
import { Link } from 'react-router-dom';

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
  const [actualHour, setActualHour] = useState<{
    display: string;
    epoch: number;
  }>(getCurrentTime());
  const [timePosition, setTimePosition] = useState<string>('0px');
  const [progress, setProgress] = useState<string>('0%');

  setInterval(
    () => {
      setActualHour(getCurrentTime());
      updateTimer();
    },
    1000 * 60 * 1
  );

  const updateTimer = () => {
    const topOffset = calculatePosition();
    setTimePosition(`${topOffset}px`);
  };

  const handleChangedDone = (task: TaskType) => {
    dispatch(updateData(task));
  };

  function calculateLineHeight(actual, elementEpoch, nextEpoch, height) {
    if (actual >= elementEpoch && actual <= nextEpoch) {
      const percentTimeElapsed =
        (actual - elementEpoch) / (nextEpoch - elementEpoch);
      const lineHeight = height * percentTimeElapsed;
      return lineHeight;
    } else {
      return -1;
    }
  }

  const calculatePosition = () => {
    const { epoch } = actualHour;

    const times = document.querySelectorAll('.time');

    let closestElement = null;
    let offsetTopOfClosest = 0;

    for (let i = 0; i < times.length; i++) {
      const elementEpoch = Number.parseInt(times[i].getAttribute('data-time'));
      const nextElementEpoch =
        i < times.length - 1
          ? Number.parseInt(times[i + 1].getAttribute('data-time'))
          : null;

      if (elementEpoch < epoch) {
        closestElement = times[i];
        offsetTopOfClosest =
          closestElement.offsetTop +
          calculateLineHeight(
            epoch,
            elementEpoch,
            nextElementEpoch,
            closestElement.clientHeight
          );
      }
    }
    return offsetTopOfClosest;
  };

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
    return (
      <div className="w-full flex justify-center flex-col items-center h-40 ">
        No tasks available.{' '}
        <Button className="px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          {' '}
          <Link to="/tasks">Add tasks</Link>
        </Button>
      </div>
    );
  }

  return (
    <MotionWrapper>
      <div className="text-center">
        <header className="w-full px-10">
          <h1 className="text-4xl font-bold my-2">Structure Daily</h1>
          <Progress progress={progress} />
        </header>
        <div className="container m-auto py-1 ">
          <div className="Calendar my-5 relative mx-auto min-w-96 w-3/5">
            <motion.div
              style={{
                width: '105px',
                left: '-40px',
                position: 'absolute',
                opacity: 0,
              }}
              initial={{
                top: 0,
                opacity: 0,
              }}
              animate={{
                top: timePosition,
                opacity: 1,
              }}
              transition={{ duration: 0.1 }}
              exit={{
                top: timePosition,
              }}
              key={'line'}
            >
              <div className="bg-red-600 h-1"></div>
              <div className="md:text-left text-red-600 text-xs md:text-sm">
                {actualHour ? actualHour.display : ''}
              </div>
            </motion.div>
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
                    <div
                      className="time w-20 opacity-50 relative"
                      key={hour}
                      data-time={convertStringToEpoch(hour)}
                    >
                      <div
                        className={`left-32 w-1  h-5 -z-50 absolute bg-gray-200`}
                      ></div>
                      {hour}
                    </div>
                  ))}

                  <div className="time" data-time={task.startTime}>
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
                      onAnimationComplete={updateTimer}
                      key={'container'}
                    >
                      <div className="w-20 absolute top-0">
                        {formatDate(task.startTime)}
                      </div>
                      <div className={`relative flex h-full items-center`}>
                        <div
                          className={`left-32 w-1 h-full -z-50 absolute ${taskColorStyle}`}
                        ></div>
                        <div
                          className={`left-16 top-2 w-px h-full -z-50 absolute bg-gray-200 hover:bg-gray-200 border-gray-200`}
                        ></div>
                      </div>
                      <Task
                        key={task.id}
                        task={task as TaskType}
                        onChange={handleChangedDone}
                      />
                    </motion.div>
                  </div>
                  {hoursAfter.map((hour) => (
                    <div
                      className="time w-20 opacity-50 relative"
                      key={hour}
                      data-time={convertStringToEpoch(hour)}
                    >
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
