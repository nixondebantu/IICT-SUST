import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WhyChoose() {
  return (
    <section id="why-choose" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose IICT?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience world-className education with cutting-edge technology
            and industry-focused curriculum
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={["fas", "laptop-code"]}
                className="text-white text-2xl"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Modern Curriculum</h3>
            <p className="text-gray-600">
              Industry-aligned curriculum updated regularly to meet current
              market demands
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={["fas", "users"]}
                className="text-white text-2xl"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Faculty</h3>
            <p className="text-gray-600">
              Learn from experienced professionals and renowned researchers in
              the field
            </p>
          </div>
          <div className="text-center">
            <div className="bg-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon
                icon={["fas", "building"]}
                className="text-white text-2xl"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Industry Connections</h3>
            <p className="text-gray-600">
              Strong partnerships with leading tech companies for internships
              and placements
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
