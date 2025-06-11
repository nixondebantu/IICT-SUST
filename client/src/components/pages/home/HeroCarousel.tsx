import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import carouselService from "@/lib/services/carousel.service";// Adjust path if needed
import { CarouselSlide } from "@/lib/dtos/carousel.dto";

const HeroCarousel: React.FC = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const AUTOPLAY_INTERVAL = 5000; // 5 seconds
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        const data = await carouselService.getSlides();
        setSlides(data);
        setError(null);
      } catch (err) {
        setError("Failed to load slides. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []); // Empty dependency array ensures this runs only once

  const autoAdvanceSlide = useCallback(() => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  }, [slides.length]);

  const resetAutoplayInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(autoAdvanceSlide, AUTOPLAY_INTERVAL);
  }, [autoAdvanceSlide, AUTOPLAY_INTERVAL]);

  // Effect for autoplay management
  useEffect(() => {
    // Start interval only if there are slides and no error
    if (slides.length > 0 && !error) {
      resetAutoplayInterval();
    }
    // Cleanup on unmount or when dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length, error, resetAutoplayInterval]);

  const handleNextButtonClick = () => {
    if (slides.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    resetAutoplayInterval();
  };

  const handlePrevButtonClick = () => {
    if (slides.length === 0) return;
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
    resetAutoplayInterval();
  };

  const handleGoToSlideClick = (index: number) => {
    setCurrentIndex(index);
    resetAutoplayInterval();
  };

  // --- Conditional Rendering ---
  if (loading) {
    return (
      <section className="relative h-[600px] w-full flex items-center justify-center bg-gray-200">
        <div>Loading Carousel...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative h-[600px] w-full flex items-center justify-center bg-red-100 text-red-700">
        <div>{error}</div>
      </section>
    );
  }

  if (slides.length === 0) {
    return (
      <section className="relative h-[600px] w-full flex items-center justify-center bg-gray-200">
        <div>No slides available.</div>
      </section>
    );
  }

  // --- Main Render ---
  return (
    <section id="hero-section" className="relative h-[600px] w-full">
      <div id="hero-carousel" className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
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
                src={slide.image_url}
                alt={slide.title} // Using title for alt text as it's descriptive
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
                  {slide.button_text && slide.button_link && (
                    <Link to={slide.button_link}>
                      <button className="bg-primary text-white px-6 py-3 rounded-md font-medium inline-flex items-center hover:bg-opacity-90 transition-colors cursor-pointer">
                        {slide.button_text}
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
            onClick={handlePrevButtonClick}
            aria-label="Previous slide"
            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div id="carousel-indicators" className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={`indicator-${index}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => handleGoToSlideClick(index)}
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
            onClick={handleNextButtonClick}
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