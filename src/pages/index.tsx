import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import AllPioneers from "./pioneers/components/all-pioneers-section";
import MainHeroSection from "@/components/hero/main-hero-section.";
import { authOptions } from "./api/auth/[...nextauth]";
import DemoSection from "@/components/hero/demo-home-section";
import Head from "next/head";

export default function Home({ session }: { session: Session }) {
  return (
    <section className="h-full w-full">
      <Head>
        <title>حجز المستشار</title>
        <meta
          name="description"
          content="موقع حجز المستشار يقدم لك خدمة حجز استشارات قانونية عبر الإنترنت، مع متخصصين محترفين في مختلف المجالات."
        />
      </Head>
      <MainHeroSection />

      <div className="flex w-full items-center justify-center py-5">
        <AllPioneers session={session} />
      </div>

      <div>
        <DemoSection />
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: { session },
  };
};
