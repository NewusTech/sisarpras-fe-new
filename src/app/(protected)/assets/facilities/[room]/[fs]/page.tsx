"use client";

import { Filter, FilterSelect } from "@/components/filters";
import {
  useGetCountFacilitiesByCondition,
  useGetFacilitiesAssets,
} from "@/components/parts/assets/facilites/api";
import { listItemByFacilitiesColumns } from "@/components/parts/assets/facilites/columns";
import ConditionLegend from "@/components/sections/conditionLegend";
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
import { useParams, useSearchParams } from "next/navigation";

export const access: AccessRule = {
  permissions: [""],
  roles: ["Teknisi Sistem"],
};

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("modal")?.split(":")[1];
  const { room, fs } = useParams();
  const defaultsearchParams = `facilityNameId=${fs}&categoryId=${room}`;
  const { data } = useGetFacilitiesAssets(defaultsearchParams);
  const { data: facilityConditionCount } =
    useGetCountFacilitiesByCondition(defaultsearchParams);
  const facilitiesData = data?.data.items || [];
  const facilitiesPagination = data?.data;
  const facilitiesCount = facilityConditionCount?.data;
  const facilityById = facilitiesData.find((item) => item.id === Number(id));
  const academicYearOptions = useGetAcademicYearOptions();

  const facilityName =
    facilitiesData[0]?.facilityName?.name ?? "(Tidak Diketahui)";
  const roomName =
    facilitiesData[0]?.infrastructure?.name ?? "(Tidak Diketahui)";

  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${facilityName}`,
          },
          {
            title: "Aset",
          },
          {
            title: "Sarana",
            href: "/assets/facilities",
          },
          {
            title: `${roomName}`,
            href: `/assets/facilities/${fs}`,
          },
          {
            title: `${facilityName}`,
          },
        ]}
      />

      <Card className="space-y-6">
        <TitleHeader title={`Data ${facilityName}`} className="capitalize" />
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
              <section className="flex lg:flex-row flex-col lg:items-center lg:gap-10 gap-2">
                <ConditionLegend
                  label="Baik"
                  color="text-primary"
                  value={facilitiesCount?.GOOD}
                />
                <ConditionLegend
                  label="Rusak Ringan"
                  color="text-warning-800"
                  value={facilitiesCount?.MINOR_DAMAGE}
                />
                <ConditionLegend
                  label="Rusak Sedang"
                  color="text-warning"
                  value={facilitiesCount?.MODERATE_DAMAGE}
                />
                <ConditionLegend
                  label="Rusak Berat"
                  color="text-error"
                  value={facilitiesCount?.MAJOR_DAMAGE}
                />
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
