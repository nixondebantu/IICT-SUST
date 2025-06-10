export default function ProgramStats() {
  return (
    <section id="program-stats" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="stat-item">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-gray-600">Degree Programs</div>
          </div>
          <div className="stat-item">
            <div className="text-3xl font-bold text-primary mb-2">2000+</div>
            <div className="text-gray-600">Students Enrolled</div>
          </div>
          <div className="stat-item">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-gray-600">Employment Rate</div>
          </div>
          <div className="stat-item">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-gray-600">Industry Partners</div>
          </div>
        </div>
      </div>
    </section>
  );
}
