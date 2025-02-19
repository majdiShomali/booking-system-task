import LogInForm from "./components/login-form";
import { SpotlightPreview } from "@/components/auth/SpotlightPreview";

export default function LoginPage() {

  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2  ">
    <div className="hidden bg-muted lg:block relative">
      <SpotlightPreview  />
    </div>

    <div className="flex items-center justify-center py-6 h-full">
      <div className="mx-auto grid w-[350px] gap-6">
        <LogInForm  />
      </div>
    </div>
  </div>
  );
}
