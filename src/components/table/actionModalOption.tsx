"use client";
import { useModalQuery } from "@/hooks/useModalQuery";
import Link from "next/link";
import React from "react";

const ActionModalOption = ({ queryKey }: { queryKey: string }) => {
  const { createModalUrl } = useModalQuery(queryKey);
  return (
    <Link href={createModalUrl()} className=" text-info-500">
      Detail
    </Link>
  );
};

export default ActionModalOption;
