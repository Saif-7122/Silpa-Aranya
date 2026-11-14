import { useEffect, useState } from 'react';
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
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const handleQuota = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  const handleOpenEnquiry = (source: string) => {
    setEnquirySource(source);
    setEnquiryModalOpen(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F5F3EC] text-[#141815]">
        {mapsQuotaExceeded && (
          <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
            <span>
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
        )}

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
