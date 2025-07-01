import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
type EventCardProps = {
  id: number;
  title: string;
  date: string;
  time: string;
  category: string;
  location: string;
  description: string;
  image: string;
  buttonLabel: string;
};
const EventsListCard = ({
  id,
  title,
  date,
  time,
  category,
  location,
  description,
  image,
  buttonLabel,
}: EventCardProps) => (
  <Link
    to={`/events/${id}`}
    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
  >
    <img className="w-full h-48 object-cover" src={image} alt={title} />
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <Badge>{category}</Badge>
        <span className="text-gray-500 text-sm">{date}</span>
      </div>
      <h3 className="text-xl font-bold mb-2 hover:text-primary cursor-pointer">
        {title}
      </h3>
      <div className="flex items-center text-gray-600 mb-2">
        <FontAwesomeIcon icon={["fas", "clock"]} className="mr-2" />
        <span>{time}</span>
      </div>
      <div className="flex items-center text-gray-600 mb-3">
        <FontAwesomeIcon icon={["fas", "location-dot"]} className="mr-2" />
        <span>{location}</span>
      </div>
      <p className="text-gray-700 text-sm mb-4">{description}</p>
      <Button className="w-full">{buttonLabel}</Button>
    </div>
  </Link>
);

export default EventsListCard;
