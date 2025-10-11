"use client";

import { facilitiesColumns } from "@/components/parts/facilities/column";
import { infrastructureColumns } from "@/components/parts/infrastructure/columns";
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
import { Download, Plus } from "lucide-react";
import React from "react";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const facilityData = [
  {
    id: 1,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 2,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 3,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 4,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 5,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 6,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 7,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 8,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 9,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 10,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
  {
    id: 11,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    facility: {
      name: "Laboratorium Komputer",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
];

const infraData = [
  {
    id: 1,
    academicYear: "2021/2022",
    createdAt: "2021-08-01",
    room: {
      name: "Laboratorium",
      type: "Teknologi",
    },
    priority: {
      name: "Tinggi",
    },
    status: "PENDING",
  },
];

const Page = () => {
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
        <Tabs defaultValue="facilities">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="facilities">Sarana</TabsTrigger>
              <TabsTrigger value="infrastructures">Prasarana</TabsTrigger>
            </TabsList>
            <DownloadButton />
          </div>

          <Separator className="mt-0.5 mb-6" />
          <TabsContent value="facilities">
            <TableProvider>
              <TableBar
                searchPlaceholder="Cari permohonan sarana"
                filterKeys={["filterName"]}
                buttonAdd={{
                  label: "Permohonan Sarana",
                  href: "/facilities-infrastructure/submissions/facility/create",
                }}
              >
                <DataTable
                  columns={facilitiesColumns}
                  data={facilityData}
                  displayItems
                />
              </TableBar>
            </TableProvider>
          </TabsContent>
          <TabsContent value="infrastructures">
            <TableProvider>
              <TableBar
                searchPlaceholder="Cari permohonan prasarana"
                filterKeys={["filterName"]}
                buttonAdd={{
                  label: "Permohonan Prasarana",
                  href: "/facilities-infrastructure/submissions/infrastructure/create",
                }}
              >
                <DataTable
                  columns={infrastructureColumns}
                  data={infraData}
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
