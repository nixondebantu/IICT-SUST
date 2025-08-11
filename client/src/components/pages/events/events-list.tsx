// src/components/pages/events/events-list.tsx

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventsListCard from "./events-list-card";
import { EventRes } from "@/lib/dtos/event.dto";
import { QueryParams } from "@/lib/dtos/query.dto";

interface EventsListProps {
  events: EventRes[];
  isLoading: boolean;
  queryParams: QueryParams;
  onQueryChange: (name: string, value: string) => void;
}

export default function EventsList({
  events,
  isLoading,
  queryParams,
  onQueryChange,
}: EventsListProps) {
  const handleSortChange = (value: string) => {
    const [sortBy, order] = value.split("_");
    onQueryChange("sortBy", sortBy);
    onQueryChange("order", order);
  };

  return (
    <section id="events-list" className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-end items-center mb-8">
          <Select
            value={`${queryParams.sortBy}_${queryParams.order}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="start_time_desc">
                Sort by Date (Upcoming First)
              </SelectItem>
              <SelectItem value="start_time_asc">
                Sort by Date (Oldest First)
              </SelectItem>
              <SelectItem value="title_asc">Sort by Title (A-Z)</SelectItem>
              <SelectItem value="title_desc">Sort by Title (Z-A)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {events.length === 0 && !isLoading && (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">No Events Found</h2>
            <p className="text-gray-500 mt-2">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${isLoading ? 'opacity-50' : ''}`}>
          {events.map((event) => (
            <EventsListCard
              key={event.id}
              id={event.id}
              title={event.title}
              date={new Date(event.start_time).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              time={`${new Date(event.start_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })} - ${new Date(event.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
              category={event.tag.value}
              location={event.location}
              description={event.description}
              image={event.imageUrl}
              buttonLabel={event.cta_title || "Learn More"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}