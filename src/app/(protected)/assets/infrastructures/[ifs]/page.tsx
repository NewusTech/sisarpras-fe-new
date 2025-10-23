"use client";

import { Filter, FilterSelect } from "@/components/filters";
import { useGetInfrastructuresAssets } from "@/components/parts/assets/infrastructures/api";
import { listItemByInfrastructureColumns } from "@/components/parts/assets/infrastructures/columns";
import ReviewDetailModal from "@/components/sections/infrastructure/reviewDetailModal";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import DataTable from "@/components/table/dataTable";
import Pagination from "@/components/table/pagination";
import { Card } from "@/components/ui/card";
import { useConditionOptions } from "@/hooks/useSelect";
import { Dot } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("modal")?.split(":")[1];
  const { ifs } = useParams();
  const params = searchParams.toString();
  const { data } = useGetInfrastructuresAssets(
    `categoryId=${ifs}${params ? `&${params}` : ""}`
  );
  const infrastructureData = data?.data.paginateData.items || [];
  const infrastructurePagination = data?.data.paginateData;
  const infrastructureCount = data?.data.countByCondition;
  const categoryName = infrastructureData[0]?.category?.name;

  const infrastructureDataById = infrastructureData.find(
    (item) => item.id === Number(id)
  );
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${categoryName}`,
          },
          {
            title: "Aset",
          },
          {
            title: "Prasarana",
            href: "/assets/infrastructures",
          },
          {
            title: `${categoryName}`,
          },
        ]}
      />

      <Card className="space-y-6">
        <TitleHeader title={`Data ${categoryName}`} />
        <Filter mode="auto">
          {() => (
            <>
              <FilterSelect
                label="Kondisi"
                name="condition"
                placeholder="Kondisi"
                options={useConditionOptions}
              />
              <DataTable
                columns={listItemByInfrastructureColumns}
                data={infrastructureData}
                displayItems
                showPagination={false}
              />
              <section className="flex items-center gap-10">
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-primary" />
                  <span>Baik = {infrastructureCount?.GOOD}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-warning-800" />
                  <span>
                    Rusak Ringan = {infrastructureCount?.MINOR_DAMAGE}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-warning" />
                  <span>
                    Rusak Sedang = {infrastructureCount?.MODERATE_DAMAGE}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-error" />
                  <span>Rusak Berat = {infrastructureCount?.MAJOR_DAMAGE}</span>
                </div>
              </section>

              <Pagination
                displayItems
                totalItems={infrastructurePagination?.total_items ?? 0}
                currentPage={infrastructurePagination?.current_page ?? 1}
                itemsPerPage={10}
                totalPages={infrastructurePagination?.total_pages ?? 1}
              />
            </>
          )}
        </Filter>

        <ReviewDetailModal data={infrastructureDataById} />
      </Card>
    </section>
  );
};

export default Page;
