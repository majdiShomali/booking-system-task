import { api } from "@/utils/api";
import PioneerCard, {
  EmptyPioneerCard,
  PioneerCardSkeleton,
  PrivatePioneerCard,
} from "./pioneer-card";
import { Session } from "next-auth";

const AllPioneers: React.FC<{ session: Session }> = ({ session }) => {
  const { data: pioneers, isLoading } = api.pioneer.getAll.useQuery();

  if (!session?.user?.id) {
    return <PrivatePioneerCard />;
  }

  if (isLoading && session?.user.id) {
    return <PioneerCardSkeleton />;
  }

  if (!isLoading && session?.user.id && pioneers?.length === 0) {
    return <EmptyPioneerCard />;
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
