import { GalleryThumbnails, Newspaper, NotebookPen,Shell,Mails  } from "lucide-react";

export type DashboardOption = {
  label: string;
  description: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const dashboardOptions: DashboardOption[] = [
  {
    label: "Carousel",
    description: "Manage the carousel images",
    href: "/dashboard/carousel",
    Icon: GalleryThumbnails,
  },
  {
    label: "News",
    description: "Manage the IICT news",
    href: "/dashboard/news",
    Icon: Newspaper,
  },
  {
    label: "Blog",
    description: "Let's write some blog on IICT",
    href: "/dashboard/blog",
    Icon: NotebookPen,
  },
  {
    label: "Notices",
    description: "Manage the IICT notices",
    href: "/dashboard/notices",
    Icon: Shell,
  },
  {
    label: "Director's Message",
    description: "Director's message ",
    href: "/dashboard/director_message",
    Icon: Mails,
  }
];
