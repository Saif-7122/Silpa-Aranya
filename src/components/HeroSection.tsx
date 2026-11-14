import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, PhoneCall } from 'lucide-react';
import { BRAND_INFO, HERO_METRICS } from '../data/aranyaData';
import { EnquiryForm } from './EnquiryForm';

export function HeroSection() {
  const { scrollY } = useScroll();
  const imageScale = useTransform(scrollY, [0, 700], [1, 1.06]);
  const imageY = useTransform(scrollY, [0, 700], [0, 50]);

  return (
    <section id="top" className="relative bg-[#141815] text-[#F5F3EC]">
      {/* Full-bleed architectural hero canvas with integrated above-the-fold form */}
      <div className="relative min-h-[700px] lg:min-h-[82vh] flex items-end overflow-hidden">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src="/assets/brochure/house-1bhk.jpg"
            alt="ARANYA 1 BHK timber and glass weekend farmhouse surrounded by green lawns"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center aranya-photo"
          />
        </motion.div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#141815]/90 via-[#141815]/45 to-[#141815]/30 lg:bg-gradient-to-r lg:from-[#141815]/68 lg:via-[#141815]/20 lg:to-[#141815]/15"
        />

        <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 pt-20 pb-7 lg:px-12 lg:pt-28 lg:pb-12">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
            {/* Left: Editorial Hero Story */}
            <div className="lg:col-span-7 pb-1">
              <p className="text-[11px] sm:text-sm font-medium tracking-[0.14em] uppercase text-[#E6E0D3]/95 mb-3 sm:mb-4">
                {BRAND_INFO.officialProjectName} · {BRAND_INFO.locationShort}
              </p>

              <h1 className="font-display text-[clamp(2.2rem,4.7vw,4.35rem)] font-medium leading-[1.04] tracking-tight text-[#F5F3EC] text-balance">
                Your Weekends Deserve Their Own Address.
              </h1>

              <p className="mt-3.5 sm:mt-5 max-w-xl text-sm sm:text-lg leading-relaxed text-[#E6E0D3]/95">
                Own a peaceful weekend farm home just a 1-hour drive from Gachibowli — surrounded by
                fresh air, fruit trees, and long-term growth potential.
              </p>

              <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="#overview"
                  className="inline-flex items-center gap-2 border border-[#F5F3EC]/50 bg-[#141815]/50 backdrop-blur-sm text-[#F5F3EC] px-5 sm:px-6 min-h-[44px] sm:min-h-[48px] text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[#F5F3EC] hover:text-[#141815] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5945B]"
                >
                  Explore ARANYA
                  <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
                </a>

                <a
                  href={BRAND_INFO.phoneHref}
                  className="inline-flex items-center gap-2 border border-[#F5F3EC]/30 bg-[#141815]/40 backdrop-blur-sm text-[#E6E0D3] px-4 sm:px-5 min-h-[44px] sm:min-h-[48px] text-xs font-medium tracking-[0.08em] uppercase whitespace-nowrap shrink-0 hover:border-[#B5945B] hover:text-white transition-colors tabular-nums"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-[#B5945B]" aria-hidden="true" />
                  <span>{BRAND_INFO.phone}</span>
                </a>
              </div>

              <p className="mt-4 sm:mt-6 text-xs tracking-wide text-[#E6E0D3]/80">
                Silpa Aranya by {BRAND_INFO.developerGroup} · Tagline: Return to Real
              </p>
            </div>

            {/* Right: Natural Warm-Ivory Above-the-Fold Lead Form */}
            <div className="lg:col-span-5">
              <div className="bg-[#F5F3EC]/95 backdrop-blur-md text-[#141815] border border-[#1F3527]/15 shadow-[0_24px_60px_-15px_rgba(20,24,21,0.42)] p-5 sm:p-6">
                <div className="pb-3.5 mb-3.5 border-b border-[#1F3527]/12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#4D6150]">
                    Brochure, Plot Prices &amp; Site Visit
                  </p>
                  <h2 className="mt-0.5 font-display text-2xl sm:text-[1.65rem] font-medium text-[#141815]">
                    CONTACT OUR TEAM
                  </h2>
                </div>

                <EnquiryForm sourceSection="hero-above-fold" idPrefix="hero" compact />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verified 4-Column Project Highlights Strip directly below Hero */}
      <div id="overview" className="border-t border-[#F5F3EC]/12 bg-[#1F3527]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-[#F5F3EC]/12 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {HERO_METRICS.map((metric) => (
            <div key={metric.id} className="px-6 py-7 lg:px-10 lg:py-9">
              <p className="font-display text-3xl lg:text-4xl font-medium text-[#F5F3EC] tabular-nums">
                {metric.value}
              </p>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#B5945B]">
                {metric.label}
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[#E6E0D3]/85">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
