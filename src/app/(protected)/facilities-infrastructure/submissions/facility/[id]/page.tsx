"use client";
import { useGetFacilityById } from "@/components/parts/facilities/api";
import CardHeader from "@/components/sections/cardHeader";
import MessageCard from "@/components/sections/messageCard";
import ModalImage from "@/components/shared/image/modalImage";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import ReviewFile from "@/components/shared/reviewFile";
import ValueLabel from "@/components/shared/valueLabel";
import { Card } from "@/components/ui/card";
import { priorityMapping } from "@/constants";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const { id } = useParams();
  const { data } = useGetFacilityById(String(id));
  const detail = data?.data;
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${detail?.name}`,
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: "Permohonan",
            href: "/facilities-infrastructure/submissions",
          },
          {
            title: `${detail?.name}`,
          },
        ]}
      />
      <Card className="sm:space-y-6 space-y-3">
        <CardHeader
          title={`${detail?.name}`}
          status={detail?.status}
          route="/facilities-infrastructure/submissions?tabs=facilities"
        />
        {detail?.status !== "ONPROSESS" && (
          <MessageCard
            message={detail?.notes}
            verifiedBy={detail?.approvedByUser.name}
            date={detail?.approvedAt}
          />
        )}
        <h1 className="font-normal sm:text-lg">Detail Informasi</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ValueLabel label="No Permohonan" value={detail?.id} />
          <ValueLabel
            label="Tanggal Permohonan"
            value={formatDate(detail?.date)}
          />
          <ValueLabel label="Nama Sarana" value={detail?.name} />
          <ValueLabel label="Jenis Sarana" value={detail?.category.name} />
          <ValueLabel
            label="Prioritas"
            value={priorityMapping[detail?.priority || ""]}
          />
          <ValueLabel
            label="Lokasi (Ruang Kelas)"
            value={detail?.infrastructure.name}
          />
          <ValueLabel label="Jumlah (Unit)" value={detail?.quantity} />
          <ValueLabel label="Alasan Permohonan" value={detail?.reason} />
        </div>
        <div className="grid gap-4 grid-cols-1">
          <ValueLabel
            label="Estimasi Anggaran"
            value={formatCurrency(detail?.estimateBudget)}
          />
          <ValueLabel
            label="Dokumen Pendukung"
            value={
              <div>
                {detail?.supportingDocument.map((doc, index) => (
                  <ReviewFile src={doc} key={index} />
                ))}
              </div>
            }
          />
          <ValueLabel
            label="Dokumentasi"
            value={
              <div className="flex flex-wrap gap-4">
                {detail?.documentation.map((doc, index) => (
                  <ModalImage key={index} src={doc} className="w-32 " />
                ))}
              </div>
            }
          />
        </div>
      </Card>
    </section>
  );
};

export default Page;
