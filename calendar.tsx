import { useContext } from 'react';
import { DAYS } from './utils';
import { DatepickerContext } from './datepicker-context';

export default function Calendar() {
  const { isToday, isSelectedDay, month, monthDaysInCalendar, onDayPick } =
    useContext(DatepickerContext);

  return (
    <div>
      <div className="m-picker-week">
        {DAYS.map((d, i) => (
          <div key={i + d} className="mp-weekday">
            {d.substring(0, 3).toUpperCase() || 'SUN'}
          </div>
        ))}
      </div>
      <div className="mp-calendar">
        {monthDaysInCalendar.map((day, i) => {
          return (
            <div
              className={`mp-day${day.monthOffset !== 0 ? ' disabled' : ''}${
                isToday(day) ? ' highlight' : ''
              }${isSelectedDay(day) ? ' selected' : ''}`}
              key={`${i}-${day}`}
              onClick={() => onDayPick(day)}>
              {day.dayInMonth}
            </div>
          );
        })}
      </div>
    </div>
  );
}
