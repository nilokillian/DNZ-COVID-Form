import React from "react";
import { Calendar, defaultCalendarStrings, Label } from "@fluentui/react";

export interface ICalendarInputProps {
  id: string;
  label: string;
  value: string;
  required: boolean;
  onChange: (id: string, value: string) => void;
}

export const CalendarInput: React.FC<ICalendarInputProps> = React.memo(
  ({ id, label, value, onChange }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(
      value ? new Date(value) : new Date()
    );

    const onDateChage = React.useCallback(
      (date: Date, selectedDateRangeArray?: Date[] | undefined): void => {
        setSelectedDate(date);
      },
      [value]
    );

    React.useEffect(() => {
      if (selectedDate.toLocaleDateString() !== value) {
        onChange(id, selectedDate.toLocaleDateString());
      }
    }, [selectedDate]);

    return (
      <div
        className="radio"
        style={{
          padding: "20px 0px 30px",
        }}
      >
        <Label>{label}</Label>
        <Calendar
          onSelectDate={onDateChage}
          value={selectedDate}
          strings={defaultCalendarStrings}
        />
      </div>
    );
  }
);
