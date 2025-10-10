"use client";

import { infrastructureAssetsColumns } from "@/components/parts/assets/infrastructures/columns";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";

const data = [
  {
    id: 1,
    category: {
      id: 1,
      name: "Ruang Kelas",
    },
    quantity: 10,
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
            title: "Prasarana",
          },
          {
            title: "Aset",
          },
          {
            title: "Prasarana",
          },
        ]}
      />
      <Card className="space-y-6">
        <TitleHeader title="Data Aset Prasarana" />
        <TableProvider>
          <TableBar
            searchPlaceholder="Cari Prasarana"
            filterKeys={["filterName"]}
          >
            <DataTable
              columns={infrastructureAssetsColumns}
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
