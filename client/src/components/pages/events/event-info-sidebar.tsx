// src/components/pages/events/event-info-sidebar.tsx

import { Button } from "@/components/ui/button";
import { EventRes } from "@/lib/dtos/event.dto";
import { Calendar, Mail, MapPin, Phone, User, Users } from "lucide-react";

// Helper function to format date and time for display
const formatDateTime = (isoString: string) => {
  const date = new Date(isoString);
  return {
    date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
  };
};

export default function EventInfoSidebar({ event }: { event: EventRes }) {
  const { date: startDate, time: startTime } = formatDateTime(event.start_time);
  const { time: endTime } = formatDateTime(event.end_time);

  return (
    <div id="event-info-sidebar" className="lg:col-span-1">
      <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
        <h3 className="text-lg font-semibold mb-4">Event Details</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Calendar className="text-primary mt-1 h-5 w-5" />
            <div>
              <div className="font-medium">Date & Time</div>
              <div className="text-gray-600">{startDate}</div>
              <div className="text-gray-600">{`${startTime} - ${endTime}`}</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="text-primary mt-1 h-5 w-5" />
            <div>
              <div className="font-medium">Location</div>
              <div className="text-gray-600">{event.location}</div>
            </div>
          </div>

          {event.capacity && (
            <div className="flex items-start space-x-3">
              <Users className="text-primary mt-1 h-5 w-5" />
              <div>
                <div className="font-medium">Capacity</div>
                <div className="text-gray-600">{event.capacity} participants</div>
              </div>
            </div>
          )}
        </div>

        {event.cta_url && event.cta_title && (
          <div id="cta-buttons" className="mt-6 space-y-3">
            <a href={event.cta_url} target="_blank" rel="noopener noreferrer">
              <Button className="w-full">{event.cta_title}</Button>
            </a>
          </div>
        )}

        {(event.contact_person_name || event.contact_mail || event.contact_number) && (
          <div id="contact-info" className="bg-gray-100 rounded-lg p-4 my-6">
            <h3 className="text-md font-semibold mb-4">Event Contact</h3>
            <div className="space-y-3">
              {event.contact_person_name && (
                <div className="flex items-center space-x-3">
                  <User className="text-primary h-4 w-4" />
                  <span className="text-gray-600">{event.contact_person_name}</span>
                </div>
              )}
              {event.contact_mail && (
                <div className="flex items-center space-x-3">
                  <Mail className="text-primary h-4 w-4" />
                  <a href={`mailto:${event.contact_mail}`} className="text-gray-600 hover:underline">{event.contact_mail}</a>
                </div>
              )}
              {event.contact_number && (
                <div className="flex items-center space-x-3">
                  <Phone className="text-primary h-4 w-4" />
                  <a href={`tel:${event.contact_number}`} className="text-gray-600 hover:underline">{event.contact_number}</a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}