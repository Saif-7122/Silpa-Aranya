import { PhoneCall, Mail, MapPin } from 'lucide-react';
import { BRAND_INFO } from '../data/aranyaData';
import { EnquiryForm } from './EnquiryForm';

export function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#1F3527] text-[#F5F3EC] py-20 lg:py-28 overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
          {/* Conversion Story & Direct Developer Channels */}
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#B5945B] mb-4">
              CONTACT OUR TEAM · Site Visits &amp; Plot Details
            </p>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-medium leading-[1.06] tracking-tight text-[#F5F3EC] text-balance">
              Plan Your Visit This Weekend.
            </h2>
            <p className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#E6E0D3]/85">
              Walk the 112-acre site on Chevella–Manneguda Road, see the ready entrance arch and
              roads, and check plots that fit your family and budget.
            </p>

            {/* Official Verified Contact Details */}
            <div className="mt-10 pt-8 border-t border-[#F5F3EC]/15 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <PhoneCall className="h-4 w-4 text-[#B5945B] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#E6E0D3]/65">
                    Direct Phone
                  </p>
                  <a
                    href={BRAND_INFO.phoneHref}
                    className="mt-0.5 inline-block text-lg font-medium text-[#F5F3EC] tabular-nums hover:text-[#B5945B]"
                  >
                    {BRAND_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-[#B5945B] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#E6E0D3]/65">
                    Official Email
                  </p>
                  <a
                    href={`mailto:${BRAND_INFO.email}`}
                    className="mt-0.5 inline-block text-base font-medium text-[#F5F3EC] hover:text-[#B5945B]"
                  >
                    {BRAND_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#B5945B] mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-[#E6E0D3]/65">
                    Office Address · {BRAND_INFO.developer}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-[#E6E0D3]/80 max-w-md">
                    {BRAND_INFO.corporateAddress}
                  </p>
                  <a
                    href={BRAND_INFO.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#B5945B] hover:underline"
                  >
                    <span>Project Site Directions ({BRAND_INFO.sitePlusCode}, Mirzapur) →</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Capture Form Panel */}
          <div className="lg:col-span-6 bg-[#141815] border border-[#F5F3EC]/15 p-6 sm:p-10">
            <div className="pb-6 mb-6 border-b border-[#F5F3EC]/12">
              <h3 className="font-display text-3xl font-medium text-[#F5F3EC]">
                CONTACT OUR TEAM
              </h3>
              <p className="mt-1.5 text-sm text-[#E6E0D3]/75">
                Fill in 3 quick details to get a callback, book a site visit, or download the
                brochure PDF.
              </p>
            </div>

            <EnquiryForm sourceSection="footer-contact-form" idPrefix="contact" darkSurface />
          </div>
        </div>
      </div>
    </section>
  );
}
