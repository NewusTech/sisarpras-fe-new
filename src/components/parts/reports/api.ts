import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  FacilitiesReportResponse,
  InfrastructureReportResponse,
} from "./interface";

export const useGetReportFacilities = (query?: string, enable?: boolean) => {
  const endpoint = query
    ? `sarpras/facility-report?${query}`
    : `sarpras/facility-report`;
  return useCustomQuery<
    ApiResponse<DataPaginate<FacilitiesReportResponse>>,
    Error
  >({
    queryKey: ["useGetReportFacilities", query],
    queryUrl: endpoint,
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
  return useCustomQuery<
    ApiResponse<DataPaginate<InfrastructureReportResponse>>,
    Error
  >({
    queryKey: ["useGetReportInfrastructures", query],
    queryUrl: endpoint,
    enabled: enable !== false,
  });
};
