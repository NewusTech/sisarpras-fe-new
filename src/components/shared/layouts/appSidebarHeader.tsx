"use client";

import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

export default function AppSidebarHeader() {
  const { open } = useSidebar();
  return (
    <div className="flex flex-col items-center gap-2 px-2 py-3 mb-8">
      <figure className="flex items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground gap-2.5">
        <div className="aspect-square size-10">
          <Image
            src="/assets/images/logo.webp"
            alt="Logo"
            width={open ? 70 : 30}
            height={open ? 70 : 30}
          />
        </div>
        {open && (
          <figcaption className="font-semibold text-lg text-primary">
            SISARPAS
          </figcaption>
        )}
      </figure>
    </div>
  );
}
