"use client";

import { useFilterContext } from "@/components/filters";
import FilterTabs from "@/components/filters/filterTabs";
import {
  useGetReportFacilities,
  useGetReportInfrastructures,
} from "@/components/parts/reports/api";
import {
  facilitiesReportColumns,
  infrastructuresReportColumns,
} from "@/components/parts/reports/columns";
import DownloadButton from "@/components/shared/button/downloadButton";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const searchParams = useSearchParams();
  const { values } = useFilterContext({
    defaultValues: { tabs: "facilities" },
  });
  const tabs = values.tabs;
  const isInfrastructures = tabs === "infrastructures";
  const isFacilities = tabs === "facilities";

  const { data: _facilityData } = useGetReportFacilities(
    searchParams.toString(),
    isFacilities
  );
  const facilityData = _facilityData?.data.items || [];
  const facilityPagination = _facilityData?.data;

  const { data: _infrastructureData } = useGetReportInfrastructures(
    searchParams.toString(),
    isInfrastructures
  );
  const infrastructureData = _infrastructureData?.data.items || [];
  const infrastructurePagination = _infrastructureData?.data;

  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: "Pelaporan",
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: "Pelaporan",
          },
        ]}
      />
      <Card className="space-y-6">
        <TitleHeader title="Data Pelaporan" />
        <TableProvider>
          <Tabs value={tabs}>
            <div className="flex items-center justify-between">
              <FilterTabs
                name={"tabs"}
                options={[
                  {
                    label: "Sarana",
                    value: "facilities",
                  },
                  {
                    label: "Prasarana",
                    value: "infrastructures",
                  },
                ]}
              />

              <DownloadButton
                apiLink={
                  isFacilities
                    ? "sarpras/facility-report/print"
                    : "sarpras/infrastructure-report/print"
                }
              />
            </div>

            <Separator className="mt-0.5 mb-6" />
            <TabsContent value="facilities">
              <TableProvider>
                <TableBar searchPlaceholder="Cari ..." filterKeys={["search"]}>
                  <DataTable
                    columns={facilitiesReportColumns}
                    data={facilityData}
                    totalItems={facilityPagination?.total_items}
                    currentPage={facilityPagination?.page}
                    totalPages={facilityPagination?.total_pages}
                    displayItems
                  />
                </TableBar>
              </TableProvider>
            </TabsContent>
            <TabsContent value="infrastructures">
              <TableProvider>
                <TableBar searchPlaceholder="Cari ..." filterKeys={["search"]}>
                  <DataTable
                    columns={infrastructuresReportColumns}
                    data={infrastructureData}
                    totalItems={infrastructurePagination?.total_items}
                    currentPage={infrastructurePagination?.page}
                    totalPages={infrastructurePagination?.total_pages}
                    displayItems
                  />
                </TableBar>
              </TableProvider>
            </TabsContent>
          </Tabs>
        </TableProvider>
      </Card>
    </section>
  );
};

export default Page;
