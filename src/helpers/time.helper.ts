import constants from "@/constants/constants";
import type { TPeriod } from "@/types/types";
import { toZonedTime , format as tzFormat,fromZonedTime } from 'date-fns-tz';

const convertUserInputToUTC = ({ date, period, hour, minutes }: { date: Date | string; period: TPeriod; hour: number; minutes: number }) => {
  const selectedDate = new Date(date);
  const formattedHour = period === "PM" && hour !== constants.MAX_HOUR  ? hour + constants.MAX_HOUR : hour === constants.MAX_HOUR && period === "AM" ? 0 : hour;
  selectedDate.setHours(formattedHour, minutes, 0, 0);
  return fromZonedTime(selectedDate, Intl.DateTimeFormat().resolvedOptions().timeZone).toISOString();
};

const convertDateToTime = (date: Date | string) => {
  const newDate = new Date(date);
  const hours = tzFormat(newDate, "hh");
  const ampm = tzFormat(newDate, "a") as TPeriod;
  return { hours, ampm };
};

const toUTCDate = (date: Date): Date => {
  const viewerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  return fromZonedTime(date, viewerTimeZone);
};
const convertEventTimeToLocalTime = (eventTimeUTC:string | Date)=>{
const viewerTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
const viewerLocalTime = toZonedTime(eventTimeUTC, viewerTimeZone);
const viewerTimeFormatted = tzFormat(viewerLocalTime, 'yyyy-MM-dd HH:mm zzz', { timeZone: viewerTimeZone });
return  viewerTimeFormatted
}



const timeHelper = {
  convertUserInputToUTC,
  convertDateToTime,
  toUTCDate,
  convertEventTimeToLocalTime,
}
export default timeHelper ;
