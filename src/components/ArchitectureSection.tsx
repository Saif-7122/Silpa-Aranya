import { useState } from 'react';
import { motion } from 'motion/react';
import { HOUSE_TYPES, FARMLAND_INFRASTRUCTURE, PLOT_PLANTATIONS } from '../data/aranyaData';

interface ArchitectureSectionProps {
  onOpenEnquiry: (source: string) => void;
}

export function ArchitectureSection({ onOpenEnquiry }: ArchitectureSectionProps) {
  const [selectedId, setSelectedId] = useState<'1bhk' | '2bhk' | 'manduva'>('1bhk');
  const [showPlantations, setShowPlantations] = useState(false);

  const activeHouse = HOUSE_TYPES.find((h) => h.id === selectedId) ?? HOUSE_TYPES[0];

  return (
    <section id="architecture" className="bg-[#F5F3EC] text-[#141815] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#1F3527]/15">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150] mb-4">
              Homes & Plots · 3 Ready Designs
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#141815] text-balance">
              Pick a Home That Fits Your Family.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="ARANYA Home Options"
            className="inline-flex flex-wrap gap-1.5 bg-[#EBE7DC] p-1.5 border border-[#1F3527]/12 self-start lg:self-auto"
          >
            {HOUSE_TYPES.map((house) => (
              <button
                key={house.id}
                type="button"
                role="tab"
                aria-selected={selectedId === house.id}
                onClick={() => setSelectedId(house.id)}
                className={`px-4 py-2.5 text-xs font-semibold tracking-wide whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  selectedId === house.id
                    ? 'bg-[#1F3527] text-[#F5F3EC]'
                    : 'text-[#141815]/75 hover:text-[#141815]'
                }`}
              >
                {house.id === '1bhk'
                  ? '1 BHK Home'
                  : house.id === '2bhk'
                    ? '2 BHK Villa'
                    : 'Manduva House'}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch">
          <motion.div
            key={activeHouse.id}
            initial={{ opacity: 0.65, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35 }}
            className="lg:col-span-7 bg-[#EBE7DC] border border-[#1F3527]/12 overflow-hidden flex flex-col justify-between"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src={activeHouse.image}
                alt={activeHouse.imageAlt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <div className="px-6 py-3.5 bg-[#F5F3EC] border-t border-[#1F3527]/10 flex flex-wrap items-center justify-between gap-2 text-xs text-[#4D6150]">
              <span>{activeHouse.name} · Official Brochure Design</span>
              <span>{activeHouse.brochureTagline}</span>
            </div>
          </motion.div>

          <div className="lg:col-span-5 flex flex-col justify-between bg-[#EBE7DC] border border-[#1F3527]/12 p-6 sm:p-9">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4D6150]">
                {activeHouse.subtitle}
              </p>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl font-medium text-[#141815]">
                {activeHouse.name}
              </h3>

              <div className="mt-6 space-y-3 border-y border-[#1F3527]/12 py-5 text-sm">
                <div className="flex justify-between gap-6">
                  <span className="text-[#141815]/65 whitespace-nowrap shrink-0">Built-Up Size</span>
                  <span className="font-medium text-right text-[#141815] tabular-nums">
                    {activeHouse.builtUpNote}
                  </span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-[#141815]/65 whitespace-nowrap shrink-0">Plot Size</span>
                  <span className="font-medium text-right text-[#141815]">
                    {activeHouse.plotBaseline}
                  </span>
                </div>
                <div className="flex justify-between gap-6">
                  <span className="text-[#141815]/65 whitespace-nowrap shrink-0">Best For</span>
                  <span className="font-medium text-right text-[#141815]">{activeHouse.idealFor}</span>
                </div>
              </div>

              <p className="mt-5 text-sm leading-relaxed text-[#141815]/80">
                <strong className="font-semibold text-[#141815]">Design Style:</strong>{' '}
                {activeHouse.architectureStyle}
              </p>

              <ul className="mt-5 space-y-2.5 text-sm text-[#141815]/85">
                {activeHouse.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="text-[#1F3527] font-semibold">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#1F3527]/12 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-[#141815]/65">
                Exact room dimensions & floor plans are shared on your site visit.
              </p>
              <button
                type="button"
                onClick={() => onOpenEnquiry(`architecture-${activeHouse.id}`)}
                className="bg-[#1F3527] text-[#F5F3EC] px-6 min-h-[44px] text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 hover:bg-[#141815] transition-colors cursor-pointer"
              >
                CONTACT OUR TEAM
              </button>
            </div>
          </div>
        </div>

        {/* Farmland Infrastructure & 12-Species Plantation Details */}
        <div className="mt-16 pt-12 border-t border-[#1F3527]/15">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4D6150]">
                Plot Development · Ready Basics
              </p>
              <h3 className="mt-1 font-display text-3xl font-medium text-[#141815]">
                What Comes With Every Plot
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowPlantations((prev) => !prev)}
              aria-expanded={showPlantations}
              className="border border-[#1F3527] text-[#1F3527] px-4 min-h-[44px] text-xs font-semibold uppercase tracking-[0.12em] whitespace-nowrap shrink-0 hover:bg-[#1F3527] hover:text-[#F5F3EC] transition-colors cursor-pointer"
            >
              {showPlantations ? 'Hide 12 Fruit Trees' : 'See All 12 Fruit Trees'}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#1F3527]/12 border border-[#1F3527]/12">
            {FARMLAND_INFRASTRUCTURE.map((spec) => (
              <div key={spec.title} className="bg-[#F5F3EC] p-6">
                <h4 className="font-display text-xl font-medium text-[#141815]">{spec.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#141815]/75">{spec.detail}</p>
              </div>
            ))}
            <div className="bg-[#1F3527] text-[#F5F3EC] p-6 flex flex-col justify-between">
              <div>
                <h4 className="font-display text-xl font-medium text-[#F5F3EC]">
                  12 Fruit Trees on Each Plot
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-[#E6E0D3]/80">
                  Mango, Anjeer, Avocado, Pomegranate, Custard Apple, Coconut & more planted on
                  your land.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPlantations(true)}
                className="mt-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-[#B5945B] underline underline-offset-4 cursor-pointer"
              >
                See Full Tree List
              </button>
            </div>
          </div>

          {showPlantations && (
            <div className="mt-6 bg-[#EBE7DC] border border-[#1F3527]/15 p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#4D6150] mb-4">
                12 Fruit Plants Included for Each Plot (Brochure Page 25)
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 text-sm font-medium text-[#141815]">
                {PLOT_PLANTATIONS.map((species, i) => (
                  <div key={species} className="py-2 border-b border-[#1F3527]/12 tabular-nums">
                    <span className="text-xs text-[#4D6150] mr-2">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {species}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
