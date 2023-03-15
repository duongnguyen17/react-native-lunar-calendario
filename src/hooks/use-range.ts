import { useMemo } from 'react';
import moment from 'moment';

import { isValidDate } from '../utils/date';
import { CalendarProps } from '../types';

interface Input extends Pick<CalendarProps, 'range' | 'numberOfMonths'> {
  firstMonthToRender: Date;
}

interface Result {
  start?: Date;
  end?: Date;
}

export default function useRange({
  range,
  numberOfMonths,
  firstMonthToRender,
}: Input): Result {
  return useMemo(() => {
    let _startDate: Date | undefined;
    let _endDate: Date | undefined;

    if (range[0] > range[1]) {
      _startDate = range[1];
      _endDate = range[0];
    } else {
      _endDate = range[1];
      _startDate = range[0];
    }

    let start: Date | undefined;
    const lastMonth = moment(firstMonthToRender)
      .add(numberOfMonths, 'months')
      .toDate();

    if (_startDate && isValidDate(new Date(_startDate))) {
      start = moment(_startDate, 'YYYY-MM-DD').toDate();

      if (start > lastMonth) {
        start = undefined;
      }
    }

    let end =
      _endDate && isValidDate(new Date(_endDate)) && _endDate <= lastMonth
        ? moment(_endDate, 'YYYY-MM-DD').toDate()
        : undefined;

    return {
      start,
      end,
    };
  }, [range, firstMonthToRender, numberOfMonths]);
}
