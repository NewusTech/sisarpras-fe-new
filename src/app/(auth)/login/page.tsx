"use client";

import { useLoginMutation } from "@/components/parts/login/api";
import {
  LoginPayload,
  loginValidation,
} from "@/components/parts/login/validation";
import { ensureWebPushSubscription } from "@/components/parts/webpush/api";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import GoogleSignInButton from "@/components/shared/googleSignInButton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useShowErrors from "@/hooks/useShowErrors";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = form;
  useShowErrors(errors);

  const loginMutation = useLoginMutation();

  const onSubmit = (data: LoginPayload) => {
    console.log("Login data:", data);
    loginMutation.mutate(data, {
      onSuccess: async (response) => {
        Cookie.set("accessToken", response.data.token);
        // Decode JWT token
        const decoded: decodedProps = jwtDecode(response.data.token);
        if (decoded.role.toLowerCase() === "user") {
          router.push("/profile");
        } else {
          router.push("/dashboard");
        }
        await ensureWebPushSubscription();
      },
    });
  };

  return (
    <>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-xl font-semibold tracking-tight">Silahkan Masuk</h1>
        <p className="text-sm text-muted-foreground">
          Masukkan email dan kata sandi
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <CustomFormInput<LoginPayload>
                name="email"
                label="Email/ NIK"
                placeholder="Login menggunakan NIK/Email"
                required
              />
              <CustomFormInput<LoginPayload>
                name="password"
                label="Kata Sandi"
                placeholder="••••••••"
                type="password"
                required
              />
              <div className="flex justify-end">
                <Link href="#" className="text-sm text-primary">
                  Lupa Kata Sandi?
                </Link>
              </div>
              <Button type="submit" className="rounded-full">
                Masuk
              </Button>
            </div>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-background px-2 text-muted-foreground">
              atau
            </span>
          </div>
        </div>
        <div className="grid gap-2">
          <GoogleSignInButton />
        </div>
      </div>
    </>
  );
}
