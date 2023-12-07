import { CSSProperties, useContext } from 'react';
import { DatepickerContext } from './datepicker-context';
import { getDayInMonth } from './utils';

export default function CalendarIcon() {
  const { selectedDay } = useContext(DatepickerContext);
  return (
    <div style={wrapperStyles}>
      <div style={frameStyles}>
        <div style={iconUpper}>
          <div style={leftHanger}></div>
          <div style={rightHanger}></div>
        </div>
        <span style={day}>{getDayInMonth(selectedDay)}</span>
      </div>
    </div>
  );
}

const wrapperStyles: CSSProperties = {
  display: `flex`,
  justifyContent: `center`
};

const frameStyles: CSSProperties = {
  height: `1.4em`,
  width: `1.4em`,
  border: `0.11em solid #666666`,
  borderRadius: `0.3em`,
  position: `relative`
};

const iconUpper: CSSProperties = {
  padding: `0.15em`,
  borderBottom: `0.11em solid #666666`,
  position: `relative`
};

const leftHanger: CSSProperties = {
  height: `0.5em`,
  width: `0.09em`,
  backgroundColor: `#666666`,
  borderRadius: `2px`,
  position: `absolute`,
  top: `-100%`,
  left: `25%`
};
const day: CSSProperties = {
  fontSize: `0.08em`,
  fontWeight: `500`,
  color: `#777777`,
  position: `absolute`,
  bottom: `0.05em`,
  left: `50%`,
  transform: `translateX(-50%)`
};

const rightHanger: CSSProperties = {
  height: `0.5em`,
  width: `0.09em`,
  backgroundColor: `#666666`,
  borderRadius: `2px`,
  position: `absolute`,
  top: `-100%`,
  right: `25%`
};
