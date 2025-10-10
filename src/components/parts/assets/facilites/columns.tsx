import ActionOption from "@/components/table/actionOption";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../../baseColumn";
import {
  FacilitiesByRoomResponse,
  FacilityAssetsResponse,
  ListItemByFacilitiesResponse,
} from "./interface";
import { formatDate } from "@/lib/utils";
import ActionModalOption from "@/components/table/actionModalOption";
import ModalImage from "@/components/shared/image/modalImage";

export const facilityAssetsColumns: ColumnDef<FacilityAssetsResponse>[] = [
  ...createBaseColumns<FacilityAssetsResponse>(),

  {
    header: "Nama Ruang Kelas",
    cell: ({ row }) => row.original.roomName,
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

export const facilitiesByRoomColumns: ColumnDef<FacilitiesByRoomResponse>[] = [
  ...createBaseColumns<FacilitiesByRoomResponse>(),
  {
    header: "Fasilitas",
    cell: ({ row }) => row.original.facilityName,
  },
  { header: "Kategori", cell: ({ row }) => row.original.category.name },
  { header: "Jumlah", cell: ({ row }) => row.original.quantity },
  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <ActionOption
        linkView={`/assets/facilities/${row.original.roomId}/${row.original.id}`}
      />
    ),
  },
];

export const listItemByFacilitiesColumns: ColumnDef<ListItemByFacilitiesResponse>[] =
  [
    ...createBaseColumns<ListItemByFacilitiesResponse>(),
    {
      header: "Tanggal Penerimaan",
      cell: ({ row }) => <div>{formatDate(row.original.acceptedDate)}</div>,
    },
    {
      header: "ID",
      cell: ({ row }) => row.original.id,
    },
    {
      header: "Kode",
      cell: ({ row }) => row.original.itemCode,
    },
    {
      header: "Fasilitas",
      cell: ({ row }) => row.original.facilityName,
    },
    {
      header: "Kondisi",
      cell: ({ row }) => row.original.condition.name,
    },
    {
      header: "Gambar Label",
      cell: ({ row }) => (
        <ModalImage
          id={row.original.itemCode}
          src={row.original?.imageUrl}
          width={100}
          height={100}
          className="md:!w-20 w-12 rounded-md"
        />
      ),
    },
    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionModalOption queryKey={`detail-item:${row.original.id}`} />
      ),
    },
  ];
