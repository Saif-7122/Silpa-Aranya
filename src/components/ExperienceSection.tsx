import { motion } from 'motion/react';
import { BRAND_INFO } from '../data/aranyaData';

export function ExperienceSection() {
  return (
    <section id="experience" className="bg-[#F5F3EC] text-[#141815] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end pb-14 border-b border-[#1F3527]/15">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#4D6150] mb-4">
              Life at ARANYA · {BRAND_INFO.brochureTagline}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.08] tracking-tight text-[#141815] text-balance">
              More Than a Home. A Better Way to Spend Your Weekends.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base sm:text-lg leading-relaxed text-[#141815]/80">
              {BRAND_INFO.supportingMessage} Built on fertile red soil with fruit gardens,
              campfires, and open skies, ARANYA gives your family real quality time away from city
              rush.
            </p>
          </div>
        </div>

        {/* Asymmetric Editorial Spread 1 */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 group overflow-hidden bg-[#EBE7DC]"
          >
            <div className="aspect-[16/10] w-full overflow-hidden">
              <img
                src="/assets/brochure/forest-hammock.jpg"
                alt="Reading peacefully in a hammock under tall trees at ARANYA"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-6 lg:p-8 border-t border-[#1F3527]/10">
              <h3 className="font-display text-2xl font-medium text-[#141815]">
                Calm Mornings Under Tall Trees
              </h3>
              <p className="mt-1.5 text-sm text-[#141815]/75">
                Wake up to birdsong, cool morning breeze, and shady hammocks — with zero traffic
                noise.
              </p>
            </figcaption>
          </motion.figure>

          <motion.figure
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between bg-[#1F3527] text-[#F5F3EC]"
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src="/assets/brochure/sunset-deck.jpg"
                alt="Sunset deck overlooking green hills and weekend homes"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo transition-transform duration-700 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-6 lg:p-9 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.14em] text-[#B5945B] mb-3">
                  Own Your Escape
                </p>
                <h3 className="font-display text-3xl font-medium leading-tight text-[#F5F3EC]">
                  Unhurried Evenings with Friends & Family
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#E6E0D3]/85">
                  Enjoy sunset views from wooden decks, sit-outs on your own verandah, and warm
                  bonfire nights under clear skies.
                </p>
              </div>
              <p className="mt-6 pt-4 border-t border-[#F5F3EC]/15 text-xs text-[#E6E0D3]/75">
                Designed for peaceful weekend living
              </p>
            </figcaption>
          </motion.figure>
        </div>

        {/* Asymmetric Editorial Spread 2 */}
        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <figure className="bg-[#EBE7DC] flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/assets/brochure/family-planting.jpg"
                alt="Parents and child planting organic saplings together at wooden garden table"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-6 flex-1">
              <h3 className="font-display text-2xl font-medium text-[#141815]">
                Real Nature for Your Kids
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#141815]/75">
                Let children plant seeds, pluck fresh fruits from 12 tree varieties, and feed
                Punganur cows at the Goshala instead of staring at screens.
              </p>
            </figcaption>
          </figure>

          <figure className="bg-[#EBE7DC] flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/assets/brochure/traditional-dining.jpg"
                alt="Traditional woodfire outdoor cooking and brassware dining table"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-6 flex-1">
              <h3 className="font-display text-2xl font-medium text-[#141815]">
                Fresh, Traditional Meals
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#141815]/75">
                Enjoy farm-fresh food and woodfire-cooked flavours served outdoors in a relaxed
                village-style setting.
              </p>
            </figcaption>
          </figure>

          <figure className="bg-[#EBE7DC] flex flex-col">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src="/assets/brochure/panchatatva-trail.jpg"
                alt="Circular Panchatatva wellness trail around an evening firepit"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover aranya-photo transition-transform duration-500 hover:scale-[1.03]"
              />
            </div>
            <figcaption className="p-6 flex-1">
              <h3 className="font-display text-2xl font-medium text-[#141815]">
                Panchatatva Wellness Trail
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#141815]/75">
                Walk barefoot on five natural stone and sand paths around a warm firepit, right
                next to yoga decks and garden work spots.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
