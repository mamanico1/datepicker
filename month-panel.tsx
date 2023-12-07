import { MONTHS } from './utils';
import { useContext } from 'react';
import { DatepickerContext } from './datepicker-context';

export default function MonthPanel() {
  const { month, onMonthPick } = useContext(DatepickerContext);
  return (
    <div>
      <div className="m-month-panel">
        {MONTHS.map((d, i) => (
          <div
            key={i + d}
            className={`mp-month ${month === i ? 'selected' : ''}`}
            onClick={() => onMonthPick(i)}>
            {d.substring(0, 3).toUpperCase() || 'SUN'}
          </div>
        ))}
      </div>
    </div>
  );
}
