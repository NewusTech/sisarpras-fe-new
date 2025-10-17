import { useQuery } from "@tanstack/react-query";
import { AcademicYearResponse } from "./interface";
import { fetcher } from "@/services/api/fetcher";

export const useGetAcademicYear = (query?: string, enable?: boolean) => {
  const endpoint = query
    ? `master/academic-year?${query}`
    : `master/academic-year`;
  return useQuery<ApiResponse<DataPaginate<AcademicYearResponse>>, Error>({
    queryKey: ["useGetAcademicYear", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};
