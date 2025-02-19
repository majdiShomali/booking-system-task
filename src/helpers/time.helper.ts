import { TPeriod } from "@/types/types";
import { format } from "date-fns";

const convertUserInputToUTC = (data: {
  date: Date | string;
  period: "AM" | "PM";
  hour: number;
  minutes: number;
}) => {
  const selectedDate = new Date(data.date);
  const formattedHour =
    data.period === "PM" && data.hour !== 12
      ? data.hour + 12
      : data.hour === 12 && data.period === "AM"
        ? 0
        : data.hour;
  selectedDate.setHours(formattedHour, data.minutes, 0, 0);
  const utcDate = new Date(selectedDate.toISOString());
  return utcDate;
};
const convertLocalDateToUTC = (date: Date) => {
  const utcDate = new Date(date.toISOString());
  return utcDate;
};
const convertUserInputToSEUTC = (date: Date | string) => {
  const localDate = new Date(date);
  const startOfDayUTC = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      0,
      0,
      0,
    ),
  );
  const endOfDayUTC = new Date(
    Date.UTC(
      localDate.getFullYear(),
      localDate.getMonth(),
      localDate.getDate(),
      23,
      59,
      59,
    ),
  );

  return { startOfDayUTC, endOfDayUTC };
};

const convertDateToTime = (date: Date | string) => {
  const newDate = new Date(date);
  const hours = format(newDate, "h");
  const ampm = format(newDate, "a") as TPeriod;
  return { hours, ampm };
};

export default {
  convertUserInputToUTC,
  convertUserInputToSEUTC,
  convertLocalDateToUTC,
  convertDateToTime
};
