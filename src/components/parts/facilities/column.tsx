import ActionOption from "@/components/table/actionOption";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../baseColumn";

export const facilitiesColumns: ColumnDef<FacilitiesResponse>[] = [
  ...createBaseColumns<FacilitiesResponse>(),
  {
    accessorKey: "Tahun Ajaran",
    header: "Tahun Ajaran",
    cell: ({ row }) => row.original.academicYear,
  },
  {
    accessorKey: "Tanggal Permohonan",
    header: "Tanggal Permohonan",
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
  {
    accessorKey: "Fasilitas",
    header: "Fasilitas",
    cell: ({ row }) => row.original.facility.name,
  },
  {
    accessorKey: "Jenis Sarana",
    header: "Jenis Sarana",
    cell: ({ row }) => row.original.facility.type,
  },
  {
    accessorKey: "Prioritas",
    header: "Prioritas",
    cell: ({ row }) => row.original.priority.name,
  },
  {
    accessorKey: "Status",
    header: "Status",
    cell: ({ row }) => row.original.status,
  },

  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <ActionOption
        linkView={`/facilities-infrastructure/submission/${row.original.id}/facility`}
        linkUpdate={`/facilities-infrastructure/submission/${row.original.id}/facility/edit`}
      />
    ),
  },
];
