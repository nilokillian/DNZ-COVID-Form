import React, { useCallback, useEffect } from "react";
import { DatePicker, defaultCalendarStrings, Label } from "@fluentui/react";

export interface ICalendarInputProps {
  id: string;
  label: string;
  value: string | null;
  required: boolean;
  onChange: (id: string, value: string) => void;
}

export const CalendarInput: React.FC<ICalendarInputProps> = React.memo(
  ({ id, label, value, onChange, required }) => {
    const [selectedDate, setSelectedDate] = React.useState<Date>();

    const onFormatDate = (date?: Date): string => {
      return !date
        ? ""
        : date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear();
    };

    const onParseDateFromString = React.useCallback(
      (newValue: string): Date => {
        const previousValue = value ? new Date(value) : new Date();
        const newValueParts = (newValue || "").trim().split("/");
        const day =
          newValueParts.length > 0
            ? Math.max(1, Math.min(31, parseInt(newValueParts[0], 10)))
            : previousValue.getDate();
        const month =
          newValueParts.length > 1
            ? Math.max(1, Math.min(12, parseInt(newValueParts[1], 10))) - 1
            : previousValue.getMonth();
        let year =
          newValueParts.length > 2
            ? parseInt(newValueParts[2], 10)
            : previousValue.getFullYear();
        if (year < 100) {
          year +=
            previousValue.getFullYear() - (previousValue.getFullYear() % 100);
        }
        return new Date(year, month, day);
      },
      [value]
    );

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

    useEffect(() => {
      if (value) {
        setSelectedDate(new Date(value));
      }
    }, [value]);

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
          allowTextInput
          formatDate={onFormatDate}
          parseDateFromString={onParseDateFromString}
          strings={defaultCalendarStrings}
          styles={{ root: { width: "auto" } }}
        />
      </div>
    );
  }
);
