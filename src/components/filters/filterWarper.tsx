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
  setValue: (key: string, value: any) => void;
  resetValues: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = (opts?: {
  defaultValues?: Record<string, any>;
}) => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within <Filter>");

  // kalau ada defaultValues, override initialValues & values yang kosong
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
};

export const Filter = ({ children, initialValues = {} }: FilterProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const query = useQueryObject();
  const [values, setValues] = useState<Record<string, any>>({
    ...initialValues,
    ...query,
  });
  const debouncedValues = useDebounce({ value: values, delay: 400 });

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(debouncedValues).forEach(([key, val]) => {
      if (val !== undefined && val !== "") {
        if (Array.isArray(val)) {
          params.set(key, val.join(",")); // ✅ multiple
        } else {
          params.set(key, String(val)); // ✅ single
        }
      }
    });

    const queryStr = params.toString();
    const newUrl = `${pathname}?${queryStr}`;

    router.push(newUrl); // push ke browser URL tanpa reload
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValues]);

  const setValue = useCallback((key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetValues = useCallback(() => {
    setValues(initialValues);
  }, [initialValues]);

  const contextValue = useMemo(
    () => ({ values, setValue, resetValues, initialValues }),
    [values, setValue, resetValues, initialValues]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </FilterContext.Provider>
  );
};
