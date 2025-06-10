import ProgramCategories from "@/components/pages/programs/program-categories";
import ProgramStats from "@/components/pages/programs/program-stats";
import ProgramsCTA from "@/components/pages/programs/programs-cta";
import ProgramsHero from "@/components/pages/programs/programs-hero";
import WhyChoose from "@/components/pages/programs/why-choose";

export default function ProgramsPage() {
  return (
    <div>
      <ProgramsHero />
      <ProgramCategories />
      <ProgramStats />
      <WhyChoose />
      <ProgramsCTA />
    </div>
  );
}
