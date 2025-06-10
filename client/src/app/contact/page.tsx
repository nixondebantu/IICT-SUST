import ContactInfo from "@/components/pages/contact/contact-info";
import HeroSection from "@/components/pages/contact/hero-section";
import MapFormSection from "@/components/pages/contact/map-form-section";
import OfficeHours from "@/components/pages/contact/office-hours";

export default function ContactPage() {
  return (
    <div>
      <HeroSection />
      <ContactInfo />
      <MapFormSection />
      <OfficeHours />
    </div>
  );
}
