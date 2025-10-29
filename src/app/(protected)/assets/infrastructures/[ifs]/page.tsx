"use client";

import { Filter, FilterSelect } from "@/components/filters";
import {
  useGetCountInfrastructuresByCondition,
  useGetInfrastructuresAssets,
} from "@/components/parts/assets/infrastructures/api";
import { listItemByInfrastructureColumns } from "@/components/parts/assets/infrastructures/columns";
import ConditionLegend from "@/components/sections/conditionLegend";
import ReviewDetailModal from "@/components/sections/infrastructure/reviewDetailModal";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import DataTable from "@/components/table/dataTable";
import Pagination from "@/components/table/pagination";
import { Card } from "@/components/ui/card";
import { useConditionOptions } from "@/hooks/useSelect";
import { useParams, useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("modal")?.split(":")[1];
  const { ifs } = useParams();
  const params = searchParams.toString();
  const { data } = useGetInfrastructuresAssets(
    `categoryId=${ifs}${params ? `&${params}` : ""}`
  );
  const { data: infrastructureCoditionCount } =
    useGetCountInfrastructuresByCondition(
      `categoryId=${ifs}${params ? `&${params}` : ""}`
    );
  const infrastructureData = data?.data.items || [];
  const infrastructurePagination = data?.data;
  const infrastructureCount = infrastructureCoditionCount?.data;
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
              <section className="flex lg:flex-row flex-col lg:items-center lg:gap-10 gap-2">
                <ConditionLegend
                  label="Baik"
                  color="text-primary"
                  value={infrastructureCount?.GOOD}
                />
                <ConditionLegend
                  label="Rusak Ringan"
                  color="text-warning-800"
                  value={infrastructureCount?.MINOR_DAMAGE}
                />
                <ConditionLegend
                  label="Rusak Sedang"
                  color="text-warning"
                  value={infrastructureCount?.MODERATE_DAMAGE}
                />
                <ConditionLegend
                  label="Rusak Berat"
                  color="text-error"
                  value={infrastructureCount?.MAJOR_DAMAGE}
                />
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
