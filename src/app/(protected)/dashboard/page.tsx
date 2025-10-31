"use client";

import CountCard from "@/components/sections/dashboard/countCard";
import { LineChartSubmission } from "@/components/sections/dashboard/lineChartSubmission";
import { PieChartFacility } from "@/components/sections/dashboard/pieChartFacility";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

export default function Page() {
  return (
    <div className="space-y-6">
      <BreadcrumbSetItem
        items={[
          {
            title: "Dashboard",
          },
        ]}
      />
      <div className="flex sm:flex-row flex-col gap-6 items-center">
        <CountCard title="Total Sarana" numOf={2} />
        <CountCard title="Total Prasarana" numOf={100} />
        <CountCard title="Total Permohonan" numOf={100} />
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        <PieChartFacility />
        <PieChartFacility />
      </div>
      <LineChartSubmission />
    </div>
  );
}
