"use client";

import { Filter, FilterSelect } from "@/components/filters";
import { useGetFacilitiesAssets } from "@/components/parts/assets/facilites/api";
import { listItemByFacilitiesColumns } from "@/components/parts/assets/facilites/columns";
import ReviewDetailModal from "@/components/sections/facility/reviewDetailModal";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import DataTable from "@/components/table/dataTable";
import Pagination from "@/components/table/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  useConditionOptions,
  useGetAcademicYearOptions,
} from "@/hooks/useSelect";
import { Dot } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("modal")?.split(":")[1];
  const { fs } = useParams();
  const { data } = useGetFacilitiesAssets();
  const facilitiesData = data?.data.paginateData.items || [];
  const facilitiesPagination = data?.data.paginateData;
  const facilitiesCount = data?.data.countByCondition;
  const facilityById = facilitiesData.find((item) => item.id === Number(id));
  const academicYearOptions = useGetAcademicYearOptions();

  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${fs}`,
          },
          {
            title: "Aset",
          },
          {
            title: "Sarana",
            href: "/assets/facilities",
          },
          {
            title: `${fs}`,
            href: `/assets/facilities/${fs}`,
          },
          {
            title: `${fs}`,
          },
        ]}
      />

      <Card className="space-y-6">
        <TitleHeader title={`Data ${fs}`} />
        <Filter mode="auto">
          {({ resetValues }) => (
            <>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                  <FilterSelect
                    label="Tahun Ajaran"
                    name="academicYearId"
                    placeholder="Tahun Ajaran"
                    options={academicYearOptions}
                  />
                  <FilterSelect
                    label="Kondisi"
                    name="conditionId"
                    placeholder="Kondisi"
                    options={useConditionOptions}
                  />
                </div>

                <div className="flex items-end">
                  <Button className="rounded-full" onClick={resetValues}>
                    Reset
                  </Button>
                </div>
              </div>
              <DataTable
                columns={listItemByFacilitiesColumns}
                data={facilitiesData}
                displayItems
                showPagination={false}
              />
              <section className="flex items-center gap-10">
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-primary" />
                  <span>Baik = {facilitiesCount?.GOOD}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-error" />
                  <span>Rusak Berat = {facilitiesCount?.MAJOR_DAMAGE}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-warning" />
                  <span>Rusak Sedang = {facilitiesCount?.MODERATE_DAMAGE}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-warning-800" />
                  <span>Rusak Ringan = {facilitiesCount?.MINOR_DAMAGE}</span>
                </div>
              </section>
              <Pagination
                displayItems
                totalItems={facilitiesPagination?.total_items ?? 0}
                totalPages={facilitiesPagination?.total_pages ?? 0}
                currentPage={facilitiesPagination?.current_page ?? 0}
                itemsPerPage={10}
              />
            </>
          )}
        </Filter>

        <ReviewDetailModal data={facilityById} />
      </Card>
    </section>
  );
};

export default Page;
