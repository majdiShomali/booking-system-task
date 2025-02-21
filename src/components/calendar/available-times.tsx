"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/utils/api";
import timeHelper from "@/helpers/time.helper";
import type { TPeriod } from "@/types/types";
import { Skeleton } from "../ui/skeleton";
import { ToastAction } from "../ui/toast";
import pioneerConstants from "@/constants/pioneer.constants";
import constants from "@/constants/constants";

interface AvailableTime {
  hour: string;
  period: TPeriod;
}

export function AvailableTimes({
  initialTimes = [],
  selectedDate,
  loading,
}: {
  selectedDate: Date;
  initialTimes?: AvailableTime[];
  loading: boolean;
}) {
  const [times, setTimes] = React.useState<AvailableTime[]>(initialTimes);
  const [newHour, setNewHour] = React.useState("");
  const [newPeriod, setNewPeriod] = React.useState<TPeriod>("AM");
  const { toast } = useToast();
  
  React.useEffect(() => {
    setTimes(initialTimes);
  }, [initialTimes]);

  const createAvailableSession =
    api.session.createAvailableSession.useMutation();

  const addTime = async () => {
    if (!newHour || !newPeriod) return;

    const hour = parseInt(newHour, 10);
    const isValidHour =
      hour >= constants.MIN_HOUR && hour <= constants.MAX_HOUR;

    if (!isValidHour) {
      toast({
        ...pioneerConstants.ADD_SESSION_TOAST_MESSAGES.INVALID_HOUR,
        variant: "destructive",
        action: <ToastAction altText="تراجع">رجوع</ToastAction>,
      });
      return;
    }

    const newTime = {
      hour: newHour.padStart(2, "0"),
      period: newPeriod,
    };

    const isTimeDuplicate = times.some(
      (time) =>
        time.hour.padStart(2, "0") === newTime.hour &&
        time.period === newTime.period,
    );

    if (isTimeDuplicate) {
      toast({
        ...pioneerConstants.ADD_SESSION_TOAST_MESSAGES.TIME_EXISTS,
        variant: "destructive",
        description:
          pioneerConstants.ADD_SESSION_TOAST_MESSAGES.TIME_EXISTS.description(
            Number(newHour),
            newPeriod,
          ),
      });
      return;
    }

    try {
      setTimes((prevTimes) =>
        [...prevTimes, newTime].sort((a, b) => {
          const convertTo24h = (time: { hour: string; period: TPeriod }) =>
            parseInt(time.hour) + (time.period === "PM" ? 12 : 0);
          return convertTo24h(a) - convertTo24h(b);
        }),
      );

      setNewHour("");
      toast({
        ...pioneerConstants.ADD_SESSION_TOAST_MESSAGES.TIME_ADDED,
        description:
          pioneerConstants.ADD_SESSION_TOAST_MESSAGES.TIME_ADDED.description(
            Number(newHour),
            newPeriod,
          ),
      });

      const dateUtc = timeHelper.convertUserInputToUTC({
        date: selectedDate,
        period: newPeriod,
        hour,
        minutes: 0,
      });

      await createAvailableSession.mutateAsync({
        date: dateUtc,
        available: true,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      toast(pioneerConstants.ADD_SESSION_TOAST_MESSAGES.SESSION_CREATED);
    } catch (error) {
      toast({
        ...pioneerConstants.ADD_SESSION_TOAST_MESSAGES.ERROR,
        variant: "destructive",
        action: <ToastAction altText="تراجع">رجوع</ToastAction>,
      });
    }
  };

  if (loading) {
    return <AvailableTimesLoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{"الاوفات المتاحة"} </h2>
      <div className="flex w-96 flex-wrap gap-2">
        {times?.map((time, index) => (
          <div
            key={index}
            className="flex items-center rounded-md bg-secondary p-2 text-secondary-foreground"
          >
            <span>{`${time.period} ${time.hour}:00 `}</span>
          </div>
        ))}
        {times?.length == 0 ? <p> لا يوجد اوقات متاحة </p> : null}
      </div>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          min="1"
          max="12"
          value={newHour}
          onChange={(e) => setNewHour(e.target.value)}
          placeholder="Hour"
          className="w-20"
        />
        <Select
          value={newPeriod}
          onValueChange={(value: "AM" | "PM") => setNewPeriod(value)}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={addTime}>{"اضف وقت"}</Button>
      </div>
    </div>
  );
}

function AvailableTimesLoadingSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-7 w-40" />
      <div className="flex w-96 flex-wrap gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-24 rounded-md" />
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Skeleton className="h-10 w-20" />
        <Skeleton className="h-10 w-[70px]" />
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
}
