import { useContext } from 'react';
import { DatepickerContext } from './datepicker-context';
import { getMonthStr } from './utils';

export default function CalendarActions() {
  const {
    year,
    month,
    setNewYear,
    setNewMonth,
    showMonthPanel,
    showYearsPanel,
    setShowMonthPanel,
    setShowYearsPanel,
    yearsRange
  } = useContext(DatepickerContext);

  const yearToDisplay = showYearsPanel
    ? `${yearsRange[1]}-${yearsRange[yearsRange.length - 2]}`
    : year;

  const yearOffset = showYearsPanel ? 10 : 1;

  return (
    <div className="m-picker-header">
      <div className="mp-btn" onClick={() => setNewYear(-1 * yearOffset)}>
        {`<<`}
      </div>
      <div
        className="mp-btn"
        onClick={() => setNewMonth(-1)}
        hidden={showMonthPanel || showYearsPanel}>
        {`<`}
      </div>
      <div className="mym-picker">
        <div className="m-picker-year" onClick={() => setShowYearsPanel(true)}>
          {yearToDisplay}
        </div>
        <div
          className="m-picker-month"
          onClick={() => setShowMonthPanel(true)}
          hidden={showMonthPanel || showYearsPanel}>
          {getMonthStr(month)}
        </div>
      </div>
      <div
        className="mp-btn"
        onClick={() => setNewMonth(1)}
        hidden={showMonthPanel || showYearsPanel}>
        {`>`}
      </div>
      <div className="mp-btn" onClick={() => setNewYear(1 * yearOffset)}>
        {`>>`}
      </div>
    </div>
  );
}
