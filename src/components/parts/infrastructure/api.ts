import { useCustomQuery } from "@/hooks/useCustomQuery";
import { useFormMutation } from "@/hooks/useFormMutation";
import { sendData } from "@/services/api/fetcher";
import {
  DetailInfrastructureResponse,
  InfrastructuresCategoryResponse,
  InfrastructuresRequestResponse,
} from "./interface";
import { InfrastructurePayload } from "./validation";

export const useGetInfrastructuresRequest = (
  query?: string,
  enable?: boolean
) => {
  const endpoint = query
    ? `sarpras/infrastructure-request?${query}`
    : `sarpras/infrastructure-request`;
  return useCustomQuery<
    ApiResponse<DataPaginate<InfrastructuresRequestResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresRequest", query],
    queryUrl: endpoint,
    enabled: enable !== false,
  });
};

export const useGetInfrastructureById = (id: string) => {
  return useCustomQuery<
    ApiResponse<DataObject<DetailInfrastructureResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructureById", id],
    queryUrl: `sarpras/infrastructure-request/${id}`,
    enabled: !!id,
  });
};

export const useGetInfrastructuresByCategory = () => {
  return useCustomQuery<
    ApiResponse<DataPaginate<InfrastructuresCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresByCategory"],
    queryUrl: `master/infrastructure-categories`,
  });
};

export const useInfastructureMutation = () => {
  return useFormMutation<
    ApiResponse<DataObject<any>>,
    Error,
    InfrastructurePayload
  >({
    mutationFn: async (payload: InfrastructurePayload) => {
      return await sendData("sarpras/infrastructure-request", payload, "POST");
    },
    loadingMessage: "Menyimpan permohonan prasarana...",
    successMessage: "Berhasil mengajukan permohonan prasarana",
  });
};

// export const useGetFacilities = (query?: string) => {
//   const endpoint = query
//     ? `sarpras/facility-request?${query}`
//     : `sarpras/facility-request`;
//   return useQuery<ApiResponse<DataPaginate<FacilitiesResponse>>, Error>({
//     queryKey: ["useGetFacilities", query],
//     queryFn: async () => {
//       const response = await fetcher(endpoint);
//       return response;
//     },
//   });
// };

// export const useGetFacilitiesCategory = () => {
//   return useQuery<ApiResponse<DataPaginate<FacilitiesCategoryResponse>>, Error>(
//     {
//       queryKey: ["useGetFacilitiesCategory"],
//       queryFn: async () => {
//         const response = await fetcher(`master/facilities-categories`);
//         return response;
//       },
//     }
//   );
// };
