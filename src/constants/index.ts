import Box3DIcon from "@/assets/icons/box3DIcon";
import BuildingIcon from "@/assets/icons/buildingIcon";
import DashboardIcon from "@/assets/icons/dashboardIcon";
import { NavItem } from "@/types/interface";

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
          // {
          //   title: "Distribusi",
          //   url: "/facilities-infrastructure/distributions",
          // },
          {
            title: "Pelaporan",
            url: "/facilities-infrastructure/reports",
          },
        ],
      },
      {
        title: "Aset",
        url: "/assets",
        icon: Box3DIcon,
        items: [
          {
            title: "Sarana",
            url: "/assets/facilities",
          },
          {
            title: "Prasarana",
            url: "/assets/infrastructures",
          },
        ],
      },
    ],
  };
};
