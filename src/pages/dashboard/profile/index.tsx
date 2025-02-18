import { api } from "@/utils/api";
import ProfileForm from "../components/profile-form";

export default function ProfilePage() {
  const { data, error, isLoading } = api.pioneer.get.useQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading profile data</div>;
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <ProfileForm initialData={data || null} />
    </div>
  );
}
