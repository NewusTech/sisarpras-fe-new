"use client";
import { useInfastructureMutation } from "@/components/parts/infrastructure/api";
import {
  InfrastructurePayload,
  infrastructureSchema,
} from "@/components/parts/infrastructure/validation";
import CardHeader from "@/components/sections/cardHeader";
import { CustomFormDragAndDrop } from "@/components/shared/forms/customFormDragAndDrop";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import CustomFormSelectSearch from "@/components/shared/forms/customFormSelectSearch";
import { CustomFormTextArea } from "@/components/shared/forms/customFormTextArea";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import {
  useGetGradeOptions,
  useGetGroupOptions,
  useInfrastructuresCategoryOptions,
  usePriorityOptions,
} from "@/hooks/useSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

const Page = () => {
  const router = useRouter();
  const qc = useQueryClient();
  const form = useForm<InfrastructurePayload>({
    resolver: zodResolver(infrastructureSchema),
  });

  const { watch, handleSubmit } = form;

  const isRoom = String(watch("categoryId")) === "1";

  const infrastructureOptions = useInfrastructuresCategoryOptions();
  const gradeOptions = useGetGradeOptions();
  const groupOptions = useGetGroupOptions();

  const { mutate } = useInfastructureMutation();

  const onSubmit = (data: InfrastructurePayload) => {
    mutate(data, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["useGetInfrastructures"] });
        router.push(
          "/facilities-infrastructure/submissions?tabs=infrastructures"
        );
      },
    });
  };
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: "Tambah Permohonan Prasarana",
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: "Permohonan",
            href: "/facilities-infrastructure/submissions",
          },
          {
            title: "Tambah Permohonan Prasarana",
          },
        ]}
      />
      <Card className="space-y-3 sm:space-y-6">
        <CardHeader
          title="Tambah Permohonan Prasarana"
          route="/facilities-infrastructure/submissions?tabs=infrastructures"
        />
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <CustomFormInput<InfrastructurePayload>
                name="name"
                label="Nama Ruangan"
                placeholder="Masukkan Nama Ruangan"
                required
              />

              <CustomFormSelectSearch<InfrastructurePayload>
                name="categoryId"
                label="Jenis Prasarana"
                options={infrastructureOptions}
                placeholder="Pilih Jenis Prasarana"
                required
              />

              {isRoom && (
                <>
                  <CustomFormSelectSearch<InfrastructurePayload>
                    name="gradeId"
                    label="Jenis Tingkat"
                    options={gradeOptions}
                    placeholder="Pilih Jenis Tingkat"
                    required
                  />

                  <CustomFormSelectSearch<InfrastructurePayload>
                    name="groupId"
                    label="Jenis Golongan"
                    options={groupOptions}
                    placeholder="Pilih Jenis Golongan"
                    required
                  />
                </>
              )}

              <CustomFormInput<InfrastructurePayload>
                name="quantity"
                label="Jumlah"
                placeholder="Masukkan Jumlah"
                required
              />
              <CustomFormInput<InfrastructurePayload>
                name="totalArea"
                label="Rencana Total Luas"
                placeholder="Masukkan Rencana Total Luas"
                required
              />
              <CustomFormSelectSearch<InfrastructurePayload>
                name="priority"
                label="Prioritas"
                options={usePriorityOptions}
                placeholder="Pilih Prioritas"
                required
              />

              <CustomFormInput<InfrastructurePayload>
                name="estimateBudget"
                label="Estimasi Anggaran"
                placeholder="Masukkan Estimasi Anggaran"
                required
              />
              <CustomFormTextArea<InfrastructurePayload>
                name="description"
                label="Keterangan"
                placeholder="Masukkan Keterangan"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <CustomFormTextArea<InfrastructurePayload>
                name="reason"
                label="Alasan Pengajuan"
                placeholder="Masukkan Alasan Pengajuan"
                required
              />
              <CustomFormDragAndDrop<InfrastructurePayload>
                label="Dokumen Pendukung"
                name="supportingDocument"
                maxFiles={5}
                maxSize={5}
                acceptedFileTypes={["application/pdf"]}
              />
              <CustomFormDragAndDrop<InfrastructurePayload>
                label="Unggah Dokumentasi"
                name="documentation"
                maxFiles={5}
                maxSize={5}
                required
              />
            </div>
            <Separator className="my-6" />
            <div className="flex justify-center sm:justify-end gap-2">
              <Button className="rounded-full">Ajukan Permohonan</Button>
            </div>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default Page;
