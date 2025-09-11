import { LucideIcon } from "lucide-react";

export interface LoginData {
  email: string | null;
  name: string;
  role: string;
  token: string;
  type: string;
  user_data: string | null;
}

// Define types for our navigation items
export type SubItem = {
  title: string;
  url: string;
  roles?: string[]; // Roles that can access this subitem
} & AccessRule;

export type NavItem = {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  items?: SubItem[];
  directLinkRoles?: string[]; // Roles that should access the main URL directly without seeing sub-items
} & AccessRule;
