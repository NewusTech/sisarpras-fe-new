import { useMutation } from "@tanstack/react-query";
import { sendData } from "@/services/api/fetcher";
import { LoginPayload } from "./validation";
import { LoginData } from "@/types/interface";

export const useLoginMutation = () => {
  return useMutation<ApiResponse<DataObject<LoginData>>, Error, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      return await sendData("login", payload, "POST");
    },
  });
};
