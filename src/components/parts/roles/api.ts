import { useFormMutation } from "@/hooks/useFormMutation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { RolesPayload } from "./validation";
import { useCustomQuery } from "@/hooks/useCustomQuery";

export const useGetMasterPermission = () => {
  return useCustomQuery<ApiResponse<DataArray<PermissionResponse>>, Error>({
    queryKey: ["useGetPermission"],
    queryUrl: "master/role/permissions",
  });
};

export const useGetRoles = (props?: string) => {
  return useCustomQuery<ApiResponse<DataPaginate<RolesResponse>>, Error>({
    queryKey: ["useGetRoles", props],
    queryUrl: `master/role?${props}`,
  });
};

export const useGetRolesDetail = (id: number) => {
  return useQuery<ApiResponse<DataObject<RolesDetailResponse>>, Error>({
    queryKey: ["useGetRolesDetail", id],
    queryFn: async () => {
      const response = await fetcher(`master/role/${id}`);
      return response;
    },
    enabled: !!id,
  });
};

export const useGetPermissions = () => {
  return useQuery<ApiResponse<DataArray<Permission>>, Error>({
    queryKey: ["useGetPermissions"],
    queryFn: async () => {
      const response = await fetcher(`master/role/permissions`);
      return response;
    },
  });
};

export const useRolesMutation = (id?: number) => {
  return useFormMutation<
    ApiResponse<DataObject<RolesPayload>>,
    Error,
    RolesPayload
  >({
    mutationFn: async (payload) => {
      return await sendData(
        id ? `master/role/${id}` : `master/role/`,
        payload,
        id ? "PUT" : "POST"
      );
    },
    successMessage: `Berhasil ${id ? "Mengupdate" : "Menambah"} Roles`,
  });
};
