import { fetcher } from "@/services/api/fetcher";
import { useProfile } from "@/store/userStore";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "zustand";

const fetchUserDetail = async (): Promise<
  ApiResponse<DataObject<UserDetailResponse>>
> => {
  return await fetcher(`auth/me`);
};

export const useGetUserDetail = () => {
  const { setUser } = useStore(useProfile);
  return useQuery<
    ApiResponse<DataObject<UserDetailResponse>>,
    APIError<string>
  >({
    queryKey: ["useGetUserDetail"],
    queryFn: async () => {
      const response = await fetchUserDetail();
      setUser(response.data);
      return response;
    },
  });
};
