"use client";

import { useGetProduct } from "@/components/parts/admin/api";
import { productColumns } from "@/components/parts/admin/column";
import LinkButton from "@/components/shared/button/linkButton";
import DataTable from "@/components/shared/dataTable";
import Search from "@/components/shared/filter/search";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";

export default function ProductPage() {
  const { data: _product } = useGetProduct();
  const product = _product?.data ?? [];

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
      <DataTable columns={productColumns} data={product} itemsPerPage={1000} />
    </div>
  );
}
