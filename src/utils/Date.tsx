export const fixedDate = '26-01-2024';

export const formatDate = (epoch: number) => {
  if (!epoch || isNaN(epoch)) {
    return 'Invalid Date';
  }

  const date = new Date(epoch * 1000);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid Date');
  }

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const convertStringToEpoch = (time: string) => {
  const [day, month, year] = fixedDate.split('-');
  const date = new Date();
  date.setUTCFullYear(Number.parseInt(year));
  date.setUTCMonth(Number.parseInt(month) - 1);
  date.setUTCDate(Number.parseInt(day));
  const [hour, minutes] = time.split(':');
  date.setUTCHours(Number.parseInt(hour));
  date.setUTCMinutes(Number.parseInt(minutes));
  return date.getTime() / 1000;
};

export const getDateComponentsFromEpoch = (epoch: string | number | Date) => {
  const date = new Date(epoch);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const hour = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();

  return { year, month, day, hour, minutes, seconds };
};

export const isTimeInRange = (time: string, range: string[]) => {
  const [startTime, endTime] = range;
  return time >= startTime && time <= endTime;
};

export const getCurrentTime = () => {
  const [day, month, year] = fixedDate.split('-');

  const currentDate = new Date();
  currentDate.setUTCFullYear(Number.parseInt(year));
  currentDate.setUTCMonth(Number.parseInt(month) - 1);
  currentDate.setUTCDate(Number.parseInt(day));

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options = { timeZone: userTimeZone };
  const localDate = new Date(currentDate.toLocaleString('en-US', options));
  const timezoneOffsetInSeconds = localDate.getTimezoneOffset() * 60;

  const hours = localDate.getHours().toString().padStart(2, '0');
  const minutes = localDate.getMinutes().toString().padStart(2, '0');
  return {
    display: `${hours}:${minutes}`,
    epoch: Math.floor(
      (localDate.getTime() - timezoneOffsetInSeconds * 1000) / 1000
    ),
  };
};
