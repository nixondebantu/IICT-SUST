import clsx from "clsx"; // Utility for conditionally joining class names

// 1. Data Extraction: Define the structure for a milestone
interface Milestone {
  year: number;
  title: string;
  description: string;
}

// 2. Data Array: Store all milestone information
const milestonesData: Milestone[] = [
  {
    year: 1997,
    title: "Foundation of IICT",
    description:
      "The Institute was established as a specialized center for advanced studies and research in information technology.",
  },
  {
    year: 2003,
    title: "First Degree Program Launched",
    description:
      "Started offering the first postgraduate degree program in Information Technology.",
  },
  {
    year: 2008,
    title: "Research Center Established",
    description:
      "Dedicated research facilities were established to foster innovation and technological advancement.",
  },
  {
    year: 2015,
    title: "Industry Partnership Program",
    description:
      "Initiated formal industry partnership program to strengthen academia-industry collaboration.",
  },
  {
    year: 2021,
    title: "New Campus Inauguration",
    description:
      "Moved to a new state-of-the-art campus with advanced laboratories and research facilities.",
  },
];

// 3. Componentization: Create a MilestoneItem sub-component
interface MilestoneItemProps {
  milestone: Milestone;
  index: number; // To determine left/right alignment for larger screens
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({ milestone, index }) => {
  const isEven = index % 2 === 0; // Determines if content goes on the left side for MD+ screens

  return (
    <div className="relative mb-16">
      {/* Mobile Layout (Timeline on Left) */}
      <div className="flex items-start md:hidden">
        {/* Year Circle for Mobile */}
        <div
          className="absolute left-[20px] top-0 transform -translate-x-1/2
                     w-12 h-12 bg-primary rounded-full flex items-center justify-center
                     text-white font-bold z-20"
        >
          {milestone.year}
        </div>
        {/* Content for Mobile */}
        <div className="ml-20 text-left">
          {" "}
          {/* Pushes content to the right of the circle */}
          <h3 className="font-montserrat font-bold text-xl mb-2">
            {milestone.title}
          </h3>
          <p className="text-gray-700">{milestone.description}</p>
        </div>
      </div>

      {/* Desktop Layout (Alternating Left/Right) */}
      <div className="hidden md:flex md:flex-row md:items-center">
        {isEven ? (
          <>
            {/* Content on Left */}
            <div className="md:w-1/2 md:pr-12 md:text-right">
              <h3 className="font-montserrat font-bold text-xl mb-2">
                {milestone.title}
              </h3>
              <p className="text-gray-700">{milestone.description}</p>
            </div>
            {/* Year Circle (centered) */}
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold z-20 mx-4">
              {milestone.year}
            </div>
            {/* Empty space on Right */}
            <div className="md:w-1/2"></div>
          </>
        ) : (
          <>
            {/* Empty space on Left */}
            <div className="md:w-1/2"></div>
            {/* Year Circle (centered) */}
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold z-20 mx-4">
              {milestone.year}
            </div>
            {/* Content on Right */}
            <div className="md:w-1/2 md:pl-12 md:text-left">
              <h3 className="font-montserrat font-bold text-xl mb-2">
                {milestone.title}
              </h3>
              <p className="text-gray-700">{milestone.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default function HistoryMilestones() {
  return (
    <section id="history-milestones" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-bold font-montserrat text-center mb-16 relative">
          <span className="relative z-10">History & Milestones</span>
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-primary"></span>
        </h2>

        <div className="relative">
          {/* Timeline Vertical Line */}
          <div
            className={clsx(
              "absolute h-full w-1 bg-muted",
              "left-[20px]", // Fixed left position for small screens (20px from edge)
              "md:left-1/2 md:transform md:-translate-x-1/2" // Centered for medium and larger screens
            )}
          ></div>

          {/* Timeline Items */}
          <div id="timeline-items" className="relative z-10">
            {milestonesData.map((milestone, index) => (
              <MilestoneItem
                key={milestone.year}
                milestone={milestone}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
