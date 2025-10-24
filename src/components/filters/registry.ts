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
  search: {
    type: "static",
    data: [],
  },
  kategoriSurat: {
    type: "endpoint",
    url: "configuration/letter-type?limit=9999",
    map: (data: DataPaginate<any>) => {
      return [
        { label: "Semua", value: "" },
        ...data.items.map((d) => ({ label: d.name, value: String(d.id) })),
      ];
    },
  },
};
