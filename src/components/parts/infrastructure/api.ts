import { fetcher, sendData } from "@/services/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import {
  DetailInfrastructureResponse,
  InfrastructureResponse,
  InfrastructuresCategoryResponse,
  InfrastructuresRequestResponse,
} from "./interface";
import { useFormMutation } from "@/hooks/useFormMutation";
import { InfrastructurePayload } from "./validation";

export const useGetInfrastructures = () => {
  return useQuery<ApiResponse<DataObject<InfrastructureResponse>>, Error>({
    queryKey: ["useGetInfrastructures"],
    queryFn: async () => {
      const response = await fetcher(`sarpras/infrastructure`);
      return response;
    },
  });
};

export const useGetInfrastructuresRequest = (
  query?: string,
  enable?: boolean
) => {
  const endpoint = query
    ? `sarpras/infrastructure-request?${query}`
    : `sarpras/infrastructure-request`;
  return useQuery<
    ApiResponse<DataPaginate<InfrastructuresRequestResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresRequest", query],
    queryFn: async () => {
      const response = await fetcher(endpoint);
      return response;
    },
    enabled: enable !== false,
  });
};

export const useGetInfrastructureById = (id: string) => {
  return useQuery<ApiResponse<DataObject<DetailInfrastructureResponse>>, Error>(
    {
      queryKey: ["useGetInfrastructureById", id],
      queryFn: async () => {
        const response = await fetcher(`sarpras/infrastructure-request/${id}`);
        return response;
      },
      enabled: !!id,
    }
  );
};

export const useGetInfrastructuresCategory = () => {
  return useQuery<
    ApiResponse<DataPaginate<InfrastructuresCategoryResponse>>,
    Error
  >({
    queryKey: ["useGetInfrastructuresCategory"],
    queryFn: async () => {
      const response = await fetcher(`master/infrastructure-categories`);
      return response;
    },
  });
};

export const useInfastructureMutation = () => {
  return useFormMutation<
    ApiResponse<DataObject<InfrastructureResponse>>,
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
