import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconTruckLoading,
  IconPackages,
  IconClipboardCheck,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/supplier/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Available Products",
    path: "/supplier/products",
    icon: <IconPackages width="24" height="24" />,
  },
  {
    title: "Pickup Requests",
    path: "/supplier/pickup-requests",
    icon: <IconTruckLoading width="24" height="24" />,
  },
];
