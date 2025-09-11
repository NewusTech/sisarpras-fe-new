"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import React from "react";
import { useFilterContext } from "./filterWarper"; // pastikan ini sesuai path lu

type FilterTextInputProps<T extends Record<string, any>> = {
  label?: string;
  name: keyof T;
  placeholder?: string;
  orientation?: "vertical" | "horizontal";
  prefixIcon?: React.ReactNode;
};

export const FilterTextInput = <T extends Record<string, any>>({
  label,
  name,
  placeholder = name as string,
  orientation = "vertical",
  prefixIcon,
}: FilterTextInputProps<T>) => {
  const { values, setValue } = useFilterContext();

  return (
    <Label
      className={cn(
        "flex flex-grow",
        orientation === "vertical" &&
          "flex-col gap-y-1 items-start justify-center",
        orientation === "horizontal" &&
          "flex-row gap-x-0 justify-center items-center"
      )}
    >
      {label && <span className="w-[70%]">{label}</span>}
      <div className={cn("relative flex items-center w-full")}>
        <div className="absolute left-2">{prefixIcon}</div>
        <Input
          id={String(name)}
          name={String(name)}
          type="text"
          className="pl-10 w-full"
          placeholder={placeholder || label}
          value={values[name as string] ?? ""}
          onChange={(e) => setValue(name as string, e.target.value)}
        />
      </div>
    </Label>
  );
};
