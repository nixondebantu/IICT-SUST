import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProgramTitle() {
  return (
    <section id="program-title" className="py-12 border-b border-muted">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-2/3 pr-0 md:pr-8">
            <img
              src="https://storage.googleapis.com/uxpilot-auth.appspot.com/6015b5089c-acbfcf86bc4affa4ca0a.png"
              className="w-full max-h-96 mb-6 content-center object-cover rounded-lg shadow-sm"
            />
            <h1 className="text-3xl md:text-4xl font-bold font-montserrat mb-4">
              B.Sc. in Software Engineering
            </h1>
            <p className="text-gray-600 mb-6">
              The B.Sc. in Software Engineering program at IICT, SUST is
              designed to prepare students for careers in software development,
              systems analysis, and project management. The curriculum
              emphasizes both theoretical foundations and practical skills
              needed in today's rapidly evolving tech industry.
            </p>
          </div>
          <div className="md:w-1/3 mt-6 md:mt-0 p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold font-montserrat mb-4 pb-2 border-b border-gray-200">
              Key Information
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={["far", "clock"]}
                  className="text-primary mt-1 mr-3"
                />
                <div>
                  <span className="font-medium">Duration:</span>
                  <p className="text-gray-600">4 Years (8 Semesters)</p>
                </div>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={["fas", "award"]}
                  className="text-primary mt-1 mr-3"
                />
                <div>
                  <span className="font-medium">Credits:</span>
                  <p className="text-gray-600">160 Credit Hours</p>
                </div>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={["fas", "user-graduate"]}
                  className="text-primary mt-1 mr-3"
                />
                <div>
                  <span className="font-medium">Degree Awarded:</span>
                  <p className="text-gray-600">
                    Bachelor of Science in Software Engineering
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <FontAwesomeIcon
                  icon={["fas", "building-columns"]}
                  className="text-primary mt-1 mr-3"
                />
                <div>
                  <span className="font-medium">Institution:</span>
                  <p className="text-gray-600">
                    Institute of Information and Communication Technology
                  </p>
                </div>
              </li>
            </ul>
            <div className="mt-6">
              <a href="#apply">
                <Button className="w-full" size={"lg"}>
                  Apply for this Program
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
