import { useCustomQuery } from "@/hooks/useCustomQuery";
import { fetcher } from "@/services/api/fetcher";
import { APIError } from "@/types/interface";
import { useQuery } from "@tanstack/react-query";

const fetchLog = async (
  params?: string
): Promise<ApiResponse<DataPaginate<LogAcivityResponse>>> => {
  return await fetcher(`log?${params}`);
};

export const useGetLog = (params?: string) => {
  return useCustomQuery<
    ApiResponse<DataPaginate<LogAcivityResponse>>,
    APIError<any>
  >({
    queryKey: ["useGetLog", params],
    queryUrl: `log?${params}`,
  });
};
export const useGetLogMe = (params?: string) => {
  return useCustomQuery<
    ApiResponse<DataPaginate<LogAcivityResponse>>,
    APIError<any>
  >({
    queryKey: ["useGetLogMe", params],
    queryUrl: `log/me?${params}`,
  });
};

export const useGetLogBy = (id: number, params?: string) => {
  return useCustomQuery<
    ApiResponse<DataPaginate<LogAcivityResponse>>,
    APIError<any>
  >({
    queryKey: ["useGetLogBy", params],
    queryUrl: `log/user/${id}?${params}`,
  });
};
