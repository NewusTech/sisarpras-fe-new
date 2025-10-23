"use client";

import { facilityAssetsColumns } from "@/components/parts/assets/facilites/columns";
import { useGetInfrastructuresAssets } from "@/components/parts/assets/infrastructures/api";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import React from "react";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const searchParams = useSearchParams();
  const { data } = useGetInfrastructuresAssets(searchParams.toString());
  const infrastructureData = data?.data.paginateData.items || [];
  const infrastructurePagination = data?.data.paginateData;
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: "Sarana",
          },
          {
            title: "Aset",
          },
          {
            title: "Sarana",
          },
        ]}
      />
      <Card className="space-y-6">
        <TitleHeader title="Data Aset Sarana" />
        <TableProvider>
          <TableBar searchPlaceholder="Cari Sarana" filterKeys={["search"]}>
            <DataTable
              columns={facilityAssetsColumns}
              data={infrastructureData}
              totalItems={infrastructurePagination?.total_items}
              totalPages={infrastructurePagination?.total_pages}
              currentPage={infrastructurePagination?.current_page}
              displayItems
            />
          </TableBar>
        </TableProvider>
      </Card>
    </section>
  );
};

export default Page;
