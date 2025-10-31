"use client";

import { useFormMutation } from "@/hooks/useFormMutation";
import { fetcher, sendData } from "@/services/api/fetcher";
import { APIError } from "@/types/interface";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "zustand";
import {
  ChangePasswordPayload,
  ChangePasswordUserPayload,
  UserPhotoPayload,
  UserProfilePayload,
} from "./validation";
import { offlineFetcher } from "@/services/api/offlineFetcher";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { UserDetailResponse, UserProfileResponse } from "./interface";

const fetchUserDetail = async (): Promise<
  ApiResponse<DataObject<UserDetailResponse>>
> => {
  return await offlineFetcher(`auth/me`, { queryKey: ["useGetUserDetail"] });
};

export const useGetUserDetail = () => {
  return useQuery<ApiResponse<DataObject<UserDetailResponse>>, APIError<any>>({
    queryKey: ["useGetUserDetail"],
    queryFn: async () => {
      const response = await fetchUserDetail();
      return response;
    },
    networkMode: "offlineFirst",
  });
};

export const useGetProfile = () => {
  return useCustomQuery<
    ApiResponse<DataObject<UserProfileResponse>>,
    APIError<any>
  >({
    queryKey: ["useGetProfile"],
    queryUrl: `profile`,
    refetchIntervalInBackground: true,
  });
};

export const useUserPhotoMutation = () => {
  return useFormMutation<
    ApiResponse<DataObject<UserPhotoPayload>>,
    Error,
    UserPhotoPayload
  >({
    mutationFn: async (payload) => {
      return await sendData(`profile/update-photos`, payload, "PUT", true);
    },
    successMessage: `Berhasil Memperbaharui Foto Profil User`,
  });
};

export const useUserProfileMutation = () => {
  return useFormMutation<
    ApiResponse<DataObject<UserProfilePayload>>,
    Error,
    UserProfilePayload
  >({
    mutationFn: async (payload) => {
      return await sendData(`profile/update`, payload, "PUT", true);
    },
    successMessage: `Berhasil Memperbaharui Profile User`,
  });
};

export const useUserPasswordMutation = (userId?: number) => {
  return useFormMutation<
    ApiResponse<DataObject<{ token: string | null }>>,
    Error,
    ChangePasswordUserPayload | ChangePasswordPayload
  >({
    mutationFn: async (payload) => {
      return await sendData(
        userId
          ? `profile/change-password?userId=${userId}`
          : `profile/change-password`,
        payload,
        "PUT"
      );
    },
    successMessage: `Berhasil Memperbaharui Password User`,
  });
};
