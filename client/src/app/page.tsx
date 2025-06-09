import AcademicPrograms from "@/components/pages/home/academic-programs";
import CtaSection from "@/components/pages/home/cta-section";
import DirectorsWelcome from "@/components/pages/home/DirectorsWelcome";
import EventsSection from "@/components/pages/home/events-section";
import HeroCarousel from "@/components/pages/home/HeroCarousel";
import IICTHighlights from "@/components/pages/home/iict-highlights";
import NewsSection from "@/components/pages/home/news-section";
import NoticeSection from "@/components/pages/home/notice-section";
function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <HeroCarousel />
      {/* <div className="mx-12"> */}
      <DirectorsWelcome />
      <IICTHighlights />
      <AcademicPrograms />
      <NoticeSection />
      <section id="news-events" className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            {/* News Section */}
            <NewsSection />
            {/* Events Section  */}
            <EventsSection />
          </div>
        </div>
      </section>
      <CtaSection />
    </div>
    // </div>
  );
}

export default App;
