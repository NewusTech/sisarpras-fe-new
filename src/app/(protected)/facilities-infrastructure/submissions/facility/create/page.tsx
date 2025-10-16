"use client";
import { useFacilityMutation } from "@/components/parts/facilities/api";
import {
  FacilitySubmissionPayload,
  facilitySubmissionSchema,
} from "@/components/parts/facilities/validation";
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
  useFacilitiesCategoryOptions,
  useInfrastructureOptions,
  usePriorityOptions,
} from "@/hooks/useSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const router = useRouter();
  const qc = useQueryClient();
  const categoryOptions = useFacilitiesCategoryOptions();
  const infrastructureOptions = useInfrastructureOptions();
  const form = useForm<FacilitySubmissionPayload>({
    resolver: zodResolver(facilitySubmissionSchema),
  });

  const { mutate } = useFacilityMutation();

  const onSubmit = (data: FacilitySubmissionPayload) => {
    mutate(data, {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["useGetFacilities"] });
        router.push("/facilities-infrastructure/submissions?tabs=facilities");
      },
    });
  };
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: "Tambah Permohonan Sarana",
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: "Permohonan",
            href: "/facilities-infrastructure/submissions",
          },
          {
            title: "Tambah Permohonan Sarana",
          },
        ]}
      />
      <Card className="space-y-6">
        <CardHeader
          title="Tambah Permohonan Sarana"
          route="/facilities-infrastructure/submissions?tabs=facilities"
        />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <CustomFormInput<FacilitySubmissionPayload>
                name="name"
                label="Nama Sarana"
                placeholder="Masukkan nama sarana"
                required
              />
              <CustomFormSelectSearch<FacilitySubmissionPayload>
                name="categoryId"
                label="Jenis Sarana"
                options={categoryOptions}
                placeholder="Pilih Jenis Sarana"
                required
              />
              <CustomFormSelectSearch<FacilitySubmissionPayload>
                name="priority"
                label="Prioritas"
                options={usePriorityOptions}
                placeholder="Pilih Prioritas"
                required
              />
              <CustomFormSelectSearch<FacilitySubmissionPayload>
                name="infrastructureId"
                options={infrastructureOptions}
                placeholder="Pilih Lokasi"
                label="Lokasi (Ruang Kelas)"
                required
              />
              <CustomFormInput<FacilitySubmissionPayload>
                name="quantity"
                label="Jumlah"
                placeholder="Masukkan Jumlah"
                required
              />
              <CustomFormInput<FacilitySubmissionPayload>
                name="estimateBudget"
                label="Estimasi Anggaran"
                placeholder="Masukkan Estimasi Anggaran"
                required
              />
              <CustomFormTextArea<FacilitySubmissionPayload>
                name="reason"
                label="Alasan Pengajuan"
                placeholder="Masukkan Alasan Pengajuan"
                className="col-span-2"
                required
              />
              <CustomFormDragAndDrop<FacilitySubmissionPayload>
                label="Dokumen Pendukung"
                name="supportingDocument"
                maxFiles={5}
                maxSize={5}
                acceptedFileTypes={["application/pdf"]}
                className="col-span-2"
              />
              <CustomFormDragAndDrop<FacilitySubmissionPayload>
                label="Unggah Dokumentasi"
                name="documentation"
                maxFiles={5}
                maxSize={5}
                required
                className="col-span-2"
              />
            </div>
            <Separator className="my-6" />
            <div className=" flex justify-end gap-2">
              <Button className="rounded-full">Ajukan Permohonan</Button>
            </div>
          </form>
        </Form>
      </Card>
    </section>
  );
};

export default Page;
