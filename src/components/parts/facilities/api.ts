import { useFormMutation } from "@/hooks/useFormMutation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { FacilitySubmissionPayload } from "./validation";
import { useQuery } from "@tanstack/react-query";
import {
  DetailFacilityResponse,
  FacilitiesCategoryResponse,
  FacilitiesResponse,
} from "./interface";

export const useFacilityMutation = () => {
  return useFormMutation<
    ApiResponse<DataObject<FacilitiesResponse>>,
    Error,
    FacilitySubmissionPayload
  >({
    mutationFn: async (payload: FacilitySubmissionPayload) => {
      return await sendData("sarpras/facility-request", payload, "POST");
    },
    loadingMessage: "Menyimpan permohonan sarana...",
    successMessage: "Berhasil mengajukan permohonan sarana",
  });
};

export const useGetFacilities = (query?: string, enable?: boolean) => {
  const endpoint = query
    ? `sarpras/facility-request?${query}`
    : `sarpras/facility-request`;
  return useQuery<ApiResponse<DataPaginate<FacilitiesResponse>>, Error>({
    queryKey: ["useGetFacilities", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};

export const useGetFacilityById = (id: string) => {
  return useQuery<ApiResponse<DataObject<DetailFacilityResponse>>, Error>({
    queryKey: ["useGetFacilityById", id],
    queryFn: async () => {
      const response = await fetcher(`sarpras/facility-request/${id}`);
      return response;
    },
    enabled: !!id,
  });
};

export const useGetFacilitiesCategory = () => {
  return useQuery<ApiResponse<DataPaginate<FacilitiesCategoryResponse>>, Error>(
    {
      queryKey: ["useGetFacilitiesCategory"],
      queryFn: async () => {
        const response = await fetcher(`master/facilities-categories`);
        return response;
      },
    }
  );
};
