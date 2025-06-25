"use client";

import * as React from "react";
import { InputMask } from "@react-input/mask";
import { cn } from "@/lib/utils";

type MaskedInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  mask: string;
  className?: string;
};

export const CustomMaskedInput = React.forwardRef<
  HTMLInputElement,
  MaskedInputProps
>(({ className, ...props }, ref) => {
  return (
    <InputMask
      {...props}
      ref={ref}
      replacement={{ _: /\d/ }}
      className={cn(
        "border-none shadow-none focus-visible:ring-0 focus-visible:outline-none p-0",
        className
      )}
    />
  );
});

CustomMaskedInput.displayName = "CustomMaskedInput";
