import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function EventInfoSidebar() {
  return (
    <div id="event-info-sidebar" className="lg:col-span-1">
      <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
        <h3 className="text-lg font-semibold mb-4">Event Details</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <i className="text-primary mt-1" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-calendar-days"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="calendar-days"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z"
                ></path>
              </svg>
            </i>
            <div>
              <div className="font-medium">Date &amp; Time</div>
              <div className="text-gray-600">March 15, 2024</div>
              <div className="text-gray-600">9:00 AM - 5:00 PM</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <i className="text-primary mt-1" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-location-dot"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="location-dot"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                ></path>
              </svg>
            </i>
            <div>
              <div className="font-medium">Location</div>
              <div className="text-gray-600">IICT Auditorium</div>
              <div className="text-gray-600">
                Shahjalal University of Science and Technology
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <i className="text-primary mt-1" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-clock"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="clock"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                ></path>
              </svg>
            </i>
            <div>
              <div className="font-medium">Duration</div>
              <div className="text-gray-600">8 hours (Full Day)</div>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <i className="text-primary mt-1" data-fa-i2svg="">
              <svg
                className="svg-inline--fa fa-users"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="users"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
                data-fa-i2svg=""
              >
                <path
                  fill="currentColor"
                  d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"
                ></path>
              </svg>
            </i>
            <div>
              <div className="font-medium">Capacity</div>
              <div className="text-gray-600">50 participants</div>
            </div>
          </div>
        </div>

        <div id="cta-buttons" className="mt-6 space-y-3">
          <Button className="w-full">Register Now</Button>
          <Button variant={"outline"} className="w-full">
            <FontAwesomeIcon icon={["fas", "calendar-plus"]} className="mr-2" />
            Add to Calendar
          </Button>
        </div>

        <div id="calendar-options" className="mt-4 grid grid-cols-3 gap-2">
          <Button variant={"blue_social"}>
            <FontAwesomeIcon icon={["fab", "google"]} className="mr-1" />
            Google
          </Button>
          <Button variant={"blue_social"}>
            <FontAwesomeIcon icon={["fas", "calendar"]} className="mr-1" />
            Outlook
          </Button>

          <Button variant={"blue_social"}>
            <FontAwesomeIcon icon={["fas", "download"]} className="mr-1" />
            iCal
          </Button>
        </div>

        <div id="social-share" className="mt-6">
          <div className="text-sm font-medium mb-2">Share this event</div>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              <FontAwesomeIcon icon={["fab", "facebook-f"]} />
            </button>
            <button className="bg-blue-400 text-white p-2 rounded hover:bg-blue-500">
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </button>
            <button className="bg-blue-700 text-white p-2 rounded hover:bg-blue-800">
              <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
            </button>
            <button className="bg-gray-600 text-white p-2 rounded hover:bg-gray-700">
              <FontAwesomeIcon icon={["fas", "link"]} />
            </button>
          </div>
        </div>
        <div id="contact-info" className="bg-gray-50 rounded-lg my-6">
          <h3 className="text-lg font-semibold mb-4">Event Contact</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={["fas", "envelope"]}
                className="text-primary"
              />
              <span className="text-gray-600">events@iict.sust.edu</span>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={["fas", "phone"]}
                className="text-primary"
              />
              <span className="text-gray-600">+880-821-713491</span>
            </div>
            <div className="flex items-center space-x-3">
              <FontAwesomeIcon
                icon={["fas", "user"]}
                className="text-primary"
              />
              <span className="text-gray-600">Dr. Rahman (Coordinator)</span>
            </div>
          </div>
        </div>

        <div
          id="related-events"
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-semibold mb-4">Related Events</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium mb-1">Cybersecurity Seminar</h4>
              <p className="text-sm text-gray-600">March 22, 2024</p>
            </div>
            <div className="border-b border-gray-100 pb-3">
              <h4 className="font-medium mb-1">Data Science Bootcamp</h4>
              <p className="text-sm text-gray-600">April 5, 2024</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">Tech Career Fair</h4>
              <p className="text-sm text-gray-600">April 18, 2024</p>
            </div>
          </div>
          <Link
            to="/events"
            className="inline-block mt-4 text-primary font-medium text-sm"
          >
            View All Events{" "}
            <FontAwesomeIcon icon={["fas", "arrow-right"]} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
