import React from "react";
import InputMask from "react-input-mask";
import { cn } from "@/lib/utils";

type MaskedInputProps = {
  mask: string;
  className?: string;
};

export const CustomMaskedInput = React.forwardRef<
  HTMLInputElement,
  MaskedInputProps
>(({ mask, className, ...rest }, ref) => {
  return (
    <InputMask
      mask={mask}
      maskChar="_"
      {...rest} // penting: biar onChange, onBlur, value, dll dari DatePicker tetap masuk
    >
      {(inputProps) => (
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            "border-none shadow-none focus-visible:ring-0 focus-visible:outline-none p-0",
            className
          )}
        />
      )}
    </InputMask>
  );
});

CustomMaskedInput.displayName = "CustomMaskedInput";
