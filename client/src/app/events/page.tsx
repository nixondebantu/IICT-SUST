import EventTitleSection from "@/components/pages/events/event-title-section";
import EventsList from "@/components/pages/events/events-list";
import EventsPagination from "@/components/pages/events/events-pagination";
import EventsSearchFilter from "@/components/pages/events/events-search-filter";

export default function EventsPage() {
  return (
    <div>
      <EventTitleSection />
      <EventsSearchFilter />
      <EventsList />
      <EventsPagination />
    </div>
  );
}
