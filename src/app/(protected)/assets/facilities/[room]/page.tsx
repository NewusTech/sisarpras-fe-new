"use client";

import { useGetFacilitiesCountByCategory } from "@/components/parts/assets/facilites/api";
import { facilitiesByRoomColumns } from "@/components/parts/assets/facilites/columns";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

const Page = () => {
  const { room } = useParams();
  const searchParams = useSearchParams();
  const params = searchParams.toString();
  const segment = typeof room === "string" ? room.split("-") : [];
  const _titleSegment = segment.length > 0 ? segment.slice(1).join("-") : "-";
  const titleSegment = decodeURI(_titleSegment);
  const segmentId = segment.length > 0 ? segment[0] : "0";
  const { data } = useGetFacilitiesCountByCategory(
    `infrastructureId=${segmentId}${params ? `&${params}` : ""}`
  );
  const facilitiesData = data?.data.items || [];
  const facilitiesPagination = data?.data;
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${titleSegment}`,
          },
          {
            title: "Aset",
          },
          {
            title: "Sarana",
            href: "/assets/facilities",
          },

          {
            title: `${titleSegment}`,
          },
        ]}
      />

      <Card className="space-y-6">
        <TitleHeader title={`Data ${titleSegment}`} />
        <TableProvider>
          <TableBar searchPlaceholder="Cari Fasilitas" filterKeys={["search"]}>
            <DataTable
              columns={facilitiesByRoomColumns(segmentId)}
              data={facilitiesData}
              totalItems={facilitiesPagination?.total_items}
              totalPages={facilitiesPagination?.total_pages}
              currentPage={facilitiesPagination?.current_page}
              displayItems
            />
          </TableBar>
        </TableProvider>
      </Card>
    </section>
  );
};

export default Page;
