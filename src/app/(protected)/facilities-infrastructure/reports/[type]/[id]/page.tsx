"use client";

import DownloadButton from "@/components/shared/button/downloadButton";
import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import TitleHeader from "@/components/shared/title";
import ValueLabel from "@/components/shared/valueLabel";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import React from "react";

export const access: AccessRule = {
  permissions: [""],
  roles: ["STAFF"],
};

const Page = () => {
  const { type } = useParams();
  return (
    <section>
      <BreadcrumbSetItem
        items={[
          {
            title: `Laporan ${type}`,
          },
          {
            title: "Pelaporan",
          },
          {
            title: "Sarana dan Prasarana",
          },
          {
            title: `Laporan ${type}`,
          },
        ]}
      />
      <Card className="space-y-6">
        <TitleHeader
          title={`Laporan ${type}`}
          className="text-center capitalize"
        />
        <div className="flex justify-end">
          <DownloadButton />
        </div>
        <div className="grid sm:grid-cols-2 grid-cols-1">
          <ValueLabel
            label="Sekolah"
            orientation="horizontal"
            value=": SMA Negeri 1 Tanimbar Selatan"
            labelClassName="w-20"
          />
          <ValueLabel
            label="Pengaju"
            orientation="horizontal"
            value=": SMA Negeri 1 Tanimbar Selatan"
            labelClassName="w-20"
          />
          <ValueLabel
            label="NPSN"
            orientation="horizontal"
            value=": 1235746623"
            labelClassName="w-20"
          />
          <ValueLabel
            label="Tanggal"
            orientation="horizontal"
            value={`: ${formatDate("2023-08-01")}`}
            labelClassName="w-20"
          />
          <ValueLabel
            label="Alamat"
            orientation="horizontal"
            value=": Jalan Karimun Jawa"
            labelClassName="w-20"
          />
        </div>
        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-text-200">
              <TableRow>
                <TableHead>No</TableHead>
                <TableHead>Tanggal Pengajuan</TableHead>
                <TableHead>Fasilitas</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Lokasi</TableHead>
                <TableHead>Kondisi</TableHead>
                <TableHead>Prioritas</TableHead>
                <TableHead>Jumlah</TableHead>
                <TableHead>Estimasi Anggaran</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b">
                <TableCell>1</TableCell>
                <TableCell>01 Agustus 2023</TableCell>
                <TableCell>Meja Belajar</TableCell>
                <TableCell>Furnitur</TableCell>
                <TableCell>Ruang Kelas 1</TableCell>
                <TableCell>Baik</TableCell>
                <TableCell>Tinggi</TableCell>
                <TableCell>20</TableCell>
                <TableCell>Rp 2.000.000</TableCell>
              </TableRow>
              <TableRow className="border-b">
                <TableCell>1</TableCell>
                <TableCell>01 Agustus 2023</TableCell>
                <TableCell>Meja Belajar</TableCell>
                <TableCell>Furnitur</TableCell>
                <TableCell>Ruang Kelas 1</TableCell>
                <TableCell>Baik</TableCell>
                <TableCell>Tinggi</TableCell>
                <TableCell>20</TableCell>
                <TableCell>Rp 2.000.000</TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7} className="text-center font-bold">
                  Total
                </TableCell>
                <TableCell>20</TableCell>
                <TableCell>Rp 2.000.000</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Card>
    </section>
  );
};

export default Page;
