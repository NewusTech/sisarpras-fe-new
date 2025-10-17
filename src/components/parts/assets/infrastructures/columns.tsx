import ActionOption from "@/components/table/actionOption";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../../baseColumn";
import {
  InfrastructureAssetsByCategoryResponse,
  ListInfrastructureAssetsPaginateResponse,
  ListInfrastructureAssetsResponse,
} from "./interface";
import ModalImage from "@/components/shared/image/modalImage";
import ActionModalOption from "@/components/table/actionModalOption";

export const infrastructureAssetsColumns: ColumnDef<InfrastructureAssetsByCategoryResponse>[] =
  [
    ...createBaseColumns<InfrastructureAssetsByCategoryResponse>(),
    {
      header: "Kategori",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "Jumlah",
      cell: ({ row }) => row.original.total,
    },

    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionOption linkView={`/assets/infrastructures/${row.original.id}`} />
      ),
    },
  ];

export const listItemByInfrastructureColumns: ColumnDef<ListInfrastructureAssetsPaginateResponse>[] =
  [
    ...createBaseColumns<ListInfrastructureAssetsPaginateResponse>(),

    {
      header: "ID",
      cell: ({ row }) => row.original.id,
    },
    {
      header: "Kode",
      cell: ({ row }) => row.original.code,
    },
    {
      header: "Nama Ruang",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "Luas",
      cell: ({ row }) => row.original.area,
    },
    {
      header: "Kondisi",
      cell: ({ row }) => row.original.condition,
    },
    // {
    //   header: "Gambar Label",
    //   cell: ({ row }) => (
    //     <ModalImage
    //       id={row.original.code}
    //       src={row.original?.labelUrl}
    //       width={100}
    //       height={100}
    //       className="md:!w-20 w-12 rounded-md"
    //     />
    //   ),
    // },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionModalOption queryKey={`detail-item:${row.original.id}`} />
      ),
    },
  ];
