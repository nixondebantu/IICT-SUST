export default function CtaSection() {
  return (
    <section
      id="cta-section"
      className="py-16 bg-primary w-full relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/10 transform skew-x-12"></div>
      <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-white/5 rounded-full"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-montserrat font-bold mb-6">
            Ready to Start Your Journey at IICT?
          </h2>
          <p className="text-lg mb-8">
            Join our community of innovators, researchers, and technology
            leaders shaping the future of ICT in Bangladesh and beyond.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <span className="bg-white text-primary font-medium px-8 py-3 rounded-md hover:bg-opacity-90 transition-colors cursor-pointer">
              Apply Now
            </span>
            <span className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
              Visit Campus
            </span>
            <span className="bg-transparent border-2 border-white text-white font-medium px-8 py-3 rounded-md hover:bg-white/10 transition-colors cursor-pointer">
              Contact Us
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
