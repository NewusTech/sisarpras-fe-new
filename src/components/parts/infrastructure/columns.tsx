import ActionOption from "@/components/table/actionOption";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { createBaseColumns } from "../baseColumn";
import { InfrastructuresRequestResponse } from "./interface";
import CustomBadge from "@/components/shared/customBadge";

export const infrastructureColumns: ColumnDef<InfrastructuresRequestResponse>[] =
  [
    ...createBaseColumns<InfrastructuresRequestResponse>(),
    {
      header: "Tahun Ajaran",
      cell: ({ row }) => row.original.academicYear.name,
    },
    {
      header: "Tanggal Permohonan",
      cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
    {
      header: "Nama Ruangan",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "Jenis Prasarana",
      cell: ({ row }) => row.original.category.name,
    },
    {
      accessorKey: "Prioritas",
      header: "Prioritas",
      cell: ({ row }) => <CustomBadge status={row.original.priority} />,
    },
    {
      accessorKey: "Status",
      header: "Status",
      cell: ({ row }) => <CustomBadge status={row.original.status} />,
    },

    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionOption
          linkView={`/facilities-infrastructure/submissions/infrastructure/${row.original.id}`}
          // linkUpdate={`/facilities-infrastructure/submissions/infrastructure/${row.original.id}/edit`}
        />
      ),
    },
  ];
