export const filterMapping = {
  filterName: "search",
  kategoriSurat: "kategoriSurat",
} as const;

export type FilterKey = keyof typeof filterMapping;

export type Option = { label: string; value: string };
