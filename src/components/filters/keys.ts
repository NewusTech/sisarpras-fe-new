import { start } from "repl";

export const filterMapping = {
  prioritas: "priority",
  kategoriSarana: "categoryId",
  kategoriPrasarana: "categoryId",
  tahunAjaran: "academicYearId",
  tanggalAwal: "startDate",
  tanggalTerakhir: "endDate",
  statusPermohonan: "status",
} as const;

export type FilterKey = keyof typeof filterMapping;

export type Option = { label: string; value: string };
