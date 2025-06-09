function DirectorsWelcome() {
  return (
    <section id="directors-welcome" className="py-16">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary">
              <img
                className="w-full h-full object-cover"
                // src="https://storage.googleapis.com/uxpilot-auth.appspot.com/add3d6dcbf-b177cc183524abaafb31.png"
                src="https://i.postimg.cc/8zCSFS7g/Mumin-iict.jpg"
                alt="professional portrait of a male university director in formal attire, headshot, academic setting"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-montserrat font-bold mb-2">
              Director's Welcome
            </h2>
            <div className="w-20 h-1 bg-primary mb-6"></div>
            <p className="text-lg mb-6">
              Welcome to the Institute of Information and Communication
              Technology (IICT) at Shahjalal University of Science and
              Technology. At IICT, we are committed to excellence in education,
              research, and innovation in the field of ICT. Our programs are
              designed to prepare students for the challenges of the rapidly
              evolving technology landscape.
            </p>
            <div className="mt-4">
              <p className="font-semibold">
                Prof Mohammad Abdullah Al Mumin, PhD
              </p>
              <p className="text-sm">Director, IICT, SUST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DirectorsWelcome;
