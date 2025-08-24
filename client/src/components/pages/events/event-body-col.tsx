// src/components/pages/events/event-body-col.tsx

import { Badge } from "@/components/ui/badge";
import { EventRes } from "@/lib/dtos/event.dto";
import { File } from "lucide-react";

// The component now accepts the event data as a prop
export default function EventBodyCol({ event }: { event: EventRes }) {
  return (
    <div className="lg:col-span-2">
      <div id="event-banner" className="mb-6">
        <img
          className="w-full h-auto max-h-[400px] object-cover rounded-lg"
          src={event.imageUrl}
          alt={event.title}
        />
      </div>

      <div id="event-title" className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold mb-3">{event.title}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <Badge>{event.tag.value}</Badge>
        </div>
      </div>

      <section id="event-description" className="py-8">
        {/* The main content is rendered from the HTML string provided by the API */}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: event.description }}
        />

        {/* Attachments are rendered dynamically if they exist */}
        {event.files && event.files.length > 0 && (
          <div id="attachments" className="mt-8">
            <h3 className="text-xl font-semibold mb-4">Downloads & Resources</h3>
            <div className="space-y-3">
              {event.files.map((file) => (
                <a
                  key={file.id}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <File className="text-primary mr-3 h-5 w-5" />
                  <div>
                    <div className="font-medium">{file.title}</div>
                    <div className="text-sm text-gray-500">
                      Click to view/download
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}