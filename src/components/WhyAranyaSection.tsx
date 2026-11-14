interface WhyAranyaSectionProps {
  onOpenEnquiry: (source: string) => void;
}

const PILLARS = [
  {
    index: '01',
    category: 'Long-Term Growth',
    title: 'Built for a 7–10 Year Horizon',
    summary:
      'Enter early in West Hyderabad’s growing Chevella–Manneguda belt at a lower base cost, backed by 112 acres of gated layout development.',
    detail:
      'Designed as a steady, long-term land investment rather than a short-term gamble. Future price growth depends on market conditions and is never guaranteed.',
    image: '/assets/brochure/site-aerial-actual.jpg',
    mediaLabel: 'Real Site Photo (Shot at Sight)',
  },
  {
    index: '02',
    category: 'Extra Rental Income',
    title: 'Earn When You Are Not Visiting',
    summary:
      'When your family is back in Hyderabad during weekdays or off-seasons, you can explore renting out your cottage for weekend stays through holiday-home operators or Airbnb.',
    detail:
      'Depends on operator tie-ups, local permissions, community rules, guest demand, and upkeep expenses. Fixed occupancy or rental returns are not guaranteed.',
    image: '/assets/brochure/farm-resort-buggy.jpg',
    mediaLabel: 'Weekend Community Lifestyle',
  },
  {
    index: '03',
    category: 'Weekend Escape',
    title: 'A Private Getaway 1 Hr from Gachibowli',
    summary:
      'Enjoy pure red laterite soil, 12 fruit-tree varieties on your plot, a Goshala, bonfire lawns, and a 10,000 sq. ft. clubhouse—without travelling far.',
    detail:
      'Ananthagiri Hills is just ~17 km past Manneguda for quick morning drives and forest walks.',
    image: '/assets/brochure/harvest-cafe.jpg',
    mediaLabel: 'Farm-Fresh Dining & Greenery',
  },
  {
    index: '04',
    category: 'Upcoming Roads',
    title: 'NH-163 & Proposed Regional Ring Road',
    summary:
      'Located off the Chevella–Manneguda NH-163 highway and noted in the brochure as about 1 km from the proposed Regional Ring Road (RRR) Southern Arc.',
    detail:
      'Please note: the Southern Arc RRR is still in the planning and survey stage — it is a future growth driver, not a finished road yet.',
    image: '/assets/brochure/site-arch-actual.jpg',
    mediaLabel: 'Real Site Photo (Shot at Sight)',
  },
  {
    index: '05',
    category: 'Price Advantage',
    title: 'Lower Entry Price Than Nearby Belts',
    summary:
      'The info-sheet lists a starting base rate of ₹11,999 per sq. yd., compared to ₹18,000–₹25,000 per sq. yd. seen in plotted areas closer to the city.',
    detail:
      'Nearby locality prices are shared only for general comparison — not as ARANYA’s final price or guaranteed future rate.',
    image: '/assets/brochure/farmland-twilight.jpg',
    mediaLabel: 'Courtyard Farm Homes',
  },
];

export function WhyAranyaSection({ onOpenEnquiry }: WhyAranyaSectionProps) {
  return (
    <section className="bg-[#141815] text-[#F5F3EC] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 pb-14 border-b border-[#F5F3EC]/15">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#B5945B] mb-4">
              Why ARANYA
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#F5F3EC] text-balance">
              A Peaceful Weekend Retreat. A Smart Long-Term Asset.
            </h2>
          </div>
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="border border-[#F5F3EC]/15 p-6 bg-[#1B221D]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B5945B]">
                For Your Family
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[#E6E0D3]/85">
                Clean air, home-grown fruits, a 10,000 sq. ft. clubhouse, and safe open lawns where
                children and elders can unwind every weekend.
              </p>
            </div>
            <div className="border border-[#F5F3EC]/15 p-6 bg-[#1B221D]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#B5945B]">
                For Your Portfolio
              </p>
              <p className="mt-2.5 text-sm leading-relaxed text-[#E6E0D3]/85">
                Spacious 514+ sq. yd. plots along NH-163 near the proposed RRR, with an accessible
                entry price and optional weekend rental potential.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-[#F5F3EC]/12">
          {PILLARS.map((pillar, idx) => (
            <div
              key={pillar.index}
              className="grid grid-cols-1 gap-8 py-12 lg:grid-cols-12 lg:items-center"
            >
              <div className={`lg:col-span-7 ${idx % 2 === 1 ? 'lg:order-2 lg:pl-8' : 'lg:pr-8'}`}>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.14em] text-[#B5945B] mb-3">
                  <span className="tabular-nums font-semibold">{pillar.index}</span>
                  <span aria-hidden="true">·</span>
                  <span>{pillar.category}</span>
                </div>
                <h3 className="font-display text-3xl sm:text-4xl font-medium text-[#F5F3EC]">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[#E6E0D3]/90 max-w-2xl">
                  {pillar.summary}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-[#E6E0D3]/70 max-w-2xl">
                  {pillar.detail}
                </p>
              </div>

              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <figure className="overflow-hidden bg-[#1B221D] border border-[#F5F3EC]/12">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover aranya-photo"
                    />
                  </div>
                  <figcaption className="px-4 py-2.5 text-xs tracking-wide text-[#E6E0D3]/75">
                    {pillar.mediaLabel}
                  </figcaption>
                </figure>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-10 border-t border-[#F5F3EC]/15 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <p className="text-sm text-[#E6E0D3]/85 max-w-xl">
            Want exact plot sizes, home options, and current availability? Talk to our Hyderabad team.
          </p>
          <button
            type="button"
            onClick={() => onOpenEnquiry('why-aranya')}
            className="bg-[#F5F3EC] text-[#141815] px-7 min-h-[48px] text-xs font-semibold tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-colors hover:bg-[#B5945B] cursor-pointer"
          >
            CONTACT OUR TEAM
          </button>
        </div>
      </div>
    </section>
  );
}
