import { formatDate, convertStringToEpoch } from './Date';
// import { fixedDate } from './Date';

// global.fixedDate = '26-01-2024';

describe('formatDate test', () => {
  beforeAll(() => {
    jest.restoreAllMocks();
  });

  test('Should 1708822453 (GMT: Sunday, 25 February 2024 00:54:13) format date to 00:54', () => {
    expect(formatDate(1708822453)).toBe('00:54');
  });

  test('Should null format date to Invalid Date', () => {
    expect(formatDate(null)).toBe('Invalid Date');
  });

  test('Should 0 format date to 00:54', () => {
    expect(formatDate(0)).toBe('Invalid Date');
  });
});

describe('convertStringToEpoch test', () => {
  const mockedDate = new Date('2022-01-01T12:00:00Z');

  beforeAll(() => {
    global.Date = jest.fn(() => mockedDate);
  });

  test('Should 00:54 return 1706230440 (GMT: Friday, 26 January 2024 00:54:00)', () => {
    expect(convertStringToEpoch('00:54')).toBe(1706230440);
  });

  test('Should run 0054 with missing : return NaN', () => {
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

describe('getDateComponentsFromEpoch test', () => {});
describe('isTimeInRange test', () => {});
describe('getCurrentTime test', () => {});
