import {
  formatDate,
  convertStringToEpoch,
  getDateComponentsFromEpoch,
  isTimeInRange,
  getCurrentTime,
} from './Date';
const mockedDate = new Date('2022-01-01T12:00:00Z');

declare let global: {
  [key: string]: unknown;
};

global.originalDate = global.Date;

describe('formatDate test', () => {
  beforeAll(() => {
    global.Date = global.originalDate;
  });

  test('Should 1708822453 (GMT: Sunday, 25 February 2024 00:54:13) format date to 00:54', () => {
    expect(formatDate(1708822453)).toBe('00:54');
  });

  test('Should null format date to Invalid Date', () => {
    expect(formatDate(null as unknown as number)).toBe('Invalid Date');
  });

  test('Should 0 format date to 00:54', () => {
    const invalidEpoch = 'Invalid Epoch';
    expect(formatDate(invalidEpoch as unknown as number)).toBe('Invalid Date');
  });
});

describe('convertStringToEpoch test', () => {
  beforeAll(() => {
    global.Date = jest.fn(() => mockedDate);
  });

  test('Should 00:54 return 1706230440 (GMT: Friday, 26 January 2024 00:54:00)', () => {
    expect(convertStringToEpoch('00:54')).toBe(1706230440);
  });

  test('Should 0054 with missing : return NaN', () => {
    expect(convertStringToEpoch('0054')).toBe(NaN);
  });

  test('Should : return NaN', () => {
    expect(convertStringToEpoch(':')).toBe(NaN);
  });

  test('Should 9:2 return 1706259720 (GMT: Friday, 26 January 2024 09:02:00)', () => {
    expect(convertStringToEpoch('9:2')).toBe(1706259720);
  });

  test('Should a:b return NaN', () => {
    expect(convertStringToEpoch('a:b')).toBe(NaN);
  });
});

describe('getDateComponentsFromEpoch test', () => {
  beforeAll(() => {
    global.Date = global.originalDate;
  });

  const dateObject = {
    year: 2024,
    month: 1,
    day: 26,
    hour: 9,
    minutes: 2,
    seconds: 0,
  };

  test('Should epoch in ms return correctly dateObject', () => {
    const epochInMs = 1706259720 * 1000;
    expect(getDateComponentsFromEpoch(epochInMs)).toEqual(dateObject);
  });

  test('Should date return correctly dateObject', () => {
    const dateFromEpoch = new Date(1706259720 * 1000);
    expect(getDateComponentsFromEpoch(dateFromEpoch)).toEqual(dateObject);
  });

  test('Should string return correctly dateObject', () => {
    const stringFromEpoch = new Date(1706259720 * 1000).getTime();
    expect(getDateComponentsFromEpoch(stringFromEpoch)).toEqual(dateObject);
  });

  test('Should bad epoch return bad dates', () => {
    const badEpoch = 666;
    const badDates = {
      year: 1970,
      month: 1,
      day: 1,
      hour: 0,
      minutes: 0,
      seconds: 0,
    };
    expect(getDateComponentsFromEpoch(badEpoch)).toEqual(badDates);
  });

  test('Should bad epoch return NaN dates', () => {
    const epochInMs = 'a';
    const naNObject = {
      year: NaN,
      month: NaN,
      day: NaN,
      hour: NaN,
      minutes: NaN,
      seconds: NaN,
    };
    expect(getDateComponentsFromEpoch(epochInMs)).toEqual(naNObject);
  });
});

describe('isTimeInRange test', () => {
  beforeAll(() => {
    global.Date = global.originalDate;
  });

  const hoursRange = ['03:00', '04:00'];
  test('Should 03:01 return true', () => {
    expect(isTimeInRange('03:01', hoursRange)).toBe(true);
  });
  test('Should 03:00 return false', () => {
    expect(isTimeInRange('03:00', hoursRange)).toBe(false);
  });
  test('Should 04:00 return false', () => {
    expect(isTimeInRange('04:00', hoursRange)).toBe(false);
  });
  test('Should 03:59 return true', () => {
    expect(isTimeInRange('03:59', hoursRange)).toBe(true);
  });
  test('Should 0359 return false', () => {
    expect(isTimeInRange('0359', hoursRange)).toBe(false);
  });
});

describe('getCurrentTime test', () => {
  beforeAll(() => {
    global.Date = jest.fn(() => mockedDate);
  });

  test('Should return mockedDate', () => {
    const curentTimeObj = {
      display: '01:00',
      epoch: 1706230800,
    };

    expect(getCurrentTime()).toEqual(curentTimeObj);
  });
});
