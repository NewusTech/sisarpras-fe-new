"use client";
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
import { useForm } from "react-hook-form";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

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
        <CardHeader title="Tambah Permohonan Sarana" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 md:grid-cols-2">
              <CustomFormSelectSearch
                name="facilityId"
                label="Nama Sarana"
                options={[{ label: "1", value: "Proyektor" }]}
                placeholder="Pilih Nama Sarana"
                required
              />
              <CustomFormSelectSearch
                name="facilityTypeId"
                label="Jenis Sarana"
                options={[{ label: "1", value: "Teknologi" }]}
                placeholder="Pilih Jenis Sarana"
                required
              />
              <CustomFormSelectSearch
                name="priorityId"
                label="Prioritas"
                options={[{ label: "1", value: "Mendesak" }]}
                placeholder="Pilih Prioritas"
                required
              />
              <CustomFormSelectSearch
                name="locationId"
                options={[{ label: "1", value: "Lab 1" }]}
                placeholder="Pilih Lokasi"
                label="Lokasi (Ruang Kelas)"
                required
              />
              <CustomFormInput
                name="quantity"
                label="Jumlah"
                placeholder="Masukkan Jumlah"
                required
              />
              <CustomFormInput
                name="budgetEstimate"
                label="Estimasi Anggaran"
                placeholder="Masukkan Estimasi Anggaran"
                required
              />
              <CustomFormTextArea
                name="reason"
                label="Alasan Pengajuan"
                placeholder="Masukkan Alasan Pengajuan"
                className="col-span-2"
                required
              />
              <CustomFormDragAndDrop
                label="Dokumen Pendukung"
                name="supportingDocuments"
                maxFiles={5}
                maxSize={5}
                acceptedFileTypes={["application/pdf"]}
                className="col-span-2"
              />
              <CustomFormDragAndDrop
                label="Unggah Dokumentasi"
                name="documentation"
                maxFiles={5}
                maxSize={5}
                acceptedFileTypes={["image/*"]}
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
