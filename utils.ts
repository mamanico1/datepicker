export const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export function getDateStringFromTimestamp(dateInMs: number): string {
  const dateObject = new Date(dateInMs);
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  return (
    dateObject.getFullYear() +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  );
}

export function getDayInMonth(dateInMs: number): number {
  return new Date(dateInMs).getDate();
}

export function getMonthStr(month: number): string {
  return MONTHS[Math.max(Math.min(11, month), 0)] || 'Month';
}

export function getNumberOfDaysInSpecificMonth(year: number, month: number): number {
  return 32 - new Date(year, month, 32).getDate();
}

export function fillYearsRange(year: number) {
  return new Array(12).fill(0).map((_, idx) => {
    return year - (year % 10) - 1 + idx;
  });
}
