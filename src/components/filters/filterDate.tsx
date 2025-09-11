"use client";

import { format } from "date-fns";
import { CalendarIcon, Delete } from "lucide-react";
import { useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useFilterContext } from "@/filter";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useIsMobile } from "@/hooks/useMobile";

type FilterDateRangeProps<T extends Record<string, any>> = {
  label?: string;
  startKey: keyof T;
  endKey: keyof T;
  orientation?: "horizontal" | "vertical";
  /** format tampilan input; default: "dd MMM yyyy" / "dd MMM" */
  displayFormat?: string;
};

export const FilterDateRange = <T extends Record<string, any>>({
  label,
  startKey,
  endKey,
  orientation = "horizontal",
  displayFormat = "dd MMM yyyy",
}: FilterDateRangeProps<T>) => {
  const { values, setValue } = useFilterContext();
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const startDate = useMemo(() => {
    const raw = values[startKey as string];
    return raw ? new Date(raw) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[startKey as string]]);

  const endDate = useMemo(() => {
    const raw = values[endKey as string];
    return raw ? new Date(raw) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[endKey as string]]);

  const range = useMemo<DateRange | undefined>(() => {
    if (!startDate && !endDate) return undefined;
    return { from: startDate, to: endDate };
  }, [startDate, endDate]);

  const displayText = useMemo(() => {
    if (startDate && endDate) {
      const sameYear = startDate.getFullYear() === endDate.getFullYear();
      const sameMonth = sameYear && startDate.getMonth() === endDate.getMonth();

      const leftFmt = sameMonth ? "dd" : sameYear ? "dd MMM" : displayFormat;
      return `${format(startDate, leftFmt)} – ${format(endDate, displayFormat)}`;
    }
    if (startDate) return format(startDate, displayFormat);
    if (endDate) return format(endDate, displayFormat);
    return "";
  }, [startDate, endDate, displayFormat]);

  const handleSelect = (next: DateRange | undefined) => {
    const from = next?.from ?? null;
    const to = next?.to ?? null;

    setValue(startKey as string, from ? format(from, "yyyy-MM-dd") : "");
    setValue(endKey as string, to ? format(to, "yyyy-MM-dd") : "");

    // Tutup popover kalau range sudah lengkap
    // if (from && to) setOpen(false);
  };

  const handleClear = () => {
    setValue(startKey as string, "");
    setValue(endKey as string, "");
  };

  return (
    <div
      className={cn(
        "w-full",
        orientation === "horizontal"
          ? "flex items-center gap-2"
          : "flex flex-col gap-2"
      )}
    >
      {label && <Label className="min-w-[140px]">{label}</Label>}

      <div className="relative w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <div className="relative">
              <Input
                readOnly
                value={displayText}
                placeholder="Pilih rentang tanggal"
                className="pr-10 md:pr-20 cursor-pointer text-sm md:text-base"
                onClick={() => setOpen(true)}
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {!!displayText && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                  >
                    <Delete />
                  </Button>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 hidden md:block"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen((s) => !s);
                  }}
                >
                  <CalendarIcon className="h-4 w-4" />
                  <span className="sr-only">Select date range</span>
                </Button>
              </div>
            </div>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              captionLayout="dropdown"
              startMonth={new Date(new Date().getFullYear() - 10, 0)}
              numberOfMonths={isMobile ? 1 : 2}
              selected={range}
              onSelect={handleSelect}
              // Opsional: batasi tanggal (contoh tidak boleh lewat hari ini)
              disabled={(d) => d > new Date()}
              autoFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
