import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MissionVision() {
  return (
    <section id="mission-vision" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div
            id="mission-section"
            className="bg-gray-50 rounded-lg p-8 shadow-sm border-t-4 border-primary"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  icon={["fas", "bullseye"]}
                  className="text-white text-xl"
                />
              </div>
              <h2 className="text-2xl font-bold font-montserrat">
                Our Mission
              </h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To foster innovation and excellence in information and
              communication technology through quality education, cutting-edge
              research, and industry collaboration. We aim to develop skilled
              professionals capable of addressing technological challenges and
              contributing to national development.
            </p>
          </div>

          <div
            id="vision-section"
            className="bg-gray-50 rounded-lg p-8 shadow-sm border-t-4 border-primary"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                <FontAwesomeIcon
                  icon={["fas", "eye"]}
                  className="text-white text-xl"
                />
              </div>
              <h2 className="text-2xl font-bold font-montserrat">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To be a globally recognized center of excellence in ICT education
              and research, producing innovative solutions and leaders who drive
              technological advancement and socio-economic development in
              Bangladesh and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
