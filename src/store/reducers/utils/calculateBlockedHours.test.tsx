import { TaskType } from '../../../types/Task.d';
import { calculateBlockedHours } from './calculateBlockedHours';

describe('calculateBlockedHours', () => {
  const sortedData: TaskType[] = [
    {
      startTime: 1706245200, //Friday, 26 January 2024 05:00:00
      endTime: 1706248800, //Friday, 26 January 2024 06:00:00
      id: '',
      name: '',
      description: '',
      category: '',
      tags: [],
      color: 'blue',
      icon: 'study',
      isDone: false,
      priority: 'low',
    },
    {
      startTime: 1706248801, //Friday, 26 January 2024 06:00:01
      endTime: 1706252400, //Friday, 26 January 2024 07:00:00
      id: '',
      name: '',
      description: '',
      category: '',
      tags: [],
      color: 'blue',
      icon: 'study',
      isDone: false,
      priority: 'low',
    },
  ];
  it('Should calculate blocked hours correctly', () => {
    const result = calculateBlockedHours(sortedData);

    expect(result).toEqual([['05:00', '07:00']]);
  });

  it('Should handle empty input', () => {
    const result = calculateBlockedHours([]);

    expect(result).toEqual([]);
  });
});
