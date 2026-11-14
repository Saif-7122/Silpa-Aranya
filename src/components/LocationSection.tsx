import { useState } from 'react';
import { ExternalLink, MapPin, Navigation } from 'lucide-react';
import { BRAND_INFO, LOCATION_NODES } from '../data/aranyaData';

const MAP_STOPS = [
  {
    id: 'orr-exit18',
    label: 'Gachibowli → Nehru ORR Exit 18',
    sub: '~1 hr total drive to site (40 mins from Exit 18)',
  },
  {
    id: 'moinabad',
    label: 'Moinabad & Chilkoor Turnoff',
    sub: 'Along NH-163 highway',
  },
  {
    id: 'chevella-manneguda',
    label: 'Chevella Town & Shadnagar Road',
    sub: 'Nearby market town',
  },
  {
    id: 'nh163',
    label: 'Nayara Petrol Pump & Mirzapur Turnoff',
    sub: 'Turn-off near ARANYA',
  },
  {
    id: 'aranya-site',
    label: 'ARANYA (Silpa Aranya Site)',
    sub: '100-Ft Approach Road · ~1 km from Proposed RRR',
    isSite: true,
  },
  {
    id: 'rrr',
    label: 'Proposed RRR Southern Arc',
    sub: 'Planning & survey stage (~1 km away)',
  },
  {
    id: 'ananthagiri',
    label: 'Manneguda → Vikarabad & Ananthagiri Hills',
    sub: '~17 km ahead from Manneguda',
  },
];

export function LocationSection() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('orr-exit18');

  const activeNode =
    LOCATION_NODES.find((node) => node.id === selectedNodeId) ?? LOCATION_NODES[0];

  const handleStopClick = (id: string) => {
    if (id === 'aranya-site' || id === 'moinabad') {
      setSelectedNodeId('chevella-manneguda');
    } else {
      setSelectedNodeId(id);
    }
  };

  return (
    <section id="location" className="bg-[#EBE7DC] text-[#141815] py-20 lg:py-28 border-t border-[#1F3527]/12">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end pb-12 border-b border-[#1F3527]/15">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150] mb-4">
              Location & Connectivity · NH-163 Highway
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#141815] text-balance">
              1 Hour from Gachibowli. Away from City Chaos.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base leading-relaxed text-[#141815]/80">
              Located off the Chevella–Manneguda Road (NH-163) near Mirzapur, ARANYA connects
              easily to Gachibowli and Financial District while keeping you close to Vikarabad’s
              Ananthagiri greenery.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Interactive Route Schematic */}
          <div className="lg:col-span-6 bg-[#1F3527] text-[#F5F3EC] p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#F5F3EC]/15">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#B5945B]">
                  Route Guide · NH-163
                </p>
                <p className="mt-1 text-sm text-[#E6E0D3]/85">
                  Tap any stop below to see driving time and current road status
                </p>
              </div>
              <Navigation className="h-5 w-5 text-[#B5945B] shrink-0" aria-hidden="true" />
            </div>

            <div className="relative my-6 py-4 px-2 min-h-[430px] flex flex-col justify-between">
              <div
                aria-hidden="true"
                className="absolute left-7 sm:left-10 top-6 bottom-6 w-[3px] bg-[#F5F3EC]/25"
              />
              <div
                aria-hidden="true"
                className="absolute left-7 sm:left-10 right-4 top-[72%] h-0 border-t-2 border-dashed border-[#B5945B]/75"
              />

              {MAP_STOPS.map((stop) => {
                const isActive =
                  selectedNodeId === stop.id ||
                  (stop.id === 'aranya-site' && selectedNodeId === 'chevella-manneguda');

                return (
                  <button
                    key={stop.id}
                    type="button"
                    onClick={() => handleStopClick(stop.id)}
                    className={`relative z-10 flex items-start gap-4 text-left py-2.5 px-3 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B5945B] ${
                      stop.isSite
                        ? 'bg-[#B5945B] text-[#141815] ml-4 sm:ml-6'
                        : isActive
                          ? 'bg-[#294433] text-[#F5F3EC]'
                          : 'hover:bg-[#294433]/60 text-[#E6E0D3]'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`mt-1 h-3.5 w-3.5 shrink-0 border-2 ${
                        stop.isSite
                          ? 'bg-[#141815] border-[#141815]'
                          : stop.id === 'rrr'
                            ? 'bg-transparent border-[#B5945B]'
                            : 'bg-[#F5F3EC] border-[#1F3527]'
                      }`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-sm font-semibold ${
                          stop.isSite ? 'text-[#141815]' : 'text-[#F5F3EC]'
                        }`}
                      >
                        {stop.label}
                      </p>
                      <p
                        className={`text-xs mt-0.5 ${
                          stop.isSite ? 'text-[#141815]/80' : 'text-[#E6E0D3]/75'
                        }`}
                      >
                        {stop.sub}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <p className="pt-4 border-t border-[#F5F3EC]/15 text-xs leading-relaxed text-[#E6E0D3]/75">
              Route map matches the Silpa Aranya brochure (p. 29). Proposed RRR alignment is
              subject to final government notification.
            </p>
          </div>

          {/* Right Column: Landmark Details + Real Site Photos */}
          <div className="lg:col-span-6 flex flex-col justify-between gap-6">
            <div className="bg-[#F5F3EC] border border-[#1F3527]/12 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2 pb-5 border-b border-[#1F3527]/12">
                {LOCATION_NODES.map((node) => (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`px-3 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      selectedNodeId === node.id
                        ? 'bg-[#1F3527] text-[#F5F3EC]'
                        : 'bg-[#EBE7DC] text-[#141815]/80 hover:bg-[#DDD7C7]'
                    }`}
                  >
                    {node.name.split('(')[0].trim()}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#4D6150]">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{activeNode.corridor}</span>
                </div>
                <h3 className="mt-2 font-display text-3xl font-medium text-[#141815]">
                  {activeNode.name}
                </h3>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-[#1F3527]">
                  <span className="tabular-nums">{activeNode.distanceOrTime}</span>
                  <span aria-hidden="true">·</span>
                  <span>Status: {activeNode.status}</span>
                </div>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#141815]/80">
                  {activeNode.description}
                </p>
                <p className="mt-4 text-xs text-[#4D6150]">Source: {activeNode.sourceNote}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <figure className="bg-[#F5F3EC] border border-[#1F3527]/12 overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/brochure/site-arch-actual.jpg"
                    alt="Real site photo of the completed main entrance gate and BT road"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover aranya-photo"
                  />
                </div>
                <figcaption className="p-4">
                  <p className="text-xs font-semibold text-[#1F3527]">
                    Real Site Photo · Shot at Sight
                  </p>
                  <p className="mt-1 text-xs text-[#141815]/75">
                    Completed Grand Entrance Gate and laid approach road on red soil.
                  </p>
                </figcaption>
              </figure>

              <figure className="bg-[#F5F3EC] border border-[#1F3527]/12 overflow-hidden">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src="/assets/brochure/site-roads-actual.jpg"
                    alt="Real site photo of internal roads and planted fruit plots"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover aranya-photo"
                  />
                </div>
                <figcaption className="p-4">
                  <p className="text-xs font-semibold text-[#1F3527]">
                    Real Site Photo · Shot at Sight
                  </p>
                  <p className="mt-1 text-xs text-[#141815]/75">
                    Laid internal roads, marked plots, and young saplings across 112 acres.
                  </p>
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        {/* Exact Site Address & One-Tap Google Maps Directions */}
        <div className="mt-10 bg-[#F5F3EC] border border-[#1F3527]/15 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#4D6150]">
              <MapPin className="h-3.5 w-3.5 text-[#B5945B]" aria-hidden="true" />
              <span>Exact Site Location · Plus Code {BRAND_INFO.sitePlusCode}</span>
            </div>
            <h3 className="mt-1.5 font-display text-2xl sm:text-3xl font-medium text-[#141815]">
              SILPA ARANYA — Mirzapur, Telangana 501102
            </h3>
            <p className="mt-1.5 text-sm text-[#141815]/80">
              {BRAND_INFO.siteAddress} · Off Chevella–Manneguda Rd (NH-163)
            </p>
            <p className="mt-1 text-xs text-[#4D6150] tabular-nums">
              Coordinates: {BRAND_INFO.siteCoordinates.lat}, {BRAND_INFO.siteCoordinates.lng} · ~1 hr
              drive from Gachibowli
            </p>
          </div>

          <a
            href={BRAND_INFO.googleMapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#1F3527] text-[#F5F3EC] px-6 min-h-[48px] text-xs font-semibold uppercase tracking-[0.14em] whitespace-nowrap shrink-0 hover:bg-[#141815] transition-colors"
          >
            <Navigation className="h-4 w-4 text-[#B5945B]" aria-hidden="true" />
            <span>Open Directions in Google Maps</span>
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
