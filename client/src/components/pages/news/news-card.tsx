import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";

export default function NewsCard() {
  return (
    <article className="rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="md:flex">
        <div className="md:w-80 h-48 md:h-auto">
          <img
            className="w-full h-full object-cover"
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/11d578de27-ec7aef6f8888a208f9e4.png"
            alt="modern university research lab with students working on computers and technology projects"
          />
        </div>
        <div className="p-6 flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              Research
            </span>
            <span className="text-sm">December 10, 2024</span>
          </div>
          <h3 className="text-xl font-semibold text-primary/90 mb-3 hover:text-primary cursor-pointer">
            IICT Students Win National AI Competition with Innovative Healthcare
            Solution
          </h3>
          <p className="mb-4">
            A team of IICT students has secured first place in the National
            Artificial Intelligence Competition with their groundbreaking
            healthcare management system that uses machine learning to predict
            patient outcomes...
          </p>
          <Link
            to={`/news/${1}`}
            className="text-primary font-medium hover:underline cursor-pointer"
          >
            Read More{" "}
            <FontAwesomeIcon icon={["fas", "arrow-right"]} className="ml-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
