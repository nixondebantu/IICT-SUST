import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function NoticeBody() {
  return (
    <div className="lg:col-span-3">
      <article
        id="notice-article"
        className="rounded-lg shadow-lg overflow-hidden"
      >
        <div id="notice-header" className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl font-bold leading-tight">
              Admission Requirements and Application Process for Spring 2024
              Semester
            </h1>
            <div className="flex items-center space-x-2 ml-4">
              <button
                className="p-2 text-gray-500 hover:text-primary transition-colors"
                title="Print Notice"
              >
                <FontAwesomeIcon icon={["fas", "print"]} className="text-lg" />
              </button>
              <button
                className="p-2 text-gray-500 hover:text-primary transition-colors"
                title="Share"
              >
                <FontAwesomeIcon
                  icon={["fas", "share-nodes"]}
                  className="text-lg"
                />
              </button>
            </div>
          </div>

          <div
            id="notice-metadata"
            className="flex flex-wrap items-center gap-6 text-sm"
          >
            <div className="flex items-center text-gray-600">
              <FontAwesomeIcon
                icon={["fas", "calendar-days"]}
                className="mr-2 text-primary"
              />
              <span className="font-medium">Published:</span>
              <span className="ml-1">December 15, 2024</span>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon
                icon={["fas", "tag"]}
                className="mr-2 text-primary"
              />
              <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                Admission
              </span>
              <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-medium ml-2">
                Academic
              </span>
            </div>
          </div>
        </div>

        <div id="notice-content" className="p-6">
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              The Institute of Information and Communication Technology (IICT)
              at Shahjalal University of Science and Technology announces the
              admission requirements and application process for the Spring 2024
              semester.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Eligibility Criteria
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>Minimum GPA of 3.5 in SSC and HSC examinations</li>
              <li>Must have Mathematics and Physics in HSC level</li>
              <li>Age limit: Maximum 23 years as of December 31, 2024</li>
              <li>Bangladeshi citizenship required</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Application Process
            </h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
              <li>Complete the online application form</li>
              <li>Upload required documents (scanned copies)</li>
              <li>Pay the application fee of BDT 1,200</li>
              <li>Submit application before the deadline</li>
              <li>Attend the admission test on the scheduled date</li>
            </ol>

            <h2 className="text-xl font-semibold mt-8 mb-4">Important Dates</h2>
            <div className="bg-primary/10 p-4 rounded-lg mb-6">
              <ul className="space-y-2 text-gray-800">
                <li>
                  <strong>Application Start:</strong> January 1, 2024
                </li>
                <li>
                  <strong>Application Deadline:</strong> January 31, 2024
                </li>
                <li>
                  <strong>Admission Test:</strong> February 15, 2024
                </li>
                <li>
                  <strong>Result Publication:</strong> February 28, 2024
                </li>
              </ul>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">
              Required Documents
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
              <li>SSC and HSC mark sheets and certificates</li>
              <li>Recent passport-size photograph</li>
              <li>National ID card copy</li>
              <li>Birth certificate</li>
              <li>Character certificate from last attended institution</li>
            </ul>
          </div>
        </div>

        <div
          id="attachments-section"
          className="p-6 bg-gray-50 border-t border-gray-200"
        >
          <h3 className="text-lg font-semibold mb-4">
            <FontAwesomeIcon
              icon={["fas", "paperclip"]}
              className="mr-2 text-primary"
            />
            Attachments
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon={["fas", "file-pdf"]}
                    className="text-primary text-xl"
                  />
                </div>
                <div>
                  <p className="font-medium">Application Form Spring 2024</p>
                  <p className="text-sm text-gray-500">PDF • 2.3 MB</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors">
                <FontAwesomeIcon icon={["fas", "download"]} className="mr-2" />
                Download
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FontAwesomeIcon
                    icon={["fas", "file-word"]}
                    className="text-blue-600 text-xl"
                  />
                </div>
                <div>
                  <p className="font-medium">Admission Guidelines</p>
                  <p className="text-sm text-gray-500">DOCX • 1.8 MB</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary/90 text-white rounded-lg hover:bg-primary transition-colors">
                <FontAwesomeIcon icon={["fas", "download"]} className="mr-2" />
                Download
              </button>
            </div>
          </div>
        </div>
      </article>
      <div id="back-navigation" className="mt-8">
        <Link
          to={"/notices"}
          className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-primary transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={["fas", "arrow-left"]} className="mr-2" />
          Back to All Notices
        </Link>
      </div>
    </div>
  );
}
