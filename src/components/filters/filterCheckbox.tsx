"use client";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useFilterContext } from "@/filter";

type Option = {
  value: string;
  label: string;
};

type FilterCheckboxProps<T extends Record<string, any>> = {
  name: keyof T;
  label: string;
  options: Option[];
  mode?: "single" | "multiple";
  orientation?: "vertical" | "horizontal";
};

export const FilterCheckbox = <T extends Record<string, any>>({
  name,
  label,
  options,
  mode = "multiple",
  orientation = "vertical",
}: FilterCheckboxProps<T>) => {
  const { values, setValue } = useFilterContext();

  const currentValue = values[name as string];

  const isChecked = (val: string) => {
    if (mode === "multiple") {
      return Array.isArray(currentValue) && currentValue.includes(val);
    } else {
      return currentValue === val;
    }
  };

  const toggleValue = (val: string) => {
    if (mode === "multiple") {
      const currentArr = Array.isArray(currentValue) ? currentValue : [];
      const updatedArr = currentArr.includes(val)
        ? currentArr.filter((v) => v !== val)
        : [...currentArr, val];
      setValue(name as string, updatedArr);
    } else {
      setValue(name as string, currentValue === val ? "" : val);
    }
  };

  // 🔁 Check All toggle
  const isAllChecked =
    mode === "multiple" &&
    Array.isArray(currentValue) &&
    options.length > 0 &&
    options.every((opt) => currentValue.includes(opt.value));

  const toggleCheckAll = () => {
    if (isAllChecked) {
      setValue(name as string, []);
    } else {
      const allValues = options.map((opt) => opt.value);
      setValue(name as string, allValues);
    }
  };

  return (
    <div
      className={cn(
        "flex w-full",
        orientation === "vertical"
          ? "flex-col gap-y-3 items-start"
          : "flex-row items-center justify-between"
      )}
    >
      {label && <span className="mb-1 font-medium w-[70%]">{label}</span>}

      <div className="flex w-full flex-col gap-2">
        {mode === "multiple" && (
          <Label className="flex items-center space-x-2 mb-4">
            <Checkbox
              id="check-all"
              checked={isAllChecked}
              onCheckedChange={toggleCheckAll}
              className="w-[18px] h-[18px]"
            />
            <span className="text-sm">Pilih Semua</span>
          </Label>
        )}

        <div className="flex flex-wrap gap-4">
          {options.map((opt) => (
            <Label key={opt.value} className="flex items-center space-x-2">
              <Checkbox
                id={opt.value}
                checked={isChecked(opt.value)}
                onCheckedChange={() => toggleValue(opt.value)}
                className="w-[18px] h-[18px]"
              />
              <span className="text-sm">{opt.label}</span>
            </Label>
          ))}
        </div>
      </div>
    </div>
  );
};
