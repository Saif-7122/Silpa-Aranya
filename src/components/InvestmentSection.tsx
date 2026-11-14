import { CORRIDOR_COMPARISON } from '../data/aranyaData';

interface InvestmentSectionProps {
  onOpenEnquiry: (source: string) => void;
}

export function InvestmentSection({ onOpenEnquiry }: InvestmentSectionProps) {
  return (
    <section id="investment" className="bg-[#1F3527] text-[#F5F3EC] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 pb-14 border-b border-[#F5F3EC]/15">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B5945B] mb-4">
              Investment Potential · 7–10 Year View
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#F5F3EC] text-balance">
              A Weekend Escape Today. A Valuable Asset Tomorrow.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#E6E0D3]/85">
              ARANYA lets your family enjoy a real farmhouse now while holding land along West
              Hyderabad’s growing Chevella–Manneguda belt for the next 7–10 years.
            </p>
          </div>
        </div>

        {/* Surrounding Corridor Benchmark Table */}
        <div className="mt-12">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-6">
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-[#F5F3EC]">
              How Surrounding Area Prices Compare
            </h3>
            <span className="text-xs text-[#E6E0D3]/70">
              Prices in ₹ per Sq. Yd. · For general reference only
            </span>
          </div>

          <div className="overflow-x-auto border border-[#F5F3EC]/15">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#F5F3EC]/15 bg-[#141815]/50 text-xs uppercase tracking-[0.12em] text-[#B5945B]">
                  <th className="py-4 px-5 font-semibold">Area / Project</th>
                  <th className="py-4 px-5 font-semibold">Approx. Price</th>
                  <th className="py-4 px-5 font-semibold">What You Should Know</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F5F3EC]/12 text-sm">
                {CORRIDOR_COMPARISON.map((row, index) => (
                  <tr
                    key={row.zone}
                    className={index === CORRIDOR_COMPARISON.length - 1 ? 'bg-[#294433]/65' : ''}
                  >
                    <td className="py-5 px-5 font-medium text-[#F5F3EC] align-top">{row.zone}</td>
                    <td className="py-5 px-5 font-display text-xl text-[#B5945B] whitespace-nowrap tabular-nums align-top">
                      {row.indicativeRange}
                    </td>
                    <td className="py-5 px-5 text-[#E6E0D3]/85 align-top">
                      <p>{row.context}</p>
                      <p className="mt-1.5 text-xs text-[#E6E0D3]/65">{row.note}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-[#E6E0D3]/70">
            Note: Nearby locality rates are general 2026 market references. They are not ARANYA’s
            selling price and do not promise any guaranteed future value.
          </p>
        </div>

        {/* Two Simple Pillars */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="border border-[#F5F3EC]/15 bg-[#141815]/40 p-7 sm:p-9">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B5945B]">
              01 · Growth Drivers
            </p>
            <h3 className="mt-2 font-display text-3xl font-medium text-[#F5F3EC]">
              Why Hold for 7–10 Years?
            </h3>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-[#E6E0D3]/85">
              <li>
                — Lower starting price per sq. yd. for 514+ sq. yd. gated farm plots near Manneguda.
              </li>
              <li>
                — Right along the NH-163 highway belt (APPA Junction to Manneguda widening focus).
              </li>
              <li>
                — About 1 km from the proposed Regional Ring Road (RRR) Southern Arc (still in
                planning stage; not built yet).
              </li>
              <li>
                — Land growth always depends on government road timelines and market demand, with no
                fixed guarantees.
              </li>
            </ul>
          </div>

          <div className="border border-[#F5F3EC]/15 bg-[#141815]/40 p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#B5945B]">
                02 · Weekend Stay Hosting
              </p>
              <h3 className="mt-2 font-display text-3xl font-medium text-[#F5F3EC]">
                Possible Holiday Rental Income
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-[#E6E0D3]/85">
                Families from Hyderabad regularly look for peaceful weekend cottages near Chevella
                and Ananthagiri Hills. When you are not using your home, you can explore listing it
                with holiday-stay managers or on Airbnb.
              </p>
              <p className="mt-4 text-xs leading-relaxed text-[#E6E0D3]/70">
                Please note: Occupancy and rental income are never guaranteed — they depend on
                operator tie-ups, required permissions, upkeep costs, and seasonal bookings.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#F5F3EC]/12 flex items-center justify-between gap-4">
              <span className="text-xs text-[#E6E0D3]/80">
                Ask for available plot sizes & current payment options
              </span>
              <button
                type="button"
                onClick={() => onOpenEnquiry('investment-section')}
                className="bg-[#F5F3EC] text-[#141815] px-5 min-h-[44px] text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 hover:bg-[#B5945B] transition-colors cursor-pointer"
              >
                CONTACT OUR TEAM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
