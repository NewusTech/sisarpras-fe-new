import ActionOption from "@/components/table/actionOption";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../baseColumn";
import { FacilitiesResponse } from "./interface";

export const facilitiesColumns: ColumnDef<FacilitiesResponse>[] = [
  ...createBaseColumns<FacilitiesResponse>(),
  {
    accessorKey: "Tahun Ajaran",
    header: "Tahun Ajaran",
    cell: ({ row }) => row.original.academicYearId,
  },
  {
    accessorKey: "Tanggal Permohonan",
    header: "Tanggal Permohonan",
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
  {
    accessorKey: "Fasilitas",
    header: "Fasilitas",
    cell: ({ row }) => row.original.name,
  },
  {
    accessorKey: "Jenis Sarana",
    header: "Jenis Sarana",
    cell: ({ row }) => row.original.category.name,
  },
  {
    accessorKey: "Prioritas",
    header: "Prioritas",
    cell: ({ row }) => row.original.priority,
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
        linkView={`/facilities-infrastructure/submissions/facility/${row.original.id}`}
        linkUpdate={`/facilities-infrastructure/submissions/facility/${row.original.id}/edit`}
      />
    ),
  },
];
