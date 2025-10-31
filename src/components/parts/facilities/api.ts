import { useCustomQuery } from "@/hooks/useCustomQuery";
import { useFormMutation } from "@/hooks/useFormMutation";
import { sendData } from "@/services/api/fetcher";
import {
  DetailFacilityResponse,
  FacilitiesCategoryResponse,
  FacilitiesResponse,
} from "./interface";
import { FacilitySubmissionPayload } from "./validation";

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
  return useCustomQuery<ApiResponse<DataPaginate<FacilitiesResponse>>, Error>({
    queryKey: ["useGetFacilities", query],
    queryUrl: endpoint,
    enabled: enable !== false,
  });
};

export const useGetFacilityById = (id: string) => {
  return useCustomQuery<ApiResponse<DataObject<DetailFacilityResponse>>, Error>(
    {
      queryKey: ["useGetFacilityById", id],
      queryUrl: `sarpras/facility-request/${id}`,
      enabled: !!id,
    }
  );
};

export const useGetFacilitiesCategory = () => {
  return useCustomQuery<
    ApiResponse<DataPaginate<FacilitiesCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetFacilitiesCategory"],
    queryUrl: `master/facilities-categories`,
  });
};
