import { AvailableTimes } from "@/components/calendar/available-times";
import Calendar from "@/components/calendar/calendar";
import ProfileCard from "@/components/calendar/profile-card";
import { Button } from "@/components/ui/button";
import timeHelper from "@/helpers/time.helper";
import { api } from "@/utils/api";
import Link from "next/link";
import { useCallback, useState } from "react";

const PioneerSessionForm = () => {
  const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const { data: pioneer,isLoading:isPioneerLoading } = api.pioneer.getPioneer.useQuery();

  const { data: pioneerAvailableSession,isLoading:isAvailableSessioLoading} =
    api.session.getCurrentPioneerAvailableDaySession.useQuery(
      { date: timeHelper.toUTCDate(selectedDate)?.toISOString(),pioneer_id:pioneer?.id ?? ''  },
      {
        enabled: !!selectedDate && !!pioneer?.id,
      },
    );

  const { data: pioneerAvailableMonthSession } =
    api.session.getCurrentPioneerAvailableMonthSession.useQuery(
      { date: timeHelper.toUTCDate(selectedMonth)?.toISOString(),pioneer_id:pioneer?.id ?? '' },
      {
        enabled: !!selectedMonth && !!pioneer?.id,
      },
    );


  if (!pioneer?.id && !isPioneerLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center ">
        <p className="border-2 border-red-500 border-dashed p-3 rounded-md">
          {" "}
          الرجاء انشاء الحساب <Link href="/dashboard/profile"><Button variant={'outline'}>انشاء</Button></Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-full w-full items-center lg:items-start justify-center gap-5 mb-5">
      <ProfileCard pioneer={pioneer} loading={isPioneerLoading} />
      <div className="flex flex-col gap-3">
        <Calendar
          events={pioneerAvailableMonthSession?.map((date) => date.date)}
          onDateSelect={(date) => {
            handleSelectDate(date);
            console.log("Selected date:", date, getTimeZone());
          }}
          selectedDate={selectedDate}
          sessionDuration={pioneer?.session_duration}
          onChangeMonth={(date) => {
            setSelectedMonth(date);
          }}
        />
        {selectedDate && (
          <AvailableTimes
            initialTimes={
              pioneerAvailableSession?.map((date) => {
                const { ampm, hours } = timeHelper.convertDateToTime(date.date);
                return {
                  hour: `${hours}`,
                  period: ampm,
                };
              }) ?? []
            }
            selectedDate={selectedDate}
            loading={isAvailableSessioLoading}
          />
        )}
      </div>
    </div>
  );
};

export default PioneerSessionForm;
