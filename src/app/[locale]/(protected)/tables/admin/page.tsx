// app/products/page.tsx atau sesuai path-mu
"use client";

import { productColumns, productData } from "@/components/parts/admin/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { useState } from "react";

export default function ProductPage() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const totalItems = productData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedData = productData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className="p-4">
      <BreadcrumbSetItem
        items={[
          {
            title: "Produk",
          },
        ]}
      />
      <h1 className="text-2xl font-bold mb-4">Daftar Produk</h1>
      <div className="flex gap-2 items-center my-5">
        <Search name="search" />
        <LinkButton title="Tambah Produk" link="/tables/admin/create" />
      </div>
      <DataTable
        columns={productColumns}
        data={paginatedData}
        currentPage={page}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
