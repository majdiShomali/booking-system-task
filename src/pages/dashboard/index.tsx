import { AvailableTimes } from "@/components/calendar/available-times";
import Calendar from "@/components/calendar/calendar";
import ProfileCard from "@/components/calendar/profile-card";
import TimeSlots from "@/components/calendar/time-slots";
import { SidebarProvider } from "@/components/ui/side-bar";
import timeHelper from "@/helpers/time.helper";
import { TPioneer } from "@/types/pioneer.types";
import { api } from "@/utils/api";
import { useCallback, useState } from "react";

export default function DashboardPage() {
  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
  };

  const handleBooking = (selectedTime: string) => {
    console.log("Booking session for:", selectedTime);
  };
  const events = [new Date(2025, 1, 6), new Date(2025, 1, 15)];
  const availableSlots = [
    {
      date: "Wed Feb 6 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "11:00 AM",
      available: true,
    },
    {
      date: "Wed Feb 6 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "10:00 AM",
      available: true,
    },
    {
      date: "Wed Feb 6 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "09:00 AM",
      available: true,
    },
    {
      date: "Wed Feb 6 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "02:00 PM",
      available: true,
    },
    {
      date: "Wed Feb 15 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "01:00 PM",
      available: true,
    },
    {
      date: "Wed Feb 15 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "12:00 PM",
      available: true,
    },
    {
      date: "Wed Feb 15 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "04:00 PM",
      available: true,
    },
    {
      date: "Wed Feb 15 2025 00:00:00 GMT+0300 (GMT+03:00)",
      time: "03:00 PM",
      available: true,
    },
  ];
  const pioneer: TPioneer = {
    id: "",
    user_id: "",
    title: "مؤسسي ، مستشار ، تدريب على أمور شركات التقنية",
    bio: "متخصص في تطوير وإدارة المنتجات الرقمية. مهني في البرامج وله عدة تجارب فيه. مستشار معتمد ومقدم بودكاست السوالف برنس.",
    experience: "خبرة 35 عاماً",
    skills: [
      "e-com اشتراك",
      "اعتماد الوسائط الرقمية / المنصة",
      "بناء و تطوير كود5",
      "الاستثمار المبكر",
      "استراتيجيات نمو تويتر",
      "بناء المجتمع",
    ],
    facebook: "https://linkedin.com",
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    available: true,
    additional_information: [
      "أحب مشاهدة الآخرين ، وخاصة رواد الأعمال الجامعين.",
      "توسيع نطاق مجتمع المؤسسين الخاص حالياً.",
    ],
    user: {
      name: "سارة أحمد",
      image: "/avatars/sara.png",
    },
  };
  const getTimeZone = () => Intl.DateTimeFormat().resolvedOptions().timeZone;

  const handleSelectDate = useCallback((date: Date) => {
    setSelectedDate(date);
  }, []);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const { data, error, isLoading } =
    api.pioneer.getPioneerAvailableSession.useQuery(
      { date: timeHelper.convertLocalDateToUTC(selectedDate) },
      {
        enabled: !!selectedDate,
      },
    );
console.log(data)
  return (
    <section className="h-full w-full">
      <div className="flex h-full w-full items-start justify-center gap-5">
        <div>
          <ProfileCard pioneer={pioneer} />
        </div>
        <div className="flex flex-col gap-3">
          <Calendar
            events={events}
            onDateSelect={(date) => {
              handleSelectDate(date);
              console.log("Selected date:", date, getTimeZone());
            }}
            selectedDate={selectedDate}
          />
          {selectedDate && (
            <AvailableTimes
              initialTimes={
                data?.map((date) => {
                  const {ampm,hours} = timeHelper.convertDateToTime(date.date)
                  return {
                    hour: `${hours}`,
                    period: ampm,
                };
              })||[]}
              selectedDate={selectedDate}
            />
          )}
          {/* <TimeSlots
            availableSlots={availableSlots}
            onTimeSelect={handleTimeSelect}
            onBooking={handleBooking}
          /> */}
        </div>
      </div>
    </section>
  );
}
