import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const events: {
  id: string;
  day: string;
  month: string;
  title: string;
  description: string;
  time: string;
  location: string;
}[] = [
  {
    id: "event-1",
    day: "20",
    month: "JUNE",
    title: "Workshop on Blockchain Technology",
    description:
      "A hands-on workshop exploring blockchain applications in various industries.",
    time: "10:00 AM - 4:00 PM",
    location: "IICT Building, Room 301",
  },
  {
    id: "event-2",
    day: "25",
    month: "JUNE",
    title: "Guest Lecture: Cybersecurity Challenges",
    description:
      "Industry expert discusses emerging threats and solutions in cybersecurity.",
    time: "2:00 PM - 4:00 PM",
    location: "Central Auditorium",
  },
  {
    id: "event-3",
    day: "30",
    month: "JUNE",
    title: "ACM Programming Contest",
    description: "Annual programming competition open to all SUST students.",
    time: "9:00 AM - 5:00 PM",
    location: "Computer Labs, IICT Building",
  },
];

export default function EventsSection() {
  return (
    <div id="events-section" className="md:w-1/2">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-montserrat font-bold">Upcoming Events</h2>
        <Link
          to={"/events"}
          className="text-primary font-medium inline-flex items-center hover:underline cursor-pointer"
        >
          View All
          <FontAwesomeIcon icon={["fas", "arrow-right"]} className="ml-2" />
        </Link>
      </div>

      {events.map((event, index) => (
        <div
          key={event.id}
          id={event.id}
          className={`flex items-start ${
            index !== events.length - 1 ? "mb-8 pb-8 border-b" : ""
          }`}
        >
          <div className="w-16 h-16 bg-primary/10 rounded-lg flex flex-col items-center justify-center flex-shrink-0">
            <span className="font-montserrat font-bold text-xl text-primary">
              {event.day}
            </span>
            <span className="text-xs font-medium">{event.month}</span>
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-montserrat font-semibold mb-2">
              {event.title}
            </h3>
            <p className="text-sm mb-2">{event.description}</p>
            <div className="flex items-center text-sm text-gray-600">
              <FontAwesomeIcon icon={["fas", "clock"]} className="mr-2" />
              <span>{event.time}</span>
              <FontAwesomeIcon
                icon={["fas", "map-marker-alt"]}
                className="ml-4 mr-2"
              />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
