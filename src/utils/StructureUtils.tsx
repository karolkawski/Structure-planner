import { TaskType } from '../types/Task.d';
import { getDateComponentsFromEpoch } from './Date';

export const generateAllHoursInDay = (from = 0, to = 24) => {
  const hours = [];

  for (let hour = from; hour < to; hour++) {
    const formattedHour: string = hour.toString().padStart(2, '0');
    hours.push(`${formattedHour}:00`);
  }

  return hours;
};

export const getProcessedDates = (
  prevTask: TaskType | undefined,
  task: TaskType,
  nextTask: TaskType | undefined
) => {
  const pEnd = prevTask
    ? getDateComponentsFromEpoch(prevTask.endTime * 1000)
    : { hour: 0, minutes: 0 };

  const start = getDateComponentsFromEpoch(task.startTime * 1000);
  const nStart = nextTask
    ? getDateComponentsFromEpoch(nextTask.startTime * 1000)
    : { hour: 24, minutes: 0 };
  const end = getDateComponentsFromEpoch(task.endTime * 1000);
  const hoursBefore = generateAllHoursInDay(
    pEnd.minutes === 0 ? pEnd.hour : pEnd.hour + 1,
    start.hour
  );
  const hoursAfter = generateAllHoursInDay(
    end.minutes === 0 ? end.hour : end.hour + 1,
    nStart.hour
  );
  return { hoursBefore, hoursAfter };
};

export const calculateLineHeight = (
  actual: number,
  elementEpoch: number,
  nextEpoch: number | null,
  height: number
) => {
  if (actual >= elementEpoch && nextEpoch && actual <= nextEpoch) {
    const percentTimeElapsed =
      (actual - elementEpoch) / (nextEpoch - elementEpoch);
    const lineHeight = height * percentTimeElapsed;
    return lineHeight;
  } else {
    return -1;
  }
};
