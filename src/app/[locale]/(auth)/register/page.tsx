"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import InputSecure from "@/components/shared/input-secure";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useShowErrors from "@/hooks/useShowErrors";
import {
  RegisterPayload,
  registerValidation,
} from "@/components/parts/register/validation";
import { useRegisterMutation } from "@/components/parts/register/api";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const t = useTranslations("auth");
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterPayload>({
    resolver: zodResolver(registerValidation),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      rePassword: "",
    },
  });
  useShowErrors(errors);

  const registerMutation = useRegisterMutation();

  const onSubmit = (data: RegisterPayload) => {
    console.log("Login data:", data);
    registerMutation.mutate(data, {
      onSuccess: (response) => {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Berhasil Registrasi",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        router.push("/login");
      },
      onError: (error) =>
        Swal.fire({ icon: "error", title: "Gagal!", text: error.message }),
    });
  };

  return (
    <main className="flex-1">
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              {t("register")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("message-register")}
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Label className="grid gap-2">
                      <span>{t("label-name.name")}</span>
                      <Input
                        placeholder={t("label-name.place-holder")}
                        autoCapitalize="none"
                        autoCorrect="off"
                        {...field}
                      />
                    </Label>
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Label className="grid gap-2">
                      <span>{t("label-email.name")}</span>
                      <Input
                        placeholder={t("label-email.place-holder")}
                        type="email"
                        autoCapitalize="none"
                        autoComplete="email"
                        autoCorrect="off"
                        {...field}
                      />
                    </Label>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Label className="grid gap-2">
                      <span>{t("label-password.name")}</span>
                      <InputSecure {...field} />
                    </Label>
                  )}
                />
                <Controller
                  name="rePassword"
                  control={control}
                  render={({ field }) => (
                    <Label className="grid gap-2">
                      <span>{t("label-comfirm-password.name")}</span>
                      <InputSecure {...field} />
                    </Label>
                  )}
                />
                <Button type="submit"> {t("register")}</Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  {t("message-other-login")}
                </span>
              </div>
            </div>
            <div className="grid gap-2">
              <Button variant="outline" type="button">
                Google
              </Button>
              <Button variant="outline" type="button">
                GitHub
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            {t("have-account")}{" "}
            <Link
              href="/login"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("login")}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
