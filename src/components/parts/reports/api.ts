import { useQuery } from "@tanstack/react-query";
import {
  FacilitiesReportResponse,
  InfrastructureReportResponse,
} from "./interface";
import { fetcher } from "@/services/api/fetcher";

export const useGetReportFacilities = (query?: string, enable?: boolean) => {
  const endpoint = query
    ? `sarpras/facility-report?${query}`
    : `sarpras/facility-report`;
  return useQuery<ApiResponse<DataPaginate<FacilitiesReportResponse>>, Error>({
    queryKey: ["useGetReportFacilities", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};

export const useGetReportInfrastructures = (
  query?: string,
  enable?: boolean
) => {
  const endpoint = query
    ? `sarpras/infrastructure-report?${query}`
    : `sarpras/infrastructure-report`;
  return useQuery<
    ApiResponse<DataPaginate<InfrastructureReportResponse>>,
    Error
  >({
    queryKey: ["useGetReportInfrastructures", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};
