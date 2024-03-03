import { TaskType } from '../../../types/Task.d';
import { formatDate } from '../../../utils/Date';

export const calculateBlockedHours = (sortedData: TaskType[]) => {
  const mergedBlocks = [];
  let currentBlock: null | [string, string] = null;

  sortedData.forEach((item: TaskType, index: number) => {
    const startTime: string = formatDate(item.startTime);
    const endTime: string = formatDate(item.endTime);

    if (index === 0) {
      currentBlock = [startTime, endTime];
      return;
    }

    const prevEndTime = formatDate(sortedData[index - 1].endTime);

    if (startTime === prevEndTime && currentBlock) {
      currentBlock[1] = endTime;
    } else {
      mergedBlocks.push(currentBlock ? [...currentBlock] : []);
      currentBlock = [startTime, endTime];
    }
  });

  if (currentBlock) {
    mergedBlocks.push([...currentBlock]);
  }
  return mergedBlocks;
};
