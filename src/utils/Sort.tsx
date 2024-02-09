import { TaskType } from '../types/Task.d';
import { formatDate } from './/Date';

export const sortByHours = (collection: TaskType[]) => {
  const sortedCollection = collection.sort((a: TaskType, b: TaskType) => {
    return (
      new Date(
        `1970-01-01T${formatDate(a.startTime as number) as string}`
      ).getTime() -
      new Date(
        `1970-01-01T${formatDate(b.startTime as number) as string}`
      ).getTime()
    );
  });

  return sortedCollection;
};
