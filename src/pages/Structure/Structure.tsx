import { FC, useEffect, useState } from 'react';
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
import { useSelector, useDispatch } from 'react-redux';
import { updateData } from '../../store/actions/dataActions';
import { State } from '../../store/State.d';
import MotionWrapper from '../../Animate/MotionWrapper';
import Progress from '../../components/UI/Progress/Progress';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import LayoutWrapper from '../../Layout/LayoutWrapper';
import Header from '../../components/UI/Header/Header';
import TimeWrapper from '../../Animate/TimeWrapper';
import HourLine from '../../components/UI/HourLine/HourLine';
import HourLineWrapper from '../../Animate/HourLineWrapper';
import {
  calculateLineHeight,
  getProcessedDates,
} from '../../utils/StructureUtils';
import { ButtonTheme } from '../../Themes/ButtonTheme';

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

  const Hour = ({ hour }: { hour: string }) => {
    return (
      <div
        className="time w-20 opacity-50 relative text-sm"
        key={hour}
        data-time={convertStringToEpoch(hour)}
      >
        <div
          className={`left-28 md:left-32 w-1 h-5 -z-50 absolute bg-gray-200`}
        ></div>
        <div
          className={`left-16 top-2 w-px h-full -z-50 absolute bg-gray-200 hover:bg-gray-200 border-gray-200`}
        ></div>
        {hour}
      </div>
    );
  };

  const calculatePosition = () => {
    const { epoch } = actualHour;

    const times = document.querySelectorAll('.time');

    let offsetTopOfClosest = 0;

    for (let i = 0; i < times.length; i++) {
      const elementEpoch = Number.parseInt(
        times[i].getAttribute('data-time') as string
      );
      const nextElementEpoch =
        i < times.length - 1
          ? Number.parseInt(times[i + 1].getAttribute('data-time') as string)
          : null;

      if (elementEpoch < epoch) {
        const closestElement = times[i] as HTMLElement;
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
    return (
      <LayoutWrapper paddingTop={true}>
        <Header title="Structure Daily" />
        <div className="">Loading...</div>
      </LayoutWrapper>
    );
  }

  if (!data || data.length === 0) {
    return (
      <LayoutWrapper paddingTop={true}>
        <Header title="Structure Daily" />
        <div className="py-5">
          <div className="flex justify-center flex-col items-center h-40 ">
            No tasks available.{' '}
            <Button
              theme={ButtonTheme}
              color="secondary"
              className="px-3 text-sm font-medium text-center"
            >
              {' '}
              <Link to="/tasks">Add tasks</Link>
            </Button>
          </div>
        </div>
      </LayoutWrapper>
    );
  }

  return (
    <MotionWrapper primary={false}>
      <LayoutWrapper paddingTop={true}>
        <Header title="Structure Daily">
          <Progress progress={progress} />
        </Header>
        <div className="container mx-auto">
          <div className="Calendar my-5 relative mx-auto min-w-[22rem]">
            <HourLineWrapper timePosition={timePosition}>
              <HourLine actualHour={actualHour} />
            </HourLineWrapper>
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
                    <Hour key={hour} hour={hour} />
                  ))}

                  <div className="time" data-time={task.startTime}>
                    <TimeWrapper
                      task={task}
                      multiplerHeight={multiplerHeight}
                      updateTimer={updateTimer}
                    >
                      <div className="w-20 absolute top-0 text-sm">
                        {formatDate(task.startTime)}
                      </div>
                      <div className={`relative flex h-full items-center`}>
                        <div
                          className={`left-28 md:left-32 w-1 h-full -z-50 absolute ${taskColorStyle}`}
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
                    </TimeWrapper>
                  </div>
                  {hoursAfter.map((hour) => (
                    <Hour key={hour} hour={hour} />
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </LayoutWrapper>
    </MotionWrapper>
  );
};

export default Structure;
