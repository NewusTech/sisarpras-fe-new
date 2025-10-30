import { useGetInfrastructuresAssets } from "@/components/parts/assets/infrastructures/api";
import { useGetFacilitiesCategory } from "@/components/parts/facilities/api";
import { useGetInfrastructuresByCategory } from "@/components/parts/infrastructure/api";
import {
  useGetAcademicYear,
  useGetGrade,
  useGetGroup,
} from "@/components/parts/master/api";

export const useInfrastructureOptions = () => {
  const { data } = useGetInfrastructuresAssets();

  const options =
    data?.data?.items?.map((item) => ({
      label: item.name.trim(),
      value: item.id.toString(),
    })) || [];

  return options;
};

export const useFacilitiesCategoryOptions = () => {
  const { data } = useGetFacilitiesCategory();

  const options =
    data?.data?.items?.map((item) => ({
      label: item.name.trim(),
      value: item.id.toString(),
    })) || [];

  return options;
};

export const useInfrastructuresCategoryOptions = () => {
  const { data } = useGetInfrastructuresByCategory();

  const options =
    data?.data?.items?.map((item) => ({
      label: item.name.trim(),
      value: item.id.toString(),
      isClassRoom: item.isClassRoom,
    })) || [];

  return options;
};

export const useGetAcademicYearOptions = () => {
  const { data } = useGetAcademicYear();

  const items = data?.data?.items ?? [];

  const options = [
    { label: "Semua", value: "" },
    ...items.map((item) => ({
      label: item.name.trim(),
      value: item.id.toString(),
    })),
  ];

  return options;
};

export const useGetGroupOptions = () => {
  const { data } = useGetGroup();

  const items = data?.data?.items ?? [];

  const options =
    data?.data?.items?.map((item) => ({
      label: item.name.trim(),
      value: item.id.toString(),
    })) || [];

  return options;
};

export const useGetGradeOptions = () => {
  const { data } = useGetGrade();

  const items = data?.data?.items ?? [];

  const options =
    data?.data?.items?.map((item) => ({
      label: item.name.trim(),
      value: item.id.toString(),
    })) || [];

  return options;
};

export const usePriorityOptions = [
  { label: "Tidak Mendesak", value: "NOT_URGENT" },
  { label: "Mendesak", value: "URGENT" },
];

export const useConditionOptions = [
  {
    label: "Semua",
    value: "",
  },
  {
    label: "Baik",
    value: "GOOD",
  },
  {
    label: "Rusak Ringan",
    value: "MINOR_DAMAGED",
  },
  {
    label: "Rusak Berat",
    value: "MAJOR_DAMAGED",
  },
  {
    label: "Rusak Sedang",
    value: "MODERATE_DAMAGED",
  },
];
