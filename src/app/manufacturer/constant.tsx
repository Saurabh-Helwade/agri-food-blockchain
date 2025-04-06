import { SideNavItem } from "@/types/types";
import {
  IconHome,
  IconPackageExport,
  IconPlus,
  IconChartBar,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/manufacturer/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Manage Suppliers",
    path: "/manufacturer/manage-suppliers",
    icon: <IconSettings width="24" height="24" />,
  },
  {
    title: "Add Product",
    path: "/manufacturer/add-product",
    icon: <IconPlus width="24" height="24" />,
  },
  {
    title: "My Products",
    path: "/manufacturer/products",
    icon: <IconPackageExport width="24" height="24" />,
  },
];
