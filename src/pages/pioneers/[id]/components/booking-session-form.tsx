"use client";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import ProfileCard from "@/components/calendar/profile-card";
import Calendar from "@/components/calendar/calendar";
import TimeSlots from "@/components/calendar/time-slots";
import timeHelper from "@/helpers/time.helper";
import type { AvailableSession } from "@prisma/client";
import useBookingSocket from "@/hooks/use-booking-socket";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
const usePioneerData = (pioneerId: string, selectedMonth: Date) => {
  const { data: pioneerAvailableMonthSession } =
    api.session.getPioneerAvailableMonthSessionForUser.useQuery(
      {
        date: timeHelper.convertLocalDateToUTC(selectedMonth),
        pioneer_id: pioneerId,
      },
      { enabled: Boolean(selectedMonth && pioneerId) },
    );

  const { data: pioneer, isLoading: isPioneerLoading } =
    api.pioneer.getPioneerForUser.useQuery(
      { pioneer_id: pioneerId },
      { enabled: Boolean(pioneerId) },
    );

  return {
    pioneerAvailableMonthSession,
    pioneer,
    isPioneerLoading,
  };
};
const BookSessionForm = () => {
  const router = useRouter();
  const { id } = router.query;
  const pioneerId = typeof id === "string" ? id : "";

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const { pioneerAvailableMonthSession, pioneer, isPioneerLoading } =
    usePioneerData(pioneerId, selectedMonth);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const bookingAction = api.booking.bookSession.useMutation();

  const handleBooking = useCallback(
    async (selectedSession: AvailableSession) => {
      if (!selectedSession) return;

      try {
       await bookingAction.mutateAsync({
          availableSessionId: selectedSession.id,
        });
        toast({
          title: "تم حجز الجلسة ",
          description: `شكرا لك`,
          action: <ToastAction altText="undo">{"رجوع"}</ToastAction>,
        });
      } catch (error) {
        toast({
          title: "حدث خطأ اثناء الحجز او حجزت الجلسة",
          description: `يرجا المحاولة مرة اخرة `,
          action: <ToastAction altText="undo">{"رجوع"}</ToastAction>,
          variant: "destructive",
        });
      }
    },
    [bookingAction],
  );

  const { isSessionLoading, availableSession } = useBookingSocket(
    pioneerId,
    selectedDate,
  );

  if (!pioneerId) return null;

  return (
    <div className="my-5 flex h-full w-full flex-col items-center justify-center gap-5 lg:flex-row lg:items-start">
      <ProfileCard pioneer={pioneer} loading={isPioneerLoading} />
      <div className="flex w-full flex-col gap-3 lg:w-1/4">
        <Calendar
          events={pioneerAvailableMonthSession?.map((date) => date.date)}
          onDateSelect={handleSelectDate}
          selectedDate={selectedDate}
          sessionDuration={pioneer?.session_duration}
          onChangeMonth={setSelectedMonth}
        />

        <TimeSlots
          availableSlots={availableSession?.map((session) => ({
            ...session,
          }))}
          onBooking={handleBooking}
          loading={isSessionLoading}
          isExpired={false}
          isBooking={bookingAction.isPending}
        />
      </div>
    </div>
  );
};

export default BookSessionForm;
