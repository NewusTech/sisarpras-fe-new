"use client";

import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

export default function AppSidebarHeader() {
  const { open } = useSidebar();
  return (
    <div className="flex flex-col items-center gap-2 px-2 py-2 pt-6">
      <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Image
          src="/assets/images/logo-pali.png"
          alt="Logo"
          width={open ? 70 : 30}
          height={open ? 70 : 30}
        />
      </div>
      {open && (
        <div className="flex flex-col items-center">
          <p className="font-semibold text-lg text-primary">SIMPUPUK</p>
          <p className="text-xs text-primary">Sistem Informasi Pupuk Tani</p>
        </div>
      )}
    </div>
  );
}
