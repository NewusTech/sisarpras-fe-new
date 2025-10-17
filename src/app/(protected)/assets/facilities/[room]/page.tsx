"use client";

import { useGetFacilitiesCountByCategory } from "@/components/parts/assets/facilites/api";
import { facilitiesByRoomColumns } from "@/components/parts/assets/facilites/columns";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { room } = useParams();
  const { data } = useGetFacilitiesCountByCategory();
  const facilitiesData = data?.data.items || [];
  const facilitiesPagination = data?.data;
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${room}`,
          },
          {
            title: "Aset",
          },
          {
            title: "Sarana",
            href: "/assets/facilities",
          },

          {
            title: `${room}`,
          },
        ]}
      />

      <Card className="space-y-6">
        <TitleHeader title={`Data ${room}`} />
        <TableProvider>
          <TableBar
            searchPlaceholder="Cari Fasilitas"
            filterKeys={["filterName"]}
          >
            <DataTable
              columns={facilitiesByRoomColumns}
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
