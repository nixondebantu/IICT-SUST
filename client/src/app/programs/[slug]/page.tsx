import ProgramApplySection from "@/components/pages/programs/program-apply-section";
import ProgramDetailsCTA from "@/components/pages/programs/program-details-cta";
import ProgramSections from "@/components/pages/programs/program-sections";
import ProgramTitle from "@/components/pages/programs/program-title";
import { useParams } from "react-router";

export default function ProgramDetailsPage() {
  const { slug } = useParams<{ slug: string }>();
  console.log("🚀 ~ ProgramDetailsPage ~ slug:", slug);
  return (
    <div>
      <ProgramTitle />
      <ProgramSections />
      <ProgramApplySection />
      <ProgramDetailsCTA />
    </div>
  );
}
