"use client";

import {
  useGetProfile,
  useUserProfileMutation,
} from "@/components/parts/users/api";
import {
  UserProfilePayload,
  UserProfileValidation,
} from "@/components/parts/users/validation";
import { CustomFormCalender } from "@/components/shared/forms/customFormCalender";
import {
  CustomFormInput,
  inputFilters,
} from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import ValueLabel from "@/components/shared/valueLabel";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { employeeStatusMapping, genderMapping } from "@/constants";
import { formatDate } from "@/lib/utils";
import { FormProfileStore } from "@/store/formProfileStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function FormProfile() {
  const qc = useQueryClient();
  const { edit, closeEdit } = FormProfileStore();
  const { data } = useGetProfile();
  const user = data?.data;

  const userProfileMutation = useUserProfileMutation();

  const form = useForm<UserProfilePayload>({
    resolver: zodResolver(UserProfileValidation),
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = form;

  if (errors) console.log(errors);

  const onSubmit = handleSubmit((data) => {
    userProfileMutation.mutate(data, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["useGetProfile"] });
        closeEdit();
      },
    });
  });

  useEffect(() => {
    if (user) {
      reset({
        ...user,
        phone: user.noTelp,
        gender: user.gender === "MALE" ? "MALE" : "FEMALE",
      });
    }
  }, [reset, user]);

  return (
    <div className="flex flex-col my-5 duration-300">
      {edit ? (
        <form onSubmit={onSubmit}>
          <Form {...form}>
            <div className="grid grid-cols-2 gap-5 gap-y-8">
              <CustomFormInput<UserProfilePayload>
                name="email"
                label="Email"
                placeholder="Email"
                filterInput={inputFilters.email}
                disabled
              />

              <CustomFormInput<UserProfilePayload>
                name="nip"
                label="NIP"
                placeholder="Masukkan NIP"
                maxLength={18}
                filterInput={inputFilters.numbersOnly}
              />

              <CustomFormInput<UserProfilePayload>
                name="name"
                label="Nama"
                placeholder="Nama"
              />

              {/* <CustomFormInput<UserProfilePayload>
                name="position"
                label="Jabatan"
                placeholder="Jabatan"
              /> */}

              {/* <CustomFormInput<UserProfilePayload>
                name="rank"
                label="Pangkat"
                placeholder="Masukkan Pangkat"
              /> */}

              <CustomFormInput<UserProfilePayload>
                name="place"
                label="Tempat Lahir"
                placeholder="Masukkan Tempat Lahir"
              />

              <CustomFormCalender<UserProfilePayload>
                name="dateBirth"
                placeholder="YYYY-MM-DD"
                label="Tanggal Lahir"
              />

              <CustomFormSelect<UserProfilePayload>
                name="gender"
                key={watch("gender")}
                label="Jenis Kelamin"
                placeholder="Jenis Kelamin"
                options={[
                  { label: "Laki-Laki", value: "MALE" },
                  { label: "Perempuan", value: "FEMALE" },
                ]}
              />

              <CustomFormInput<UserProfilePayload>
                name="phone"
                label="Nomor Telepon"
                placeholder="Nomor Telepon"
                mask="+62 ___-____-_____"
              />

              <CustomFormInput<UserProfilePayload>
                name="address"
                label="Alamat"
                placeholder="Alamat"
              />

              <Button className="col-span-2 rounded-full min-w-32 ml-auto">
                Simpan
              </Button>
            </div>
          </Form>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          <ValueLabel label="Email" value={user?.email} />
          <ValueLabel label="NIP" value={user?.nip} />
          <ValueLabel
            label="Status Kepegawaian"
            value={employeeStatusMapping[user?.employee.employmentStatus ?? ""]}
          />
          <ValueLabel label="Golongan" value={"-"} />
          <ValueLabel label="Jabatan" value={user?.employee.position} />
          <ValueLabel label="Pangkat" value={user?.employee.rank} />
          <ValueLabel
            label="Tempat & Tanggal Lahir"
            value={`${user?.place}, ${formatDate(user?.dateBirth)}`}
          />
          <ValueLabel
            label="Jenis Kelamin"
            value={genderMapping[user?.gender ?? ""]}
          />
          <ValueLabel label="Nomor Telepon" value={user?.noTelp} />
          <ValueLabel label="Alamat" value={user?.address} />
        </div>
      )}
    </div>
  );
}
