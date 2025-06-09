import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

// 1. Data Extraction & TypeScript Interfaces
interface FeaturedCollaboration {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
  establishedDate: string;
}

interface Partner {
  id: string;
  icon: IconProp; // Use IconProp from FontAwesome for icon type
  title: string;
  description: string;
}

const featuredCollaborationData: FeaturedCollaboration = {
  id: "toph-mou",
  imageSrc:
    "https://storage.googleapis.com/uxpilot-auth.appspot.com/5945082686-e7444136b42744c52eaa.png",
  imageAlt:
    "business people in a formal meeting signing documents, professional office setting, handshake, corporate atmosphere",
  title: "Toph Partnership",
  description:
    "IICT has signed a Memorandum of Understanding (MoU) with Toph, a leading competitive programming platform. This partnership aims to enhance programming skills among students and foster a culture of algorithmic problem-solving.",
  establishedDate: "January 2022",
};

const keyPartnersData: Partner[] = [
  {
    id: "samsung-rd",
    icon: ["fas", "building"],
    title: "Samsung R&D Institute",
    description:
      "Collaborative research in mobile technologies and student internship opportunities.",
  },
  {
    id: "microsoft-bd",
    icon: ["fas", "laptop-code"],
    title: "Microsoft Bangladesh",
    description:
      "Technical workshops, software licensing, and career development programs.",
  },
  {
    id: "grameenphone",
    icon: ["fas", "network-wired"],
    title: "Grameenphone",
    description:
      "Research collaboration in telecommunications and IoT solutions.",
  },
  {
    id: "oracle-academy",
    icon: ["fas", "database"],
    title: "Oracle Academy",
    description: "Database technologies training and certification programs.",
  },
];

const FeaturedCollaborationCard: React.FC<{ data: FeaturedCollaboration }> = ({
  data,
}) => (
  <div id={data.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="h-64 overflow-hidden">
      <img
        className="w-full h-full object-cover"
        src={data.imageSrc}
        alt={data.imageAlt}
        loading="lazy" // Add lazy loading for images
      />
    </div>
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-montserrat font-bold text-xl">{data.title}</h3>
        <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          Featured
        </span>
      </div>
      <p className="text-gray-700 mb-6">{data.description}</p>
      <div className="flex items-center text-sm text-gray-600">
        <FontAwesomeIcon icon={["fas", "calendar"]} className="mr-2" />
        <span>Established: {data.establishedDate}</span>
      </div>
    </div>
  </div>
);

// Component for an individual key partner list item
const PartnerListItem: React.FC<{ data: Partner }> = ({ data }) => (
  <div className="flex items-start">
    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
      {" "}
      {/* flex-shrink-0 to prevent icon div from shrinking */}
      <FontAwesomeIcon icon={data.icon} className="text-primary" />
    </div>
    <div>
      <h4 className="font-bold mb-1">{data.title}</h4>
      <p className="text-gray-700 text-sm">{data.description}</p>
    </div>
  </div>
);

// 3. Main Component Refactor
export default function IndustryCollaborations() {
  return (
    <section id="industry-collaborations" className="py-16 bg-accent">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-montserrat text-center mb-16 relative">
          <span className="relative z-10">Industry Collaborations</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Featured Collaboration */}
          <FeaturedCollaborationCard data={featuredCollaborationData} />

          {/* Other Collaborations */}
          <div
            id="other-collaborations"
            className="bg-white rounded-lg shadow-sm p-8"
          >
            <h3 className="font-montserrat font-bold text-xl mb-6">
              Key Industry Partners
            </h3>
            <div className="space-y-6">
              {keyPartnersData.map((partner) => (
                <PartnerListItem key={partner.id} data={partner} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
