import { useState } from 'react';
import { X } from 'lucide-react';
import { BRAND_INFO } from '../data/aranyaData';

interface FooterProps {
  onOpenEnquiry: (source: string) => void;
}

export function Footer({ onOpenEnquiry }: FooterProps) {
  const [legalDialog, setLegalDialog] = useState<'privacy' | 'disclaimer' | null>(null);

  return (
    <footer className="bg-[#141815] text-[#E6E0D3] border-t border-[#F5F3EC]/12">
      <div className="mx-auto max-w-[1440px] px-6 py-14 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 pb-12 border-b border-[#F5F3EC]/12">
          <div className="md:col-span-5">
            <p className="font-display text-3xl font-semibold tracking-[0.18em] text-[#F5F3EC]">
              ARANYA
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#B5945B]">
              {BRAND_INFO.officialProjectName} · {BRAND_INFO.brochureTagline}
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#E6E0D3]/75">
              A 112-acre gated farm-home community on Chevella–Manneguda Road (NH-163), Hyderabad,
              by {BRAND_INFO.developer}.
            </p>
            <button
              type="button"
              onClick={() => onOpenEnquiry('footer-cta')}
              className="mt-6 bg-[#F5F3EC] text-[#141815] px-5 py-3 min-h-[44px] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#B5945B] transition-colors cursor-pointer"
            >
              CONTACT OUR TEAM
            </button>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B5945B] mb-4">
              Quick Links
            </p>
            <ul className="space-y-2.5 text-sm text-[#E6E0D3]/80">
              <li>
                <a href="#overview" className="hover:text-white">
                  Overview
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white">
                  Weekend Life
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-white">
                  Location &amp; Travel Time
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-white">
                  Homes &amp; Plots
                </a>
              </li>
              <li>
                <a href="#investment" className="hover:text-white">
                  Price &amp; Growth
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white">
                  Photos
                </a>
              </li>
              <li>
                <a href="#masterplan" className="hover:text-white">
                  Layout &amp; Amenities
                </a>
              </li>
              <li>
                <a
                  href="/virtual-tour/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  3D Walkthrough
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#B5945B] mb-4">
              Developer & Contact
            </p>
            <div className="space-y-2.5 text-sm text-[#E6E0D3]/80">
              <p className="font-medium text-[#F5F3EC]">{BRAND_INFO.developer}</p>
              <p className="text-xs leading-relaxed text-[#E6E0D3]/70">
                {BRAND_INFO.corporateAddress}
              </p>
              <p className="pt-1">
                Phone:{' '}
                <a
                  href={BRAND_INFO.phoneHref}
                  className="text-[#F5F3EC] hover:text-[#B5945B] tabular-nums"
                >
                  {BRAND_INFO.phone}
                </a>
              </p>
              <p>
                Email:{' '}
                <a href={`mailto:${BRAND_INFO.email}`} className="text-[#F5F3EC] hover:text-[#B5945B]">
                  {BRAND_INFO.email}
                </a>
              </p>
              <p className="text-xs text-[#E6E0D3]/65 pt-1">
                Project Site: {BRAND_INFO.locationShort}
              </p>
            </div>
          </div>
        </div>

        {/* Legal & Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-[#E6E0D3]/60">
          <p>
            © {new Date().getFullYear()} {BRAND_INFO.officialProjectName} · {BRAND_INFO.developer}.
            For information only; not a legal offer.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setLegalDialog('privacy')}
              className="min-h-[44px] hover:text-[#F5F3EC] underline underline-offset-4 cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegalDialog('disclaimer')}
              className="min-h-[44px] hover:text-[#F5F3EC] underline underline-offset-4 cursor-pointer"
            >
              Project Disclaimer
            </button>
          </div>
        </div>
      </div>

      {/* Legal Policy Modal */}
      {legalDialog && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={legalDialog === 'privacy' ? 'Privacy Policy' : 'Project Disclaimer'}
          className="fixed inset-0 z-50 bg-[#141815]/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLegalDialog(null)}
        >
          <div
            className="max-w-lg w-full bg-[#F5F3EC] text-[#141815] p-6 sm:p-8 border border-[#1F3527]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#1F3527]/15">
              <h3 className="font-display text-2xl font-medium">
                {legalDialog === 'privacy' ? 'Privacy Policy' : 'Project Disclaimer'}
              </h3>
              <button
                type="button"
                onClick={() => setLegalDialog(null)}
                aria-label="Close legal notice"
                className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#141815]/70 hover:text-[#141815] cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-[#141815]/80">
              {legalDialog === 'privacy' ? (
                <>
                  <p>
                    The details you share here (Full Name, Mobile Number, City, and call
                    preferences) are used only to call you back, send the Silpa Aranya brochure, and
                    arrange your site visit.
                  </p>
                  <p>
                    We never sell your number to outside brokers. You can ask us to stop contacting
                    you anytime by writing to {BRAND_INFO.email}.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    As stated in the official Silpa Aranya brochure, this page is for general
                    information only and is not a legal offer. Plot areas, home designs, and
                    amenities may be updated by the developer.
                  </p>
                  <p>
                    Real photos taken at the project site are labeled &ldquo;Real Site Photo&rdquo;
                    to tell them apart from design visuals. The Regional Ring Road (RRR) and NH-163
                    upgrades follow government timelines, and no land price rise or rental income is
                    guaranteed.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
