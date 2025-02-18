import Calendar from "@/components/calendar/calendar";
import ProfileCard from "@/components/calendar/profile-card";
import TimeSlots from "@/components/calendar/time-slots";
import { SidebarProvider } from "@/components/ui/side-bar";

export default function DashboardPage() {

  const events = [
    new Date(2024, 1, 15),
    new Date(2024, 1, 20),
    new Date(2024, 1, 25),
  ];
  const handleTimeSelect = (time: string) => {
    console.log("Selected time:", time);
  };

  const handleBooking = (selectedTime: string) => {
    console.log("Booking session for:", selectedTime);
  };
  return (
    <section className="w-full h-full">
       <div className="flex h-full w-full items-start justify-center gap-5 ">
   
         <div>
           <ProfileCard
             title="مؤسسي ، مستشار ، تدريب على أمور شركات التقنية"
             bio="متخصص في تطوير وإدارة المنتجات الرقمية. مهني في البرامج وله عدة تجارب فيه. مستشار معتمد ومقدم بودكاست السوالف برنس."
             experience="خبرة 35 عاماً"
             name="سارة أحمد"
             skills={[
               "e-com اشتراك",
               "اعتماد الوسائط الرقمية / المنصة",
               "بناء و تطوير كود5",
               "الاستثمار المبكر",
               "استراتيجيات نمو تويتر",
               "بناء المجتمع",
             ]}
             socialLinks={{
               linkedin: "https://linkedin.com",
               instagram: "https://instagram.com",
               twitter: "https://twitter.com",
             }}
             available={true}
             image="/avatars/sara.png"
           
           />
         </div>
         <div className="flex flex-col gap-3">
           <Calendar
             events={events}
             onDateSelect={(date) => console.log("Selected date:", date)}
           />
           <TimeSlots onTimeSelect={handleTimeSelect} onBooking={handleBooking} />
         </div>
       </div>
       </section>
  );
}
