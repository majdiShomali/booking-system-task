import type { NextPage } from "next";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { api } from "@/utils/api";
import ProfileCard from "@/components/calendar/profile-card";
import Calendar from "@/components/calendar/calendar";
import TimeSlots from "@/components/calendar/time-slots";
import timeHelper from "@/helpers/time.helper";

const usePioneerData = (pioneerId: string, selectedDate: Date, selectedMonth: Date) => {
  const { data: pioneerAvailableSession } = api.pioneer.getPioneerAvailableDaySession.useQuery(
    { date: timeHelper.convertLocalDateToUTC(selectedDate), pioneer_id: pioneerId },
    { enabled: Boolean(selectedDate && pioneerId) }
  );

  const { data: pioneerAvailableMonthSession } = api.pioneer.getPioneerAvailableMonthSession.useQuery(
    { date: timeHelper.convertLocalDateToUTC(selectedMonth), pioneer_id: pioneerId },
    { enabled: Boolean(selectedMonth && pioneerId) }
  );

  const { data: pioneer, isLoading: isPioneerLoading } = api.pioneer.getPioneerForUser.useQuery(
    { pioneer_id: pioneerId },
    { enabled: Boolean(pioneerId) }
  );

  return { pioneerAvailableSession, pioneerAvailableMonthSession, pioneer, isPioneerLoading };
};

const PioneerPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const pioneerId = typeof id === "string" ? id : "";

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const { pioneerAvailableSession, pioneerAvailableMonthSession, pioneer, isPioneerLoading } =
    usePioneerData(pioneerId, selectedDate, selectedMonth);

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);

  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
  };

  const handleBooking = (selectedTime: string) => {
    console.log("Booking session for:", selectedTime);
  };

  if (!pioneerId) return null;

  return (
    <section className="h-full w-full">
      <div className="flex h-full w-full items-start justify-center gap-5">
        <ProfileCard pioneer={pioneer} loading={isPioneerLoading} />
        <div className="flex flex-col gap-3">
          <Calendar
            events={pioneerAvailableMonthSession?.map((date) => date.date)}
            onDateSelect={handleSelectDate}
            selectedDate={selectedDate}
            sessionDuration={pioneer?.session_duration}
            onChangeMonth={setSelectedMonth}
          />

          <TimeSlots
            availableSlots={pioneerAvailableSession?.map((date) => ({
              session_id: date.id,
              available: true,
              time: `${timeHelper.convertDateToTime(date.date).hours}:00 ${
                timeHelper.convertDateToTime(date.date).ampm
              }`,
            }))}
            onTimeSelect={handleTimeSelect}
            onBooking={handleBooking}
          />
        </div>
      </div>
    </section>
  );
};

export default PioneerPage;
