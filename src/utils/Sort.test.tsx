import { sortByHours } from './Sort';
import { TaskType } from '../types/Task.d';

describe('sortByHours Function Unit Tests', () => {
  const task1: TaskType = {
    startTime: 1614582000,
    id: '',
    name: '',
    description: '',
    endTime: 0,
    category: '',
    tags: [],
    color: 'blue',
    icon: 'study',
    isDone: false,
    priority: 'low',
  };
  const task2: TaskType = {
    startTime: 1614592800,
    id: '',
    name: '',
    description: '',
    endTime: 0,
    category: '',
    tags: [],
    color: 'blue',
    icon: 'study',
    isDone: false,
    priority: 'low',
  };
  const task3: TaskType = {
    startTime: 1614603600,
    id: '',
    name: '',
    description: '',
    endTime: 0,
    category: '',
    tags: [],
    color: 'blue',
    icon: 'study',
    isDone: false,
    priority: 'low',
  };

  const unsortedCollection: TaskType[] = [task2, task1, task3];

  test('Should return an array with the same length as the input', () => {
    const result = sortByHours(unsortedCollection);
    expect(result).toHaveLength(unsortedCollection.length);
  });

  test('Should return an array sorted by start time in ascending order', () => {
    const result = sortByHours(unsortedCollection);
    expect(result).toEqual([task1, task2, task3]);
  });

  test('Should return the same array when input has only one element', () => {
    const singleElementArray: TaskType[] = [task1];
    const result = sortByHours(singleElementArray);
    expect(result).toEqual(singleElementArray);
  });
});
