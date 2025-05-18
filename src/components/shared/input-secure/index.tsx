import React, { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function InputSecure({ ...props }: {} & InputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useMemo(() => {
    if (props.disabled) setShowPassword(false);
  }, [props.disabled]);

  return (
    <Label
      className={cn(
        "rounded-sm w-full flex items-center border border-primary-700 shadow-sm",
        isFocused && "ring-1 ring-ring"
      )}
    >
      <Input
        type={showPassword ? "text" : "password"}
        className="border-none focus-visible:ring-0 focus-visible:ring-ring bg-transparent shadow-none"
        aria-hidden="true"
        {...props}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <button
        type="button"
        className="pr-3"
        onClick={() => setShowPassword(!showPassword)}
        disabled={props.disabled}
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </Label>
  );
}
