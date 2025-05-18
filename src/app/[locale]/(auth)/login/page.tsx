"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import {
  LoginPayload,
  loginValidation,
} from "@/components/parts/login/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "@/components/parts/login/api";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import InputSecure from "@/components/shared/input-secure";
import useShowErrors from "@/hooks/useShowErrors";

export default function LoginPage() {
  const t = useTranslations("auth");

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  useShowErrors(errors);

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginPayload) => {
    console.log("Login data:", data);
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        Cookie.set("accessToken", response.data.token);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Berhasil Login",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
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
              {t("login")}
            </h1>
            <p className="text-sm text-muted-foreground">
              {t("message-login")}
            </p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Label className="grid gap-2">
                      <span>Email</span>
                      <Input
                        id="email"
                        placeholder="nama@contoh.com"
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
                      <div className="flex items-center justify-between">
                        <span>Password</span>
                        <Link
                          href="/forgot-password"
                          className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                        >
                          Lupa password?
                        </Link>
                      </div>
                      <InputSecure {...field} />
                    </Label>
                  )}
                />
                <Button type="submit">{t("login")}</Button>
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
            {t("not-have-account")}{" "}
            <Link
              href="/register"
              className="text-sm font-medium text-primary underline-offset-4 hover:underline"
            >
              {t("register")}
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
