import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function EventsSearchFilter() {
  const [duration, setDuration] = useState("this_month");
  const [type, setType] = useState("all");
  return (
    <section id="search-filter" className="py-8 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          {/* <!-- Search Bar --> */}
          <div className="relative w-full lg:w-96">
            <FontAwesomeIcon
              icon={["fas", "magnifying-glass"]}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <Input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3"
            />
          </div>

          {/* 👩‍💻 Left behind for future developers with challenge of building a calender view */}
          {/* <!-- View Toggle --> */}
          {/* <div className="flex bg-gray-100 rounded-lg p-1">
            <Button id="list-view-btn" className="px-4 py-2">
              <FontAwesomeIcon icon={["fas", "list"]} className="mr-2" />
              List
            </Button>
            <Button
              id="calendar-view-btn"
              variant={"secondary"}
              className="px-4 py-2"
            >
              <FontAwesomeIcon icon={["fas", "calendar"]} className="mr-2" />
              Calendar
            </Button>
          </div> */}

          {/* <!-- Filters --> */}
          <div className="mt-6 flex flex-wrap gap-2">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seminar">Seminar</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="conference">Conference</SelectItem>
                <SelectItem value="student event">Student Event</SelectItem>
                <SelectItem value="public lecture">Public Lecture</SelectItem>
              </SelectContent>
            </Select>

            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this_month">This Month</SelectItem>
                <SelectItem value="this_week">This Week</SelectItem>
                <SelectItem value="next_month">Next Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="upcoming">Upcoming Events</SelectItem>
                <SelectItem value="past">Past Events</SelectItem>
                <SelectItem value="all">All Events</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </section>
  );
}
