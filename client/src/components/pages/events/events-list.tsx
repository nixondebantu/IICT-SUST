import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EventsListCard from "./events-list-card";

const events = [
  {
    id: 1,
    title: "AI in Modern Computing",
    date: "Dec 15, 2024",
    time: "2:00 PM - 5:00 PM",
    category: "Conference",
    location: "IICT Seminar Hall",
    description:
      "Explore the latest developments in artificial intelligence and its applications in modern computing systems.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/7f07e4be9d-dcc0a0b9c946224401c5.png",
    buttonLabel: "Learn More",
  },
  {
    id: 1,
    title: "Python Programming Bootcamp",
    date: "Dec 18, 2024",
    time: "9:00 AM - 4:00 PM",
    category: "Workshop",
    location: "Computer Lab 2",
    description:
      "Intensive hands-on workshop covering Python fundamentals and advanced programming concepts.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/5c50e3dd8f-5882162fd3ae7af5a1fa.png",
    buttonLabel: "Register Now",
  },
  {
    id: 1,
    title: "IICT Hackathon 2024",
    date: "Dec 22, 2024",
    time: "48 Hours",
    category: "Student Event",
    location: "Innovation Hub",
    description:
      "Annual hackathon bringing together students to solve real-world problems through technology.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/be4a04062c-a8bec8bddce781e0cad7.png",
    buttonLabel: "Join Team",
  },
  {
    id: 1,
    title: "Cybersecurity Trends 2025",
    date: "Dec 25, 2024",
    time: "3:00 PM - 5:00 PM",
    category: "Seminar",
    location: "Online via Zoom",
    description:
      "Expert insights into emerging cybersecurity threats and defense strategies for the coming year.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/34d1357ac2-d818e3ec6805639b1755.png",
    buttonLabel: "Attend Online",
  },
  {
    id: 1,
    title: "Future of Quantum Computing",
    date: "Jan 5, 2025",
    time: "4:00 PM - 6:00 PM",
    category: "Public Lecture",
    location: "Main Auditorium",
    description:
      "Distinguished guest lecture on quantum computing breakthroughs and future applications.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/54a2b74bac-f44bf11d0baf3260634f.png",
    buttonLabel: "Reserve Seat",
  },
  {
    id: 1,
    title: "Data Science Research Symposium",
    date: "Jan 8, 2025",
    time: "9:00 AM - 6:00 PM",
    category: "Symposium",
    location: "Research Center",
    description:
      "Annual symposium showcasing cutting-edge research in data science and machine learning.",
    image:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/dd6fb9a7c2-20586abc32f5bbddf09e.png",
    buttonLabel: "Submit Abstract",
  },
];

export default function EventsList() {
  return (
    <section id="events-list" className="py-12">
      <div className="container mx-auto px-4">
        {/* Sort Options */}
        <div className="flex justify-end items-center mb-8">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="upcoming">
                Sort by Date (Upcoming First)
              </SelectItem>
              <SelectItem value="latest">
                Sort by Date (Latest First)
              </SelectItem>
              id: 1,
              <SelectItem value="title">Sort by Title</SelectItem>
              <SelectItem value="category">Sort by Category</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event, index) => (
            <EventsListCard key={index} {...event} />
          ))}
        </div>
      </div>
    </section>
  );
}
