"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/ui/submit-button";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, ShieldClose } from "lucide-react";
import {
  SignupFormValues,
  signupSchema,
  signupSchemaInitialData,
} from "@/schemas/signup.schema";
import { ExtractZODErrors, getZodErrors } from "@/schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Icons } from "@/components/icons/icons";
import { api } from "@/utils/api";
import { signIn, useSession } from "next-auth/react";
import { ERole } from "@prisma/client";

const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] =
    useState<ExtractZODErrors<SignupFormValues> | null>(null);

  const [formData, setFormData] = useState<SignupFormValues>(
    signupSchemaInitialData,
  );

  const { toast } = useToast();
  const Router = useRouter();
  const registerAction = api.user.register.useMutation();
  const session = useSession();

  useEffect(() => {
    if (session.data?.user) {
      const role = session.data.user.role;
      if (role === ERole.USER) {
        Router.push("/");
      }
      Router.push("/dashboard/profile");
    }
  }, [session.data?.user]);

  const onChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [],
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = signupSchema.safeParse(formData);

      if (!result.success) {
        const errors = getZodErrors(signupSchema, formData);
        setErrors(errors);
        return;
      }

      const user = await registerAction.mutateAsync(formData);

      if (!user) return;
      if (user) {
        const res = await signIn("credentials", {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        toast({
          title: "Registered Successfully",
          description: `Please enter your registration otp code sent  your email ${formData.email}`,
          action: <ToastAction altText="undo">{"Undo"}</ToastAction>,
        });
        return;
      }

      toast({
        title: "Registered Failed",
        description: `Please try again`,
        action: <ToastAction altText="undo">{"Undo"}</ToastAction>,
        variant: "destructive",
      });
    } catch (error) {
      toast({
        title: "Registered Failed",
        description: `Please try again`,
        action: <ToastAction altText="undo">{"Undo"}</ToastAction>,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="h-full w-full">
      <RadioGroup
        onValueChange={(value) => {
          setFormData((prev) => {
            return {
              ...prev,
              role: value as ERole,
            };
          });
        }}
        id="role"
        name="role"
        defaultValue={ERole.USER}
        className="grid grid-cols-2 gap-4"
      >
        <div>
          <RadioGroupItem
            value={ERole.USER}
            id="user"
            className="peer sr-only"
            aria-label="user"
          />
          <Label
            htmlFor="user"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icons.UserIcon className="mb-3 h-6 w-6" />
            {"مستخدم"}
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value={ERole.PIONEER}
            id="driver"
            className="peer sr-only"
            aria-label="driver"
          />
          <Label
            htmlFor="driver"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
          >
            <Icons.DriverIcon className="mb-3 h-6 w-6" />
            {"مستشار"}
          </Label>
        </div>
      </RadioGroup>
      <form
        onSubmit={onSubmit}
        className="mt-3 flex w-full flex-col items-center justify-center gap-2"
      >
        <div className="relative w-full space-y-2">
          <Label htmlFor="email">{"البريد الالكتروني"}</Label>
          <Input
            id="email"
            // required
            title="email"
            name="email"
            type="text"
            onChange={onChangeHandler}
            value={formData.email}
            autoComplete="email"
            placeholder="example@example.com"
          />
          {errors?.email && (
            <p className="flex items-center justify-start text-sm text-red-500">
              <span className="text-xs text-red-500">
                <ShieldClose size={15} />{" "}
              </span>
              {errors?.email}
            </p>
          )}
        </div>

        <section className="flex w-full items-center justify-center gap-2">
          <div className="relative w-full space-y-2">
            <Label htmlFor="name">{"اسم المستخدم"}</Label>
            <Input
              id="name"
              // required
              title="name"
              name="name"
              type="text"
              onChange={onChangeHandler}
              value={formData.name}
              placeholder="سارة احمد"
              // autoComplete="name"
            />
            {errors?.name && (
              <p className="flex items-center justify-start text-sm text-red-500">
                <span className="text-xs text-red-500">
                  <ShieldClose size={15} />{" "}
                </span>
                {errors?.name}
              </p>
            )}
          </div>
        </section>

        <div className="relative w-full space-y-2">
          <Label htmlFor="name">كلمة المرور</Label>
          <div className="relative h-fit">
            <Input
              title="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={onChangeHandler}
              autoComplete="password"
              value={formData.password}
              className="pl-10"
              placeholder="Password@1234"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute left-0 top-0 translate-y-0.5"
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
            <p className="flex items-center justify-start text-sm text-red-500">
              <span className="text-xs text-red-500">
                <ShieldClose size={15} />{" "}
              </span>
              {errors.password}
            </p>
          )}
        </div>

        <SubmitButton
          loading={loading}
          loadingTitle="جاري التسجيل"
          className="mt-3 w-full"
        >
          {"تسجيل"}
        </SubmitButton>

        <p className="text-sm font-light">
          {"لديك حساب ؟"}
          <Link
            href={`/auth/login`}
            className="font-medium text-primary hover:underline px-2"
          >
            {"تسجيل الدخول"}
          </Link>
        </p>
      </form>
    </section>
  );
};

export default SignUpForm;
