import { BUYING_STEPS } from '../data/aranyaData';

interface BuyingJourneySectionProps {
  onOpenEnquiry: (source: string) => void;
}

export function BuyingJourneySection({ onOpenEnquiry }: BuyingJourneySectionProps) {
  return (
    <section className="bg-[#141815] text-[#F5F3EC] py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-12 border-b border-[#F5F3EC]/15">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B5945B] mb-4">
              How Buying Works
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#F5F3EC]">
              Three Simple Steps to Own Your Plot.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenEnquiry('buying-journey')}
            className="bg-[#F5F3EC] text-[#141815] px-6 py-3.5 min-h-[48px] text-xs font-semibold tracking-[0.15em] uppercase whitespace-nowrap shrink-0 self-start lg:self-auto hover:bg-[#B5945B] transition-colors cursor-pointer"
          >
            CONTACT OUR TEAM
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {BUYING_STEPS.map((item) => (
            <div
              key={item.step}
              className="border border-[#F5F3EC]/15 bg-[#1B221D] p-7 sm:p-8 flex flex-col justify-between"
            >
              <div>
                <p className="font-display text-4xl font-medium text-[#B5945B] tabular-nums">
                  {item.step}
                </p>
                <h3 className="mt-4 font-display text-2xl sm:text-3xl font-medium text-[#F5F3EC]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#E6E0D3]/80">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
