"use client";

import { facilityAssetsColumns } from "@/components/parts/assets/facilites/columns";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";
import React from "react";

const data = [
  {
    id: 1,
    roomName: "Ruang Kelas 1",
    category: {
      id: 1,
      name: "Elektronik",
    },
  },
];

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
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
          <TableBar searchPlaceholder="Cari Sarana" filterKeys={["filterName"]}>
            <DataTable
              columns={facilityAssetsColumns}
              data={data}
              displayItems
            />
          </TableBar>
        </TableProvider>
      </Card>
    </section>
  );
};

export default Page;
