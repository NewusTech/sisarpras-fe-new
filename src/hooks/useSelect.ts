import { useGetFacilitiesCategory } from "@/components/parts/facilities/api";
import {
  useGetInfrastructures,
  useGetInfrastructuresCategory,
} from "@/components/parts/infrastructure/api";

export const useInfrastructureOptions = () => {
  const { data } = useGetInfrastructures();

  const options =
    data?.data.paginateData?.items?.map((item) => ({
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
  const { data } = useGetInfrastructuresCategory();

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
