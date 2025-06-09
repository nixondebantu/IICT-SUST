import { IconName, IconPrefix } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const programs: {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  altText: string;
  url: string;
  icon: [IconPrefix, IconName];
}[] = [
  {
    id: "undergraduate",
    title: "Undergraduate Programs",
    description: "B.Sc. Engineering in Software Engineering",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/6015b5089c-acbfcf86bc4affa4ca0a.png",
    altText:
      "undergraduate students in computer lab working on software projects",
    icon: ["fas", "graduation-cap"],
    url: "#undergraduate",
  },
  {
    id: "graduate",
    title: "Graduate Programs",
    description: "M.Sc. in Information Technology (MIT)",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/72b93a7c42-b1d9b7374418cc59b3ca.png",
    altText:
      "graduate students in discussion with professor about advanced technology",
    icon: ["fas", "book-open"],
    url: "#graduate",
  },
  {
    id: "diploma",
    title: "Diploma Programs",
    description: "Post-Graduate Diploma in Information Technology",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/8258d562fc-618fdb1c7d3c23d531eb.png",
    altText: "diverse group of students in computer training program",
    icon: ["fas", "certificate"],
    url: "#diploma",
  },
  {
    id: "certificate",
    title: "Certificate Courses",
    description: "Short professional courses in emerging technologies",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/1ca851b96f-2fc436025e900c4fd326.png",
    altText: "professional short course training in computer lab",
    icon: ["fas", "chalkboard-teacher"],
    url: "#certificate",
  },
];

function AcademicPrograms() {
  return (
    <section id="academic-programs" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-montserrat font-bold text-center mb-2">
          Academic Programs
        </h2>
        <div className="w-20 h-1 bg-primary mx-auto mb-12"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program) => (
            <div
              key={program.id}
              id={`program-${program.id}`}
              className="relative group overflow-hidden rounded-lg h-80"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                src={program.imageUrl}
                alt={program.altText}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4">
                  <FontAwesomeIcon
                    icon={program.icon}
                    className="text-white text-xl"
                  />
                </div>
                <h3 className="text-xl font-montserrat font-semibold text-white mb-2">
                  {program.title}
                </h3>
                <p className="text-white/80 mb-4">{program.description}</p>
                <Link
                  to={program.url}
                  className="text-white font-medium inline-flex items-center hover:text-primary transition-colors cursor-pointer"
                >
                  Learn More
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

export default AcademicPrograms;
