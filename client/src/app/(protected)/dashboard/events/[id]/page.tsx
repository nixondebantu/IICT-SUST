// src/app/(protected)/dashboard/events/[id]/page.tsx

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
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { useEventByIdQuery, useUpdateEventMutation } = useEventAction();
  const { data: eventData, isLoading } = useEventByIdQuery(Number(id));
  const { mutate: updateEvent, isPending } = useUpdateEventMutation(Number(id));

  const handleEditEvent = (data: EventReq) => {
    if (!id) return;
    updateEvent(data, {
        onSuccess: () => {
          navigate("/dashboard/events");
        },
      }
    );
  };

  return (
    <main className="flex flex-1 flex-col p-4 md:p-6 gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard">Dashboard</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild to={""}><Link to="/dashboard/events">Events</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage><Badge className="shadow-none rounded-sm">Edit: {id}</Badge></BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="mt-4">
        <h1 className="text-2xl font-semibold">Edit Event</h1>
        <p className="text-muted-foreground">Update the details for this event.</p>
      </div>
      {isLoading ? (
        <p>Loading event data...</p> // Replace with a nice skeleton loader
      ) : (
        <EventForm
          onSubmit={handleEditEvent}
          initialValues={eventData}
          isLoading={isPending}
        />
      )}
    </main>
  );
}