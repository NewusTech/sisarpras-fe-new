import ActionOption from "@/components/table/actionOption";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../../baseColumn";
import { formatDate } from "@/lib/utils";
import ActionModalOption from "@/components/table/actionModalOption";
import ModalImage from "@/components/shared/image/modalImage";
import {
  InfrastructureAssetsByCategoryResponse,
  ListInfrastructureAssetsPaginateResponse,
} from "../infrastructures/interface";
import {
  FacilitiesAssetsByCategoryResponse,
  ListFacilitiesAssetsPaginateResponse,
  ListFacilitiesAssetsResponse,
} from "./interface";

export const facilityAssetsColumns: ColumnDef<ListInfrastructureAssetsPaginateResponse>[] =
  [
    ...createBaseColumns<ListInfrastructureAssetsPaginateResponse>(),

    {
      header: "Nama Ruang Kelas",
      cell: ({ row }) => row.original.name,
    },

    {
      header: "Kategori",
      cell: ({ row }) => row.original.category.name,
    },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionOption linkView={`/assets/facilities/${row.original.id}`} />
      ),
    },
  ];

export const facilitiesByRoomColumns: ColumnDef<FacilitiesAssetsByCategoryResponse>[] =
  [
    ...createBaseColumns<FacilitiesAssetsByCategoryResponse>(),
    {
      header: "Fasilitas",
      cell: ({ row }) => row.original.name,
    },
    { header: "Kategori", cell: ({ row }) => row.original.category.name },
    { header: "Jumlah", cell: ({ row }) => row.original.total },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionOption
          linkView={`/assets/facilities/${row.original.id}/${row.original.id}`}
        />
      ),
    },
  ];

export const listItemByFacilitiesColumns: ColumnDef<ListFacilitiesAssetsPaginateResponse>[] =
  [
    ...createBaseColumns<ListFacilitiesAssetsPaginateResponse>(),
    {
      header: "Tanggal Penerimaan",
      cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
    {
      header: "ID",
      cell: ({ row }) => row.original.id,
    },
    {
      header: "Kode",
      cell: ({ row }) => row.original.code,
    },
    {
      header: "Fasilitas",
      cell: ({ row }) => row.original.facilityName?.name ?? "-",
    },
    {
      header: "Kondisi",
      cell: ({ row }) => row.original.condition,
    },
    // {
    //   header: "Gambar Label",
    //   cell: ({ row }) => (
    //     <ModalImage
    //       id={row.original.itemCode}
    //       src={row.original?.imageUrl}
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
