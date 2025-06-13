export default function PageHeading() {
  return (
    <>
      <section
        id="page-header"
        className="bg-gradient-to-r from-gray-900 to-gray-800 h-[200px] flex items-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Official <span className="text-primary">Notices</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Stay updated with the latest announcements and important
              information
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
