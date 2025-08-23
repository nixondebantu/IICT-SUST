// src/app/(protected)/dashboard/events/new/page.tsx

import EventForm from "@/components/forms/EventForm";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import useEventAction from "@/hooks/useEventAction.hook";
import { EventReq } from "@/lib/dtos/event.dto";
import { Link, useNavigate } from "react-router-dom";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { useCreateEventMutation } = useEventAction();
  const { mutate: createEvent, isPending } = useCreateEventMutation();

  const handleSubmit = (data: EventReq) => {
    createEvent(data, {
      onSuccess: () => {
        navigate("/dashboard/events");
      },
    });
  };

  return (
    <div className="flex flex-col p-4 md:p-6 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard/events">Events</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage><Badge className="shadow-none rounded-sm">Create New</Badge></BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">Create a New Event</h1>
        <p className="text-muted-foreground">Fill out the form below to add a new event.</p>
      </div>
      <EventForm onSubmit={handleSubmit} isLoading={isPending} />
    </div>
  );
}