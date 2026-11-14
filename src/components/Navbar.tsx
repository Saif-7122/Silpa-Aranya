import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenEnquiry: (source: string) => void;
}

const NAV_LINKS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Weekend Life', href: '#experience' },
  { label: 'Location', href: '#location' },
  { label: 'Price & Growth', href: '#investment' },
  { label: 'Photos', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar({ onOpenEnquiry }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#F5F3EC]/95 backdrop-blur-md border-b border-[#1F3527]/12 text-[#141815]'
          : 'bg-gradient-to-b from-[#141815]/85 via-[#141815]/50 to-transparent text-[#F5F3EC]'
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-3 sm:gap-8 px-4 py-3.5 sm:px-6 lg:px-12">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-xl sm:text-2xl font-semibold tracking-[0.18em] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5945B]"
        >
          ARANYA
        </a>

        {/* Zone 2: Clean Single-Line Nav Links */}
        <nav aria-label="Primary Navigation" className="hidden xl:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide whitespace-nowrap shrink-0 underline-offset-8 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B5945B] ${
                scrolled ? 'text-[#141815]/85 hover:text-[#1F3527]' : 'text-[#F5F3EC]/90 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onOpenEnquiry('header-cta')}
            className={`px-3.5 sm:px-5 py-2.5 min-h-[44px] text-[11px] sm:text-xs font-semibold tracking-[0.12em] sm:tracking-[0.14em] uppercase whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B5945B] ${
              scrolled
                ? 'bg-[#1F3527] text-[#F5F3EC] hover:bg-[#141815]'
                : 'bg-[#F5F3EC] text-[#141815] hover:bg-[#E6E0D3]'
            }`}
          >
            CONTACT OUR TEAM
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className={`xl:hidden inline-flex items-center justify-center p-2.5 min-h-[44px] min-w-[44px] cursor-pointer focus-visible:outline-2 focus-visible:outline-[#B5945B] ${
              scrolled
                ? 'text-[#141815] hover:bg-[#1F3527]/10'
                : 'bg-[#141815]/55 text-[#F5F3EC] border border-[#F5F3EC]/25 hover:bg-[#141815]/80'
            }`}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="xl:hidden bg-[#F5F3EC] text-[#141815] border-t border-[#1F3527]/12 px-6 py-5"
        >
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 min-h-[44px] flex items-center text-base font-medium text-[#141815] border-b border-[#1F3527]/10"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
