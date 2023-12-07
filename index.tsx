import './index.css';
import { useContext } from 'react';
import Calendar from './calendar';
import CalendarActions from './calendar-actions';
import DatepickerProvider, { DatepickerContext } from './datepicker-context';
import DateInput from './date-input';
import MonthPanel from './month-panel';
import YearsPanel from './years-panel';

export default function Datepicker() {
  return (
    <DatepickerProvider>
      <Component />
    </DatepickerProvider>
  );
}

function Component() {
  const { pickerRef, showCalendar, showMonthPanel, showYearsPanel } = useContext(DatepickerContext);
  return (
    <div ref={pickerRef} className="m-picker-wrapper">
      <div className="m-picker">
        <DateInput />
        {showCalendar && (
          <div className={`m-picker-container ${showCalendar ? `visiblel` : `hiddenl`}`}>
            <CalendarActions />
            <div className="mp-panel">
              {!showMonthPanel && !showYearsPanel && <Calendar />}
              {showMonthPanel && !showYearsPanel && <MonthPanel />}
              {showYearsPanel && <YearsPanel />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
