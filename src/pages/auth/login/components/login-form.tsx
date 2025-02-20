"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SubmitButton from "@/components/ui/submit-button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import {
  LoginFormValues,
  loginSchema,
  loginSchemaInitialData,
} from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { getZodErrors, ExtractZODErrors } from "@/schemas";
import { siteConfig } from "@/config/site";
import { signIn, useSession } from "next-auth/react";
import { ERole } from "@prisma/client";
import ValidationErrorBlock from "@/components/ui/validation-error-block";

const LogInForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<LoginFormValues>(
    loginSchemaInitialData,
  );
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] =
    useState<ExtractZODErrors<LoginFormValues> | null>(null);
  const { toast } = useToast();

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      const role = session.user.role;
      if (role === ERole.PIONEER) {
        router.push("/dashboard/profile");
      } else if (role === ERole.USER) {
        router.push("/");
      }
    }
  }, [session?.user, router]);
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
          title: "فشل تسجيل الدخول",
          description: "خطأ في البيانات المدخلة يرجا المحاولة مرة اخرى",
          variant: "destructive",
        });
      } else {
        toast({
          title: "تم تسجيل الدخول بنجاح",
          description: `اهلا مجددا, ${formData.email}!`,
        });
      }
    } catch (error) {
      toast({
        title: "حدق خطأ",
        description: " المحاولة مرة اخرى",
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
          <ValidationErrorBlock error={errors?.email} />
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
          <ValidationErrorBlock error={errors?.password} />
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
            className="space-x-2 px-2 font-medium text-primary hover:underline"
          >
            تسجيل
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LogInForm;
