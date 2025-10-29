import { fetcher } from "@/services/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import {
  CountByCondition,
  InfrastructureAssetsByCategoryResponse,
  ListInfrastructureAssetsResponse,
} from "./interface";

export const useGetInfrastructuresAssets = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure?${query}`
    : `sarpras/infrastructure`;
  return useQuery<
    ApiResponse<DataPaginate<ListInfrastructureAssetsResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresAssets", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
  });
};

export const useGetInfrastructuresCountByCategory = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure/count-category?${query}`
    : `sarpras/infrastructure/count-category`;
  return useQuery<
    ApiResponse<DataPaginate<InfrastructureAssetsByCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresCountByCategory", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
  });
};

export const useGetCountInfrastructuresByCondition = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure/count?${query}`
    : `sarpras/infrastructure/count`;
  return useQuery<ApiResponse<DataObject<CountByCondition>>, Error>({
    queryKey: ["useGetCountInfrastructuresByCondition", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
  });
};
