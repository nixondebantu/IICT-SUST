import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core"; // Import IconProp for better type safety for icons

// 1. Data Extraction & TypeScript Interfaces

// Define the shape of a single consulting service object
interface ConsultingService {
  id: string;
  icon: IconProp; // FontAwesome icon type
  title: string;
  description: string;
}

// Array containing all consulting service data
const consultingServicesData: ConsultingService[] = [
  {
    id: "service-software",
    icon: ["fas", "code"],
    title: "Software Development",
    description:
      "Custom software solutions, application development, and system integration services for businesses and organizations.",
  },
  {
    id: "service-data",
    icon: ["fas", "chart-pie"],
    title: "Data Analytics",
    description:
      "Advanced data analysis, business intelligence solutions, and data-driven decision support systems.",
  },
  {
    id: "service-security",
    icon: ["fas", "shield-halved"],
    title: "Cybersecurity",
    description:
      "Security audits, vulnerability assessments, and cybersecurity strategy development for organizations.",
  },
  {
    id: "service-ai",
    icon: ["fas", "brain"],
    title: "AI & Machine Learning",
    description:
      "Implementation of AI solutions, predictive modeling, and machine learning applications for business problems.",
  },
  {
    id: "service-iot",
    icon: ["fas", "microchip"],
    title: "IoT Solutions",
    description:
      "Internet of Things implementation, smart systems development, and industrial automation solutions.",
  },
  {
    id: "service-training",
    icon: ["fas", "chalkboard-user"],
    title: "Specialized Training",
    description:
      "Customized technical training programs, workshops, and skill development courses for organizations.",
  },
];

// 2. Componentization: Create a reusable component for a single service card
interface ConsultingServiceCardProps {
  service: ConsultingService;
}

const ConsultingServiceCard: React.FC<ConsultingServiceCardProps> = ({
  service,
}) => (
  <div
    id={service.id}
    className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-md transition duration-300"
  >
    <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
      <FontAwesomeIcon icon={service.icon} className="text-2xl text-primary" />
    </div>
    <h3 className="font-montserrat font-bold text-xl mb-4">{service.title}</h3>
    <p className="text-gray-700">{service.description}</p>
  </div>
);

// 3. Main Component Refactor
export default function ConsultingServices() {
  return (
    <section id="consulting-services" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-montserrat text-center mb-16 relative">
          <span className="relative z-10">Consulting & Advisory Services</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
        </h2>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-center text-gray-700 leading-relaxed">
            IICT offers a wide range of consulting and advisory services to
            industry partners, government agencies, and organizations. Our
            expert faculty members provide technical guidance, project
            consultation, and specialized training in various domains of
            information and communication technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {consultingServicesData.map((service) => (
            <ConsultingServiceCard key={service.id} service={service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          {/* Using a button for clickability is more semantic than a span with cursor-pointer */}
          <button
            type="button" // Important for buttons not to submit forms if inside one
            className="inline-flex items-center bg-primary hover:bg-primary-dark text-white font-medium px-6 py-3 rounded-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <span>Request Consultation</span>
            <FontAwesomeIcon
              icon={["fas", "arrow-right"]}
              className="ml-2 text-lg"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
