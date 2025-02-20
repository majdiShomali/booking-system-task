"use client";

import { memo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import constants from "@/constants/constants";

interface CalendarProps {
  locale?: string;
  selectedDate: Date | null;
  onDateSelect?: (date: Date) => void;
  events?: Date[];
  sessionDuration?: number;
  onChangeMonth?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  locale = "ar-SA",
  selectedDate,
  onDateSelect,
  events = [],
  sessionDuration = 60,
  onChangeMonth,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days = [];

    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
    );
    setCurrentDate(date);
    if (onChangeMonth) {
      onChangeMonth(date);
    }
  };

  const handleNextMonth = () => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
    );

    setCurrentDate(date);
    if (onChangeMonth) {
      onChangeMonth(date);
    }
  };

  const isSelectedDate = (date: Date) => {
    return selectedDate?.toDateString() === date.toDateString();
  };

  const hasEvent = (date: Date) => {
    return events.some((event) => event.toDateString() === date.toDateString());
  };

  return (
    <Card className="rtl mx-auto w-full max-w-md space-y-4 p-3">
      <div className="space-y-2 text-center">
        <h2 className="text-xl font-semibold">{"الأيام المتاحة"}</h2>
        <p className="text-sm text-muted-foreground">{`مدة الجلسة ${sessionDuration} دقيقة محددة سابقاً من قبل المستشار`}</p>
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={handlePrevMonth} className="p-2">
          <ChevronRight className="h-5 w-5" />
        </Button>
        <h3 className="font-medium">
          {currentDate.toLocaleDateString(locale, {
            month: "long",
            year: "numeric",
            calendar: "gregory",
          })}
        </h3>
        <Button onClick={handleNextMonth} className="p-2">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {constants.weekDaysAr.map((day) => (
          <div key={day} className="py-2 text-center text-sm font-medium">
            {day}
          </div>
        ))}

        {days.map((day, index) => (
          <Button
            key={index}
            onClick={() => onDateSelect?.(day.date)}
            disabled={!day.isCurrentMonth}
            variant={"outline"}
            className={cn(
              "flex aspect-square items-center justify-center rounded-md p-2 text-sm",
              !day.isCurrentMonth && "",
              day.isCurrentMonth && "",
              isSelectedDate(day.date) &&
                "bg-blue-500 text-white hover:bg-blue-600",
              hasEvent(day.date) &&
                !isSelectedDate(day.date) &&
                `border-2 border-primary text-secondary-foreground`,
            )}
          >
            {day.date.getDate()}
          </Button>
        ))}
      </div>
    </Card>
  );
};

export default memo(Calendar);
