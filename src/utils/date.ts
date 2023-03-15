import moment from 'moment';

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isValidDate(date: Date): boolean {
  return (
    Object.prototype.toString.call(date) === '[object Date]' &&
    !isNaN(date.getTime())
  );
}

export function isSameDate(one: Date, other: Date) {
  return (
    one.getDate() === other.getDate() &&
    one.getMonth() === other.getMonth() &&
    one.getFullYear() === other.getFullYear()
  );
}

/**
 * return true if d1 sooner than d2 (day)
 */
export function isSoonerDay(d1: Date, d2: Date) {
  if (d1.getFullYear() > d2.getFullYear()) {
    return false;
  }
  if (d1.getMonth() > d2.getMonth()) {
    return false;
  }
  if (d1.getDate() > d2.getDate()) {
    return false;
  }

  return true;
}

export function getMonthIndex(
  firstMonth: Date,
  date: Date,
  months: any[],
  numberOfMonths: number
) {
  const _firstMonth = moment(firstMonth);
  const lastMonth = _firstMonth.clone().add(numberOfMonths, 'months');

  if (
    date >= _firstMonth.toDate() &&
    date <= lastMonth.endOf('month').toDate()
  ) {
    const monthIndex = moment(date).diff(_firstMonth, 'months');

    if (monthIndex >= 0 && monthIndex <= months.length) {
      return monthIndex;
    }
  }

  return null;
}
