import CustomBadge from "@/components/shared/customBadge";
import ActionModalOption from "@/components/table/actionModalOption";
import ActionOption from "@/components/table/actionOption";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../../baseColumn";
import {
  InfrastructureAssetsByCategoryResponse,
  ListInfrastructureAssetsResponse,
} from "./interface";

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

export const listItemByInfrastructureColumns: ColumnDef<ListInfrastructureAssetsResponse>[] =
  [
    ...createBaseColumns<ListInfrastructureAssetsResponse>(),

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
      cell: ({ row }) => <CustomBadge status={row.original.condition} />,
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
