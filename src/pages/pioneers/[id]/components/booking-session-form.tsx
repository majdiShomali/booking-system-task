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
type Props = {
  id: string;
};
const BookSessionForm: React.FC<Props> = ({ id: pioneerId }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const { data: pioneer, isLoading: isPioneerLoading } =
    api.pioneer.getPioneerForUser.useQuery(
      { pioneer_id: pioneerId },
      { enabled: !!selectedDate && !!pioneerId },
    );

  const { data: pioneerAvailableMonthSession } =
    api.session.getCurrentPioneerAvailableMonthSession.useQuery(
      {
        date: timeHelper.toUTCDate(selectedMonth)?.toISOString(),
        pioneer_id: pioneer?.id ?? "",
      },
      { enabled: !!selectedDate && !!pioneer?.id },
    );

  const { isSessionLoading, availableSessions } = useBookingSocket(
    pioneerId,
    selectedDate,
  );

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
          availableSlots={availableSessions?.map((session) => ({
            ...session,
            date: new Date(
              timeHelper.convertEventTimeToLocalTime(session.date),
            ),
          }))}
          onBooking={handleBooking}
          loading={isSessionLoading}
          disabled={!pioneer || !pioneer?.available}
          isBooking={bookingAction.isPending}
        />
      </div>
    </div>
  );
};

export default BookSessionForm;
