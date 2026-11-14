import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { WhyAranyaSection } from './components/WhyAranyaSection';
import { LocationSection } from './components/LocationSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { InvestmentSection } from './components/InvestmentSection';
import { GallerySection } from './components/GallerySection';
import { MasterplanSection } from './components/MasterplanSection';
import { BuyingJourneySection } from './components/BuyingJourneySection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';

export default function App() {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquirySource, setEnquirySource] = useState('general');

  const handleOpenEnquiry = (source: string) => {
    setEnquirySource(source);
    setEnquiryModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F5F3EC] text-[#141815]">
        <Navbar onOpenEnquiry={handleOpenEnquiry} />

        <main className="flex-1">
          <HeroSection />
          <ExperienceSection />
          <WhyAranyaSection onOpenEnquiry={handleOpenEnquiry} />
          <LocationSection />
          <ArchitectureSection onOpenEnquiry={handleOpenEnquiry} />
          <InvestmentSection onOpenEnquiry={handleOpenEnquiry} />
          <GallerySection />
          <MasterplanSection />
          <BuyingJourneySection onOpenEnquiry={handleOpenEnquiry} />
          <FaqSection />
          <ContactSection />
        </main>

        <Footer onOpenEnquiry={handleOpenEnquiry} />

        <EnquiryModal
          open={enquiryModalOpen}
          sourceSection={enquirySource}
          onClose={() => setEnquiryModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
