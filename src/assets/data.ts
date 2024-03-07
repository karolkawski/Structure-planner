import { TaskType } from '../types/Task.d';

export const data: TaskType[] = [
  {
    id: '7b1b9db0-b360-4443-9b20-db47752e544d',
    name: 'Exercise',
    description: 'Morning one-hour cardio workout',
    startTime: 1706245200, //Friday, 26 January 2024 05:00:00
    endTime: 1706248800, //Friday, 26 January 2024 06:00:00
    category: 'selfcare',
    tags: ['health'],
    color: 'blue',
    icon: 'gym',
    isDone: false,
    priority: 'high',
  },
  {
    id: '6e226a4e-29bd-44a7-b0e5-3231ed6fe85f',
    name: 'Documentation',
    description: 'Reading documentation',
    startTime: 1706248801, //Friday, 26 January 2024 06:00:01
    endTime: 1706252400, //Friday, 26 January 2024 07:00:00
    category: 'education',
    tags: ['study', 'work'],
    color: 'red',
    icon: 'study',
    isDone: false,
    priority: 'low',
  },
  {
    id: '8b51a4de-d7fe-40d2-a196-4ed46f930a59',
    name: 'Coding',
    description: 'Time for personal projects',
    startTime: 1706252401, //Friday, 26 January 2024 07:00:01
    endTime: 1706259600, //Friday, 26 January 2024 9:00:00
    category: 'education',
    tags: ['study', 'work'],
    color: 'green',
    icon: 'study',
    isDone: false,
    priority: 'low',
  },
  {
    id: '7f8b9ee7-c5ba-40bb-b391-2fe4006e4158',
    name: 'Emails',
    description: 'Checking emails',
    startTime: 1706259601, //Friday, 26 January 2024 09:00:01
    endTime: 1706261400, //Friday, 26 January 2024 9:30:00
    category: 'work',
    tags: ['work'],
    color: 'yellow',
    icon: 'email',
    isDone: false,
    priority: 'medium',
  },
  {
    id: 'c4bcd5b4-1f51-4a2a-ab51-1ce35b0a200f',
    name: 'Work',
    description: '',
    startTime: 1706261401, // Friday, 26 January 2024 09:30:01
    endTime: 1706274000, //Friday, 26 January 2024 13:00:00
    category: 'work',
    tags: ['work'],
    color: 'gray',
    icon: 'work',
    isDone: false,
    priority: 'low',
  },
  {
    id: 'a2cbbb30-6d4e-43cd-9ac1-0e91c62dd1d3',
    name: 'Lunch',
    description: '',
    startTime: 1706274001, // Friday, 26 January 2024 13:00:01
    endTime: 1706275800, //Friday, 26 January 2024 13:30:00
    category: 'work',
    tags: ['work'],
    color: 'orange',
    icon: 'food',
    isDone: false,
    priority: 'low',
  },
  {
    id: '72f9ea0f-1e8e-4860-a2f6-5f87cb32d9c3',
    name: 'Work',
    description: '',
    startTime: 1706275801, // Friday, 26 January 2024 13:30:01
    endTime: 1706288400, //Friday, 26 January 2024 17:00:00
    category: 'work',
    tags: ['work'],
    color: 'gray',
    icon: 'work',
    isDone: false,
    priority: 'low',
  },
  {
    id: '80e03d41-dd7b-411b-9112-219b2003b882',
    name: 'TV',
    description: '',
    startTime: 1706288401, // Friday, 26 January 2024 17:00:01
    endTime: 1706292000, //Friday, 26 January 2024 18:00:00
    category: 'work',
    tags: ['work'],
    color: 'purple',
    icon: 'rest',
    isDone: false,
    priority: 'low',
  },
];
