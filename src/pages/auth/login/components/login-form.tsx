"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import SubmitButton from "@/components/ui/submit-button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, ShieldClose } from "lucide-react";
import { LoginFormValues, loginSchema } from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { getZodErrors, ExtractZODErrors } from "@/schemas";

type LogInFormProps = {};
const LogInForm: React.FC<LogInFormProps> = ({}) => {
  const { toast } = useToast();
  const Router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // role: ERole.USER,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [errors, setErrors] =
    useState<ExtractZODErrors<LoginFormValues> | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const errors = getZodErrors(loginSchema, formData);
      setErrors(errors);
      return;
    }

    toast({
      title: "Error  ",
      description: "Please try again",
      action: <ToastAction altText="undo">Undo</ToastAction>,
      variant: "destructive",
    });
    return;
  };

  return (
    <section className="h-full w-full">
      {/* <RadioGroup
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
            User
          </Label>
        </div>
        <div>
          <RadioGroupItem
            value={ERole.DRIVER}
            id="driver"
            className="peer sr-only"
            aria-label="driver"
          />
          <Label
            htmlFor="driver"
            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary "
          >
            <Icons.DriverIcon className="mb-3 h-6 w-6" />
            Driver
          </Label>
        </div>
      </RadioGroup> */}

      <form
        onSubmit={onSubmit}
        className="flex w-full flex-col items-center justify-center gap-2"
      >
        <div className="relative w-full space-y-2">
          <Label htmlFor="username">البريد الاكتروني</Label>
          <Input
            // required
            title="email"
            name="email"
            type="text"
            onChange={onChangeHandler}
            value={formData.email}
            autoComplete="email"
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
        <div className="relative w-full space-y-2">
          <Label htmlFor="username">كلمة المرور</Label>
          <div className="relative h-fit">
            <Input
              title="password"
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={onChangeHandler}
              autoComplete="password"
              value={formData.password}
              className="pl-10"
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

        <SubmitButton className="mt-3 w-full" title="Sign in">
          تسجيل الدخول
        </SubmitButton>
        <p className="text-sm font-light dark:text-primary">
          {" انشاء حساب جديد؟"}{" "}
          <Link
            href={`/auth/signup`}
            className="font-medium text-primary hover:underline dark:text-primary"
          >
            {"تسجيل "}
          </Link>
        </p>
        <p className="text-sm font-light dark:text-primary">
          {" نسيت كلمة المرور؟"}{" "}
          <Link
            href="/auth/forgot-password"
            className="font-medium text-primary hover:underline dark:text-primary"
          >
            {"اعادة تعين كلمة المرور"}
          </Link>
        </p>
      </form>
    </section>
  );
};

export default LogInForm;
