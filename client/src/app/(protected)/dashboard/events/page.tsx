// src/app/(protected)/dashboard/events/page.tsx

import EventListTable from "@/components/pages/events/event-list-table";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function EventsDashboardPage() {
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 gap-4">
      <div className="flex items-center justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage><Badge className="shadow-none rounded-sm">Events</Badge></BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Events</h1>
        <Link to="/dashboard/events/new">
          <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Event</Button>
        </Link>
      </div>
      <EventListTable />
    </main>
  );
}