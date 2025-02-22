import React from "react";
import AllPioneers from "./components/all-pioneers-section";
import type { GetServerSideProps } from "next";
import type {  Session } from "next-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import DemoSection from "@/components/hero/demo-home-section";

export default function PioneersPage({ session }: { session: Session }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center pb-5">
      <div className="mb-5 w-full bg-accent p-5 text-center">
        <h1 className="mb-4 text-center text-4xl font-bold">
          اختر المستشار المناسب لطلبك
        </h1>
        <p className="mb-6 text-right text-xl"></p>
      </div>
      <div>
        <DemoSection />
      </div>
      <div className="min-h-[70vh]">
        <AllPioneers session={session} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: { session },
  };
};
