import { taskSchema } from './TaskValidation';

describe('Task Yup Schema Validation', () => {
  it('Should validate a valid task', async () => {
    const validTask = {
      id: '7b1b9db0-b360-4443-9b20-db47752e544d',
      name: 'Trening',
      description: 'Poranny godzinny trening cardio',
      startTime: '1706245200', //Friday, 26 January 2024 05:00:00
      endTime: '1706248800', //Friday, 26 January 2024 06:00:00
      category: 'selfcare',
      tags: ['health'],
      color: 'blue',
      icon: 'gym',
      isDone: false,
      priority: 'high',
      blockedHours: [],
      currentHours: ['1706245200', '1706248800'],
    };

    await expect(taskSchema.validate(validTask)).resolves.toEqual(validTask);
  });

  it('Should throw validation error for an invalid task', async () => {
    const invalidTask = {};

    await expect(taskSchema.validate(invalidTask)).rejects.toThrow();
  });

  it('Should validate a task with blocked hours', async () => {});
});
