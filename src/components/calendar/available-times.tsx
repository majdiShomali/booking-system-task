"use client";

import * as React from "react";
import { X } from "lucide-react";

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
import SubmitButton from "../ui/submit-button";
import { api } from "@/utils/api";
import timeHelper from "@/helpers/time.helper";

interface AvailableTime {
  hour: string;
  period: "AM" | "PM";
}

export function AvailableTimes({
  initialTimes = [],
  selectedDate,
}: {
  selectedDate: Date;
  initialTimes?: AvailableTime[];
}) {
  const { data, error, isLoading } = api.pioneer.getPioneerAvailableSession.useQuery({date:timeHelper.convertLocalDateToUTC(selectedDate)});


  const [times, setTimes] = React.useState<AvailableTime[]>(initialTimes);
  const [newHour, setNewHour] = React.useState("");
  const [newPeriod, setNewPeriod] = React.useState<"AM" | "PM">("AM");
  const { toast } = useToast();

  const createAvailableSession =
    api.pioneer.createAvailableSession.useMutation();

  const addTime = async () => {
    if (newHour && newPeriod) {
      const hour = Number.parseInt(newHour);
      if (hour >= 1 && hour <= 12) {
        const newTime = { hour: newHour, period: newPeriod };
        if (
          times.some(
            (time) =>
              time.hour === newTime.hour && time.period === newTime.period,
          )
        ) {
          toast({
            title: "Time already exists",
            description: `${newHour} ${newPeriod} is already in the list.`,
            variant: "destructive",
          });
        } else {
          setTimes((prevTimes) =>
            [...prevTimes, newTime].sort((a, b) => {
              const aHour =
                Number.parseInt(a.hour) + (a.period === "PM" ? 12 : 0);
              const bHour =
                Number.parseInt(b.hour) + (b.period === "PM" ? 12 : 0);
              return aHour - bHour;
            }),
          );
          setNewHour("");
          toast({
            title: "Time added",
            description: `${newHour} ${newPeriod} has been added to the list.`,
          });
          const dateUtc = timeHelper.convertUserInputToUTC({
            date: selectedDate,
            period: newPeriod,
            hour,
            minutes: 0,
          });
          const createdAvailableSessions =
            await createAvailableSession.mutateAsync({
              date: dateUtc,
              available: true,
            });
        }
      } else {
        toast({
          title: "Invalid hour",
          description: "Please enter a valid hour between 1 and 12.",
          variant: "destructive",
        });
      }
    }
  };

  const removeTime = (index: number) => {
    setTimes(times.filter((_, i) => i !== index));
    toast({
      title: "Time removed",
      description: "The selected time has been removed from the list.",
    });
  };



  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Available Times</h2>
      <div className="flex flex-wrap gap-2">
        {times.map((time, index) => (
          <div
            key={index}
            className="flex items-center rounded-md bg-secondary p-2 text-secondary-foreground"
          >
            <span>{`${time.hour} ${time.period}`}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-4 w-4"
              onClick={() => removeTime(index)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove time</span>
            </Button>
          </div>
        ))}
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
        <Button onClick={addTime}>Add Time</Button>
      </div>
    </div>
  );
}
