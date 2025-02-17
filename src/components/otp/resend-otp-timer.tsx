"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";


type Props = {
  handleResendOTP: () => void;
  time: number;
  disabled: boolean;

};

const ResendOtpTimer: React.FC<Props> = ({
  handleResendOTP,
  time,
  disabled,
}) => {

  const [resendTimer, setResendTimer] = useState<number>(time);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if(disabled) return;
    let interval: NodeJS.Timeout;
    if (resendTimer > 0 && !canResend) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else if (resendTimer === 0 && !canResend) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer, canResend,disabled]);

  const progress = ((time - resendTimer) / time) * 100;

  return (
    <div className="flex flex-col items-center space-y-4">
      {canResend ? (
        <Button
          variant="outline"
          onClick={() => {
            handleResendOTP();
            setResendTimer(time);
            setCanResend(false);
          }}
        >
          {"اعد الارسال"}
        </Button>
      ) : !disabled ? (
        <div className="relative w-20 h-20">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-muted-foreground"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-primary"
              strokeWidth="8"
              strokeDasharray={264}
              strokeDashoffset={264 - (progress / 100) * 264}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
          </svg>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-xl font-bold">{resendTimer}</p>
          </div>
        </div>
      ) : null}
      <p className={cn("text-sm", disabled && "text-muted-foreground")}>
        {canResend
          ? "لم يصلني الرمز"
          : disabled
          ? "تم ارسال الرمز"
          : `${resendTimer} ارسال الرمز بعد` }
      </p>
    </div>
  );
};

export default ResendOtpTimer;
