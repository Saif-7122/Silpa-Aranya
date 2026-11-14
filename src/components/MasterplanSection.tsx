import { useState } from 'react';
import { MASTERPLAN_ZONES, AMENITY_CLUSTERS } from '../data/aranyaData';

export function MasterplanSection() {
  const [activeZoneId, setActiveZoneId] = useState<string>(MASTERPLAN_ZONES[0].id);
  const [activeAmenityId, setActiveAmenityId] = useState<string>(AMENITY_CLUSTERS[0].id);

  const activeZone =
    MASTERPLAN_ZONES.find((z) => z.id === activeZoneId) ?? MASTERPLAN_ZONES[0];
  const activeAmenity =
    AMENITY_CLUSTERS.find((a) => a.id === activeAmenityId) ?? AMENITY_CLUSTERS[0];

  return (
    <section id="masterplan" className="bg-[#EBE7DC] text-[#141815] py-20 lg:py-28 border-t border-[#1F3527]/12">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end pb-12 border-b border-[#1F3527]/15">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150] mb-4">
              Site Layout & Facilities · 112 Acres
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#141815] text-balance">
              See the 112-Acre Layout & Facilities.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#141815]/80">
              Tap any numbered spot on the real aerial site photo to check roads, plots, the
              clubhouse, and family facilities.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <div className="lg:col-span-7 relative bg-[#141815] overflow-hidden border border-[#1F3527]/20">
            <div className="relative aspect-[16/11] w-full">
              <img
                src="/assets/brochure/site-aerial-actual.jpg"
                alt="Real aerial photo of the 112-acre ARANYA land with laid roads and planted plots"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#141815]/60 via-transparent to-transparent"
              />

              {MASTERPLAN_ZONES.map((zone) => {
                const isSelected = zone.id === activeZoneId;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZoneId(zone.id)}
                    aria-label={`Inspect Zone ${zone.code}: ${zone.title}`}
                    aria-pressed={isSelected}
                    style={{ left: `${zone.xPercent}%`, top: `${zone.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] px-2.5 py-1.5 text-xs font-semibold tabular-nums transition-transform duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#F5F3EC] ${
                      isSelected
                        ? 'bg-[#B5945B] text-[#141815] scale-110 shadow-lg z-20'
                        : 'bg-[#1F3527]/90 text-[#F5F3EC] border border-[#F5F3EC]/50 hover:scale-105 z-10'
                    }`}
                  >
                    {zone.code}
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[#F5F3EC]/90">
                <span>Real Aerial Site Photo (Shot at Sight)</span>
                <span>Tap zones 01–05</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#F5F3EC] border border-[#1F3527]/12 flex flex-col justify-between">
            <div>
              <div className="aspect-[16/9] overflow-hidden bg-[#141815]">
                <img
                  src={activeZone.image}
                  alt={activeZone.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover aranya-photo"
                />
              </div>
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between gap-2 text-xs uppercase tracking-[0.12em] text-[#4D6150]">
                  <span>
                    Zone {activeZone.code} · {activeZone.category}
                  </span>
                  {activeZone.mediaType === 'actual-site' && (
                    <span className="font-semibold text-[#1F3527]">Real Site Photo</span>
                  )}
                </div>
                <h3 className="mt-2 font-display text-3xl font-medium text-[#141815]">
                  {activeZone.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#141815]/80">
                  {activeZone.summary}
                </p>

                <ul className="mt-5 pt-5 border-t border-[#1F3527]/12 space-y-2 text-sm text-[#141815]">
                  {activeZone.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2.5">
                      <span aria-hidden="true" className="text-[#1F3527] font-semibold">
                        —
                      </span>
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="px-6 pb-6 text-xs text-[#4D6150]">
              Plot-by-plot numbered survey maps are shown in person during your site visit.
            </p>
          </div>
        </div>

        {/* Clubhouse & Amenities */}
        <div className="mt-16 pt-14 border-t border-[#1F3527]/15">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150]">
                Clubhouse & Amenities
              </p>
              <h3 className="mt-1 font-display text-3xl sm:text-4xl font-medium text-[#141815]">
                Spaces for Every Age Group.
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5 bg-[#F5F3EC] p-1.5 border border-[#1F3527]/12">
              {AMENITY_CLUSTERS.map((cluster) => (
                <button
                  key={cluster.id}
                  type="button"
                  onClick={() => setActiveAmenityId(cluster.id)}
                  className={`px-3.5 py-2 text-xs font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    activeAmenityId === cluster.id
                      ? 'bg-[#1F3527] text-[#F5F3EC]'
                      : 'text-[#141815]/75 hover:text-[#141815]'
                  }`}
                >
                  {cluster.title.split('&')[0].trim()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 bg-[#F5F3EC] border border-[#1F3527]/12 overflow-hidden">
            <div className="lg:col-span-7 aspect-[16/10] lg:aspect-auto overflow-hidden">
              <img
                src={activeAmenity.image}
                alt={activeAmenity.imageAlt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo"
              />
            </div>
            <div className="lg:col-span-5 p-7 sm:p-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#4D6150]">
                  {activeAmenity.subtitle}
                </p>
                <h4 className="mt-2 font-display text-3xl font-medium text-[#141815]">
                  {activeAmenity.title}
                </h4>
                <ul className="mt-6 space-y-3 border-t border-[#1F3527]/12 pt-6 text-sm text-[#141815]/85">
                  {activeAmenity.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <span aria-hidden="true" className="text-[#1F3527] font-semibold">
                        —
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-8 pt-4 border-t border-[#1F3527]/12 text-xs text-[#4D6150]">
                Official Silpa Aranya Community Feature
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
