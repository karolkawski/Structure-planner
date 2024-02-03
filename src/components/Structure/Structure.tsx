import { FC, useState } from 'react';
import { data } from '../../assets/data';
import Task from '../Task/Task';
import { TaskType } from '../Task/Task.d';
import { formatDate, getDateComponentsFromEpoch } from '../../utils/Date';
import { colorVariants, taskHoursVariations, isDoneVariations } from './styles';
import { Color } from '../../types/Colors.d';
import { Hours } from '../../types/Hours.d';

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
  const [records, setRecords] = useState<TaskType[]>(data);

  const handleChangedDone = (task: TaskType) => {
    const updatedRecords = records.map((record) => {
      if (record.id === task.id) {
        record = task;
      }
      return record;
    });
    console.log(records, task);
    setRecords(updatedRecords);
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold my-2">
        React Typescript Structure Daily Planner
      </h1>
      <div className="container m-auto py-10">
        <div className="Calendar">
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
                  <div className="w-40" key={hour}>
                    {hour}
                  </div>
                ))}
                <div
                  className={`${!task.isDone ? taskHoursVariations[multiplerHeight as Hours] : ''}`}
                >
                  <div className="w-40 absolute">
                    {formatDate(task.startTime)}
                  </div>
                  <div
                    className={`relative flex ${isDoneVariations[task.isDone.toString()]} items-center`}
                  >
                    <div
                      className={`left-40 w-1 h-full -z-50 absolute ${taskColorStyle}`}
                    ></div>
                    <Task
                      key={task.id}
                      task={task as TaskType}
                      onChange={handleChangedDone}
                    />
                  </div>
                </div>
                {hoursAfter.map((hour) => (
                  <div className="w-40" key={hour}>
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
