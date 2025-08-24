// src/app/events/[id]/page.tsx

import EventBodyCol from "@/components/pages/events/event-body-col";
import EventInfoSidebar from "@/components/pages/events/event-info-sidebar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useEventAction from "@/hooks/useEventAction.hook";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// A skeleton loader for a better UX while data is fetching
const EventDetailsSkeleton = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <Skeleton className="h-8 w-48 mb-6" />
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Body Skeleton */}
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="w-full h-64 rounded-lg" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-24" />
        <div className="space-y-4 pt-8">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>
      </div>
      {/* Sidebar Skeleton */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 rounded-lg p-6 sticky top-4 space-y-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-full mt-6" />
        </div>
      </div>
    </div>
  </div>
);

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { useEventByIdQuery } = useEventAction();

  const { data: event, isLoading, isError, error } = useEventByIdQuery(Number(id));

  if (isLoading) {
    return <EventDetailsSkeleton />;
  }

  if (isError || !event) {
    return (
      <div className="container mx-auto text-center py-20">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Event Not Found</h2>
        <p className="text-muted-foreground">{error?.message || "We couldn't find the event you're looking for."}</p>
        <Link to="/events" className="mt-6 inline-block">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Events
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-6">
        <Link to="/events">
          <Button variant={"link"}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to All Events
          </Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Pass the fetched event data to the child components */}
        <EventBodyCol event={event} />
        <EventInfoSidebar event={event} />
      </div>
    </div>
  );
}