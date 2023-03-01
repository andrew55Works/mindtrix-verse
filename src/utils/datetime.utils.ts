import dayjs from 'dayjs';

export const TIME_FORMAT = {
  HHMMSSTosec: (time: string): number => {
    try {
      if (!time) return 0;
      const arr = time.split(':');
      const len = arr?.length ?? 0;
      const hr = arr.length > 0 && !!arr[0] ? parseInt(arr[0], 10) : 0;
      const min = arr.length > 1 && !!arr[1] ? parseInt(arr[1], 10) : 0;
      const sec = arr.length > 2 && !!arr[2] ? parseInt(arr[2], 10) : 0;
      if (len === 0) {
        return 0;
      } else if (len === 1) {
        return hr;
      } else if (len === 2) {
        return hr * 60 + min;
      } else if (len === 3) {
        return hr * 60 * 60 + min * 60 + sec;
      } else {
        return hr * 60 * 60 + min * 60 + sec;
      }
    } catch (e) {
      console.error(e);
      return 0;
    }
  },
  MMSSTosec: (time: string): number => {
    try {
      if (!time) return 0;
      const arr = time.split(':');
      const min = arr.length > 0 && !!arr[0] ? parseInt(arr[0], 10) : 0;
      const sec = arr.length > 1 && !!arr[1] ? parseInt(arr[1], 10) : 0;
      return min * 60 + sec;
    } catch (e) {
      console.error(e);
      return 0;
    }
  },
  secToMMSS: (numSecs: number) => {
    const secNum =
      typeof numSecs === 'string' ? parseInt(numSecs, 10) : numSecs;
    const minutes = Math.floor(secNum / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (secNum - Number(minutes) * 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  },
  secToHHMMSS: (numSecs: number) => {
    const secNum =
      typeof numSecs === 'string' ? parseInt(numSecs, 10) : numSecs;
    if (isNaN(secNum)) return 'loading...';
    const hours = Math.floor(secNum / 3600)
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((secNum - Number(hours) * 3600) / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (secNum - Number(hours) * 3600 - Number(minutes) * 60)
      .toString()
      .padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  },
  getTimeSecAndMMss: (sec: number) => ({
    sec,
    MMss: TIME_FORMAT.secToMMSS(sec),
  }),
};

export const GET_TODAY = {
  dtoFormat: (date?: Date) => new Date(date ? date : Date.now()).getTime(),
};

export const DATE_FORMAT = {
  'YYYY/MM/DD': (date: Date): string => dayjs(date).format('YYYY/MM/DD'),
  'YYYY/MM/DD HH:MM': (date: Date): string =>
    dayjs(date).format('YYYY/MM/DD HH:MM'),
  'YYYY/MM/DD HH:MM:ss': (date: Date): string =>
    dayjs(date).format('YYYY/MM/DD HH:MM:ss'),
};

export const ADD_TIME = {
  addHours: (date: Date, hours: number) =>
    dayjs(date).add(hours, 'hour').toDate(),
  addDays: (date: Date, days: number) => dayjs(date).add(days, 'day').toDate(),
};

export const formatMinutes = (minutes: number) => {
  return minutes < 10 ? `0${minutes}` : `${minutes}`;
};

export const formatSeconds = (seconds: number) => {
  return seconds < 10 ? `0${seconds}` : `${seconds}`;
};
