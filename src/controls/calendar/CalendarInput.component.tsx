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
          const result = date.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          });

          const splitDate = result.split("/");
          const ISODate =
            splitDate[2] + "-" + splitDate[1] + "-" + splitDate[0];
          setSelectedDate(date);
          onChange(id, ISODate);
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
