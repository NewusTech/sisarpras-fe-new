"use client";

import {
  facilitiesReportColumns,
  infrastructuresReportColumns,
} from "@/components/parts/reports/columns";
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

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const data = [
  {
    id: 1,
    createdAt: "2021-08-01",
    title: "Laporan Sarana 1",
    status: "PENDING",
  },
];

const Page = () => {
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
        <Tabs defaultValue="facilities">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="facilities">Sarana</TabsTrigger>
              <TabsTrigger value="infrastructures">Prasarana</TabsTrigger>
            </TabsList>
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-full"
            >
              <Download />
              Unduh Data
            </Button>
          </div>

          <Separator className="mt-0.5 mb-6" />
          <TabsContent value="facilities">
            <TableProvider>
              <TableBar
                searchPlaceholder="Cari ..."
                filterKeys={["filterName"]}
              >
                <DataTable
                  columns={facilitiesReportColumns}
                  data={data}
                  displayItems
                />
              </TableBar>
            </TableProvider>
          </TabsContent>
          <TabsContent value="infrastructures">
            <TableProvider>
              <TableBar
                searchPlaceholder="Cari ..."
                filterKeys={["filterName"]}
              >
                <DataTable
                  columns={infrastructuresReportColumns}
                  data={data}
                  displayItems
                />
              </TableBar>
            </TableProvider>
          </TabsContent>
        </Tabs>
      </Card>
    </section>
  );
};

export default Page;
