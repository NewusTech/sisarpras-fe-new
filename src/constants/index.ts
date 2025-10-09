import Box3DIcon from "@/assets/icons/box3DIcon";
import BuildingIcon from "@/assets/icons/buildingIcon";
import DashboardIcon from "@/assets/icons/dashboardIcon";
import { NavItem } from "@/types/interface";
import {
  DockIcon,
  Image,
  LayoutDashboard,
  Map,
  Table2,
  Users,
  View,
} from "lucide-react";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
export const REGION_URL = process.env.NEXT_PUBLIC_API_REGION;

type navDateType = {
  navItems: NavItem[];
};

export const getNavData = (): navDateType => {
  return {
    navItems: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: DashboardIcon,
      },
      {
        title: "Sarana Prasarana",
        url: "/facilities-infrastructure",
        icon: BuildingIcon,
        items: [
          {
            title: "Permohonan",
            url: "/facilities-infrastructure/submissions",
          },
          {
            title: "Pelaporan",
            url: "/facilities-infrastructure/reports",
          },
        ],
      },
      {
        title: "Penyimpanan",
        url: "/storage",
        icon: Box3DIcon,
        items: [
          {
            title: "Sarana",
            url: "/storage/facilities",
          },
          {
            title: "Prasarana",
            url: "/storage/infrastructures",
          },
        ],
      },
      {
        title: "Form Input",
        url: "/form-input",
        icon: DockIcon,
        items: [
          {
            title: "Semua Input",
            url: "/form-input/all",
          },
          {
            title: "Surat",
            url: "/form-input/letter",
          },
        ],
      },
      {
        title: "Manajemen Pengguna",
        url: "",
        icon: Users,
        items: [
          {
            title: "Users",
            url: "/users",
          },
          {
            title: "Roles",
            url: "/roles",
          },
        ],
      },
      {
        title: "Tables",
        url: "/tables",
        icon: Table2,
        items: [
          {
            title: "tables admin",
            url: "/tables/admin",
          },
        ],
      },
      {
        title: "Maps View",
        url: "/maps",
        icon: Map,
      },
      {
        title: "Images",
        url: "/images",
        icon: Image,
      },
      {
        title: "View Label",
        url: "/view-label",
        icon: View,
      },
    ],
  };
};
