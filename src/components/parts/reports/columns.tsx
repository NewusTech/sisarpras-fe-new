import ActionOption from "@/components/table/actionOption";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  FacilitiesReportResponse,
  InfrastructureReportResponse,
} from "./interface";
import { createBaseColumns } from "../baseColumn";

export const facilitiesReportColumns: ColumnDef<FacilitiesReportResponse>[] = [
  ...createBaseColumns<FacilitiesReportResponse>(),
  {
    header: "Tanggal",
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
  {
    header: "Judul",
    cell: ({ row }) => row.original.title,
  },

  {
    header: "Status",
    cell: ({ row }) => row.original.status,
  },

  {
    accessorKey: "action",
    header: "Aksi",
    cell: ({ row }) => (
      <ActionOption
        linkView={`/facilities-infrastructure/reports/sarana/${row.original.id}`}
      />
    ),
  },
];

export const infrastructuresReportColumns: ColumnDef<InfrastructureReportResponse>[] =
  [
    ...createBaseColumns<InfrastructureReportResponse>(),
    {
      header: "Tanggal",
      cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
    {
      header: "Judul",
      cell: ({ row }) => row.original.title,
    },

    {
      header: "Status",
      cell: ({ row }) => row.original.status,
    },

    {
      accessorKey: "action",
      header: "Aksi",
      cell: ({ row }) => (
        <ActionOption
          linkView={`/facilities-infrastructure/reports/prasarana/${row.original.id}`}
        />
      ),
    },
  ];
