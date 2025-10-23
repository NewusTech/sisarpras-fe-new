import { fetcher } from "@/services/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import {
  FacilitiesAssetsByCategoryResponse,
  ListFacilitiesAssetsResponse,
} from "./interface";

export const useGetFacilitiesAssets = (query?: string) => {
  const endpoint = query ? `sarpras/facility?${query}` : `sarpras/facility`;
  return useQuery<ApiResponse<DataObject<ListFacilitiesAssetsResponse>>, Error>(
    {
      queryKey: ["useGetFacilitiesAssets", query],
      queryFn: async () => {
        const response = await fetcher(endpoint);
        return response;
      },
    }
  );
};

export const useGetFacilitiesCountByCategory = (query?: string) => {
  const endpoint = query
    ? `sarpras/facility/count-category?${query}`
    : `sarpras/facility/count-category`;
  return useQuery<
    ApiResponse<DataPaginate<FacilitiesAssetsByCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetFacilitiesCountByCategory", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
  });
};
