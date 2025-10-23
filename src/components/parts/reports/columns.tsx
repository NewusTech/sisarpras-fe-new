import ActionOption from "@/components/table/actionOption";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import {
  FacilitiesReportResponse,
  InfrastructureReportResponse,
} from "./interface";
import { createBaseColumns } from "../baseColumn";
import CustomBadge from "@/components/shared/customBadge";

export const facilitiesReportColumns: ColumnDef<FacilitiesReportResponse>[] = [
  ...createBaseColumns<FacilitiesReportResponse>(),
  {
    header: "Tahun Ajaran",
    cell: ({ row }) => row.original.academicYear.name,
  },
  {
    header: "Tanggal Permohonan",
    cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
  },
  {
    header: "Jenis Sarana",
    cell: ({ row }) => row.original.category.name,
  },
  {
    header: "Fasilitas",
    cell: ({ row }) => row.original.name,
  },

  {
    header: "Prioritas",
    cell: ({ row }) => <CustomBadge status={row.original.priority} />,
  },

  {
    header: "Jumlah",
    cell: ({ row }) => row.original.quantity,
  },

  {
    header: "Estimasi Anggaran",
    cell: ({ row }) => <div>{formatCurrency(row.original.estimateBudget)}</div>,
  },

  {
    header: "Status",
    cell: ({ row }) => <CustomBadge status={row.original.status} />,
  },
];

export const infrastructuresReportColumns: ColumnDef<InfrastructureReportResponse>[] =
  [
    ...createBaseColumns<InfrastructureReportResponse>(),
    {
      header: "Tahun Ajaran",
      cell: ({ row }) => row.original.academicYear.name,
    },
    {
      header: "Tanggal Permohonan",
      cell: ({ row }) => <div>{formatDate(row.original.createdAt)}</div>,
    },
    {
      header: "Jenis Prasarana",
      cell: ({ row }) => row.original.category.name,
    },
    {
      header: "Nama Ruangan",
      cell: ({ row }) => row.original.name,
    },
    {
      header: "Prioritas",
      cell: ({ row }) => <CustomBadge status={row.original.priority} />,
    },
    {
      header: "Total Luas",
      cell: ({ row }) => row.original.quantity,
    },

    {
      header: "Estimasi Anggaran",
      cell: ({ row }) => (
        <div>{formatCurrency(row.original.estimateBudget)}</div>
      ),
    },
  ];
