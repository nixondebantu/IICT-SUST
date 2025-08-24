import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ProgramSections() {
  return (
    <section id="program-details" className="pb-12 px-4 container mx-auto">
      <Tabs defaultValue="tab-overview" className="w-full">
        <TabsList>
          <TabsTrigger value="tab-overview">Program Overview</TabsTrigger>
          <TabsTrigger value="tab-outcomes">Learning Outcomes</TabsTrigger>
          <TabsTrigger value="tab-requirements">
            Admission Requirements
          </TabsTrigger>
        </TabsList>

        <div
          id="tab-content"
          className="rounded-lg border border-gray-200 p-6 md:p-8"
        >
          <TabsContent value="tab-overview" className="w-full">
            <div id="content-overview" className="tab-content">
              <h2 className="text-2xl font-bold font-montserrat mb-6">
                Program Objectives
              </h2>
              <p className="mb-4">
                The B.Sc. in Software Engineering program aims to:
              </p>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>
                  Provide students with a strong foundation in software
                  engineering principles, methodologies, and best practices
                </li>
                <li>
                  Develop practical skills in software design, development,
                  testing, and maintenance
                </li>
                <li>
                  Foster critical thinking, problem-solving abilities, and
                  teamwork
                </li>
                <li>
                  Prepare graduates for careers in the software industry or
                  further academic studies
                </li>
                <li>
                  Instill ethical awareness and professional responsibility in
                  software development
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="tab-requirements">
            <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold font-montserrat mb-4">
                Admission Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={["fas", "circle-check"]}
                    className="text-primary mt-1 mr-3"
                  />
                  <div>
                    <span className="font-medium">Academic Background:</span>
                    <p className="text-gray-600">
                      Higher Secondary Certificate (HSC) or equivalent with
                      minimum GPA of 4.0 in Mathematics and Physics
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={["fas", "circle-check"]}
                    className="text-primary mt-1 mr-3"
                  />
                  <div>
                    <span className="font-medium">Entrance Examination:</span>
                    <p className="text-gray-600">
                      Qualifying score in the SUST admission test
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FontAwesomeIcon
                    icon={["fas", "circle-check"]}
                    className="text-primary mt-1 mr-3"
                  />
                  <div>
                    <span className="font-medium">English Proficiency:</span>
                    <p className="text-gray-600">
                      Demonstrated proficiency in English language
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="tab-outcomes">
            <h3 className="text-xl font-semibold font-montserrat mt-8 mb-4">
              Learning Outcomes
            </h3>
            <p className="mb-4">
              Upon completion of this program, graduates will be able to:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-start">
                  <div className="bg-primary/15 bg-opacity-20 p-2 rounded-full mr-3">
                    <FontAwesomeIcon
                      icon={["fas", "code"]}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Software Development</h4>
                    <p className="text-sm text-gray-600">
                      Design and implement software solutions using appropriate
                      programming languages and tools
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-start">
                  <div className="bg-primary/15 bg-opacity-20 p-2 rounded-full mr-3">
                    <FontAwesomeIcon
                      icon={["fas", "sitemap"]}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">System Architecture</h4>
                    <p className="text-sm text-gray-600">
                      Analyze and design complex software architectures and
                      systems
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-start">
                  <div className="bg-primary/15 bg-opacity-20 p-2 rounded-full mr-3">
                    <FontAwesomeIcon
                      icon={["fas", "users-gear"]}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Project Management</h4>
                    <p className="text-sm text-gray-600">
                      Apply software project management techniques in team
                      environments
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded border border-gray-200">
                <div className="flex items-start">
                  <div className="bg-primary/15 bg-opacity-20 p-2 rounded-full mr-3">
                    <FontAwesomeIcon
                      icon={["fas", "bug-slash"]}
                      className="text-primary"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Quality Assurance</h4>
                    <p className="text-sm text-gray-600">
                      Implement testing and quality assurance processes for
                      software systems
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </section>
  );
}
