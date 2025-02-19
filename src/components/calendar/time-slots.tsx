"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BookConfirmationAlert from "@/pages/pioneers/[id]/components/book-confiramtion.alert";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

interface TimeSlot {
  session_id: string;
  time: string;
  available: boolean;
}

interface TimeSlotsProps {
  onTimeSelect?: (time: string) => void;
  onBooking?: (selectedTime: string) => void;
  availableSlots?: TimeSlot[];
  loading: boolean;
  isExpired: boolean;
}

export default function TimeSlots({
  onTimeSelect,
  onBooking,
  availableSlots,
  loading,
  isExpired
}: TimeSlotsProps) {
  const [selectedTime, setSelectedTime] = useState<string>("");

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    onTimeSelect?.(time);
  };

  const handleBooking = () => {
    if (selectedTime) {
      onBooking?.(selectedTime);
    }
  };

  return (
    <Card className="rtl mx-auto w-full max-w-md space-y-2 p-3">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-between">
        <h2 className="text-start text-xl font-semibold">
          {"الأوقات المتاحة"}
        </h2>
        {availableSlots && availableSlots?.length>0 &&
        <p>
          <Badge variant={'outline'} className={` text-md ${isExpired? "text-red-500" : "text-green-500"}`}><Clock className="ml-2" size={15}/> {isExpired? "منتهية" : "متاحة"} </Badge>
        </p>
        }
        </div>
        <p className="text-start text-sm text-muted-foreground">
          {"سيتم الحجز بتوقيت بلدك الحالي"}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Skeleton key={index} className="h-10 w-full" />
          ))
        ) : availableSlots && availableSlots?.length > 0 ? (
          availableSlots?.map((slot, index) => (
            <Button
              variant="outline"
              key={index}
              onClick={() => handleTimeSelect(slot.time)}
              disabled={!slot.available}
              className={cn(
                "rounded-lg border px-2 py-1 text-sm font-medium transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                slot.available
                  ? "hover:border-primary hover:text-primary"
                  : "cursor-not-allowed opacity-50",
                selectedTime === slot.time
                  ? "border-primary bg-accent text-primary"
                  : "border-muted-foreground",
              )}
            >
              {slot.time}
            </Button>
          ))
        ) : (
          <p>{"لا يوجد اوقات متاحة"}</p>
        )}
      </div>

      <div className="w-full">
        <BookConfirmationAlert info={selectedTime} loading={loading} disabled={!selectedTime || isExpired} />
      </div>
    </Card>
  );
}
