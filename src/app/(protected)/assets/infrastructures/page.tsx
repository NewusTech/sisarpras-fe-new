"use client";

import { useGetInfrastructuresCountByCategory } from "@/components/parts/assets/infrastructures/api";
import { infrastructureAssetsColumns } from "@/components/parts/assets/infrastructures/columns";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const searchParams = useSearchParams();
  const { data } = useGetInfrastructuresCountByCategory(
    searchParams.toString()
  );
  const infrastructureData = data?.data.items || [];
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
            filterKeys={["search"]}
          />
          <DataTable
            columns={infrastructureAssetsColumns}
            data={infrastructureData}
            displayItems
          />
        </TableProvider>
      </Card>
    </section>
  );
};

export default Page;
