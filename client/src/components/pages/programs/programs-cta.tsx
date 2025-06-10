export default function ProgramsCTA() {
  return (
    <section
      id="cta-section"
      className="py-16 bg-gradient-to-r from-primary to-red-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-montserrat font-bold text-white mb-4">
          Ready to Start Your Journey?
        </h2>
        <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
          Join thousands of students who have built successful careers through
          our programs
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-primary hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors">
            Apply Now
          </button>
          <button className="border border-white text-white hover:bg-white hover:text-primary px-8 py-3 rounded-lg font-medium transition-colors">
            Visit The Campus
          </button>
        </div>
      </div>
    </section>
  );
}
