import React from "react";
import AllPioneers from "./components/all-pioneers-section";
import { GetServerSideProps } from "next";
import { getServerSession, Session } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function PioneersPage({ session }: { session: Session }) {
  return (
    <div className="flex flex-col h-full w-full items-center justify-center pb-5">
      <div className="mb-5 bg-accent p-5 text-center w-full">
        <h1 className="mb-4 text-center text-4xl font-bold">
          اختر المستشار المناسب لطلبك
        </h1>
        <p className="mb-6 text-right text-xl"></p>
      </div>
      <AllPioneers session={session} />
    </div>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  return {
    props: { session },
  };
};

