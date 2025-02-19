import { AvailableTimes } from "@/components/calendar/available-times";
import Calendar from "@/components/calendar/calendar";
import ProfileCard from "@/components/calendar/profile-card";
import timeHelper from "@/helpers/time.helper";
import { api } from "@/utils/api";
import { useCallback, useState } from "react";

export default function DashboardPage() {

  // const events = [new Date(2025, 1, 6), new Date(2025, 1, 15)];

  // const pioneer: TPioneer = {
  //   id: "",
  //   user_id: "",
  //   title: "مؤسسي ، مستشار ، تدريب على أمور شركات التقنية",
  //   bio: "متخصص في تطوير وإدارة المنتجات الرقمية. مهني في البرامج وله عدة تجارب فيه. مستشار معتمد ومقدم بودكاست السوالف برنس.",
  //   experience: "خبرة 35 عاماً",
  //   skills: [
  //     "e-com اشتراك",
  //     "اعتماد الوسائط الرقمية / المنصة",
  //     "بناء و تطوير كود5",
  //     "الاستثمار المبكر",
  //     "استراتيجيات نمو تويتر",
  //     "بناء المجتمع",
  //   ],
  //   facebook: "https://linkedin.com",
  //   instagram: "https://instagram.com",
  //   twitter: "https://twitter.com",
  //   available: true,
  //   additional_information: [
  //     "أحب مشاهدة الآخرين ، وخاصة رواد الأعمال الجامعين.",
  //     "توسيع نطاق مجتمع المؤسسين الخاص حالياً.",
  //   ],
  //   user: {
  //     name: "سارة أحمد",
  //     image: "/avatars/sara.png",
  //   },
  // };
  const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const { data:pioneerAvailableSession} =
    api.pioneer.getCurrentPioneerAvailableDaySession.useQuery(
      { date: timeHelper.convertLocalDateToUTC(selectedDate) },
      {
        enabled: !!selectedDate,
      },
    );
    const { data:pioneer} = api.pioneer.getPioneer.useQuery();

    const { data:pioneerAvailableMonthSession } =
    api.pioneer.getCurrentPioneerAvailableMonthSession.useQuery(
      { date: timeHelper.convertLocalDateToUTC(selectedMonth) },
      {
        enabled: !!selectedMonth,
      },
    );

    return (
    <section className="h-full w-full">
      <div className="flex h-full w-full items-start justify-center gap-5">
        <div>
          {pioneer &&
          <ProfileCard pioneer={pioneer} />
          }
        </div>
        <div className="flex flex-col gap-3">
          <Calendar
            events={pioneerAvailableMonthSession?.map((date)=>date.date)}
            onDateSelect={(date) => {
              handleSelectDate(date);
              console.log("Selected date:", date, getTimeZone());
            }}
            selectedDate={selectedDate}
            sessionDuration={pioneer?.session_duration}
            onChangeMonth={(date)=>{setSelectedMonth(date)}}
          />
          {selectedDate && (
            <AvailableTimes
              initialTimes={
                pioneerAvailableSession?.map((date) => {
                  const {ampm,hours} = timeHelper.convertDateToTime(date.date)
                  return {
                    hour: `${hours}`,
                    period: ampm,
                };
              })??[]}
              selectedDate={selectedDate}
            />
          )}
 
        </div>
      </div>
    </section>
  );
}
