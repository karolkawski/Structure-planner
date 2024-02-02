export const data = [
  {
    id: 1,
    name: 'Trening',
    description: 'Poranny godzinny trening cardio',
    startTime: 1706245200, //Friday, 26 January 2024 05:00:00
    endTime: 1706248800, //Friday, 26 January 2024 06:00:00
    category: 'selfcare',
    tags: ['health'],
    color: 'blue',
    icon: 'gym',
    isDone: true,
    piority: 'high',
    connectedWith: false,
  },
  {
    id: 2,
    name: 'Dokumentacja',
    description: 'Czytanie dokumentacji',
    startTime: 1706248801, //Friday, 26 January 2024 06:00:01
    endTime: 1706252400, //Friday, 26 January 2024 07:00:00
    category: 'education',
    tags: ['study', 'work'],
    color: 'red',
    icon: 'study',
    isDone: false,
    piority: 'low',
    connectedWith: 3,
  },
  {
    id: 4,
    name: 'Kodowanie',
    description: 'Czas na własne projekty',
    startTime: 1706252401, //Friday, 26 January 2024 07:00:01
    endTime: 1706259600, //Friday, 26 January 2024 9:00:00
    category: 'education',
    tags: ['study', 'work'],
    color: 'green',
    icon: 'study',
    isDone: false,
    piority: 'low',
    connectedWith: false,
  },
  {
    id: 5,
    name: 'Emails',
    description: 'Sprawdzenie emaili',
    startTime: 1706259601, //Friday, 26 January 2024 09:00:01
    endTime: 1706261400, //Friday, 26 January 2024 9:30:00
    category: 'work',
    tags: ['work'],
    color: 'yellow',
    icon: 'email',
    isDone: true,
    piority: 'low',
    connectedWith: false,
  },
  {
    id: 6,
    name: 'Work',
    description: '',
    startTime: 1706261401, // Friday, 26 January 2024 09:30:01
    endTime: 1706274000, //Friday, 26 January 2024 13:00:00
    category: 'work',
    tags: ['work'],
    color: 'gray',
    icon: 'work',
    isDone: true,
    piority: 'low',
    connectedWith: false,
  },
  {
    id: 7,
    name: 'Lunch',
    description: '',
    startTime: 1706274001, // Friday, 26 January 2024 13:00:01
    endTime: 1706275800, //Friday, 26 January 2024 13:30:00
    category: 'work',
    tags: ['work'],
    color: 'orange',
    icon: 'food',
    isDone: true,
    piority: 'low',
    connectedWith: false,
  },
  {
    id: 8,
    name: 'Work',
    description: '',
    startTime: 1706275801, // Friday, 26 January 2024 13:30:01
    endTime: 1706288400, //Friday, 26 January 2024 17:00:00
    category: 'work',
    tags: ['work'],
    color: 'gray',
    icon: 'work',
    isDone: true,
    piority: 'low',
    connectedWith: false,
  },
  {
    id: 9,
    name: 'TV',
    description: '',
    startTime: 1706288401, // Friday, 26 January 2024 17:00:01
    endTime: 1706292000, //Friday, 26 January 2024 18:00:00
    category: 'work',
    tags: ['work'],
    color: 'purple',
    icon: 'rest',
    isDone: true,
    piority: 'low',
    connectedWith: false,
  },
];
