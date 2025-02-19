import Calendar from "@/components/calendar/calendar";
import TimeSlots from "@/components/calendar/time-slots";
import ProfileCard from "@/components/calendar/profile-card";
import type { TPioneer } from "@/types/pioneer.types";

export default function Home() {

  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
  };

  const handleBooking = (selectedTime: string) => {
    console.log("Booking session for:", selectedTime);
  };
  const events = [
    new Date(2024, 1, 15),
    new Date(2024, 1, 20),
    new Date(2024, 1, 25),
  ];
  const availableSlots = [
    { time: "11:00 AM", available: true },
    { time: "10:00 AM", available: true },
    { time: "09:00 AM", available: true },
    { time: "02:00 PM", available: true },
    { time: "01:00 PM", available: true },
    { time: "12:00 PM", available: true },
    { time: "04:00 PM", available: true },
    { time: "03:00 PM", available: true },
  ]
  const pioneer:TPioneer = {
    id:"",
    user_id:"",
    title:"مؤسسي ، مستشار ، تدريب على أمور شركات التقنية",
    bio:"متخصص في تطوير وإدارة المنتجات الرقمية. مهني في البرامج وله عدة تجارب فيه. مستشار معتمد ومقدم بودكاست السوالف برنس.",
    experience:35,
    session_duration:60,
    skills:[
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
    available:true,
    additional_information:["أحب مشاهدة الآخرين ، وخاصة رواد الأعمال الجامعين.","توسيع نطاق مجتمع المؤسسين الخاص حالياً."],
    user:{
      name:"سارة أحمد",
      image:"/avatars/sara.png",
    }
  }
  return (
    <section className="h-full w-full">
      <div className="flex h-full w-full items-start justify-center gap-5">
        <div>
          <ProfileCard
           pioneer={pioneer}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Calendar
            events={events}
            onDateSelect={(date) => console.log("Selected date:", date)}
            selectedDate={new Date()}
          />
          <TimeSlots
            availableSlots={availableSlots}
            onTimeSelect={handleTimeSelect}
            onBooking={handleBooking}
          />
        </div>
      </div>
    </section>
  );
}
