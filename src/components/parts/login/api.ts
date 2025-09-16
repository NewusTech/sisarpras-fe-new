import { useFormMutation } from "@/hooks/useFormMutation";
import { sendData } from "@/services/api/fetcher";
import { LoginData } from "@/types/interface";
import { unsubscribeWebPush } from "../webpush/api";
import { LoginPayload } from "./validation";

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
