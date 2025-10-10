"use client";

import { Filter, FilterSelect } from "@/components/filters";
import { listItemByInfrastructureColumns } from "@/components/parts/assets/infrastructures/columns";
import ReviewDetailModal from "@/components/sections/infrastructure/reviewDetailModal";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import DataTable from "@/components/table/dataTable";
import Pagination from "@/components/table/pagination";
import { Card } from "@/components/ui/card";
import { Dot } from "lucide-react";
import { useParams } from "next/navigation";

const data = [
  {
    id: 1,
    roomName: "Lab",
    volume: "10 m2",
    itemCode: "A001",
    condition: {
      id: 1,
      name: "Baik",
    },
    labelUrl:
      "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Page = () => {
  const { ifs } = useParams();
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `${ifs}`,
          },
          {
            title: "Aset",
          },
          {
            title: "Prasarana",
            href: "/assets/infrastructures",
          },
          {
            title: `${ifs}`,
          },
        ]}
      />

      <Card className="space-y-6">
        <TitleHeader title={`Data ${ifs}`} />
        <Filter mode="auto">
          {() => (
            <>
              <FilterSelect
                label="Kondisi"
                name="conditionId"
                placeholder="Kondisi"
                options={[
                  { label: "Semua", value: "" },
                  { label: "Baik", value: "1" },
                ]}
              />
              <DataTable
                columns={listItemByInfrastructureColumns}
                data={data}
                displayItems
                showPagination={false}
              />
              <section className="flex items-center gap-10">
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-primary" />
                  <span>Baik = 12</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-error" />
                  <span>Rusak Berat = 14</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-warning" />
                  <span>Rusak Sedang = 14</span>
                </div>
                <div className="flex items-center gap-1">
                  <Dot strokeWidth={18} className="text-warning-800" />
                  <span>Rusak Ringan = 14</span>
                </div>
              </section>
              <Pagination
                displayItems
                totalItems={data.length}
                currentPage={1}
                itemsPerPage={10}
                totalPages={Math.ceil(data.length / 10)}
              />
            </>
          )}
        </Filter>

        <ReviewDetailModal />
      </Card>
    </section>
  );
};

export default Page;
