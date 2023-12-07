import { useContext } from 'react';
import { DatepickerContext } from '@/features/datepicker/datepicker-context';

export default function YearsPanel() {
  const { year, yearsRange, onYearPick } = useContext(DatepickerContext);

  return (
    <div>
      <div className="m-year-panel">
        {yearsRange.map((y, i) => (
          <div
            key={i + y}
            className={`mp-year ${year === y ? 'selected' : ''}${
              i === 0 || i === 11 ? 'other' : ''
            }`}
            onClick={() => onYearPick(y)}>
            {y}
          </div>
        ))}
      </div>
    </div>
  );
}
