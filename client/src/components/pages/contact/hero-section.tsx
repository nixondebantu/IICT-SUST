export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="bg-gradient-to-br from-primary/90 to-primary text-primary-foreground h-[400px] flex items-center"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center">
          <h1 className="font-bold text-4xl md:text-5xl mb-6">Contact Us</h1>
          <p className="text-xl text-red-100 max-w-2xl mx-auto">
            Get in touch with the Institute of Information and Communication
            Technology
          </p>
        </div>
      </div>
    </section>
  );
}
