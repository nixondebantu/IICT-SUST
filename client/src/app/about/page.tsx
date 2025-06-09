import AboutHero from "@/components/pages/about/about-hero";
import ConsultingServices from "@/components/pages/about/consulting-services";
import HistoryMilestones from "@/components/pages/about/history-milestones";
import IndustryCollaborations from "@/components/pages/about/industry-collaborations";
import MissionVision from "@/components/pages/about/mission-vision";
import DirectorsWelcome from "@/components/pages/home/DirectorsWelcome";

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <MissionVision />
      <DirectorsWelcome />
      <HistoryMilestones />
      <IndustryCollaborations />
      <ConsultingServices />
    </div>
  );
}
