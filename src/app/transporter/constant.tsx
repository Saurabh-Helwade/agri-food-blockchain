import { SideNavItem } from "@/types/types";
import { IconHome, IconTruckLoading } from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/supplier/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Assing Deliveries",
    path: "/transporter/assign-deliveries",
    icon: <IconTruckLoading width="24" height="24" />,
  },
];
