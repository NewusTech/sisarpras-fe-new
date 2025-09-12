import { useMutation } from "@tanstack/react-query";
import { sendData } from "@/services/api/fetcher";
import { LoginPayload } from "./validation";
import { LoginData } from "@/types/interface";
import { useFormMutation } from "@/hooks/useFormMutation";
import { unsubscribeWebPush } from "../webpush/api";

export const useLoginMutation = () => {
  return useFormMutation<
    ApiResponse<DataObject<LoginData>>,
    Error,
    LoginPayload
  >({
    mutationFn: async (payload: LoginPayload) => {
      return await sendData("login", payload, "POST");
    },
    successMessage: "Berhasil Login",
  });
};

export const useLogoutMutation = () => {
  return useFormMutation<ApiResponse<DataObject<null>>, Error, undefined>({
    mutationFn: async () => {
      await unsubscribeWebPush();
      return await sendData("auth/logout", {}, "DELETE");
    },
    successMessage: "Berhasil Keluar",
  });
};
