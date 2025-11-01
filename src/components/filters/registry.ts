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
  kategoriSarana: {
    type: "endpoint",
    url: "master/facilities-categories?limit=9999",
    map: (data: DataPaginate<any>) => {
      return [
        { label: "Semua", value: "" },
        ...data.items.map((d) => ({ label: d.name, value: String(d.id) })),
      ];
    },
  },
  kategoriPrasarana: {
    type: "endpoint",
    url: "master/infrastructure-categories?limit=9999",
    map: (data: DataPaginate<any>) => {
      return [
        { label: "Semua", value: "" },
        ...data.items.map((d) => ({ label: d.name, value: String(d.id) })),
      ];
    },
  },
  tahunAjaran: {
    type: "endpoint",
    url: "master/academic-year?limit=9999",
    map: (data: DataPaginate<any>) => {
      return [
        { label: "Semua", value: "" },
        ...data.items.map((d) => ({ label: d.name, value: String(d.id) })),
      ];
    },
  },
  statusPermohonan: {
    type: "static",
    data: [
      { label: "Semua", value: "" },
      { label: "Diproses", value: "ONPROSESS" },
      { label: "Terverifikasi", value: "APPROVED" },
      { label: "Ditolak", value: "REJECTED" },
    ],
  },
  prioritas: {
    type: "static",
    data: [
      { label: "Semua", value: "" },
      { label: "Mendesak", value: "URGENT" },
      { label: "Tidak Mendesak", value: "NOT_URGENT" },
    ],
  },
  tanggalAwal: {
    type: "static",
    data: [],
  },
  tanggalTerakhir: {
    type: "static",
    data: [],
  },
};
