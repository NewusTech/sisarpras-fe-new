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
  useRef,
  useState,
} from "react";
import { FilterKey, filterMapping } from "./keys";

type FilterContextType = {
  values: Record<string, any>;
  initialValues: Record<string, any>;
  setValue: (key: string, value: any, mode?: "auto" | "manual") => void;
  resetValues: () => void;
  applyFilters?: () => void;
  tempValues?: Record<string, any>;
  activeFilterCount: number;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = (opts?: {
  defaultValues?: Record<string, any>;
}) => {
  const ctx = useContext(FilterContext);
  if (!ctx) throw new Error("useFilterContext must be used within <Filter>");

  // inject defaultValues ke provider sekali aja
  useEffect(() => {
    if (opts?.defaultValues) {
      Object.entries(opts.defaultValues).forEach(([key, val]) => {
        if (ctx.values[key] === undefined) {
          ctx.setValue(key, val, "auto"); // set langsung ke state provider
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  // ✅ Tambahkan flag biar ga langsung push pas page baru load
  const isInitialMount = useRef(true);
  const lastPath = useRef(pathname);

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

  // ✅ Mode auto tapi jangan jalan di first render atau ketika pindah halaman
  useEffect(() => {
    if (mode !== "auto") return;

    if (isInitialMount.current || lastPath.current !== pathname) {
      isInitialMount.current = false;
      lastPath.current = pathname;
      return;
    }

    pushToUrl(debouncedValues);
  }, [debouncedValues, mode, pushToUrl, pathname]);

  const applyFilters = useCallback(() => {
    const merged = { ...values, ...tempValues };
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
        setValues((prev) => {
          if (isEmpty) {
            const next = { ...prev };
            delete next[key];
            return next;
          }
          return { ...prev, [key]: value };
        });
      } else {
        setTempValues((prev) => {
          if (isEmpty) {
            const next = { ...prev };
            delete next[key];
            return next;
          }
          return { ...prev, [key]: value };
        });
      }
    },
    [mode]
  );

  const resetValues = useCallback(() => {
    const filterKeys = Object.values(filterMapping);

    const currentParams = new URLSearchParams(window.location.search);
    const preservedParams: Record<string, any> = {};

    currentParams.forEach((value, key) => {
      if (!filterKeys.includes(key as any)) {
        preservedParams[key] = value;
      }
    });

    const nextValues = { ...preservedParams, ...initialValues };

    setValues(nextValues);
    setTempValues({});
    pushToUrl(nextValues);
  }, [initialValues, pushToUrl]);

  const activeFilterCount = useMemo(() => {
    return Object.entries(values).filter(([key, v]) => {
      const initVal = initialValues[key];
      const isEmpty =
        v === undefined ||
        v === null ||
        v === "" ||
        (Array.isArray(v) && v.length === 0);
      if (isEmpty) return false;
      if (JSON.stringify(v) === JSON.stringify(initVal)) return false;
      return true;
    }).length;
  }, [values, initialValues]);

  const contextValue = useMemo(
    () => ({
      values,
      setValue,
      resetValues,
      initialValues,
      applyFilters,
      tempValues,
      activeFilterCount,
    }),
    [
      values,
      setValue,
      resetValues,
      initialValues,
      applyFilters,
      tempValues,
      activeFilterCount,
    ]
  );

  useEffect(() => {
    setValues((prev) => {
      const next = { ...initialValues, ...prev };
      if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
      return next;
    });
  }, [initialValues]);

  return (
    <FilterContext.Provider value={contextValue}>
      {typeof children === "function" ? children(contextValue) : children}
    </FilterContext.Provider>
  );
};
