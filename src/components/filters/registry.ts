// src/filter/registry.ts
import type { FilterKey, Option } from "@/filter";

export type SourceKind =
  | { type: "static"; data: Option[] }
  | { type: "endpoint"; url: string; map?: (raw: any) => Option[] }
  | {
      type: "loader";
      load: (ctx?: { signal?: AbortSignal; q?: string }) => Promise<Option[]>;
    };

export type FilterRegistry = Record<FilterKey, SourceKind>;

export const defaultFilterRegistry: FilterRegistry = {
  filterName: {
    type: "static",
    data: [
      { label: "tes 1", value: "tes 1" },
      { label: "tes 2", value: "tes 2" },
    ],
  },
};
