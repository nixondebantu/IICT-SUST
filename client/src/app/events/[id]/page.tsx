import EventBodyCol from "@/components/pages/events/event-body-col";
import EventInfoSidebar from "@/components/pages/events/event-info-sidebar";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function EventDetailsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="my-6">
        <Link to="/events">
          <Button variant={"link"}>
            <FontAwesomeIcon icon={["fas", "arrow-left"]} className="mr-2" />
            Back to All Events
          </Button>
        </Link>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <EventBodyCol />
        <EventInfoSidebar />
      </div>
    </div>
  );
}
