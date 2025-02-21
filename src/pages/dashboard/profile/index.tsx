import { api } from "@/utils/api";
import ProfileForm from "../components/profile-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const { data,  isLoading } = api.pioneer.getPioneer.useQuery();
console.log("data")
console.log(data)
console.log("data")
  return (
    <div className="mb-5 h-full w-full flex-col items-center justify-center">
      <div className="mb-5 bg-accent p-5 text-center">
        <h1 className="mb-4 text-center text-4xl font-bold">
          املأ النموذج الآن!
        </h1>
        <p className="mb-6 text-right text-xl"></p>
        {data?.id ? (
          <Link
            href="/dashboard"
            className=""
          >
            <Button variant={'outline'} className=''>
            اضف مواعيد جديدة
            </Button>
          </Link>
        ) : null}
      </div>
      <div className="pb-10">
        <ProfileForm
          mode={data?.id ? "update" : "create"}
          initialData={data ?? null}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
