"use client";
import { useFormStatus } from "react-dom";
import React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./button";

type SubmitButtonProps = {
  className?: string;
  loadingTitle?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
};

const SubmitButton: React.FC<SubmitButtonProps & ButtonProps> = ({
  className,
  loadingTitle,
  children,
  disabled,
  loading=false,
  ...props
}) => {

  return (
    <Button
      className={cn(className, "w-full")}
      type="submit"
      {...props}
      disabled={loading || disabled}
    >
      <div className="flex items-center justify-center">
        {loading && <Loader className="w-5 h-5 animate-spin mx-2" />}
        {loading && loadingTitle ? loadingTitle : children}
      </div>
    </Button>
  );
};

export default SubmitButton;
