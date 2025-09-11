export const filterMapping = {
  filterName: "filterBeVariable",
} as const;

export type FilterKey = keyof typeof filterMapping;

export type Option = { label: string; value: string };
