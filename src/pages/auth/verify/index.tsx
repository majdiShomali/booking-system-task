import { NextPage } from "next";
import React from "react";

import { useSession } from "next-auth/react";
import { SpotlightPreview } from "@/components/auth/SpotlightPreview";
import VerifyForm from "./components/verify-form";


export default function VerifyPage() {

  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <SpotlightPreview />
      </div>

      <div className="flex items-center justify-center py-6 h-full">
      <div className="mx-auto grid w-[350px] gap-6">
          <VerifyForm />
        </div>
      </div>
    </div>
  );
};
