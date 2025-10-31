import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  CountByCondition,
  InfrastructureAssetsByCategoryResponse,
  ListInfrastructureAssetsResponse,
} from "./interface";

export const useGetInfrastructuresAssets = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure?${query}`
    : `sarpras/infrastructure`;
  return useCustomQuery<
    ApiResponse<DataPaginate<ListInfrastructureAssetsResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresAssets", query],
    queryUrl: endpoint,
  });
};

export const useGetInfrastructuresCountByCategory = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure/count-category?${query}`
    : `sarpras/infrastructure/count-category`;
  return useCustomQuery<
    ApiResponse<DataPaginate<InfrastructureAssetsByCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresCountByCategory", query],
    queryUrl: endpoint,
  });
};

export const useGetCountInfrastructuresByCondition = (query?: string) => {
  const endpoint = query
    ? `sarpras/infrastructure/count?${query}`
    : `sarpras/infrastructure/count`;
  return useCustomQuery<ApiResponse<DataObject<CountByCondition>>, Error>({
    queryKey: ["useGetCountInfrastructuresByCondition", query],
    queryUrl: endpoint,
  });
};
