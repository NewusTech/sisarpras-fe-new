"use client";

import { useFilterContext } from "@/components/filters";
import FilterTabs from "@/components/filters/filterTabs";
import { useGetFacilities } from "@/components/parts/facilities/api";
import { facilitiesColumns } from "@/components/parts/facilities/column";
import { useGetInfrastructuresRequest } from "@/components/parts/infrastructure/api";
import { infrastructureColumns } from "@/components/parts/infrastructure/columns";
import DownloadButton from "@/components/shared/button/downloadButton";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import { TableProvider } from "@/components/table";
import DataTable from "@/components/table/dataTable";
import TableBar from "@/components/table/tableBar";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent } from "@/components/ui/tabs";
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

  const { data: _facilityData } = useGetFacilities(
    searchParams.toString(),
    isFacilities
  );
  const facilityData = _facilityData?.data.items || [];
  const facilityPagination = _facilityData?.data;

  const { data: _infrastructureData } = useGetInfrastructuresRequest(
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
            title: "Permohonan",
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: "Permohonan",
          },
        ]}
      />
      <Card className="space-y-6">
        <TitleHeader title="Data Permohonan" />
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

              <DownloadButton />
            </div>

            <Separator className="mt-0.5 mb-6" />
            <TabsContent value="facilities">
              <TableBar
                searchPlaceholder="Cari permohonan sarana"
                filterKeys={["search"]}
                mobileOrientation="vertical"
                buttonAdd={{
                  label: "Permohonan Sarana",
                  href: "/facilities-infrastructure/submissions/facility/create",
                }}
              >
                <DataTable
                  columns={facilitiesColumns}
                  data={facilityData}
                  totalItems={facilityPagination?.total_items}
                  currentPage={facilityPagination?.page}
                  totalPages={facilityPagination?.total_pages}
                  displayItems
                />
              </TableBar>
            </TabsContent>
            <TabsContent value="infrastructures">
              <TableBar
                searchPlaceholder="Cari permohonan prasarana"
                filterKeys={["search"]}
                mobileOrientation="vertical"
                buttonAdd={{
                  label: "Permohonan Prasarana",
                  href: "/facilities-infrastructure/submissions/infrastructure/create",
                }}
              >
                <DataTable
                  columns={infrastructureColumns}
                  data={infrastructureData}
                  totalItems={infrastructurePagination?.total_items}
                  currentPage={infrastructurePagination?.page}
                  totalPages={infrastructurePagination?.total_pages}
                  displayItems
                />
              </TableBar>
            </TabsContent>
          </Tabs>
        </TableProvider>
      </Card>
    </section>
  );
};

export default Page;
