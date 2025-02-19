import type { TPeriod } from "@/types/types";
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

const convertDateToTime = (date: Date | string) => {
  const newDate = new Date(date);
  const hours = format(newDate, "hh");
  const ampm = format(newDate, "a") as TPeriod;
  return { hours, ampm };
};

const timeHelper = {
  convertUserInputToUTC,
  convertLocalDateToUTC,
  convertDateToTime,
}
export default timeHelper ;
