"use client";

import { Filter, FilterSelect } from "@/components/filters";
import { listItemByFacilitiesColumns } from "@/components/parts/assets/facilites/columns";
import ReviewDetailModal from "@/components/sections/facility/reviewDetailModal";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import DataTable from "@/components/table/dataTable";
import Pagination from "@/components/table/pagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dot } from "lucide-react";
import { useParams } from "next/navigation";

const data = [
  {
    id: 1,
    acceptedDate: "2023-10-10",
    facilityName: "Proyektor",
    itemCode: "A001",
    condition: {
      id: 1,
      name: "Baik",
    },
    imageUrl:
      "https://images.unsplash.com/photo-1519865885898-a54a6f2c7eea?q=80&w=1358&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Page = () => {
  const { room, fs } = useParams();
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
                    options={[
                      {
                        label: "Semua",
                        value: "",
                      },
                      { label: "2025/2026", value: "1" },
                    ]}
                  />
                  <FilterSelect
                    label="Kondisi"
                    name="conditionId"
                    placeholder="Kondisi"
                    options={[
                      { label: "Semua", value: "" },
                      { label: "Baik", value: "1" },
                    ]}
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
