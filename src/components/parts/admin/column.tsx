import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import ModalDelete from "@/components/shared/modalDelete";

export const productData = [
  {
    id: 1,
    name: "Produk A",
    category: "Elektronik",
    price: 1200000,
    stock: 12,
  },
  {
    id: 2,
    name: "Produk B",
    category: "Pakaian",
    price: 250000,
    stock: 30,
  },
  {
    id: 3,
    name: "Produk C",
    category: "Makanan",
    price: 15000,
    stock: 100,
  },
  {
    id: 4,
    name: "Produk D",
    category: "Minuman",
    price: 10000,
    stock: 80,
  },
  {
    id: 5,
    name: "Produk E",
    category: "Elektronik",
    price: 750000,
    stock: 20,
  },
];

export const productColumns: ColumnDef<ProductResponse>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.original.id,
  },
  {
    accessorKey: "name",
    header: "Nama Produk",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => row.original.category,
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) =>
      `Rp${Number(row.original.price).toLocaleString("id-ID")}`,
  },
  {
    accessorKey: "stock",
    header: "Stok",
    cell: ({ row }) => row.original.stock,
  },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center w-[30px]">
          <MoreVerticalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <Link href={`/tables/admin/edit/${row.original.id}`}>
            <DropdownMenuItem className="cursor-pointer">Edit</DropdownMenuItem>
          </Link>
          <ModalDelete
            endpoint={`infrastruktur/${row.original.id}/delete`}
            queryKey="useGetSarana"
          />
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
