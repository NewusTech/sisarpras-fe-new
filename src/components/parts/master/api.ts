import { useQuery } from "@tanstack/react-query";
import {
  AcademicYearResponse,
  GradeResponse,
  GroupResponse,
} from "./interface";
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

export const useGetGrade = (query?: string, enable?: boolean) => {
  const endpoint = query ? `master/grade?${query}` : `master/grade`;
  return useQuery<ApiResponse<DataPaginate<GradeResponse>>, Error>({
    queryKey: ["useGetGrade", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};

export const useGetGroup = (query?: string, enable?: boolean) => {
  const endpoint = query ? `master/group?${query}` : `master/group`;
  return useQuery<ApiResponse<DataPaginate<GroupResponse>>, Error>({
    queryKey: ["useGetGroup", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};
