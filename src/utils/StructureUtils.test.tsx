import { TaskType } from '../types/Task.d';
import {
  calculateLineHeight,
  generateAllHoursInDay,
  getProcessedDates,
} from './StructureUtils';

describe('generateAllHoursInDay Function Unit Tests', () => {
  test('Should return an array from 00:00 >= to < 12:00', () => {
    const generatedArray = [
      '00:00',
      '01:00',
      '02:00',
      '03:00',
      '04:00',
      '05:00',
      '06:00',
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
    ];
    expect(generateAllHoursInDay(0, 12)).toEqual(generatedArray);
  });

  test('Should return an empty array when first and second array are same', () => {
    expect(generateAllHoursInDay(0, 0)).toEqual([]);
  });

  test('Should return en empty array when first arg is bigger than second', () => {
    expect(generateAllHoursInDay(1, 0)).toEqual([]);
  });
});

describe('getProcessedDates Function Unit Tests', () => {
  const task1: TaskType = {
    id: '7b1b9db0-b360-4443-9b20-db47752e544d',
    name: 'Trening',
    description: 'Poranny godzinny trening cardio',
    startTime: 1706245200, //Friday, 26 January 2024 05:00:00
    endTime: 1706248800, //Friday, 26 January 2024 06:00:00
    category: 'selfcare',
    tags: ['health'],
    color: 'blue',
    icon: 'gym',
    isDone: false,
    priority: 'high',
  };
  const task2: TaskType = {
    id: '6e226a4e-29bd-44a7-b0e5-3231ed6fe85f',
    name: 'Dokumentacja',
    description: 'Czytanie dokumentacji',
    startTime: 1706248801, //Friday, 26 January 2024 06:00:01
    endTime: 1706252400, //Friday, 26 January 2024 07:00:00
    category: 'education',
    tags: ['study', 'work'],
    color: 'red',
    icon: 'study',
    isDone: false,
    priority: 'low',
  };
  const task3: TaskType = {
    id: '8b51a4de-d7fe-40d2-a196-4ed46f930a59',
    name: 'Kodowanie',
    description: 'Czas na własne projekty',
    startTime: 1706252401, //Friday, 26 January 2024 07:00:01
    endTime: 1706259600, //Friday, 26 January 2024 9:00:00
    category: 'education',
    tags: ['study', 'work'],
    color: 'green',
    icon: 'study',
    isDone: false,
    priority: 'low',
  };

  test('Should return hoursBefore first task from start of day', () => {
    const generatedObject = {
      hoursAfter: [],
      hoursBefore: ['00:00', '01:00', '02:00', '03:00', '04:00'],
    };
    expect(getProcessedDates(undefined, task1, task2)).toEqual(generatedObject);
  });

  test('Should return empty arrays of hoursAfter and hoursBefore', () => {
    const generatedObject = { hoursAfter: [], hoursBefore: [] };
    expect(getProcessedDates(task1, task2, task3)).toEqual(generatedObject);
  });

  test('Should return hoursAfter last task to end of the day', () => {
    const generatedObject = {
      hoursAfter: [
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
      ],
      hoursBefore: [],
    };
    expect(getProcessedDates(task2, task3, undefined)).toEqual(generatedObject);
  });
});

describe('calculateLineHeight Function Unit Tests', () => {
  test('Should return -1 if actual is less than elementEpoch', () => {
    const result = calculateLineHeight(1000, 2000, 3000, 50);
    expect(result).toBe(-1);
  });

  test('Should return -1 if actual is greater than nextEpoch', () => {
    const result = calculateLineHeight(4000, 2000, 3000, 50);
    expect(result).toBe(-1);
  });

  test('Should return -1 if nextEpoch is null', () => {
    const result = calculateLineHeight(2500, 2000, null, 50);
    expect(result).toBe(-1);
  });

  test('Should calculate the correct lineHeight when actual is between elementEpoch and nextEpoch', () => {
    const result = calculateLineHeight(2500, 2000, 3000, 50);
    expect(result).toBe(25);
  });

  test('Should return 0 if height is 0', () => {
    const result = calculateLineHeight(2500, 2000, 3000, 0);
    expect(result).toBe(0);
  });

  test('Should return -25 if height is negative', () => {
    const result = calculateLineHeight(2500, 2000, 3000, -50);
    expect(result).toBe(-25);
  });
});
