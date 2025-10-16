import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useId } from "react";
import { Label } from "../ui/label";
import { useFilterContext } from "./filterWarper";
import clsx from "clsx";

type Option = { value: string; label: string };

type FilterTabsProps<T extends Record<string, any>> = {
  name: keyof T;
  label?: string;
  options: Option[];
  orientation?: "vertical" | "horizontal";
  loading?: boolean;
  disabled?: boolean;
  mode?: "auto" | "manual"; // ✅ per-komponen
};

export default function FilterTabs<T extends Record<string, any>>({
  name,
  label,
  options,
  orientation = "vertical",
  loading = false,
  disabled,
  mode = "auto", // ✅ default auto
}: FilterTabsProps<T>) {
  const { values, setValue, tempValues } = useFilterContext();

  // kalau manual, ambil dari tempValues dulu
  const rawValue =
    mode === "manual"
      ? (tempValues?.[name as string] ?? values[name as string])
      : values[name as string];

  const selectedId = String(rawValue ?? "");
  const selected = options.find((opt) => opt.value === selectedId);

  const uniqueId = useId();
  return (
    <Label
      className={cn(
        "flex w-full",
        orientation === "vertical" && "flex-col gap-y-3 items-start",
        orientation === "horizontal" && "flex-row gap-x-0 items-center"
      )}
    >
      {label && <span className="w-[70%] font-normal">{label}</span>}

      <div className="flex w-full z-0">
        <div className="relative flex gap-3">
          {options.map((tab) => {
            const active = tab.value === selected?.value;
            return (
              <button
                key={tab.value}
                onClick={() => setValue(name as string, tab.value, mode)}
                className={clsx(
                  "text-black font-normal rounded-none border-gray-400 px-5 pt-2 py-1.5 text-base min-w-[12%] relative"
                )}
              >
                <span
                  className={clsx(
                    "relative z-10",
                    active && "text-primary font-semibold"
                  )}
                >
                  {tab.label}
                </span>
                {active && (
                  <motion.div
                    layoutId={`${uniqueId}-indicator`}
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Label>
  );
}
