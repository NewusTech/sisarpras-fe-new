"use client";

import { useProduct } from "@/components/parts/admin/api";
import {
  ProductFormPayload,
  productFormSchema,
} from "@/components/parts/admin/validation";
import { CustomFormInput } from "@/components/shared/forms/customFormInput";
import { CustomFormSelect } from "@/components/shared/forms/customFormSelect";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateProductPage = () => {
  const router = useRouter();
  const createProductMutation = useProduct("POST");
  const form = useForm<ProductFormPayload>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      category: "",
      price: "",
      stock: "",
    },
  });

  const onSubmit = (data: ProductFormPayload) => {
    console.log("data", data);
    // createProductMutation.mutate(data, {
    //     onSuccess: (data) => {
    //         router.push("/data-master/category-business");
    //     },
    // });
  };

  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Produk",
            href: "/tables/admin",
          },
          {
            title: "Tambah",
          },
        ]}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="">
            <h1 className="text-2xl font-bold mb-4">Tambah Produk</h1>
            <div className="space-y-3 mt-5">
              <CustomFormInput<ProductFormPayload>
                name="name"
                label="Nama Produk"
                placeholder="Masukkan Nama Produk"
              />
              <CustomFormSelect<ProductFormPayload>
                name="category"
                label="Kategori"
                options={[
                  { label: "Makanan", value: "makanan" },
                  { label: "Minuman", value: "minuman" },
                ]}
              />
              <CustomFormInput<ProductFormPayload>
                name="price"
                label="Harga Produk"
                placeholder="Masukkan Harga Produk"
                type="number"
              />
              <CustomFormInput<ProductFormPayload>
                name="stock"
                label="Stok Produk"
                placeholder="Masukkan Stok Produk"
                type="number"
              />
            </div>
            <div className="flex justify-center mt-6 gap-3">
              <Button type="submit" className="rounded-full w-[200px]">
                Tambah
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateProductPage;
