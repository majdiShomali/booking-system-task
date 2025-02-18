"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/otp/otp-input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import ResendOtpTimer from "@/components/otp/resend-otp-timer";
import { useSession } from "next-auth/react";

type VerifyFormProps = {};

const VerifyForm: React.FC<VerifyFormProps> = ({}) => {
  const { toast } = useToast();
  const Router = useRouter();

  const [formData, setFormData] = useState({ otp: "" });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: session } = useSession();

  const handleSubmit = async () => {
    if (formData.otp.length !== 6) return;
    setIsSubmitting(true);
    try {
      toast({
        title: "Error  ",
        description: "Please try again",
        action: <ToastAction altText="undo">Undo</ToastAction>,
      });

      // toast({
      //   title: "Registration verified  Successfully",
      //   description: `Thank you for joinging our comunity`,
      //   action: <ToastAction altText="undo">Undo</ToastAction>,
      // });

      Router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    if (!session || !session.user.id) return;

    // const { results, errors, message } = await resendOtpAction(EOtpType.REGISTRATION);
    // if (!results) {
    //   toast({
    //     title: "Error",
    //     description: "Please try again",
    //     action: <ToastAction altText="Undo">Undo</ToastAction>,
    //   });

    //   return;
    // }

    // if (results.valid) {
    //   toast({
    //     title: "OTP Resent Successfully",
    //     description: `Please enter your registration OTP code sent to your email ${data?.user.email}`,
    //     action: <ToastAction altText="Undo">Undo</ToastAction>,
    //   });
    //   return;
    // }

    // toast({
    //   title: "Max number of OTP attempts exceeded",
    //   description: `Please enter your registration OTP code sent to your email ${data?.user.email}`,
    //   action: <ToastAction altText="Undo">Undo</ToastAction>,
    // });
  };
  const onChangeHandler = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div className="h-full w-full">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Verify Your Account</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your email or phone{" "}
            {session?.user && (
              <span className="text-sm text-primary">
                {session?.user.email}
              </span>
            )}
            {/* <span className="text-red-500 text-xs mx-2">{session?.message}</span> */}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="space-y-4 px-5">
              <div className="space-y-2">
                <Label htmlFor="otp">OTP Code</Label>
                <div className="flex w-full items-center justify-center">
                  <InputOTP
                    id="otp"
                    name="otp"
                    onChangeCapture={(e) => {
                      onChangeHandler(
                        e.currentTarget.name,
                        e.currentTarget.value,
                      );
                    }}
                    maxLength={6}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  formData.otp.length !== 6 ||
                  isSubmitting ||
                  !session?.user?.verified
                }
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center space-y-2">
          <ResendOtpTimer
            time={35}
            handleResendOTP={handleResendOTP}
            disabled={false}
          />

          <p className="mt-4 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyForm;
