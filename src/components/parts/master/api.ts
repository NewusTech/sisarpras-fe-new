import { useCustomQuery } from "@/hooks/useCustomQuery";
import {
  AcademicYearResponse,
  GradeResponse,
  GroupResponse,
} from "./interface";

export const useGetAcademicYear = (query?: string, enable?: boolean) => {
  const endpoint = query
    ? `master/academic-year?${query}`
    : `master/academic-year`;
  return useCustomQuery<ApiResponse<DataPaginate<AcademicYearResponse>>, Error>(
    {
      queryKey: ["useGetAcademicYear", query],
      queryUrl: endpoint,
      enabled: enable !== false,
    }
  );
};

export const useGetGrade = (query?: string, enable?: boolean) => {
  const endpoint = query ? `master/grade?${query}` : `master/grade`;
  return useCustomQuery<ApiResponse<DataPaginate<GradeResponse>>, Error>({
    queryKey: ["useGetGrade", query],
    queryUrl: endpoint,
    enabled: enable !== false,
  });
};

export const useGetGroup = (query?: string, enable?: boolean) => {
  const endpoint = query ? `master/group?${query}` : `master/group`;
  return useCustomQuery<ApiResponse<DataPaginate<GroupResponse>>, Error>({
    queryKey: ["useGetGroup", query],
    queryUrl: endpoint,
    enabled: enable !== false,
  });
};
