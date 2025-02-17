import { SpotlightPreview } from "@/components/auth/SpotlightPreview";
import SignUpForm from "./components/signup-form";

export default function SignupPage() {
  return (
    <div className="h-screen w-full lg:grid lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <SpotlightPreview />
      </div>

      <div className="flex h-full items-center justify-center py-6">
        <div className="mx-auto grid w-[350px] gap-6">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}
