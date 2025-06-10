function ProgramsHero() {
  return (
    <section
      id="hero-section"
      className="bg-gradient-to-r from-gray-900 to-gray-800 h-[400px] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Academic <span className="text-primary">Programs</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Explore our comprehensive range of programs designed to prepare you
            for the future of technology and innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-primary hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Apply Now
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-medium transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProgramsHero;
