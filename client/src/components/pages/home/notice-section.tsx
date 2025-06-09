import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const notices: {
  id: string;
  date: string;
  title: string;
  description: string;
}[] = [
  {
    id: "notice-1",
    date: "June 15, 2023",
    title: "Fall 2023 Admission Schedule",
    description:
      "Application deadline, admission test dates, and interview schedules for the upcoming Fall semester.",
  },
  {
    id: "notice-2",
    date: "June 10, 2023",
    title: "Spring 2023 Final Exam Schedule",
    description:
      "Final examination schedule for all undergraduate and graduate programs.",
  },
  {
    id: "notice-3",
    date: "June 5, 2023",
    title: "Faculty Recruitment Notice",
    description:
      "Applications invited for Assistant Professor positions in Software Engineering and Data Science.",
  },
];

export default function NoticeSection() {
  return (
    <section id="notice-section" className="py-16 lg:px-16 bg-accent">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-montserrat font-bold mb-2">
              Important Notices
            </h2>
            <div className="w-20 h-1 bg-primary mb-0"></div>
          </div>
          <span className="text-primary font-medium inline-flex items-center mt-4 md:mt-0 hover:underline cursor-pointer">
            View All Notices
            <FontAwesomeIcon icon={["fas", "arrow-right"]} className="ml-2" />
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              id={notice.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-t-4 border-primary"
            >
              <div className="flex items-start">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <FontAwesomeIcon
                    icon={["fas", "calendar-alt"]}
                    className="text-primary text-xl"
                  />
                </div>
                <div>
                  <span className="text-sm text-gray-500">{notice.date}</span>
                  <h3 className="text-lg font-montserrat font-semibold mb-2">
                    {notice.title}
                  </h3>
                  <p className="text-sm mb-4">{notice.description}</p>
                  <Link
                    to={`/notices/${notice.id}`}
                    className="text-primary font-medium inline-flex items-center text-sm hover:underline cursor-pointer"
                  >
                    Read More
                    <FontAwesomeIcon
                      icon={["fas", "arrow-right"]}
                      className="ml-2"
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
