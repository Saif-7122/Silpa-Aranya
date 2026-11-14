import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/aranyaData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0].id);

  return (
    <section id="faq" className="bg-[#F5F3EC] text-[#141815] py-20 lg:py-28">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D6150] mb-4">
              Common Questions
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-medium leading-[1.08] tracking-tight text-[#141815]">
              Clear Answers Before You Decide.
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#141815]/75">
              Straightforward answers from the official Silpa Aranya brochure, site details, and road
              connectivity updates.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-[#1F3527]/15 border-y border-[#1F3527]/15">
            {FAQ_ITEMS.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id} className="py-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenId(isOpen ? '' : item.id)}
                    className="w-full min-h-[48px] flex items-center justify-between gap-4 text-left py-2 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B5945B]"
                  >
                    <span className="font-display text-xl sm:text-2xl font-medium text-[#141815]">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#1F3527] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-3 pr-8 text-sm sm:text-base leading-relaxed text-[#141815]/80">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
