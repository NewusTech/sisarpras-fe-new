"use client";

import useGetToken from "@/hooks/useGetToken";
import { canAccess } from "@/lib/canAccsess";
import { unauthorized, usePathname } from "next/navigation";
import React, { Suspense } from "react";
import SwirlingEffectSpinner from "./swirlingEffectSpinner";
import { usePermission } from "@/hooks/useGetPermission";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const { decode } = useGetToken();
  const { isLoading, permissions } = usePermission();
  const isPermission =
    decode?.name && permissions && canAccess(path, [decode?.name], permissions);

  if (isLoading)
    return (
      <div className="w-[100wh] h-[80vh] flex justify-center items-center">
        <SwirlingEffectSpinner />
      </div>
    );
  if (isPermission) return <Suspense>{children}</Suspense>;

  if (!isPermission && !isLoading) unauthorized();
}
