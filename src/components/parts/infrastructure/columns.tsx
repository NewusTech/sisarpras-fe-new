import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../baseColumn";
import { formatDate } from "@/lib/utils";
import ActionOption from "@/components/table/actionOption";

export const infrastructureColumns: ColumnDef<InfrastructureResponse>[] = [
  ...createBaseColumns<InfrastructureResponse>(),
  {
    header: "Tahun Ajaran",
    cell: ({ row }) => row.original.academicYear,
  },
  {
    header: "Tanggal Permohonan",
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
  {
    header: "Nama Ruangan",
    cell: ({ row }) => row.original.room.name,
  },
  {
    header: "Jenis Prasarana",
    cell: ({ row }) => row.original.room.type,
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
        linkView={`/facilities-infrastructure/submissions/infrastructure/${row.original.id}`}
        linkUpdate={`/facilities-infrastructure/submissions/infrastructure/${row.original.id}/edit`}
      />
    ),
  },
];
