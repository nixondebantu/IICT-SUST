import {
  Award,
  GalleryThumbnails,
  LayoutDashboard,
  NotebookPen,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import SidebarButton from "./SidebarButton";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const pathname = location.pathname;
  const links = [
    { label: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
    { label: "Carousel", href: "/dashboard/carousel", Icon: GalleryThumbnails },
    { label: "Achievement", href: "/dashboard/achievement", Icon: Award },
    { label: "Blog", href: "/dashboard/blog", Icon: NotebookPen },
  ];
  return (
    <aside
      className={`border-r-2 h-[calc(100vh-3.5rem)] p-2 w-56 ${className}`}
    >
      {links.map((link, index) => (
        <Link key={index} to={link.href}>
          <SidebarButton
            variant={pathname === link.href ? "default" : "ghost"}
            Icon={link.Icon}
            className="w-full"
          >
            {link.label}
          </SidebarButton>
        </Link>
      ))}
    </aside>
  );
}
