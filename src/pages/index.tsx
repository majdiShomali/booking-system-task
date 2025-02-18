import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import Calendar from "@/components/calendar/calendar";
import TimeSlots from "@/components/calendar/time-slots";
import ProfileCard from "@/components/calendar/profile-card";
import Navbar from "@/components/headers/nav";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const createPost = api.post.create.useMutation({
    onSuccess: (newPost) => {
      console.log("Post created successfully:", newPost);
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
  });

  const handleCreatePost = () => {
    // Call the mutation with the post name input
    createPost.mutate({ name: "My New Post" });
  };
  const { toast } = useToast();
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
