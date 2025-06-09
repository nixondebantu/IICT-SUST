import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useCallback, useRef } from "react"; // Added useRef
import { Link } from "react-router-dom";

interface SlideData {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}

const slidesData: SlideData[] = [
  {
    id: 1,
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/e5bd52eb93-880fb4ffec943387829f.png",
    altText:
      "modern university campus with technology labs, students working on computers, professional academic setting",
    title: "Pioneering ICT Education & Research at SUST",
    description:
      "Shaping the future of technology through innovation, education and research excellence",
    buttonText: "Explore Programs",
    buttonLink: "#programs",
  },
  {
    id: 2,
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/a23b517178-88a86c16a1e1a85804bf.png",
    altText:
      "software engineering students collaborating on a project in a modern computer lab, professional academic setting",
    title: "B.Sc. (Eng.) in Software Engineering",
    description:
      "Build your future with cutting-edge skills and knowledge in software development",
    buttonText: "Learn More",
    buttonLink: "#programs/software-engineering",
  },
  {
    id: 3,
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/c69f326c9e-db3b77acb1265ef59b81.png",
    altText:
      "graduate students in IT program working on advanced technology projects in a modern university setting",
    title: "Advance Your Career with our Masters in IT",
    description:
      "Specialized graduate programs designed for working professionals and aspiring researchers",
    buttonText: "Discover MIT",
    buttonLink: "#programs/masters-in-it",
  },
  {
    id: 4,
    imageUrl:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/fcbdaa8881-6699d20e0c99e604a7ba.png",
    altText:
      "university research lab with diverse group of researchers working on technology projects, professional academic setting",
    title: "Join Our Thriving Research Community",
    description:
      "Collaborate on cutting-edge research projects with international recognition",
    buttonText: "Our Research",
    buttonLink: "#research",
  },
];

const HeroCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const AUTOPLAY_INTERVAL = 5000; // 5 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // This function is what the interval will call
  const autoAdvanceSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
  }, []); // slidesData.length is constant for this component's lifecycle

  // Function to clear existing interval and start a new one
  const resetAutoplayInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(autoAdvanceSlide, AUTOPLAY_INTERVAL);
  }, [autoAdvanceSlide, AUTOPLAY_INTERVAL]); // AUTOPLAY_INTERVAL is constant

  // Effect for initial autoplay setup and cleanup on unmount
  useEffect(() => {
    resetAutoplayInterval(); // Start interval on mount

    return () => {
      // Cleanup on unmount
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [resetAutoplayInterval]); // resetAutoplayInterval is stable due to its useCallback deps

  // Renamed original nextSlide to handleNextButtonClick for clarity
  const handleNextButtonClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesData.length);
    resetAutoplayInterval(); // Reset timer on manual next
  };

  // Renamed original prevSlide to handlePrevButtonClick for clarity
  const handlePrevButtonClick = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slidesData.length) % slidesData.length
    );
    resetAutoplayInterval(); // Reset timer on manual prev
  };

  // Renamed original goToSlide to handleGoToSlideClick for clarity
  const handleGoToSlideClick = (index: number) => {
    setCurrentIndex(index);
    resetAutoplayInterval(); // Reset timer on manual jump
  };

  return (
    <section id="hero-section" className="relative h-[600px] w-full">
      <div id="hero-carousel" className="relative h-full overflow-hidden">
        {slidesData.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div className="relative h-full">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src={slide.imageUrl}
                alt={slide.altText}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
              <div className="container mx-auto px-6 h-full flex items-center relative z-10">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 opacity-90">
                    {slide.description}
                  </p>
                  {slide.buttonText && slide.buttonLink && (
                    <Link to={slide.buttonLink}>
                      <button className="bg-primary text-white px-6 py-3 rounded-md font-medium inline-flex items-center hover:bg-opacity-90 transition-colors cursor-pointer">
                        {slide.buttonText}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center items-center space-x-4">
          <button
            id="prev-slide"
            onClick={handlePrevButtonClick} // Use the new handler
            aria-label="Previous slide"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div id="carousel-indicators" className="flex items-center space-x-2">
            {slidesData.map((_, index) => (
              <button
                key={`indicator-${index}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => handleGoToSlideClick(index)} // Use the new handler
                className={`indicator h-1 rounded transition-all duration-300 cursor-pointer ${
                  index === currentIndex
                    ? "bg-primary w-8"
                    : "bg-gray-300/70 hover:bg-gray-200/70 w-2"
                }`}
              ></button>
            ))}
          </div>

          <button
            id="next-slide"
            onClick={handleNextButtonClick} // Use the new handler
            aria-label="Next slide"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
