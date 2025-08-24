import { Link } from "react-router";

export default function ProgramDetailsCTA() {
  return (
    <section id="cta" className="py-16 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-montserrat text-primary-foreground mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-primary-foreground text-opacity-90 max-w-2xl mx-auto mb-8">
          Join our B.Sc. in Software Engineering program and prepare for an
          exciting career in the rapidly evolving tech industry.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#apply"
            className="bg-white text-primary hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition duration-300 cursor-pointer"
          >
            Apply Now
          </a>
          <Link
            to={"/programs"}
            className="border border-white text-primary-foreground hover:bg-white hover:text-primary font-medium py-3 px-6 rounded-md transition duration-300 cursor-pointer"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
