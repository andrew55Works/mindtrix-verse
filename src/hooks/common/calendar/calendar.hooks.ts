import React from 'react';
import { CalendarRange } from '@ui-kitten/components';
import { ADD_TIME } from '../../../utils/datetime.utils';

export const useCalendarRange = (
  // 2022/10/19
  min = new Date(1665936000 * 1000),
  // 2024/01/19
  max = new Date(1705617545 * 1000),
  defaultDayRange = 90,
) => {
  const [range, setRange] = React.useState<CalendarRange<Date>>({
    startDate: min,
    endDate: max,
  });
  const [date, setDate] = React.useState<Date>();
  const startDate = range?.startDate ?? min;
  const endDate = max
    ? max
    : range?.endDate ?? ADD_TIME.addDays(min, defaultDayRange);
  const onSelectCalendarRange = (nextRange: CalendarRange<Date>) =>
    setRange(nextRange);

  return {
    min,
    max,
    date,
    range,
    startDate,
    endDate,
    onSelectCalendarRange,
    onSelectDate: setDate,
  };
};
