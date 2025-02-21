
import { Metadata } from "next";
import AllPioneers from "./pioneers/components/all-pioneers-section";
import MainHeroSection from "@/components/hero/main-hero-section.";


export default function Home() {
  return (
    <section className="h-full w-full">
      <MainHeroSection />

      <div className="flex w-full items-center justify-center py-5">
        <AllPioneers />
      </div>
    </section>
  );
}
