import { DAYS, getNumberOfDaysInSpecificMonth } from './utils';

type CalendarDayInfo = {
  indexOnBoard: number; // 0 - 41
  numOfDaysInMonth: number;
  firstDayInMonthWeeklyIndex: number; // 0 - 6
  year: number;
  month: number;
};

export type Offset = 1 | -1 | 0;

export interface Day {
  dayInMonth: number;
  dayInWeek: number;
  dayName: string;
  monthOffset: Offset;
  dateInMs: number;
}

interface IDate {
  year: number;
  month: number;
  day: number;
}

export default function useDatepickerPanel() {
  function getMonthDaysToDisplay(year: number, month: number): Day[] {
    const monthArray: Day[] = [];
    const firstDayInMonthWeeklyIndex = new Date(year, month).getDay();
    const numOfDaysInMonth = getNumberOfDaysInSpecificMonth(year, month);
    // monthly calendar can show up to 42 days - span on 6 weeks
    for (let indexOnBoard = 0; indexOnBoard < 42; indexOnBoard++) {
      const day = getDayAvailabilityInDisplayedMonth({
        indexOnBoard,
        numOfDaysInMonth,
        firstDayInMonthWeeklyIndex,
        year,
        month
      });
      monthArray.push(day as Day);
    }
    return monthArray;
  }

  function getDayAvailabilityInDisplayedMonth({
    indexOnBoard,
    numOfDaysInMonth,
    firstDayInMonthWeeklyIndex,
    year,
    month
  }: CalendarDayInfo): Day {
    const dayOnBoard = indexOnBoard - firstDayInMonthWeeklyIndex;
    const dayInWeek = indexOnBoard % 7;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = year - 1;

    const prevMonthNumberOfDays = getNumberOfDaysInSpecificMonth(prevYear, prevMonth);
    const dayInMonth =
      (dayOnBoard < 0 ? prevMonthNumberOfDays + dayOnBoard : dayOnBoard % numOfDaysInMonth) + 1;
    const monthOffset = dayOnBoard < 0 ? -1 : dayOnBoard >= numOfDaysInMonth ? 1 : 0;

    let newMonth = month + monthOffset;
    let newYear = year;
    if (newMonth === -1) {
      newMonth = 11;
      newYear -= 1;
    } else if (newMonth === 12) {
      newMonth = 0;
      newYear += 1;
    }

    const dateInMs = new Date(/*year*/ newYear, /*month*/ newMonth, dayInMonth).getTime();

    return {
      dayInMonth,
      dayInWeek,
      monthOffset,
      dayName: DAYS[dayInWeek],
      dateInMs
    } as Day;
  }

  function getUpdatedMonthAndYear(month: number, year: number, monthOffset: Offset) {
    let newYear = year;
    let newMonth = month + monthOffset;
    if (newMonth === -1) {
      newMonth = 11;
      newYear--;
    } else if (newMonth === 12) {
      newMonth = 0;
      newYear++;
    }
    return {
      newMonth,
      newYear
    };
  }

  function getDateFromDateString(dateValue: string): IDate | null {
    const [year, month, day] = dateValue.split('-').map((d) => parseInt(d, 10));
    if (!year || !month || !day) return null;
    return { year, month, day } as IDate;
  }

  return {
    getMonthDaysToDisplay,
    getUpdatedMonthAndYear,
    getDateFromDateString
  };
}
