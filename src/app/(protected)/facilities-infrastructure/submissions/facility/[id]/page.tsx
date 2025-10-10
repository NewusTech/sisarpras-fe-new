"use client";
import CardHeader from "@/components/sections/cardHeader";
import MessageCard from "@/components/sections/messageCard";
import ModalImage from "@/components/shared/image/modalImage";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import ValueLabel from "@/components/shared/valueLabel";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const { id } = useParams();
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${id}`,
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: "Permohonan",
            href: "/facilities-infrastructure/submissions",
          },
          {
            title: `${id}`,
          },
        ]}
      />
      <Card className="space-y-6">
        <CardHeader title={`${id}`} />
        <MessageCard />
        <h3>Detail Informasi</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ValueLabel label="No Permohonan" value="-" />
          <ValueLabel label="Tanggal Permohonan" value="-" />
          <ValueLabel label="Nama Sarana" value="-" />
          <ValueLabel label="Jenis Sarana" value="-" />
          <ValueLabel label="Prioritas" value="-" />
          <ValueLabel label="Lokasi (Ruang Kelas)" value="-" />
          <ValueLabel label="Jumlah (Unit)" value="-" />
          <ValueLabel label="Alasan Permohonan" value="-" />
          <ValueLabel
            label="Estimasi Anggaran"
            value="-"
            className="col-span-2"
          />
          <ValueLabel
            label="Dokumen Pendukung"
            value={<ModalImage src={undefined} />}
          />
          <ValueLabel
            label="Dokumentasi"
            value={<ModalImage src={undefined} />}
          />
        </div>
      </Card>
    </section>
  );
};

export default Page;
