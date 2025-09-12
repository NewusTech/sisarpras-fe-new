"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import type * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNavData } from "@/constants";
import AppSidebarHeader from "./appSidebarHeader";
import { NavItems } from "./navItems";
import { usePermission } from "@/hooks/useGetPermission";
import useGetToken from "@/hooks/useGetToken";
import NavItemsLogout from "./navItemsLogout";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navData = getNavData();
  const { permissions, isLoading } = usePermission();
  const { decode } = useGetToken();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="p-0 sticky">
        <AppSidebarHeader />
      </SidebarHeader>
      <SidebarContent>
        {navData && (
          <NavItems
            items={navData.navItems}
            userRoles={[decode?.role ?? ""]}
            isLoading={isLoading}
            userPermissions={permissions ?? []}
          />
        )}
      </SidebarContent>
      <NavItemsLogout />
      <SidebarRail />
    </Sidebar>
  );
}
