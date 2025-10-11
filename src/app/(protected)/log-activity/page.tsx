"use client";

import { useGetLogMe } from "@/components/parts/log-activity/api";
import { logActivityColumns } from "@/components/parts/log-activity/column";
import CardHeader from "@/components/sections/cardHeader";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import DataTable from "@/components/table/dataTable";
import { Card } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const { data } = useGetLogMe(params.toString());
  const logData = data?.data;
  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Log Aktivitas",
          },
        ]}
      />
      <Card className="space-y-6">
        <CardHeader title="Log Aktivitas" />
        <DataTable
          columns={logActivityColumns}
          data={logData?.items ?? []}
          currentPage={logData?.current_page ?? 1}
          totalItems={logData?.total_items ?? 0}
          totalPages={logData?.total_pages ?? 1}
          showPagination
          displayItems
        />
      </Card>
    </div>
  );
}
