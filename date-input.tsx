import { useContext } from 'react';
import { DatepickerContext } from './datepicker-context';
import CalendarIcon from './calendar-icon';

export default function DateInput() {
  const { inputRef, onInputChangeHandler, toggleCalendar } = useContext(DatepickerContext);
  return (
    <span className="m-picker-input" onClick={toggleCalendar}>
      <input placeholder="Select date" onChange={onInputChangeHandler} ref={inputRef} />
      <CalendarIcon />
    </span>
  );
}
