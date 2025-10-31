"use client";

import { useLoginMutation } from "@/components/parts/login/api";
import {
  LoginPayload,
  loginValidation,
} from "@/components/parts/login/validation";
import { ensureWebPushSubscription } from "@/components/parts/webpush/api";
import ForgotPassword from "@/components/sections/login/forgotPassword";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import GoogleSignInButton from "@/components/shared/googleSignInButton";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAccounts } from "@/hooks/useAccounts";
import useShowErrors from "@/hooks/useShowErrors";
import { decryptText, encryptText } from "@/services/encrypt";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookie from "js-cookie";
import { Cog } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addAccount } = useAccounts();

  const email = searchParams.get("email");
  const encrypt = searchParams.get("encrypt");

  const form = useForm<LoginPayload>({
    resolver: zodResolver(loginValidation),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = form;

  useShowErrors(errors);

  const loginMutation = useLoginMutation();

  const onSubmit = async (payload: LoginPayload) => {
    let password = "";
    try {
      const decrypt = await decryptText(payload.password);
      console.log({ decrypt });
      password = decrypt;
    } catch (error) {
      password = payload.password;
    }
    const finalPayload = {
      ...payload,
      password,
    };
    // Handle form submission
    loginMutation.mutate(finalPayload, {
      onSuccess: async ({ data }) => {
        let enc;
        localStorage.setItem("activeAccountId", String(data.user.id));
        if (finalPayload.isSavePassword) {
          enc = await encryptText(finalPayload.password);
        }
        addAccount({
          email: data.user.email,
          name: data.user.name,
          token: data.token,
          lastUsed: new Date(),
          id: String(data.user.id),
          avatar: data.user.photos,
          role: data.user.role.name,
          encrypt: enc,
          type: "SECRET",
        });
        Cookie.set("accessToken", data.token);
        await ensureWebPushSubscription();
        router.push("/dashboard");
      },
    });
  };

  const handleToManageAccount = () => {
    router.replace(`/manage-account`);
  };

  useEffect(() => {
    if (email) {
      setValue("identifier", email);
    }
    if (encrypt) {
      setValue("password", encrypt);
    }
  }, [email, setValue, encrypt]);

  return (
    <div className="bg-white sm:py-8 py-3 sm:px-10 px-3 z-10 rounded-2xl shadow-lg">
      <main className="flex-1">
        <div className="flex flex-col items-center justify-center">
          <div className="flex justify-center">
            <Image
              src="/assets/images/logo.webp"
              alt="logo"
              width={80}
              height={80}
            />
          </div>
          <div className="mx-auto p-4 flex w-full flex-col justify-center space-y-6 sm:w-[34rem] rounded-lg">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-xl font-semibold tracking-tight">
                Silahkan Masuk
              </h1>
              <p className="text-sm text-muted-foreground">
                Masukkan email dan kata sandi
              </p>
            </div>
            <div className="grid gap-6">
              <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4">
                    <CustomFormInput<LoginPayload>
                      name="identifier"
                      label="Email"
                      placeholder="Login menggunakan Email"
                      required
                      disabled={!!encrypt}
                    />
                    {!encrypt && (
                      <>
                        <CustomFormInput<LoginPayload>
                          name="password"
                          label="Kata Sandi"
                          placeholder="••••••••"
                          type="password"
                          required
                        />
                        <Label className="text-xs flex items-center justify-between mx-2 mt-1">
                          <span>
                            simpan password (memungkinkan login cepat)
                          </span>
                          <FormField
                            control={control}
                            name={"isSavePassword"} // force compatible
                            render={({ field }) => (
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            )}
                          />
                        </Label>
                        <ForgotPassword />
                      </>
                    )}
                    <Button type="submit" className="rounded-full">
                      Masuk
                    </Button>
                    <div className="my-2 w-full flex items-center justify-center overflow-hidden">
                      <Separator />
                      <span className="text-sm px-2">OR</span>
                      <Separator />
                    </div>
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        type="button"
                        className={`bg-white hover:bg-slate-50 text-black`}
                        onClick={handleToManageAccount}
                      >
                        <Cog /> Kelola Akun
                      </Button>
                      <GoogleSignInButton />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
