"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { useQueryObject } from "@/hooks/useQueryObject";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type FilterContextType = {
  values: Record<string, any>;
  initialValues: Record<string, any>;
  setValue: (key: string, value: any, mode?: "auto" | "manual") => void;
  resetValues: () => void;
  applyFilters?: () => void;
  tempValues?: Record<string, any>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = (opts?: {
  defaultValues?: Record<string, any>;
}) => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within <Filter>");

  if (opts?.defaultValues) {
    return {
      ...ctx,
      initialValues: { ...opts.defaultValues, ...ctx.initialValues },
      values: { ...opts.defaultValues, ...ctx.values },
    };
  }

  return ctx;
};

type FilterProps = {
  children: React.ReactNode | ((ctx: FilterContextType) => React.ReactNode);
  initialValues?: Record<string, any>;
  mode?: "auto" | "manual";
};

export const Filter = ({
  children,
  initialValues = {},
  mode = "auto",
}: FilterProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const query = useQueryObject();

  const [values, setValues] = useState<Record<string, any>>({
    ...initialValues,
    ...query,
  });

  const [tempValues, setTempValues] = useState<Record<string, any>>({});

  const debouncedValues = useDebounce({ value: values, delay: 400 });

  const pushToUrl = useCallback(
    (val: Record<string, any>) => {
      const params = new URLSearchParams();
      Object.entries(val).forEach(([key, v]) => {
        if (v !== undefined && v !== "" && v !== null) {
          params.set(key, Array.isArray(v) ? v.join(",") : String(v));
        }
      });
      const queryStr = params.toString();
      router.push(queryStr ? `${pathname}?${queryStr}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router]
  );

  // Auto mode jalan sendiri
  useEffect(() => {
    if (mode === "auto") pushToUrl(debouncedValues);
  }, [debouncedValues, mode, pushToUrl]);

  const applyFilters = useCallback(() => {
    const merged = { ...values, ...tempValues };
    // cek apakah semua kosong → reset
    const allEmpty = Object.values(merged).every(
      (v) => v === undefined || v === "" || v === null
    );
    if (allEmpty) {
      setValues(initialValues);
      setTempValues({});
      pushToUrl(initialValues);
    } else {
      setValues(merged);
      pushToUrl(merged);
      setTempValues({});
    }
  }, [values, tempValues, pushToUrl, initialValues]);

  const setValue = useCallback(
    (key: string, value: any, m: "auto" | "manual" = mode) => {
      const isEmpty = value === undefined || value === "" || value === null;

      if (m === "auto") {
        if (isEmpty) {
          setValues(initialValues);
        } else {
          setValues((prev) => ({ ...prev, [key]: value }));
        }
      } else {
        if (isEmpty) {
          setTempValues({});
        } else {
          setTempValues((prev) => ({ ...prev, [key]: value }));
        }
      }
    },
    [mode, initialValues]
  );

  const resetValues = useCallback(() => {
    setValues(initialValues);
    setTempValues({});
    pushToUrl(initialValues);
  }, [initialValues, pushToUrl]);

  const contextValue = useMemo(
    () => ({
      values,
      setValue,
      resetValues,
      initialValues,
      applyFilters,
      tempValues,
    }),
    [values, setValue, resetValues, initialValues, applyFilters, tempValues]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </FilterContext.Provider>
  );
};
