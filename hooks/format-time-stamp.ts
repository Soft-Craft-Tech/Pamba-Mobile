type TimeObj = {
  hours: number;
  minutes: number;
  seconds: number;
};

const convertToTimestamp = (timeObj: TimeObj): number => {
  const { hours, minutes, seconds } = timeObj;
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);
  date.setMilliseconds(0);
  return date.getTime();
};
