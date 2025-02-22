"use client";
import { memo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import BookConfirmationAlert from "@/pages/pioneers/[id]/components/booking-confiramtion.alert";
import { Badge } from "../ui/badge";
import { Clock } from "lucide-react";

interface TimeSlotsProps {
  onTimeSelect?: (time: string) => void;
  onBooking: (session: AvailableSession) => Promise<void>;
  availableSlots?: AvailableSession[];
  loading: boolean;
  isExpired: boolean;
  isBooking: boolean;
}
import React from "react";
import type { AvailableSession } from "@prisma/client";
import timeHelper from "@/helpers/time.helper";

const TimeSlots: React.FC<TimeSlotsProps> = ({
  onBooking,
  availableSlots,
  loading,
  isExpired,
  isBooking
}) => {
  const [selectedSession, setSelectedSession] =
    useState<AvailableSession | null>(null);

  const handleSelect = (session: AvailableSession) => {
    setSelectedSession(session);
  };

  return (
    <Card className="rtl mx-auto w-full max-w-md space-y-2 p-3">
      <div className="space-y-2 text-center">
        <div className="flex items-center justify-between">
          <h2 className="text-start text-xl font-semibold">
            {"الأوقات المتاحة"}
          </h2>
          {availableSlots && availableSlots?.length > 0 && (
           
              <Badge
                variant={"outline"}
                className={`text-md ${isExpired ? "text-red-500" : "text-green-500"}`}
              >
                <Clock className="ml-2" size={15} />{" "}
                {isExpired ? "منتهية" : "متاحة"}{" "}
              </Badge>
          
          )}
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
          availableSlots?.sort((a, b) => new Date(a.date)?.getTime() - new Date(b.date)?.getTime())?.map((session, index) => {
            const time = `${timeHelper.convertDateToTime(session.date).hours}:00 ${
              timeHelper.convertDateToTime(session.date).ampm
            }`;
            return (
              <Button
                variant="outline"
                key={index}
                onClick={() => handleSelect(session)}
                disabled={!session.available}
                className={cn(
                  "rounded-lg border px-2 py-1 text-sm font-medium transition-colors",
                  "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                  session.available
                    ? "hover:border-primary hover:text-primary"
                    : "cursor-not-allowed opacity-50",
                  selectedSession?.id === session.id
                    ? "border-primary bg-accent text-primary"
                    : "border-muted-foreground",
                )}
              >
                {time}
              </Button>
            );
          })
        ) : (
          <p>{"لا يوجد اوقات متاحة"}</p>
        )}
      </div>

      <div className="w-full">
        <BookConfirmationAlert
          onBooking={onBooking}
          session={selectedSession}
          loading={isBooking}
          isDisabled={!availableSlots?.find((slot)=>slot.id ===selectedSession?.id)?.available}
        />
      </div>
    </Card>
  );
};

export default memo(TimeSlots);
