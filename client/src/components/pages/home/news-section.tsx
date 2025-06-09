import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

const newsItems = [
  {
    id: "news-1",
    date: "June 12, 2023",
    title: "IICT Hosts International Conference on AI and Machine Learning",
    description:
      "Researchers from 15 countries participated in the three-day conference focusing on emerging AI technologies.",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/f4ef7eb80e-cd454435a051ca3da142.png",
    altText: "tech conference at university with audience",
  },
  {
    id: "news-2",
    date: "June 8, 2023",
    title: "SUST Students Win National Hackathon",
    description:
      "A team of IICT students secured first place at the National Innovation Challenge with their smart healthcare solution.",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/b37dfb8f7a-458c902555fa346b425c.png",
    altText: "student team winning a technology competition",
  },
  {
    id: "news-3",
    date: "June 1, 2023",
    title: "IICT Signs MoU with Leading Tech Company",
    description:
      "Partnership will create internship opportunities and joint research initiatives for students and faculty.",
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/abc0059d17-4a2e695f8f171d9bafc4.png",
    altText: "university signing MOU with tech company",
  },
];

export default function NewsSection() {
  return (
    <div id="news-section" className="md:w-1/2">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-montserrat font-bold">Latest News</h2>
        <span className="text-primary font-medium inline-flex items-center hover:underline cursor-pointer">
          View All
          <FontAwesomeIcon icon={["fas", "arrow-right"]} className="ml-2" />
        </span>
      </div>

      {newsItems.map((item, index) => (
        <div
          key={item.id}
          id={item.id}
          className={`flex ${
            index !== newsItems.length - 1 ? "mb-8 pb-8 border-b" : ""
          }`}
        >
          <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={item.imageUrl}
              alt={item.altText}
            />
          </div>
          <div className="ml-4">
            <span className="text-sm text-gray-500">{item.date}</span>
            <Link to={`/news/${item.id}`} className="hover:text-primary">
              <h3 className="text-lg font-montserrat font-semibold mb-2">
                {item.title}
              </h3>
            </Link>
            <p className="text-sm">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
