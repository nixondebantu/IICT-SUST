import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

// Define the structure for a single program category
interface ProgramCategoryData {
  id: string;
  title: string;
  description: string;
  icon: [IconPrefix, IconName];
  features: string[];
  url: string;
  imageUrl: string;
  altText: string;
}

// Centralized data for program categories - using similar structure to AcademicPrograms
const programCategoriesData: ProgramCategoryData[] = [
  {
    id: "undergraduate",
    title: "Undergraduate Programs",
    description:
      "Bachelor's degree programs providing comprehensive foundation in ICT fields",
    icon: ["fas", "graduation-cap"],
    features: [
      "4-year degree programs",
      "Industry-focused curriculum",
      "Practical lab sessions",
    ],
    url: "/programs/undergraduate",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/6015b5089c-acbfcf86bc4affa4ca0a.png",
    altText:
      "undergraduate students in computer lab working on software projects",
  },
  {
    id: "graduate",
    title: "Graduate Programs",
    description:
      "Advanced degree programs for specialized knowledge and research",
    icon: ["fas", "book-open"],
    features: [
      "Master's & PhD programs",
      "Research opportunities",
      "Expert faculty guidance",
    ],
    url: "/programs/graduate",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/72b93a7c42-b1d9b7374418cc59b3ca.png",
    altText:
      "graduate students in discussion with professor about advanced technology",
  },
  {
    id: "diploma",
    title: "Diploma Programs",
    description:
      "Professional diploma courses for skill development and career advancement",
    icon: ["fas", "certificate"],
    features: [
      "1-2 year programs",
      "Hands-on training",
      "Industry partnerships",
    ],
    url: "/programs/diploma",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/8258d562fc-618fdb1c7d3c23d531eb.png",
    altText: "diverse group of students in computer training program",
  },
  {
    id: "certificate",
    title: "Certificate Courses",
    description:
      "Short-term certificate courses for specific skills and professional development",
    icon: ["fas", "chalkboard-teacher"],
    features: [
      "3-12 month courses",
      "Flexible scheduling",
      "Industry certifications",
    ],
    url: "/programs/certificate",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/1ca851b96f-2fc436025e900c4fd326.png",
    altText: "professional short course training in computer lab",
  },
];

export default function ProgramCategories() {
  return (
    <section id="program-categories" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-montserrat font-bold text-center mb-2">
          Choose Your Path
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programCategoriesData.map((category) => (
            <div
              key={category.id}
              id={`program-${category.id}`}
              className="relative group overflow-hidden rounded-lg h-96"
            >
              {/* Background Image */}
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={category.imageUrl}
                alt={category.altText}
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                {/* Icon */}
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon
                    icon={category.icon}
                    className="text-white text-xl"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-montserrat font-semibold text-white mb-2">
                  {category.title}
                </h3>

                {/* Description */}
                <p className="text-white/80 mb-3 text-sm">
                  {category.description}
                </p>

                {/* Features List */}
                <ul className="space-y-1 mb-4">
                  {category.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-center text-xs text-white/70"
                    >
                      <FontAwesomeIcon
                        icon={["fas", "check"]}
                        className="text-primary text-xs mr-2"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Link/Button */}
                <Link
                  to={category.url}
                  className="text-white font-medium inline-flex items-center hover:text-primary transition-colors cursor-pointer"
                >
                  Explore Programs
                  <FontAwesomeIcon
                    icon={["fas", "arrow-right"]}
                    className="ml-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
