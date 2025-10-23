import React from "react";
import { Badge } from "../ui/badge";
import { VariantProps } from "class-variance-authority";

const CustomBadge = ({ status, type }: { status: string; type?: string }) => {
  const statusVariantMap: {
    [key: string]: VariantProps<typeof Badge>["variant"];
  } = {
    pending: "warning",
    APPROVED: "success",
    REJECTED: "error",
    ONPROSESS: "secondary",
    COMPLETED: "success",
    URGENT: "error",
    NOT_URGENT: "secondary",
    GOOD: "info",
    MINOR_DAMAGE: "warningSecondary",
    MODERATE_DAMAGE: "warning",
    MAJOR_DAMAGE: "error",
  };

  const statusTextMap: { [key: string]: string } = {
    pending: "Pending",
    REJECTED: "Ditolak",
    ONPROSESS: "Diproses",
    COMPLETED: "Selesai",
    APPROVED: "Terverifikasi",
    URGENT: "Mendesak",
    NOT_URGENT: "Tidak",
    GOOD: "Baik",
    MINOR_DAMAGE: "Rusak Ringan",
    MODERATE_DAMAGE: "Rusak Sedang",
    MAJOR_DAMAGE: "Rusak Berat",
  };

  return (
    <div>
      <Badge variant={statusVariantMap[status]}>{statusTextMap[status]}</Badge>
    </div>
  );
};

export default CustomBadge;
