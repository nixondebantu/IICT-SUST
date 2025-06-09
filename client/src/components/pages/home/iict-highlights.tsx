import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconPrefix, IconName } from "@fortawesome/fontawesome-svg-core";

const highlightsData: {
  id: string;
  icon: [IconPrefix, IconName];
  title: string;
  description: string;
}[] = [
  {
    id: "highlight-1",
    icon: ["fas", "building-columns"],
    title: "First Dedicated ICT Institute",
    description:
      "Pioneering ICT education in Bangladesh with dedicated programs and state-of-the-art facilities.",
  },
  {
    id: "highlight-2",
    icon: ["fas", "handshake"],
    title: "Industry Collaborations",
    description:
      "Partnerships with leading tech companies like Toph, providing real-world experience and opportunities.",
  },
  {
    id: "highlight-3",
    icon: ["fas", "users"],
    title: "ACM Student Chapter",
    description:
      "Active ACM chapter fostering a vibrant community of future computing professionals.",
  },
  {
    id: "highlight-4",
    icon: ["fas", "lightbulb"],
    title: "Consulting Services",
    description:
      "Expert consulting services for industry and government, solving real-world technology challenges.",
  },
];

type HighlightCardProps = {
  id: string;
  icon: IconProp; // FontAwesome icon array, e.g., ["fas", "building-columns"]
  title: string;
  description: string;
};

const HighlightCard: React.FC<HighlightCardProps> = ({
  id,
  icon,
  title,
  description,
}) => {
  return (
    <div
      id={id}
      className="bg-card p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
    >
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <FontAwesomeIcon icon={icon} className="text-primary text-2xl" />
      </div>
      <h3 className="text-xl font-montserrat font-semibold mb-4">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

function IICTHighlights() {
  return (
    <section id="key-highlights" className="py-16 bg-accent">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-montserrat font-bold text-center mb-2">
          Key Highlights of IICT
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* 3. Map over the data to render each HighlightCard */}
          {highlightsData.map((highlight) => (
            <HighlightCard
              key={highlight.id}
              id={highlight.id}
              icon={highlight.icon}
              title={highlight.title}
              description={highlight.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default IICTHighlights;
