import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function NoticesCard() {
  return (
    <Link
      to={"/notices/1"}
      id="notice-1"
      className="rounded-lg shadow-sm border hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold hover:text-primary cursor-pointer mb-2">
              <span className="cursor-pointer">
                Admission Notice for Spring 2024 Semester
              </span>
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
              <span>
                <FontAwesomeIcon icon={["far", "calendar"]} className="mr-1" />
                December 15, 2024
              </span>
              <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                Admissions
              </span>
              <span>
                <FontAwesomeIcon icon={["fas", "file-pdf"]} className="mr-1" />
                Attachment
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">
              Applications are now open for the Spring 2024 semester. Students
              interested in pursuing undergraduate and graduate programs at IICT
              are encouraged to submit their applications...
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-primary hover:text-red-700 font-medium text-sm cursor-pointer">
            Read More
            <FontAwesomeIcon icon={["fas", "arrow-right"]} className="ml-1" />
          </span>
          <div className="flex items-center space-x-2">
            <button className="text-gray-400 hover:text-gray-600">
              <FontAwesomeIcon icon={["fas", "share"]} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
