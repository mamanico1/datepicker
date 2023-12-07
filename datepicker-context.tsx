import { createContext, MutableRefObject, useEffect, useRef, useState } from 'react';
import { fillYearsRange, getDateStringFromTimestamp } from './utils';
import useDatepickerPanel, { Day, Offset } from './use-datepicker-panel';

export const DatepickerContext = createContext({} as DatepickerContextProps);

export default function DatepickerProvider({ children }) {
  const date = new Date();
  const oneDay = 60 * 60 * 24 * 1000;
  const today = Date.now() - (Date.now() % oneDay) + new Date().getTimezoneOffset() * 1000 * 60;
  const { getMonthDaysToDisplay, getUpdatedMonthAndYear, getDateFromDateString } =
    useDatepickerPanel();
  const [year, setYear] = useState<number>(date.getFullYear());
  const [month, setMonth] = useState<number>(date.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(today || 0);
  const [monthDaysInCalendar, setMonthDaysInCalendar] = useState<Day[]>(
    getMonthDaysToDisplay(year, month)
  );
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [showMonthPanel, setShowMonthPanel] = useState<boolean>(false);
  const [showYearsPanel, setShowYearsPanel] = useState<boolean>(false);
  const [yearsRange, setYearsRange] = useState<number[]>(fillYearsRange(year));
  const inputRef = useRef<HTMLInputElement | null>(null);
  const pickerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function isOutside(e) {
      e.stopImmediatePropagation();
      if (showCalendar && pickerRef?.current && !pickerRef?.current?.contains(e.target)) {
        //toggleCalendar();
      }
    }
    document.addEventListener('click', isOutside);
    return () => {
      document.removeEventListener('click', isOutside);
    };
  }, [showCalendar]);

  useEffect(() => {
    setMonthDaysInCalendar(getMonthDaysToDisplay(year, month));
  }, [month, year]);

  function toggleCalendar(): void {
    setShowCalendar((prevState) => !prevState);
  }

  function onInputChangeHandler() {
    const inputValue = inputRef?.current?.value || '';
    const dateInfo = getDateFromDateString(inputValue);
    if (!dateInfo) return;
    const selectedDate = new Date(dateInfo.year, dateInfo.month - 1, dateInfo.day).getTime();
    if (!selectedDate) return;
    setSelectedDay(selectedDate);
    setYear(dateInfo.year);
    setMonth(dateInfo.month - 1);
    setMonthDaysInCalendar(getMonthDaysToDisplay(dateInfo.year, dateInfo.month - 1));
  }

  function isToday(day: Day): boolean {
    return day.dateInMs === today;
  }

  function isSelectedDay(day: Day): boolean {
    return day.dateInMs === selectedDay;
  }

  function setDateToInput(dateInMs: number): void {
    inputRef.current && (inputRef.current.value = getDateStringFromTimestamp(dateInMs));
  }

  function onDayPick(day: Day): void {
    if (!day.dateInMs) return;
    setNewMonth(day.monthOffset);
    setSelectedDay(day.dateInMs);
    setDateToInput(day.dateInMs);
    toggleCalendar();
  }

  function setNewYear(offset: Offset): void {
    if (showYearsPanel) {
      setYearsRange((prevState) => fillYearsRange(prevState[1] + offset));
    } else {
      setYear((prevState) => prevState + offset);
    }
  }

  function setNewMonth(offset: Offset): void {
    const { newMonth, newYear } = getUpdatedMonthAndYear(month, year, offset);
    newYear !== year && setYear(newYear);
    newMonth !== month && setMonth(newMonth);
  }

  function onMonthPick(idx: number): void {
    month !== idx && setMonth(idx);
    setShowMonthPanel(false);
  }

  function onYearPick(y: number): void {
    year !== y && setYear(y);
    setShowYearsPanel(false);
  }

  const value = {
    inputRef,
    pickerRef,
    selectedDay,
    year,
    month,
    monthDaysInCalendar,
    yearsRange,
    showCalendar,
    showMonthPanel,
    showYearsPanel,
    isToday,
    isSelectedDay,
    onDayPick,
    onInputChangeHandler,
    setNewYear,
    setNewMonth,
    toggleCalendar,
    onMonthPick,
    setShowMonthPanel,
    onYearPick,
    setShowYearsPanel
  } as DatepickerContextProps;

  return <DatepickerContext.Provider value={value}>{children}</DatepickerContext.Provider>;
}

interface DatepickerContextProps {
  inputRef: MutableRefObject<HTMLInputElement | null>;
  pickerRef: MutableRefObject<HTMLDivElement | null>;
  onInputChangeHandler: () => void;
  setNewYear: any;
  setNewMonth: any;
  year: number;
  month: number;
  monthDaysInCalendar: Day[];
  isToday: (d: Day) => boolean;
  isSelectedDay: (d: Day) => boolean;
  onDayPick: (d: Day) => void;
  selectedDay: number;
  showCalendar: boolean;
  toggleCalendar: () => void;
  showMonthPanel: boolean;
  showYearsPanel: boolean;
  onMonthPick: (idx: number) => void;
  setShowMonthPanel: (s: boolean) => void;
  onYearPick: (y: number) => void;
  yearsRange: number[];
  setShowYearsPanel: (s: boolean) => void;
}
