"use client";
import WarningIcon from "@/assets/icons/warningIcon";
import WarningOutlineIcon from "@/assets/icons/warningOutlineIcon";
import CardHeader from "@/components/sections/cardHeader";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { useForm } from "react-hook-form";

const Page = () => {
  const form = useForm({});
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: "Ubah Kata Sandi",
          },
        ]}
      />
      <Card className="space-y-6">
        <CardHeader title="Ubah Kata Sandi" />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid sm:grid-cols-2 grid-cols-1 gap-4"
          >
            <CustomFormInput
              type="password"
              name="oldPassword"
              label="Kata Sandi Lama"
              placeholder="******"
              className="col-span-2"
              required
            />
            <CustomFormInput
              type="password"
              name="newPassword"
              label="Kata Sandi Baru"
              placeholder="******"
              description={
                <div className="flex gap-1 items-center">
                  <WarningOutlineIcon />
                  Password minimal harus terdiri dari 8 Karakter
                </div>
              }
              required
            />
            <CustomFormInput
              type="password"
              name="confirmNewPassword"
              label="Konfirmasi Kata Sandi Baru"
              placeholder="******"
              description={
                <div className="flex gap-1 items-center italic">
                  <WarningOutlineIcon />
                  Pastikan password sama
                </div>
              }
              required
            />
            <Separator />
            <div className="flex justify-end col-span-2">
              <Button type="submit" className="rounded-full">
                Simpan
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default Page;
