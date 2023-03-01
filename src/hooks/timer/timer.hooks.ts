import { useEffect, useRef, useState } from 'react';

const getNumberNotLowerThanZero = (num: number): number => {
  return num <= 0 ? 0 : num;
};

const getCountdownNumber = (preNumber: number): number => {
  return getNumberNotLowerThanZero(preNumber - 1);
};

export interface TimerProps {
  activateTimer: () => void;
  isTimerActive: boolean;
  isTimesUp: boolean;
  seconds: number;
}

export const useTimer = (initSecond: number): TimerProps => {
  const [seconds, setSeconds] = useState(initSecond);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const isTimesUp = seconds === 0;
  const activateTimer = () => {
    setSeconds(initSecond);
    setIsTimerActive(true);
  };
  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => {
        if (seconds === 0) {
          clearInterval(interval);
          setIsTimerActive(false);
        } else {
          setSeconds((preState) => getCountdownNumber(preState));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [seconds, isTimerActive]);
  return { isTimerActive, isTimesUp, seconds, activateTimer };
};
