"use client";

import { useGetCountFacilitiesByCondition } from "@/components/parts/assets/facilites/api";
import { useGetCountInfrastructuresByCondition } from "@/components/parts/assets/infrastructures/api";
import { useGetFacilities } from "@/components/parts/facilities/api";
import { useGetInfrastructuresRequest } from "@/components/parts/infrastructure/api";
import CountCard from "@/components/sections/dashboard/countCard";
import { LineChartSubmission } from "@/components/sections/dashboard/lineChartSubmission";
import { PieChartFacility } from "@/components/sections/dashboard/pieChartFacility";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

export default function Page() {
  const { data: facilities } = useGetCountFacilitiesByCondition();
  const { data: infrastructures } = useGetCountInfrastructuresByCondition();
  const totalFacilities =
    Number(facilities?.data.GOOD) +
      Number(facilities?.data.MAJOR_DAMAGE) +
      Number(facilities?.data.MINOR_DAMAGE) +
      Number(facilities?.data.MODERATE_DAMAGE) || 0;

  const totalInfrastructures =
    Number(infrastructures?.data.GOOD) +
      Number(infrastructures?.data.MAJOR_DAMAGE) +
      Number(infrastructures?.data.MINOR_DAMAGE) +
      Number(infrastructures?.data.MODERATE_DAMAGE) || 0;

  const { data: facilitySubmission } = useGetFacilities();
  const { data: infrastructureSubmission } = useGetInfrastructuresRequest();

  const totalSubmissions =
    facilitySubmission?.data.total_items! +
      infrastructureSubmission?.data.total_items! || 0;

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
        <CountCard title="Total Sarana" numOf={totalFacilities} />
        <CountCard title="Total Prasarana" numOf={totalInfrastructures} />
        <CountCard title="Total Permohonan" numOf={totalSubmissions} />
      </div>
      <div className="flex sm:flex-row flex-col gap-6">
        <PieChartFacility />
        <PieChartFacility />
      </div>
      <LineChartSubmission />
    </div>
  );
}
