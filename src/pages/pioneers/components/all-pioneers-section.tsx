"use client";
import { api } from "@/utils/api";
import type React from "react";
import { useSession } from "next-auth/react";
import {
  PioneerCardSkeleton,
  PrivatePioneerCard,
  PioneerCard,
} from "./pioneer-card";

const AllPioneers: React.FC = () => {
  const { data: session } = useSession();

  const { data: pioneers, isLoading } = api.pioneer.getAll.useQuery();

  if (!session?.user?.id) {
    return <PrivatePioneerCard />;
  }

  if (isLoading && session?.user.id) {
    return <PioneerCardSkeleton />;
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-5">
      {pioneers?.map((pioneer) => (
        <PioneerCard key={pioneer.id} pioneer={pioneer} />
      ))}
    </div>
  );
};

export default AllPioneers;
