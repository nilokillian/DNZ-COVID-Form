import React, { useCallback } from "react";
import { DatePicker, defaultCalendarStrings, Label } from "@fluentui/react";

export interface ICalendarInputProps {
  id: string;
  label: string;
  value: string;
  required: boolean;
  onChange: (id: string, value: string) => void;
}

export const CalendarInput: React.FC<ICalendarInputProps> = React.memo(
  ({ id, label, value, onChange, required }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>(() =>
      value ? new Date(value) : new Date()
    );

    const onFormatDate = (date?: Date): string => {
      return !date
        ? ""
        : date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();
    };

    const onDateChage = useCallback(
      (date: Date | null | undefined): void => {
        if (date && date !== null) {
          const splitDate = date.toLocaleString().split(",")[0].split("/");
          const stringDate = `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
          setSelectedDate(date);
          onChange(id, stringDate);
        }
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
        <DatePicker
          onSelectDate={onDateChage}
          value={selectedDate}
          strings={defaultCalendarStrings}
          formatDate={onFormatDate}
          styles={{ root: { width: "auto" } }}
        />
      </div>
    );
  }
);
