import React from "react";
import { Calendar, defaultCalendarStrings, Label } from "@fluentui/react";

export interface ICalendarInputProps {
  id: string;
  label: string;
  value: Date;
  required: boolean;
  onChange: (id: string, value: Date) => void;
}

export const CalendarInput: React.FC<ICalendarInputProps> = React.memo(
  ({ id, label, value, onChange, required }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(() =>
      value ? new Date(value) : new Date()
    );

    const onDateChage = React.useCallback(
      (date: Date, _selectedDateRangeArray?: Date[] | undefined): void => {
        setSelectedDate(date);
        onChange(id, date);
      },
      [onChange, id]
    );

    return (
      <div
        className="radio"
        style={{
          padding: "10px 0px 10px",
        }}
      >
        <Label required={required}>{label}</Label>
        <Calendar
          onSelectDate={onDateChage}
          value={selectedDate}
          strings={defaultCalendarStrings}
          styles={{ root: { width: "auto" } }}
        />
      </div>
    );
  }
);
