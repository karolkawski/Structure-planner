export const formatDate = (epoch: number) => {
  if (!epoch || isNaN(epoch)) {
    return 'Invalid Date';
  }

  const date = new Date(epoch * 1000);
  if (isNaN(date.getTime())) {
    return 'Invalid Date';
  }

  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
};

export const convertStringToEpoch = (fixedDate: string, time: string) => {
  const [day, month, year] = fixedDate.split('-');
  const date = new Date(
    Number.parseInt(year),
    Number.parseInt(month),
    Number.parseInt(day)
  );
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
