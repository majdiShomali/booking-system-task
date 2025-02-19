"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useCallback } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SubmitButton from "@/components/ui/submit-button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldClose } from "lucide-react";
import { LoginFormValues, loginSchema, loginSchemaInitialData } from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { getZodErrors, ExtractZODErrors } from "@/schemas";
import { siteConfig } from "@/config/site";
import { signIn } from "next-auth/react";

const LogInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormValues>(loginSchemaInitialData);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] =
    useState<ExtractZODErrors<LoginFormValues> | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      setErrors(getZodErrors(loginSchema, formData));
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        toast({
          title: "Login Failed",
          description: "Invalid credentials, please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login Successful",
          description: `Welcome back, ${formData.email}!`,
        });
        router.push("/");
      }
    } catch (error) {
      toast({
        title: "An unexpected error occurred",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full w-full">
      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center gap-2"
      >
        <div className="relative w-full space-y-2">
          <Label htmlFor="email">البريد الإلكتروني</Label>
          <Input
            name="email"
            type="email"
            placeholder="example@example.com"
            onChange={onChangeHandler}
            value={formData.email}
            autoComplete="email"
          />
          {errors?.email && (
            <p className="flex items-center text-sm text-red-500">
              <ShieldClose size={15} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div className="relative w-full space-y-2">
          <Label htmlFor="password">كلمة المرور</Label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={onChangeHandler}
              autoComplete="current-password"
              value={formData.password}
              className="pl-10"
              placeholder="Password@1234"

            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 transform"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-4" />
              ) : (
                <Eye className="h-5 w-4" />
              )}
            </Button>
          </div>
          {errors?.password && (
            <p className="flex items-center text-sm text-red-500">
              <ShieldClose size={15} className="mr-1" />
              {errors.password}
            </p>
          )}
        </div>

        <SubmitButton
          loading={loading}
          loadingTitle="جاري التسجيل"
          className="mt-3 w-full"
        >
          تسجيل الدخول
        </SubmitButton>

        <p className="text-sm font-light">
          ليس لديك حساب؟
          <Link
            href={siteConfig.pages.signup}
            className="font-medium text-primary hover:underline"
          >
            تسجيل
          </Link>
        </p>
        <p className="text-sm font-light">
          نسيت كلمة المرور؟
          <Link
            href="/auth/forgot-password"
            className="font-medium text-primary hover:underline"
          >
            إعادة تعيين كلمة المرور
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LogInForm;
