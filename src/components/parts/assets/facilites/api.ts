import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  CountByCondition,
  FacilitiesAssetsByCategoryResponse,
  ListFacilitiesAssetsResponse,
} from "./interface";

export const useGetFacilitiesAssets = (query?: string) => {
  const endpoint = query ? `sarpras/facility?${query}` : `sarpras/facility`;
  return useCustomQuery<
    ApiResponse<DataPaginate<ListFacilitiesAssetsResponse>>,
    Error
  >({
    queryKey: ["useGetFacilitiesAssets", query],
    queryUrl: endpoint,
  });
};

export const useGetFacilitiesCountByCategory = (query?: string) => {
  const endpoint = query
    ? `sarpras/facility/count-category?${query}`
    : `sarpras/facility/count-category`;
  return useCustomQuery<
    ApiResponse<DataPaginate<FacilitiesAssetsByCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetFacilitiesCountByCategory", query],
    queryUrl: endpoint,
  });
};

export const useGetCountFacilitiesByCondition = (query?: string) => {
  const endpoint = query
    ? `sarpras/facility/count?${query}`
    : `sarpras/facility/count`;
  return useCustomQuery<ApiResponse<DataObject<CountByCondition>>, Error>({
    queryKey: ["useGetCountFacilitiesByCondition", query],
    queryUrl: endpoint,
  });
};
