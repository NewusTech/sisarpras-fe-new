import { fetcher } from "@/services/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import {
  InfrastructureAssetsByCategoryResponse,
  ListInfrastructureAssetsResponse,
} from "./interface";

export const useGetInfrastructuresAssets = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure?${query}`
    : `sarpras/infrastructure`;
  return useQuery<
    ApiResponse<DataObject<ListInfrastructureAssetsResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresAssets"],
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
    queryKey: ["useGetInfrastructuresCountByCategory"],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
  });
};
