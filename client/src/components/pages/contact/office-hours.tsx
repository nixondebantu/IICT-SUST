export default function OfficeHours() {
  return (
    <section id="office-hours" className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-bold text-3xl mb-8">Office Hours</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div
            id="weekday-hours"
            className="p-6 border-2 border-border rounded-xl"
          >
            <h3 className="font-semibold text-xl mb-4">Weekdays</h3>
            <p className="text-lg">Sunday - Thursday</p>
            <p className="text-2xl font-semibold text-primary">
              9:00 AM - 5:00 PM
            </p>
          </div>
          <div
            id="weekend-hours"
            className="p-6 border-2 border-border rounded-xl"
          >
            <h3 className="font-semibold text-xl mb-4">Friday &amp; Weekend</h3>
            <p className="text-lg">Friday - Saturday</p>
            <p className="text-2xl font-semibold text-primary">Closed</p>
          </div>
        </div>
      </div>
    </section>
  );
}
