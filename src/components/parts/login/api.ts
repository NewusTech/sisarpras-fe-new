import { useMutation } from "@tanstack/react-query";
import { ApiResponse, DataObject, LoginData } from "@/types";
import { sendData } from "@/services/api/fetcher";
import { LoginPayload } from "./validation";

export const useLoginMutation = () => {
  return useMutation<ApiResponse<DataObject<LoginData>>, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      return await sendData("login", payload, "POST");
    },
  });
};
