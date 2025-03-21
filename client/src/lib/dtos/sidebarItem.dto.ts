import { LucideIcon } from "lucide-react";

export type SidebarItem = {
  links: Array<{
    label: string;
    href: string;
    Icon?: LucideIcon;
  }>;
};
